import cookie from 'react-cookie';

function requestHeaders(headers = {}) {
  headers['Content-type'] = 'application/json';
  headers['Accept'] = 'application/json';

  const token = cookie.load('sessionAuthenticated');

  if (token) {
    headers['Authorization'] = token;
  }

  return headers;
}

export default requestHeaders;
