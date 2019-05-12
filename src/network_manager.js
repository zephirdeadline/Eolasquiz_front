/* eslint-disable class-methods-use-this */
import store from './store';

class NetworkManager {
  constructor() {
    // Vue.store.getters.use;
    this.baseApi = 'http://127.0.0.1:8000/';

    this.urlsApi = [
      {
        name: 'updateProfile',
        url: () => `${this.baseApi}api/profile/`,
      },
      {
        name: 'profile',
        url: () => `${this.baseApi}api/profile/`,
      },
      {
        name: 'like',
        url: () => `${this.baseApi}api/like/`,
      },
      {
        name: 'dislike',
        url: () => `${this.baseApi}api/dislike/`,
      },
      {
        name: 'liker',
        url: id => `${this.baseApi}api/liker/${id}`,
      },
      {
        name: 'find',
        url: e => `${this.baseApi}api/quiz/find/${e}`,
      },
      {
        name: 'last',
        url: () => `${this.baseApi}api/quiz/last/`,
      },
      {
        name: 'load_more',
        url: url => `${url}`,
      },
      {
        name: 'quiz',
        url: id => `${this.baseApi}api/quiz/${id}`,
      },
      {
        name: 'result_id',
        url: id => `${this.baseApi}api/result/${id}`,
      },
      {
        name: 'result',
        url: () => `${this.baseApi}api/result/`,
      },
      {
        name: 'token',
        url: () => `${this.baseApi}auth/token/create/`,
      },
      {
        name: 'me',
        url: () => `${this.baseApi}auth/users/me/`,
      },
      {
        name: 'create_user',
        url: () => `${this.baseApi}auth/users/create/`,
      },
    ];
  }

  getUrl(name, ...args) {
    return this.urlsApi.find(url => url.name === name).url(args);
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

  like(id) {
    return fetch(this.getUrl('like'), { method: 'POST', headers: this.getHeader(), body: JSON.stringify([{ quiz: id }]) });
  }

  dislike(id) {
    return fetch(this.getUrl('dislike'), { method: 'POST', headers: this.getHeader(), body: JSON.stringify([{ quiz: id }]) });
  }

  liker(id) {
    return fetch(this.getUrl('liker', id), { headers: this.getHeader() });
  }

  updateProfile(dataProfile) {
    return fetch(this.getUrl('updateProfile'), { method: 'PUT', headers: this.getHeader(), body: JSON.stringify(dataProfile) });
  }

  find(data) {
    return fetch(this.getUrl('find', data), { headers: this.getHeader() });
  }

  last() {
    return fetch(this.getUrl('last'));
  }

  loadMore(url) {
    return fetch(this.getUrl('load_more', url));
  }

  quiz(id) {
    return fetch(this.getUrl('quiz', id));
  }

  resultId(id) {
    return fetch(this.getUrl('result_id', id), { headers: this.getHeader() });
  }

  postResult(data) {
    return fetch(this.getUrl('result'), { method: 'POST', headers: this.getHeader(), body: JSON.stringify(data) });
  }

  token(data) {
    const formData = new FormData();
    Object.keys(data).forEach(key => formData.append(key, data[key]));
    return fetch(this.getUrl('token'), { method: 'POST', body: formData });
  }

  me(token) {
    return fetch(this.getUrl('profile'), { headers: new Headers({ Authorization: token }) });
  }

  createUser(data) {
    return fetch(this.getUrl('create_user'), { method: 'POST', headers: this.getHeader(), body: JSON.stringify(data) });
  }
}
export default NetworkManager;
