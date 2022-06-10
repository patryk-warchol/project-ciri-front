import React from 'react';
import { createIntl, createIntlCache } from 'react-intl';
import Header from './components/Layout/Header';
import RightMenu from './components/Layout/RightMenu';
import * as locales from './locales';


const cache = createIntlCache();

const intl = createIntl(
  {
    locale: 'fr-FR',
    messages: locales.fr,
  },
  cache,
);

export const layout = {
  logout: () => {},
  
  rightRender: () => {
    return <RightMenu />;
  },
  headerRender: () => <Header />,
};