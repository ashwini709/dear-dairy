import cookie from 'react-cookie';

function requestHeaders(headers = {}) {
  const token = cookie.load('sessionAuthenticated');

  headers['Authorization'] = token;
  return headers;
}

export default requestHeaders;
