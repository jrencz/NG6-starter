/**
 *
 */
class LocalVsExternalAdapterController {
  /**
   * @returns {undefined}
   */
  $onInit() {
    this.name = 'localVsExternalAdapter';
    this.defaultValue = 'default value of the input field';
  }

  /**
   * @returns {undefined}
   */
  externalComponentClicked() {
    this.inputValue = this.defaultValue;
  }
}

export default LocalVsExternalAdapterController;
