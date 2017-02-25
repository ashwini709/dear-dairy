import requestHeaders from '../utils/request-headers.js';

class MakeRequestStore {
  find(url, options) {
    options.headers = requestHeaders(options.headers);

    return fetch(url, options).then((response) => {
      if (response.status < 400) {
        return response.json();
      }

      if (response.headers.get('content-type').indexOf('text/html') != -1) {
        return response.text().then((text) => {
          return Promise.reject(text);
        });
      }

      return response.json().catch((parseError) => {
        console.warn('Server returned non-JSON response...', parseError);

        return response.statusText;
      }).then((error) => {
        return Promise.reject(error);
      });
    }).catch((error) => {
      const errorType = 'networking';

      return Promise.reject({ errorType });
    });
  }
}

const makeRequestStore = new MakeRequestStore();

export default makeRequestStore;
