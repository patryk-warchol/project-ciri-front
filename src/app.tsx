import React from 'react';
import { createIntl, createIntlCache } from 'react-intl';
import '@/assets/stylesheets/global.sass';
import Header from './components/Layout/Header';
import RightMenu from './components/Layout/RightMenu';
import client from './utils/axiosClient';
import * as locales from './locales';
import UmiAuth from '@9troisquarts/utils.umi-auth';
import useUmiAuth from '@/utils/useUmiAuth';

const cache = createIntlCache();

const intl = createIntl(
  {
    locale: 'fr-FR',
    messages: locales.fr,
  },
  cache,
);

UmiAuth.configure({
  client: client,
});

export async function getInitialState() {
  const authenticationState = await UmiAuth.getAuthenticationState(true);
  return authenticationState;
}

export const layout = {
  logout: () => {},
  headerRender: () => <Header />,
  rightRender: () => {
    return <RightMenu />;
  },
  disableContentMargin: false,
};
