/* eslint-disable class-methods-use-this */
import store from './store';

class NetworkManager {
  constructor() {
    // Vue.store.getters.use;
    this.baseApi = 'http://127.0.0.1:8000/api/';

    this.urlsApi = [
      {
        name: 'updateProfile',
        url: `${this.baseApi}profile/`,
      },
    ];
  }

  getUrl(name) {
    return this.urlsApi.find(url => url.name === name).url;
  }

  getToken() {
    const user = store.getters.getUser;
    if (user !== undefined) {
      return user.token;
    }
    return '';
  }

  getHeader() {
    const user = store.getters.getUser;
    if (user !== undefined) {
      return new Headers({
        Authorization: user.token,
        'Content-Type': 'application/json', // eslint-disable-line quote-props
      });
    }
    return {};
  }

  updateProfile(dataProfile) {
    return fetch(this.getUrl('updateProfile'), { method: 'PUT', headers: this.getHeader(), body: JSON.stringify(dataProfile) });
  }
}
export default NetworkManager;
