// 获取url的参数
export const queryString = () => {
  let _queryString = {};
  const _query = window.location.search.substr(1);
  const _vars = _query.split("&");
  _vars.forEach((v, i) => {
    const _pair = v.split("=");
    if (!_queryString.hasOwnProperty(_pair[0])) {
      _queryString[_pair[0]] = decodeURIComponent(_pair[1]);
    } else if (typeof _queryString[_pair[0]] === "string") {
      const _arr = [_queryString[_pair[0]], decodeURIComponent(_pair[1])];
      _queryString[_pair[0]] = _arr;
    } else {
      _queryString[_pair[0]].push(decodeURIComponent(_pair[1]));
    }
  });
  return _queryString;
};

/**
 * 发送http请求
 * @param {*} url
 * @param {*} params
 * @param {*} headers
 * @param {*} method
 */
export const httpUtil = (url, params, headers, method) => {
  return fetch(url, {
    body: params ? JSON.stringify(params) : null, // must match 'Content-Type' header
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, same-origin, *omit
    headers: {
      ...headers,
      "user-agent": "Mozilla/4.0 MDN Example",
      "content-type": "application/json",
      "Access-Control-Allow-Origin": "*"
    },
    method: method, // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, cors, *same-origin
    redirect: "follow", // manual, *follow, error
    referrer: "no-referrer" // *client, no-referrer
  });
};
