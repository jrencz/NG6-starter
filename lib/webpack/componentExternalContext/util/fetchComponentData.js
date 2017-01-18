const findComponents = require('./findComponents');
const fetch = require('node-fetch');
const uriTemplates = require('uri-templates');

const fetchComponentsData = ({
  componentsPattern,
  endpointUriTemplate,
}) => {
  const components = findComponents({
    componentsPattern,
  });

  return fetch(uriTemplates(endpointUriTemplate).fillFromObject({
    params: {components},
  }))
    .then(response => response.json());
};

module.exports = fetchComponentsData;
