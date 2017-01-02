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
        when: answers => answers.needPath,
      }
    ],
    actions: () => {
      plop.addPartial('path', '{{#if path}}{{ path }}/{{else}}components/{{/if}}{{ dashCase name }}');
      plop.addPartial('fullPath', `./${ srcPath }/app/{{> path}}`);

      return [
        {
          type: 'add',
          path: '{{> fullPath}}/{{dashCase name}}.js',
          templateFile: './templates/component/component.js',
          abortOnFail: true,
        },
        {
          type: 'add',
          path: '{{> fullPath}}/{{dashCase name}}.component.js',
          templateFile: './templates/component/component.component.js',
          abortOnFail: true,
        },
        {
          type: 'add',
          path: '{{> fullPath}}/{{dashCase name}}.html',
          templateFile: './templates/component/component.html',
          abortOnFail: true,
        },
        {
          type: 'add',
          path: '{{> fullPath}}/{{dashCase name}}.controller.js',
          templateFile: './templates/component/component.controller.js',
          abortOnFail: true,
        },
        {
          type: 'add',
          path: '{{> fullPath}}/{{dashCase name}}.scss',
          templateFile: './templates/component/component.scss',
          abortOnFail: true,
        },
        {
          type: 'add',
          path: '{{> fullPath}}/{{dashCase name}}.spec.js',
          templateFile: './templates/component/component.spec.js',
          abortOnFail: true,
        },
      ]
    }
  });
};
