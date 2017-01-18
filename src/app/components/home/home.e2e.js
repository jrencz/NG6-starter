describe('Home Route', () => {

  // Before each test
  beforeEach(() => {

    // Navigate to home component
    browser.get('/');
  });

  // Home component should be visible
  it('should be visible', () => {

    // Expect home component to be visible
    expect(element(by.tagName('n6s-home')).isDisplayed()).toBe(true);
  });

  // Link to Demos navigates to Demos Component
  it('should navigate to Demos if Demos link clicked', () => {

    // Click navigation to Demos route
    element(by.css('[ui-sref="demos"]'))
      .click()
      .then(() => {

        // Expect Home component to not be present
        expect(element(by.tagName('n6s-home')).isPresent()).toBe(false);
      });
  });

});
