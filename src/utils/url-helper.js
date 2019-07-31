function addParamsToUrl(url, params) {
  const endpointUrl = url;
  const paramsKeys = Object.keys(params);
  const appendParams = paramsKeys.reduce((accumulator, key, index) => {
    return index == 1
      ? `${accumulator}=${params[accumulator]}&${key}=${params[key]}`
      : `${accumulator}&${key}=${params[key]}`
  });
  return `${endpointUrl}?${appendParams}`
}

module.exports = {
  addParamsToUrl
}