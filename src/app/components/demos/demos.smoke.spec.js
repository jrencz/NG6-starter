import DemosModule from './'

describe('Demos', () => {
  let $componentController;
  let $rootScope;

  beforeEach(window.module(DemosModule));

  beforeEach(inject(($injector) => {
    $rootScope = $injector.get('$rootScope');
    $componentController = $injector.get('$componentController');
  }));

  describe('Controller', () => {
    // controller specs
    let controller;
    beforeEach(() => {
      controller = $componentController('demos', {
        $scope: $rootScope.$new()
      });
    });

    it('has a name property', () => { // erase if removing this.name from the controller
      expect(controller).toHaveMember('name');
    });
  });
});
