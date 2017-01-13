# Web application starter

Web application starter for single page apps written in [Angular](https://angularjs.org) 1.x using latest JS syntax
and component-based approach.

Inspired by [NG6-starter](https://angularclass.github.io/NG6-starter/) by [AngularClass](https://angularclass.com)

# Table of Contents

- [Walkthrough](#walkthrough)
  - [Dependencies](#dependencies)
    - [Node](#node)
      - [Keeping npm packages local](#keeping-npm-packages-local)
      - [Dependency management](#dependency-management)
    - [Java](#java)
  - [Build & Development System](#build--development-system)
  - [Project integrity](#project-integrity)
    - [Shared editor configuration](#shared-editor-configuration)
    - [Static code analysis](#static-code-analysis)
      - [ESLint plugins worth describing](#eslint-plugins-worth-describing)
    - [Final thoughts on integrity](#final-thoughts-on-integrity)
  - [Testing](#testing)
  - [Code generation](#code-generation)
- [FAQ](#faq)
- [File Structure](#file-structure)

# Walkthrough

## Dependencies

### Node

The build system is meant to be run on node 5+ because some scripts are written using ES2015+ syntax. It is purely for
convenience, but you should use the latest & greatest Node anyway. Or at least the [most recent LTS](https://github.com/nodejs/LTS)
version of it.

It is highly recommended for you to install [`nvm`](https://github.com/creationix/nvm) (or [`nvm-windows`](https://github.com/coreybutler/nvm-windows))
to manage Node versions installed on your machine. Without it you'll struggle with Node updates every time the team
decides to update.

It is also recommended to install latest version of `npm` itself: `npm update -g npm`.

_Related config files_:
- [.nvmrc](./.nvmrc)

_Related commands_:
- `nvm use`

#### Keeping npm packages local

Starter was developed with "no global dependencies but Node itself" in mind. This means that as long as you stick to
this readme you should not be required to have any globally installed (which means: don't do `npm install -g *` even
if package readme tells you to.

Some packages, like [`gulp`](https://www.npmjs.com/package/gulp) advise you to install them globally for your current
version of Node. This is basically a poor solution once you want to develop on the latest version of Node since on each
update you have to [reinstall packages](https://github.com/creationix/nvm#migrating-global-packages-while-installing)
from the previous version which is easy to be forgotten about and thus inconvenient.

Most such packages can be installed locally, because there's nothing (but the fact that they are intended to be used in
CLI) keeps them from being local. To handle that this starter defines an [`npm script`](https://docs.npmjs.com/misc/scripts)
for each significant CLI tool we install via npm.

#### Dependency management

Starter is equipped with [`npm-check-updates`](https://www.npmjs.com/package/npm-check-updates) which finds stale
dependencies (run `npm run dependencies:check-updates`) and updates them (run `npm run dependencies:update`).

### Java

Java is used by [`Protractor`](https://github.com/angular/protractor) to run End-to-End tests with [`Selenium`](http://www.seleniumhq.org)
browser automation tool. It's an optional dependency but if you wish to run e2e tests yourself please make sure Java 8
(jdk 1.8) is there on your machine.


## Build & Development System
This starter uses NPM scripts (most of the times) for wrapping various CLI tools, Gulp (where suitable), and Webpack
together for its build system.

Vast majority of tasks are performed using various Front-End CLI tools

- [`Webpack`](https://webpack.github.io) handles all file-related concerns:
  - Loading JS files as modules
  - Loading HTML files as modules
  - _Pre-_ and _post-_processing stylesheets via [`sass`](https://github.com/jtangelder/sass-loader) and
    [`postcss`](https://github.com/postcss/postcss-loader) [loaders](https://webpack.github.io/docs/loaders.html)
  - Refreshing the browser and rebuilding on file changes (with [`browsersync`](https://www.browsersync.io)))
  - Hot module replacement for processed stylesheets
  - Bundling the app
  - Loading all modules

  _Related config files_:
  - [common webpack config](./webpack.config.js)
  - [dev-specific webpack config](./webpack.dev.config.js)
  - [distribution-specific webpack config](./webpack.dist.config.js)

  _Related commands_:
  - `npm start`
  - `npm run build`

- [`Babel`](https://babeljs.io) handles transformation of latest JS syntax into something today's browsers can
understand. [`babel-preset-env`](https://github.com/babel/babel-preset-env) takes care of what has to be transpiled
according to the configuration provided in [`browserslist`](https://github.com/ai/browserslist) format.

  _Related config files_:
  - [.babelrc](./.babelrc)
  - [browserslist](./browserslist)

  _Related commands_:
  - `npm run info:supported-browsers`

- [`Browsersync`](https://www.browsersync.io) is used to establish an HTTP server to serve the bundled application in
development (and hot-replace modules where possible as you develop).

  _Related config files_:
  - [bs-config.js](./bs-config.js)

  _Related commands_:
  - `npm run serve`

- [`Sass`](http://sass-lang.com) (technically: [`node-sass`](https://www.npmjs.com/package/node-sass) which is way
faster than the original Ruby Sass) is used to process authored stylesheets (written as `*.scss`) into browser-suitable
CSS

  _Related config files_:
  - [sass.conf.js](./sass.conf.js)

- [`PostCSS`](http://postcss.org) is used to process that CSS even further (with [postcss plugins](http://postcss.parts)
like [`autoprefixer`](https://github.com/postcss/autoprefixer) for performing CSS-to-CSS manipulations).

  _Related config files_:
  - [.postcssrc](./.postcssrc)
  - [browserslist](./browserslist)

  _Related commands_:
  - `npm run info:supported-browsers`

- [`npm script`](https://docs.npmjs.com/misc/scripts) are used to invoke all other tools to keep them local. (See [keeping npm packages local](#keeping-npm-packages-local))

  _Related config files_:
  - [package.json](./package.json)

- [`Gulp`](http://gulpjs.com) is here just for convenience. It does nothing important in particular but it's there
because some tools (luckily: not very many of them) are available only as gulp plugins. Unreleased, upcoming
[gulp v4](https://github.com/gulpjs/gulp/tree/4.0) is used.

  _Related config files_:
  - [gulpfile.babel.js](./gulpfile.babel.js)

- [`localdev`](https://github.com/jrencz/localdev) provides a way to facilitate development of both the project and its
dependencies installed via NPM.

  _Related config files_:
  - [localdev.config.json](./localdev.config.json)

  _Related commands_:
  - `npm run maintenance:localstart`
  - `npm run maintenance:locallink`

## Project integrity

### Shared editor configuration

- [`.editorconfig`](http://editorconfig.org) is used to ensure editor/IDE settings consistency.

  _Related config files_:
  - [.editorconfig](./.editorconfig)

### Static code analysis

- [`ESLint`](http://eslint.org) takes care of JS code quality

  _Related config files_:
  - [ESLint config for authored code](./.eslintrc.js)
  - [ESLint config for authored specs](./.eslintrc-spec.js)
  - [ESLint config for authored end-to-end tests](./.eslintrc-e2e.js)
  - [.eslintignore](./.eslintignore)

  _Related commands_:
  - `npm run lint:source`
  - `npm run lint:specs`
  - `npm run lint:e2e`

- [`Stylelint`](http://stylelint.io) handles styles (SCSS).

  _Related config files_:
  - [.stylelintrc](./.stylelintrc)

  _Related commands_:
    - `npm run lint:styles`

- [`lintspaces`](https://www.npmjs.com/package/lintspaces) checks whether files conform with `.editorconfig` (apart from
integrating with your editor of choice)

  _Related config files_:
  - [.editorconfig](./.editorconfig)

  _Related commands_:
    - `npm run lint:editorconfig`

#### ESLint plugins worth describing

- [`eslint-plugin-spellcheck`](https://github.com/aotaduy/eslint-plugin-spellcheck) takes care of finding typos in JS
code

### Final thoughts on integrity

If `.editorconfig`/`.eslintrc`/`.stylelintrc` has no way to express it then feel free to write it as you want. Only
automation is privileged to reproach you about how you write code. Note that it's more than worth to encode each rule
a team wants to obey into a linter rule so no one will ever forget about it.


## Testing

There are 2 independent dimensions of testing built in into this starter:
- testing level (unit/end-to-end)
- suites ([smoketests](http://softwaretestingfundamentals.com/smoke-testing/) suite and in-depth suite)

Code is tested in project on 2 levels:
- __unit__ (run with [`Karma`](https://karma-runner.github.io/latest/index.html) runner using [`Mocha`](http://mochajs.org/)
    as testing framework and [`Chai`](http://chaijs.com/) as assertion library) - ensures business of tested
component or service logic is ok.
- __end-to-end__ (run with [`Protractor`](https://github.com/angular/protractor), currently with [`Jasmine`](https://jasmine.github.io)
which is a default) - ensures application running in browser works as intended.

Both those levels are prepared to run multiple suites.

_Related config files_:
- [test entry point for Karma](./spec.bundle.js)
- [smoke-test entry point for Karma](./spec-smoke.bundle.js)
- [protractor.conf.js](./protractor.conf.js)

_Related commands_:
- `npm run test` - runs entire test suite once
- `npm run test:smoke` - runs smoketests once
- `npm run test:unit` - runs specs
- `npm run test:unit:smoke` - runs spec smoketests
- `npm run test:e2e` - runs end-to-end tests
- `npm run test:e2e:smoke` - runs end-to-end smoketests
- `npm maintenance:webdriver-update`

## Code generation

[`plop`](https://github.com/amwmedia/plop) is used as interactive code generation CLI. Each repetitive pattern should
eventually be turned into [plop generator](https://github.com/amwmedia/plop#plopsetgeneratorname-config)

_Related config files_:
- [plopfile.js](./plopfile.js)

_Related commands_:
- `npm run generate` generator CLI with interactive subject selection
- `npm run generate:component` interactive generator for a component


# FAQ

## How to get the project running

Run `npm start`.

It will do whatever it's needed to build and serve the project for you.

## How do I run tests

Run `npm test`

## How do I know what can I run?

Run `npm run`

It will list all runnable scripts.

_Note:_ It's highly recommended to use [`npm completion`](https://docs.npmjs.com/cli/completion). If you use ZSH you
may choose [`zsh-better-npm-completion`](https://github.com/lukechilds/zsh-better-npm-completion)


# File Structure
We use a componentized approach with NG6. This will be the eventual standard (and particularly helpful, if using
Angular's new router) as well as a great way to ensure a tasteful transition to Angular 2, when the time is ripe.
Everything--or mostly everything, as we'll explore (below)--is a component. A component is a self-contained
concern--may it be a feature or strictly-defined, ever-present element of the UI (such as a header, sidebar, or
footer). Also characteristic of a component is that it harnesses its own stylesheets, templates, controllers, routes,
services, and specs. This encapsulation allows us the comfort of isolation and structural locality. Here's how it
looks:
```
src
⋅⋅app/
⋅⋅⋅⋅app.js * app entry file
⋅⋅⋅⋅app.html * app template
⋅⋅⋅⋅common/ * functionality pertinent to several components propagate into this directory
⋅⋅⋅⋅components/ * where components live
⋅⋅⋅⋅⋅⋅components.js * components entry file
⋅⋅⋅⋅⋅⋅home/ * home component
⋅⋅⋅⋅⋅⋅⋅⋅home.js * home entry file (routes, configurations, and declarations occur here)
⋅⋅⋅⋅⋅⋅⋅⋅home.component.js * home "directive"
⋅⋅⋅⋅⋅⋅⋅⋅home.controller.js * home controller
⋅⋅⋅⋅⋅⋅⋅⋅home.scss * home styles
⋅⋅⋅⋅⋅⋅⋅⋅home.html * home template
⋅⋅⋅⋅⋅⋅⋅⋅home.spec.js * home specs (for entry, component, and controller)
⋅⋅⋅⋅⋅⋅⋅⋅home.smoke.spec.js * home smoketests (unit)
⋅⋅⋅⋅⋅⋅⋅⋅home.e2e.js * home end-to-end tests
⋅⋅⋅⋅⋅⋅⋅⋅home.smoke.e2e.js * home end-to-end smoketests
```
