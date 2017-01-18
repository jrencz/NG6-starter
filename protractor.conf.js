const {spawn} = require('child_process');

const srcPath = require('./config/srcPath');

let server;

exports.config = {
  baseUrl: `http://localhost:${
    process.env.PORT ||
    process.env.npm_package_config_port
  }`,
  specs: [
    `${ srcPath }/**/**.e2e.js`,
  ],
  suites: {
    smoke: `${ srcPath }/**/**.smoke.e2e.js`,
    all: `${ srcPath }/**/**.e2e.js`,
  },
  suite: 'smoke',
  multiCapabilities: [
    {
      browserName: 'chrome',
    },
    // Firefox has some problem with webdriver right now.
    // {
    //   browserName: 'firefox',
    // }
  ],
  allScriptsTimeout: 30000,
  beforeLaunch: () => new Promise((resolve, reject) => {
    console.log('Spawning server');

    server = spawn('npm', ['run', 'serve']);

    server.stdout.pipe(process.stdout);
    server.stdout.on('data', data => {
      const dataString = data.toString();

      if (dataString.includes('Module build failed:')) {
        server.kill();
        reject();
      }

      if (dataString.includes('bundle is now VALID.')) {
        console.log('Preparation done. Starting Protractor.');
        resolve();
      }
    });

    server.on('error', error => {
      console.log('Error preparing server. Killing server');

      server.kill();
      reject(error);
    });
  }),
  afterLaunch: () => {
    console.log('Tests done. Killing server');

    server.kill();
  },
};
