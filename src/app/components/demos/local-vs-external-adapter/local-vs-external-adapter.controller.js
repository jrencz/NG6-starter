class LocalVsExternalAdapterController {
  constructor() {
    'ngInject';

    this.name = 'localVsExternalAdapter';
    this.defaultValue = 'default value of the input field';
  }

  externalComponentClicked() {
    this.inputValue = this.defaultValue;
  }
}

export default LocalVsExternalAdapterController;
