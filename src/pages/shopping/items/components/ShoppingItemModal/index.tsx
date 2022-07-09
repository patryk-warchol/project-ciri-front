import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, InputNumber, Button } from 'antd';
import { useIntl, connect, Dispatch } from 'umi';
import ShoppingItemService from '@/services/shopping/item';

const ShoppingItemModal = (props) => {
  const {
    visible,
    setVisibility,
    editingShoppingItem,
    setEditingShoppingItem,
  } = props;

  const intl = useIntl();

  const [submitButtonLoading, setSubmitButtonLoading] = useState(false);
  // const [formErrors, setFormErrors] = useState(undefined)

  // var editingShoppingItem = {
  //   id: 1,
  //   title: "Test",
  //   price: "2",
  //   quantity: 1
  // }

  // const form = Form.useFormInstance();

  const onFinish = (shoppingItem) => {
    ShoppingItemService.save(shoppingItem).then((result) => {});
    // ClientService.save(client).then(() => {
    //   props.handleOk();
    // });
    // const shoppingItems = yield call(ShoppingItemService.list, action.payload || { page: 1 });
  };

  const [form] = Form.useForm();

  form.setFieldsValue(editingShoppingItem || {});

  const onFormSubmit = () => {
    setSubmitButtonLoading(true);
    form.submit();
    // onFinish
    // onSave(object)
  };

  return (
    <Modal
      title={
        editingShoppingItem?.id
          ? intl.formatMessage(
              { id: 'shoppingItems.editTitle' },
              { title: editingShoppingItem.title },
            )
          : intl.formatMessage({ id: 'shoppingItems.newTitle' })
      }
      visible={visible}
      onCancel={() => {
        // onHookReset()
        setEditingShoppingItem(undefined);
        setVisibility(false);
        form.resetFields();
        setSubmitButtonLoading(false);
      }}
      onOk={onFormSubmit}
      okText={intl.formatMessage({ id: 'defaults.save' })}
      okButtonProps={{ loading: submitButtonLoading }}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={editingShoppingItem}
        onFinish={onFinish}
      >
        <Form.Item
          label={intl.formatMessage({ id: 'shoppingItems.attributes.title' })}
          name="title"
          // validateStatus='error'
          // help="Cannot be blank"
          required
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={intl.formatMessage({ id: 'shoppingItems.attributes.price' })}
          name="price"
        >
          <InputNumber addonAfter="€" style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          label={intl.formatMessage({
            id: 'shoppingItems.attributes.quantity',
          })}
          name="quantity"
          required
        >
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ShoppingItemModal;
