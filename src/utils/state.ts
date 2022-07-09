import { ShoppingItemsIndexState } from 'umi';

type LoadingState = {
  effects: {
    [k: string]: boolean;
  };
};

export type StateType = {
  loading: LoadingState;
  shoppingItems: ShoppingItemsIndexState;
};

export default StateType;
