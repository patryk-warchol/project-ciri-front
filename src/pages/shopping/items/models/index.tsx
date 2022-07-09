import ShoppingItemService from '@/services/shopping/item';
import { ShoppingItemType } from '@/types';
import { Effect, ImmerReducer, Subscription, history } from 'umi';

export interface ShoppingItemsIndexState {
  list: {
    records: ShoppingItemType[];
    pagination?: any;
  };
  open: boolean;
  shoppingItem?: ShoppingItemType;
  errors?: string;
}

export type ShoppingItemsIndexModel = {
  namespace: 'shoppingItems';
  state: ShoppingItemsIndexState;
  subscriptions: { setup: Subscription };
  effects: {
    [k: string]: Effect;
  };
  reducers: {
    [k: string]: ImmerReducer<ShoppingItemsIndexState>;
  };
};

const initialState: ShoppingItemsIndexState = {
  list: {
    records: [],
    pagination: null,
  },
  open: false,
  shoppingItem: undefined,
  errors: undefined,
};

const ShoppingItemsIndexModel: ShoppingItemsIndexModel = {
  namespace: 'shoppingItems',
  state: initialState,
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname, query }) => {
        dispatch({ type: 'reset' });
        if (pathname === '/shopping/items') {
          dispatch({ type: 'fetchList', payload: { page: query?.page || 1 } });
          // if (query?.page) {

          // } else {
          //   dispatch({ type: 'fetchList' });
          // }
        }
      });
    },
  },

  reducers: {
    reset: () => initialState,
    setList: (state: ShoppingItemsIndexState, action) => {
      state.list = action.payload;
      return state;
    },
    // closeEdit: (state: ShoppingItemsIndexState) => {
    //   state.open = false;
    //   state.user = undefined;
    //   state.errors = undefined;
    //   return state;
    // },
    // newUser: (state: ShoppingItemsIndexState) => {
    //   state.errors = undefined;
    //   state.user = {
    //     isAdmin: false,
    //     isManager: false,
    //     isHrOrg: false,
    //   };
    //   state.open = true;
    //   return state;
    // },
    // setUser: (state: ShoppingItemsIndexState, action) => {
    //   state.open = true;
    //   state.user = action.payload;
    //   return state;
    // },
    // updateUser: (state: ShoppingItemsIndexState, action) => {
    //   const { payload: user } = action;
    //   const index = (state.list.users || []).findIndex((u) => u.id === user.id);
    //   if (index >= 0) state.list.users[index] = user;
    //   else state.list.users.unshift(user);
    //   return state;
    // },
    // removeUser: (state: ShoppingItemsIndexState, action) => {
    //   const { payload: id } = action;
    //   const index = (state.list.users || []).findIndex((u) => u.id === id);
    //   if (index >= 0) state.list.users.splice(index, 1);
    //   return state;
    // },
    // setErrors: (state: ShoppingItemsIndexState, action) => {
    //   state.errors = action.payload;
    //   return state;
    // },
  },
  effects: {
    *fetchList(action, { call, put }) {
      try {
        const shoppingItems = yield call(
          ShoppingItemService.list,
          action.payload || { page: 1 },
        );
        yield put({ type: 'setList', payload: shoppingItems });
      } catch (e) {}
    },

    // *fetchUser(action, { call, put }) {
    //   try {
    //     const user = yield call(UserService.get, action.payload);
    //     yield put({ type: 'setUser', payload: user });
    //   } catch (e) {}
    // },
    // *save(action, { call, put, select }) {
    //   const user = yield select((state) => state.users.user);
    //   const nextUser = { ...action.payload, id: user?.id };
    //   yield put({ type: 'setUser', payload: nextUser });
    //   try {
    //     const response = yield call(UserService.save, nextUser);
    //     if (response.user) {
    //       yield put({ type: 'updateUser', payload: response.user });
    //       yield put({ type: 'closeEdit' });
    //     }
    //   } catch (e) {
    //     if (e.errors) yield put({ type: 'setErrors', payload: e.errors });
    //   }
    // },
    // *deleteUser(action, { call, put, select }) {
    //   yield call(UserService.delete, action.payload);
    //   yield put({ type: 'removeUser', payload: action.payload });
    // },
  },
};

export default ShoppingItemsIndexModel;
