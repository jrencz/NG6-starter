const path = require('path');
const srcPath = require('./../../config/srcPath');

const required = name => value => {
  if (!value) {
    return `${ name } is required`;
  }

  return true;
};

const relative = paths => path.resolve(__dirname, ...paths);

const basicComponentFiles = [
  {
    type: 'add',
    path: '{{> fullPath}}/index.js',
    templateFile: relative`./templates/js.hbs`,
    abortOnFail: true,
  },
  {
    type: 'add',
    path: '{{> fullPath}}/{{dashCase name}}.component.js',
    templateFile: relative`./templates/component.js.hbs`,
    abortOnFail: true,
  },
  {
    type: 'add',
    path: '{{> fullPath}}/{{dashCase name}}.html',
    templateFile: relative`./templates/html.hbs`,
    abortOnFail: true,
  },
  {
    type: 'add',
    path: '{{> fullPath}}/{{dashCase name}}.controller.js',
    templateFile: relative`./templates/controller.js.hbs`,
    abortOnFail: true,
  },
  {
    type: 'add',
    path: '{{> fullPath}}/{{dashCase name}}.scss',
    templateFile: relative`./templates/scss.hbs`,
    abortOnFail: true,
  },
];

const conditionalComponentFiles = {
  spec: {
    type: 'add',
    path: '{{> fullPath}}/{{dashCase name}}.spec.js',
    templateFile: relative`./templates/spec.js.hbs`,
    abortOnFail: true,
  },
  specSmoke: {
    type: 'add',
    path: '{{> fullPath}}/{{dashCase name}}.smoke.spec.js',
    templateFile: relative`./templates/smoke.spec.js.hbs`,
    abortOnFail: true,
  },
  e2e: {
    type: 'add',
    path: '{{> fullPath}}/{{dashCase name}}.e2e.js',
    templateFile: relative`./templates/e2e.js.hbs`,
    abortOnFail: true,
  },
  e2eSmoke: {
    type: 'add',
    path: '{{> fullPath}}/{{dashCase name}}.smoke.e2e.js',
    templateFile: relative`./templates/smoke.e2e.js.hbs`,
    abortOnFail: true,
  },
};

const getActionsForConditions = ({
  needSpec,
  needSpecSmoke,
  needEnd2End,
  needEnd2EndSmoke,
}) => {
  const actions = [];

  if (needSpec) {
    actions.push(conditionalComponentFiles.spec);
  }

  if (needSpecSmoke) {
    actions.push(conditionalComponentFiles.specSmoke);
  }

  if (needEnd2End) {
    actions.push(conditionalComponentFiles.e2e);
  }

  if (needEnd2EndSmoke) {
    actions.push(conditionalComponentFiles.e2eSmoke);
  }

  return actions;
};

module.exports = plop => ({
  description: 'Create a new component',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'What is name of new component?',
      validate: required('name'),
    },
    {
      type: 'confirm',
      name: 'routable',
      message: 'Is the component routable?',
      default: false,
    },
    {
      type: 'confirm',
      name: 'needPath',
      message: 'Do you want to specify the path manually (otherwise ' +
      'component will be placed in `components`)',
      default: false,
    },
    {
      type: 'directory',
      name: 'path',
      message: 'Where to put new component?',
      basePath: `./${ srcPath }/app`,
      default: '',
      when: ({needPath}) => needPath,
    },
    {
      type: 'confirm',
      name: 'needSpec',
      message: 'Do you want to generate spec file?',
      default: false,
    },
    {
      type: 'confirm',
      name: 'needSpecSmoke',
      message: 'Do you want to generate smoke spec file?',
      default: false,
      when: ({needSpec}) => needSpec,
    },
    {
      type: 'confirm',
      name: 'needEnd2End',
      message: 'Do you want to generate e2e tests file?',
      default: false,
      when: ({routable}) => routable,
    },
    {
      type: 'confirm',
      name: 'needEnd2EndSmoke',
      message: 'Do you want to generate e2e smoke tests file?',
      default: false,
      when: ({routable, needEnd2End}) => routable && needEnd2End,
    },
  ],
  actions: conditions => {
    plop.addPartial('path',
      '{{#if path}}{{ path }}/{{else}}components/{{/if}}{{ dashCase name }}');
    plop.addPartial('fullPath', `./${ srcPath }/app/{{> path}}`);

    return [
      ...basicComponentFiles,
      ...getActionsForConditions(conditions),
    ];
  },
});
