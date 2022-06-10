import React from 'react';
import { connect, Dispatch } from 'dva';
import StateType from '@/utils/state';

type IProps = {
};

type ShoppingItemsDispatcher = {

};

const ShoppingItemsIndex: React.FC<IProps & ShoppingItemsDispatcher> = (props) => {

  return (
    <>
      <h1>Shopping items</h1>
    </>
  )
}

const mapStateToProps = (state: StateType): IProps => {
  return {
    // shoppingItems: state.shoppingItems?.list?.records || [],
    // pagination: state.users?.list?.pagination || false,
    loading: state.loading.effects['shoppingItems/fetchList'],
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {

}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingItemsIndex);