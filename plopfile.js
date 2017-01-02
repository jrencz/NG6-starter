const inquirer = require('inquirer-directory');
const srcPath = require('./config/srcPath');

function required(name) {

  return (value) => {
    if (!value) {
      return `${ name } is required`;
    }

    return true;
  }
}

module.exports = (plop) => {

  plop.addPrompt('directory', inquirer);

  plop.setGenerator('component', {
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
        message: 'Do you want to specify the path manually (otherwise component will be placed in `components`)',
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
    actions: ({
      needSpec,
      needSpecSmoke,
      needEnd2End,
      needEnd2EndSmoke,
    }) => {
      plop.addPartial('path', '{{#if path}}{{ path }}/{{else}}components/{{/if}}{{ dashCase name }}');
      plop.addPartial('fullPath', `./${ srcPath }/app/{{> path}}`);

      const actions = [
        {
          type: 'add',
          path: '{{> fullPath}}/{{dashCase name}}.js',
          templateFile: './templates/component/js.hbs',
          abortOnFail: true,
        },
        {
          type: 'add',
          path: '{{> fullPath}}/{{dashCase name}}.component.js',
          templateFile: './templates/component/component.js.hbs',
          abortOnFail: true,
        },
        {
          type: 'add',
          path: '{{> fullPath}}/{{dashCase name}}.html',
          templateFile: './templates/component/html.hbs',
          abortOnFail: true,
        },
        {
          type: 'add',
          path: '{{> fullPath}}/{{dashCase name}}.controller.js',
          templateFile: './templates/component/controller.js.hbs',
          abortOnFail: true,
        },
        {
          type: 'add',
          path: '{{> fullPath}}/{{dashCase name}}.scss',
          templateFile: './templates/component/scss.hbs',
          abortOnFail: true,
        },
      ];

      if (needSpec) {
        actions.push({
          type: 'add',
          path: '{{> fullPath}}/{{dashCase name}}.spec.js',
          templateFile: './templates/component/spec.js.hbs',
          abortOnFail: true,
        });
      }

      if (needSpecSmoke) {
        actions.push({
          type: 'add',
          path: '{{> fullPath}}/{{dashCase name}}.smoke.spec.js',
          templateFile: './templates/component/smoke.spec.js.hbs',
          abortOnFail: true,
        });
      }

      if (needEnd2End) {
        actions.push({
          type: 'add',
          path: '{{> fullPath}}/{{dashCase name}}.e2e.js',
          templateFile: './templates/component/e2e.js.hbs',
          abortOnFail: true,
        });
      }

      if (needEnd2EndSmoke) {
        actions.push({
          type: 'add',
          path: '{{> fullPath}}/{{dashCase name}}.smoke.e2e.js',
          templateFile: './templates/component/smoke.e2e.js.hbs',
          abortOnFail: true,
        });
      }

      return actions;
    }
  });
};
