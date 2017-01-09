class RemoteConfigurationOfComponentsController {
  constructor() {
    'ngInject';

    this.name = 'remoteConfigurationOfComponents';
    this.defaultValue = 'default value of the input field';
  }

  externalComponentClicked() {
    this.inputValue = this.defaultValue;
  }
}

export default RemoteConfigurationOfComponentsController;
