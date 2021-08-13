import Cookies from 'js-cookie';

export function restoreCSRF() {   // get XSRF-TOKEN cookie (only in development env)
  return csrfFetch('/api/csrf/restore');
}

export async function csrfFetch(url, options = {}) {

  options.method = options.method || 'GET';      // options.method is GET if no method
  options.headers = options.headers || {};      // options.headers is empty object if no headers

  if (options.method.toUpperCase() !== 'GET') {     // if not GET, set headers
    options.headers['Content-Type'] = options.headers['Content-Type'] || 'application/json';
    options.headers['XSRF-Token'] = Cookies.get('XSRF-TOKEN');
  }

  const res = await window.fetch(url, options);      // default window fetch

  if (res.status >= 400) throw res;     // error if res status code is 400 or above

  return res;     // if under 400, return response to next promise chain
}
