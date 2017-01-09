describe('Demos Route', () => {

  // Before each test
  beforeEach(() => {

    // Navigate to demos component
    browser.get('/demos');
  });

  // Demos component should be visible
  it('should be visible', () => {

    // Expect home component to be visible
    expect(element(by.tagName('demos')).isDisplayed()).toBe(true);
  });
});
