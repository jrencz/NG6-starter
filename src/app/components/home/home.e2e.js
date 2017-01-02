describe('Home Route', () => {

  // Before each test
  beforeEach(() => {

    // Navigate to home component
    browser.get('/');
  });


  // Home component should be visible
  it('should be visible', () => {

    // Expect home component to be visible
    expect(element(by.tagName('home')).isDisplayed()).toBe(true);
  });

  // Link to About navigates to About Component
  it('should navigate to About if About link clicked', () => {

    // Click navigation to About route
    element(by.css('[ui-sref="about"]'))
      .click()
      .then(() => {

        // Expect Home component to not be present
        expect(element(by.tagName('home')).isPresent()).toBe(false);
      })
  });

});
