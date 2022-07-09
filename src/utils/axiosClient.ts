import axios from 'axios';
import { get } from 'lodash';
import { history } from 'umi';
import { camelizeKeys, decamelizeKeys } from 'humps';
import qs from 'qs';
import handleNotifications from './notifications/handleNotifications';
import UmiAuth from '@9troisquarts/utils.umi-auth';

const config = require(`../config${
  process.env.NODE_ENV === 'development' ? '.dev' : ''
}`).default;

const { baseUrl } = config;

const defaultHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

const client = axios.create({
  baseURL: baseUrl,
  responseType: 'json',
});

client.interceptors.request.use(
  (config) => {
    config.paramsSerializer = (params) =>
      qs.stringify(params, { arrayFormat: 'brackets' });
    config.headers = {
      ...(config.headers || {}),
      ...UmiAuth.authenticationHeaders(),
      ...(config.httpRequest ? {} : defaultHeaders),
    };
    if (
      config.data &&
      config.headers['Content-Type'] &&
      config.headers['Content-Type'] === 'application/json'
    )
      config.data = decamelizeKeys(config.data);
    config.params = decamelizeKeys(config.params);
    return config;
  },
  (error) => Promise.reject(error),
);
client.interceptors.response.use(
  (response) => {
    const { data } = response;
    const authHeaders = UmiAuth.extractAuthHeaders(response);
    if (authHeaders['access-token']) UmiAuth.setAuthInLS(authHeaders);
    if (data) {
      const notifications = get(data, 'data.notifications', null);
      if (notifications) handleNotifications(notifications);
    }
    return camelizeKeys(response?.data?.data);
  },
  ({ response }) => {
    const authHeaders = UmiAuth.extractAuthHeaders(response);
    if (authHeaders['access-token']) UmiAuth.setAuthInLS(authHeaders);
    if (response && response.status === 422) {
      const { data } = response;
      if (data) {
        const notifications = get(data, 'data.notifications', null);
        if (notifications) handleNotifications(notifications);
      }
      return Promise.reject(camelizeKeys(response.data.data));
    }
    if (response && response.status === 403) {
      history.push('/');
      handleNotifications([
        {
          type: 'error',
          message: 'You are not authorized to access this page',
        },
      ]);
    }
    if (response && response.status === 401) {
      UmiAuth.logout();
    }
    return response?.data?.data;
  },
);
export default client;
