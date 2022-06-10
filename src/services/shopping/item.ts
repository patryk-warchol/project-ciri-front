import client from '@/utils/axiosClient';
// import castAttributesFromModel from '@/utils/castAttributesFromDefinition';

// const userDefinition = {
//   email: 'String',
//   firstname: 'String',
//   lastname: 'String',
//   isAdmin: 'Boolean',
//   isManager: 'Boolean',
//   isHrOrg: 'Boolean',
// };

class ShoppingItemService {
  static list(search = {}) {
    return client.get('/shopping/items', { params: search }).then((response) => {
      return response;
    });
  }

  // static get(id) {
  //   return client.get(`/users/${id}`).then((response) => {
  //     return response.user;
  //   });
  // }

  // static save(user) {
  //   const attributes = castAttributesFromModel(userDefinition, user);
  //   if (user.id) {
  //     return client.put(`/users/${user.id}`, { user: attributes });
  //   }
  //   return client.post('/users', { user: attributes });
  // }

  // static delete(id) {
  //   return client.delete(`/users/${id}`);
  // }
}

export default ShoppingItemService;
