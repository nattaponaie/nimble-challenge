import normalize from 'json-api-normalizer';
import {
  get,
  head,
} from 'lodash';
import build from 'redux-object';

const formatResponse = (json) => {
  const data = get(json, 'data');
  if (!data) {
    return null;
  }
  const normalizeJson = normalize(data);
  return normalizeJson;
};

const formatJson = (normalizeJson) => {
  const result = Object.keys(normalizeJson).reduce((previous, key) => {
    const resources = normalizeJson[key];
    const buildResources = Object.keys(resources).reduce((init, id) => {
      const tmp = build(normalizeJson, key, id);
      init.push(tmp);
      return init;
    }, []);
    const newObj = {};
    newObj[key] = buildResources.length === 1 ? head(buildResources) : buildResources;
    return {
      ...previous,
      ...newObj,
    };
  }, {});

  return result;
};

export {
  formatResponse,
  formatJson,
};
