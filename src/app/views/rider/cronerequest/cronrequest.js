mobiscroll.settings = {
  theme: 'ios',
  themeVariant: 'light',
  display: 'bubble'
};

angular
  .module('demoApp', ['mobiscroll-calendar', 'mobiscroll-form'])
  .controller('demoController', ['$scope', function ($scope) {

      var now = new Date();

      $scope.mobile = now;
      $scope.desktop = now;
      $scope.header = now;
      $scope.nonform = now;
      $scope.external = now;

      $scope.mobileSettings = {
          controls: ['calendar', 'time']
      };

      $scope.nonformSettings = {
          controls: ['calendar', 'time']
      };

      $scope.desktopSettings = {
          controls: ['calendar', 'time'],
          touchUi: false
      };

      $scope.headerSettings = {
          controls: ['calendar', 'time'],
          headerText: '{value}'
      };

      $scope.externalSettings = {
          controls: ['calendar', 'time'],
          showOnTap: false,
          showOnFocus: false
      };

  }]);
