import React, { useEffect, useState } from 'react';
import { Table, Card, Button, Menu, Dropdown } from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EllipsisOutlined,
} from '@ant-design/icons';
import { useIntl, connect, Dispatch } from 'umi';
import StateType from '@/utils/state';
import { ShoppingItemType } from '@/types';
import ShoppingItemModal from './components/ShoppingItemModal';

type IProps = {
  shoppingItems: ShoppingItemType[];
  loading: boolean;
  editingShoppingItem?: ShoppingItemType;
};

type ShoppingItemsDispatcher = {};

const ShoppingItemsIndex: React.FC<IProps & ShoppingItemsDispatcher> = (
  props,
) => {
  const { shoppingItems, loading } = props;

  const intl = useIntl();

  const [visibleEdiitngModal, setVisibleEdiitngModal] = useState(false);
  const [editingShoppingItem, setEditingShoppingItem] = useState(undefined);

  const newShoppingItem = () => {
    setEditingShoppingItem(undefined);
    setVisibleEdiitngModal(true);
  };

  const editShoppingItem = (shoppingItem: ShoppingItemType) => {
    setEditingShoppingItem(shoppingItem);
    setVisibleEdiitngModal(true);
  };

  const columns = [
    {
      title: intl.formatMessage({ id: 'shoppingItems.attributes.title' }),
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: intl.formatMessage({ id: 'shoppingItems.attributes.price' }),
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: intl.formatMessage({ id: 'shoppingItems.attributes.quantity' }),
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      key: 'actions',
      align: 'right',
      // className: styles.lightBackground,
      dataIndex: 'actions',
      render: (_title, record) => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item
                key="editTeam"
                onClick={() => editShoppingItem(record)}
                icon={<EditOutlined />}
              >
                {intl.formatMessage({ id: 'defaults.edit' })}
              </Menu.Item>
              {/* <Menu.Item
                onClick={() => showDeleteConfirm(record, onDelete, intl)}
                icon={<DeleteOutlined />}
                key="deleteTeam"
              >
                {intl.formatMessage({ id: 'defaults.delete' })}
              </Menu.Item> */}
            </Menu>
          }
        >
          <span className="ellipsis-container">
            <EllipsisOutlined rotate={90} style={{ fontSize: 15 }} />
          </span>
        </Dropdown>
      ),
    },
  ];

  //   <Button onClick={() => editShoppingItem(record)} key="editShoppingItem">
  //   {intl.formatMessage({ id: 'defaults.edit' })}
  // </Button>

  return (
    <>
      {visibleEdiitngModal && (
        <ShoppingItemModal
          visible={visibleEdiitngModal}
          setVisibility={setVisibleEdiitngModal}
          editingShoppingItem={editingShoppingItem}
          setEditingShoppingItem={setEditingShoppingItem}
          // onSubmit={}
          // onSave
          // errors
          // onHookReset
        />
      )}

      <Card
        title={intl.formatMessage({ id: 'shoppingItems.listTitle' })}
        extra={
          <Button
            onClick={() => newShoppingItem()}
            icon={<PlusOutlined />}
            key="newShoppingItem"
          >
            {intl.formatMessage({ id: 'defaults.add' })}
          </Button>
        }
      >
        <Table
          size="small"
          rowKey="id"
          loading={loading}
          dataSource={shoppingItems}
          columns={columns}
          pagination={false}
        />
      </Card>
    </>
  );
};

const mapStateToProps = (state: StateType): IProps => {
  return {
    shoppingItems: state.shoppingItems?.list?.records || [],
    // pagination: state.users?.list?.pagination || false,
    loading: state.loading.effects['shoppingItems/fetchList'],
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingItemsIndex);
