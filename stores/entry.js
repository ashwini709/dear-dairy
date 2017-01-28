const endpoint = 'http://127.0.0.1:5000/entry/';

class EntryStore {
  find(query) {
    const queryParams = [];
    let url = endpoint;

    if (query) {
      url += query;
    }

    return fetch(url).then((response) => {
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

const entryStore = new EntryStore();

export default entryStore;
