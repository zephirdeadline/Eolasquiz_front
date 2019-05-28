/* eslint-disable class-methods-use-this */
/* eslint-disable no-empty */
import store from './store';

class NetworkManager {
  constructor() {
    // Vue.store.getters.use;
    this.baseApi = 'http://127.0.0.1:8001/';

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
      {
        name: 'full_quiz_id',
        url: id => `${this.baseApi}api/fullquiz/${id}`,
      },
      {
        name: 'updateLicence',
        url: () => `${this.baseApi}api/licence/`,
      },
      {
        name: 'quiz_admin',
        url: () => `${this.baseApi}api/quiz/admin/`,
      },
      {
        name: 'all_admin_result',
        url: () => `${this.baseApi}api/alladminresult/`,
      },
      {
        name: 'delete_quiz',
        url: id => `${this.baseApi}api/quiz/${id}`,
      },
      {
        name: 'find_quiz_in_mine',
        url: value => `${this.baseApi}api/quiz/find/mine/${value}`,
      },
      {
        name: 'get_messages',
        url: () => `${this.baseApi}api/messages/`,
      },
      {
        name: 'get_message',
        url: id => `${this.baseApi}api/message/${id}`,
      },
      {
        name: 'post_message',
        url: () => `${this.baseApi}api/messages/`,
      },
      {
        name: 'get_classes',
        url: () => `${this.baseApi}api/classes/`,
      },
      {
        name: 'post_user',
        url: () => `${this.baseApi}api/user/`,
      },
      {
        name: 'post_class',
        url: () => `${this.baseApi}api/classes/`,
      },
      {
        name: 'post_broadcast_quiz',
        url: () => `${this.baseApi}api/broadcast/`,
      },
      {
        name: 'get_my_results',
        url: () => `${this.baseApi}api/myresults/`,
      },
      {
        name: 'post_fullquiz',
        url: () => `${this.baseApi}api/fullquiz/`,
      },
      {
        name: 'all_result',
        url: id => `${this.baseApi}api/allresult/${id}`,
      },
    ];
  }

  getUrl(name, ...args) {
    return this.urlsApi.find(url => url.name === name).url(args);
  }

  getToken() {
    const user = { ...store.getters.user };
    if (user !== {}) {
      return user.token;
    }
    return '';
  }

  getHeader() {
    const user = { ...store.getters.user };
    if (user !== {}) {
      return new Headers({
        Authorization: user.token,
        'Content-Type': 'application/json', // eslint-disable-line quote-props
      });
    }
    return {};
  }

  call(...args) {
    return fetch(...args).then(
      (resp) => {
        if (resp.status < 400) {
          try {
            return resp.json();
          } catch (e) {
            return resp;
          }
        }
        throw new Error(`Bad response from server ${resp.status}`);
        // return new Promise(() => resp.status);
      },
      () => Promise.reject(Error('Unable to fetch data')),
    );
  }

  like(id) {
    return this.call(this.getUrl('like'), { method: 'POST', headers: this.getHeader(), body: JSON.stringify([{ quiz: id }]) });
  }

  dislike(id) {
    return this.call(this.getUrl('dislike'), { method: 'POST', headers: this.getHeader(), body: JSON.stringify([{ quiz: id }]) });
  }

  liker(id) {
    return this.call(this.getUrl('liker', id), { headers: this.getHeader() });
  }

  updateProfile(dataProfile) {
    return this.call(this.getUrl('updateProfile'), { method: 'PUT', headers: this.getHeader(), body: JSON.stringify(dataProfile) });
  }

  find(data) {
    return this.call(this.getUrl('find', data), { headers: this.getHeader() });
  }

  last() {
    return this.call(this.getUrl('last'));
  }

  loadMore(url) {
    return this.call(this.getUrl('load_more', url));
  }

  quiz(id) {
    return this.call(this.getUrl('quiz', id));
  }

  resultId(id) {
    return this.call(this.getUrl('result_id', id), { headers: this.getHeader() });
  }

  postResult(data) {
    return this.call(this.getUrl('result'), { method: 'POST', headers: this.getHeader(), body: JSON.stringify(data) });
  }

  token(data) {
    const formData = new FormData();
    Object.keys(data).forEach(key => formData.append(key, data[key]));
    return this.call(this.getUrl('token'), { method: 'POST', body: formData });
  }

  me(token) {
    return this.call(this.getUrl('profile'), { headers: new Headers({ Authorization: token }) });
  }

  createUser(data) {
    return this.call(this.getUrl('create_user'), { method: 'POST', headers: this.getHeader(), body: JSON.stringify(data) });
  }

  editFullQuiz(id, quiz) {
    return this.call(this.getUrl('full_quiz_id', id), { method: 'PUT', headers: this.getHeader(), body: JSON.stringify(quiz) });
  }

  updateLicence(plan) {
    return this.call(this.getUrl('updateLicence'), { method: 'PATCH', headers: this.getHeader(), body: JSON.stringify({ licence_type: plan }) });
  }

  quizAdmin() {
    return this.call(this.getUrl('quiz_admin'), { headers: this.getHeader() });
  }

  allAdminResult() {
    return this.call(this.getUrl('all_admin_result'), { headers: this.getHeader() });
  }

  deleteQuiz(id) {
    return this.call(this.getUrl('delete_quiz', id), { method: 'DELETE', headers: this.getHeader() });
  }

  findQuizInMine(value) {
    return this.call(this.getUrl('find_quiz_in_mine', value), { headers: this.getHeader() });
  }

  getMessages() {
    return this.call(this.getUrl('get_messages'), { headers: this.getHeader() });
  }

  getMessage(id) {
    return this.call(this.getUrl('get_message', id), { headers: this.getHeader() });
  }

  postMessage(message) {
    return this.call(this.getUrl('post_message', message), { method: 'POST', headers: this.getHeader(), body: JSON.stringify(message) });
  }

  getClasses() {
    return this.call(this.getUrl('get_classes'), { headers: this.getHeader() });
  }

  postUser(data) {
    return this.call(this.getUrl('post_user'), { headers: this.getHeader(), method: 'POST', body: JSON.stringify(data) });
  }

  postClass(name) {
    return this.call(this.getUrl('post_class'), { headers: this.getHeader(), method: 'POST', body: JSON.stringify({ name }) });
  }

  broadcastQuiz(quizToBroadcast) {
    return this.call(this.getUrl('post_broadcast_quiz'), { headers: this.getHeader(), method: 'POST', body: JSON.stringify(quizToBroadcast) });
  }

  getMyResults() {
    return this.call(this.getUrl('get_my_results'), { headers: this.getHeader() });
  }

  allResult(id) {
    return this.call(this.getUrl('all_result', id));
  }

  fullQuiz(data) {
    return this.call(this.getUrl('post_fullquiz'), { headers: this.getHeader(), method: 'POST', body: JSON.stringify(data) });
  }
}
export default NetworkManager;
