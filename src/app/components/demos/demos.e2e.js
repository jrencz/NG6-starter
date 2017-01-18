describe('Demos Route', () => {

  // Before each test
  beforeEach(() => {

    // Navigate to demos component
    browser.get('/demos');
  });

  // Home component should be visible
  it('should be visible', () => {

    // Expect home component to be visible
    expect(element(by.tagName('n6s-home')).isDisplayed()).toBe(true);
  });

  // Link to Home navigates to Home Component
  it('should navigate to Home if Home link clicked', () => {

    // Click navigation to Home route
    element(by.css('[ui-sref="home"]'))
      .click()
      .then(() => {

        // Expect Demos component to be not be present
        expect(element(by.tagName('n6s-demos')).isPresent()).toBe(false);
      });
  });

});
