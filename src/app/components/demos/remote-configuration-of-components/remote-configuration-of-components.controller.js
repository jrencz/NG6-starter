/**
 *
 */
class RemoteConfigurationOfComponentsController {
  /**
   * @returns {undefined}
   */
  $onInit() {
    this.name = 'remoteConfigurationOfComponents';
    this.defaultValue = 'default value of the input field';
  }

  /**
   * @returns {undefined}
   */
  externalComponentClicked() {
    this.inputValue = this.defaultValue;
  }
}

export default RemoteConfigurationOfComponentsController;
