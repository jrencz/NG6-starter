describe('About Route', () => {

  // Before each test
  beforeEach(() => {

    // Navigate to about component
    browser.get('/about');
  });

  // Link to Home navigates to Home Component
  it('should navigate to Home if Home link clicked', () => {

    // Click navigation to Home route
    element(by.css('[ui-sref="home"]'))
      .click()
      .then(() => {

        // Expect About component to be not be present
        expect(element(by.tagName('about')).isPresent()).toBe(false);
      })
  });

});
