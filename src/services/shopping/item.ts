import client from '@/utils/axiosClient';
import castAttributesFromModel from '@/utils/castAttributesFromDefinition';

const shoppingItemDefinition = {
  title: 'String',
  quantity: 'Float',
  price: 'Float',
};

class ShoppingItemService {
  static list(search = {}) {
    return client
      .get('/shopping/items', { params: search })
      .then((response) => {
        return response;
      });
  }

  // static get(id) {
  //   return client.get(`/users/${id}`).then((response) => {
  //     return response.user;
  //   });
  // }

  static save(shoppingItem) {
    const attributes = castAttributesFromModel(
      shoppingItemDefinition,
      shoppingItem,
    );
    if (shoppingItem.id) {
      return client.put(`/shopping/items/${shoppingItem.id}`, {
        shoppingItem: attributes,
      });
    }
    return client.post('/shopping/items', { shoppingItem: attributes });
  }

  // static delete(id) {
  //   return client.delete(`/users/${id}`);
  // }
}

export default ShoppingItemService;
