describe('Demos Route', () => {

  // Before each test
  beforeEach(() => {

    // Navigate to demos component
    browser.get('/demos');
  });

  // Link to Home navigates to Home Component
  it('should navigate to Home if Home link clicked', () => {

    // Click navigation to Home route
    element(by.css('[ui-sref="home"]'))
      .click()
      .then(() => {

        // Expect Demos component to be not be present
        expect(element(by.tagName('demos')).isPresent()).toBe(false);
      })
  });

});
