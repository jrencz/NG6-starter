/**
 *
 */
class StandaloneComponentController {
  /**
   *
   */
  constructor() {
    'ngInject';

    this.name = 'standaloneComponent';
    this.defaultValue = 'default value of the input field';
  }

  /**
   * @returns {undefined}
   */
  externalComponentClicked() {
    this.inputValue = this.defaultValue;
  }
}

export default StandaloneComponentController;
