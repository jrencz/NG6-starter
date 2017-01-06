class AboutController {
  constructor() {
    this.name = 'about';
    this.standaloneComponentDemoInputDefaultValue =
      'default value of the input field';
  }

  externalComponentClicked() {
    this.standaloneComponentDemoInputValue =
      this.standaloneComponentDemoInputDefaultValue;
  }
}

export default AboutController;
