describe('About Route', () => {

  // Before each test
  beforeEach(() => {

    // Navigate to about component
    browser.get('/about');
  });

  // About component should be visible
  it('should be visible', () => {

    // Expect home component to be visible
    expect(element(by.tagName('about')).isDisplayed()).toBe(true);
  });
});
