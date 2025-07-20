import { createAction } from '@reduxjs/toolkit';

export const homeSagaActions = {
  fetchProducts: createAction('Home/FetchProducts'),
};
