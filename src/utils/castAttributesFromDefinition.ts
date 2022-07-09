import forIn from 'lodash/forIn';
import isObject from 'lodash/isObject';
import omit from 'lodash/omit';
import isArray from 'lodash/isArray';
import isNil from 'lodash/isNil';
import some from 'lodash/some';
import { decamelize } from 'humps';
import moment from 'moment';
const toFloat = (v) => parseFloat(v.toString().replace(/\,/g, '.'));
const toFloatString = (v) => v.toString().replace(/\,/g, '.');
const defaultOptions = {
  skipUndefinedKeys: true,
};
type OptionsType = {
  skipUndefinedKeys?: boolean;
};
export type ModelDefinitionType = {
  [k: string]:
    | 'Password'
    | 'Float'
    | 'FloatString'
    | 'Integer'
    | 'Other'
    | 'Nested'
    | 'Datetime'
    | 'Date'
    | 'String'
    | 'Files'
    | 'File'
    | 'Boolean'
    | 'Array'
    | ModelDefinitionType;
};
const castAttributesFromModel = (
  model: ModelDefinitionType,
  attributes,
  options: OptionsType = defaultOptions,
  modelName = '',
) => {
  const formattedModel = {};
  forIn(model, (value, key) => {
    if (isObject(value)) {
      if (!isNil(attributes[key])) {
        const attributeValue = attributes[key];
        if (attributeValue)
          formattedModel[`${key}_attributes`] = isArray(attributeValue)
            ? attributeValue.map((v) => castAttributesFromModel(value, v))
            : castAttributesFromModel(value, attributeValue);
      }
    } else if (!isNil(attributes[key])) {
      switch (value) {
        case 'Float':
          formattedModel[key] = toFloat(attributes[key]);
          break;
        case 'FloatString':
          formattedModel[key] = toFloatString(attributes[key]);
          break;
        case 'Integer':
          formattedModel[key] = parseInt(attributes[key], 10);
          break;
        case 'String':
          formattedModel[key] =
            typeof attributes[key] === 'string'
              ? attributes[key]
              : attributes[key].toString();
          break;
        case 'Date':
          formattedModel[key] =
            attributes[key] instanceof moment
              ? attributes[key].format('YYYY-MM-DD')
              : attributes[key];
          break;
        case 'Datetime':
          formattedModel[key] = attributes[key].format();
          break;
        case 'Password':
        case 'Files':
        case 'File':
          if (attributes[key]) formattedModel[key] = attributes[key];
          break;
        case 'Nested':
          if (attributes[key])
            formattedModel[`${key}Attributes`] = isArray(attributes[key])
              ? attributes[key].map((v) => omit(v, ['__typename']))
              : omit(attributes[key], ['__typename']);
          break;
        default:
          formattedModel[key] = attributes[key];
          break;
      }
    } else if (value !== 'Password' && value !== 'Nested') {
      if (!options.skipUndefinedKeys || attributes.hasOwnProperty(key))
        formattedModel[key] = null;
    }
  });
  // It must return form data when a file is present
  if (some(model, (value) => value === 'File')) {
    let formData = new FormData();
    forIn(formattedModel, (value, key) => {
      if (!isNil(value)) {
        switch (model[key.replace('_attributes', '')]) {
          case 'File':
            formData.append(`${modelName}[${decamelize(key)}]`, value);
            break;
          case 'Array':
          case 'Nested':
          case 'Map':
            formData = appendObjectFieldToFormData(
              formData,
              `${modelName}[${decamelize(key)}]`,
              value,
            );
            break;
          case 'Password':
            formData.append(`${modelName}[${decamelize(key)}]`, value);
            break;
          default:
            if (!key.includes('_attributes'))
              formData.append(`${modelName}[${decamelize(key)}]`, value);
            break;
        }
      }
    });
    return formData;
  }
  return formattedModel;
};
const appendObjectFieldToFormData = (formData, prefix, object) => {
  if (isArray(object)) {
    object.forEach((v, index) => {
      formData = appendObjectFieldToFormData(
        formData,
        `${prefix}[${isObject(v) && !isArray(v) ? index : ''}]`,
        v,
      );
    });
  } else if (isObject(object)) {
    forIn(object, (fieldValue, fieldName) => {
      formData = appendObjectFieldToFormData(
        formData,
        `${prefix}[${decamelize(fieldName)}]`,
        fieldValue,
      );
    });
  } else formData.append(`${prefix}`, object);
  return formData;
};
export default castAttributesFromModel;
