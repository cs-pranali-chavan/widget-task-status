/* Copyright start
    MIT License
    Copyright (c) 2026 Fortinet Inc
  Copyright end */
'use strict';
(function () {
  angular
    .module('cybersponse')
    .controller('taskStatus100Ctrl', taskStatus100Ctrl);

  taskStatus100Ctrl.$inject = ['$rootScope', '$scope', 'FormEntityService', 'widgetBasePath'];

  function taskStatus100Ctrl($rootScope, $scope, FormEntityService, widgetBasePath) {

    $scope.currentTheme = $rootScope.theme.id;
    $scope.taskData = [];
    $scope.widgetBasePath = widgetBasePath;
    var watchers = [];

    function init() {
      createData();
      watchers.push($scope.$on('template:refresh', debounce(function (e, updatedFields) {
        // updtaedFields is array of fields with updated values
        let updatedField = updatedFields.find((field) => field.name === $scope.config.jsonField);
        if (updatedField) {
          $scope.taskData = updatedField.value.data || [];
        }
      }, 500)));
      watchers.push($scope.$on('csFields:viewValueChange', debounce(function (e, updatedFields) {
        // updatedFields contains {entity, field }  with updated value in string format. 
        let updatedField = updatedFields.field && updatedFields.field.name === $scope.config.jsonField ? updatedFields.field : null;
        if (updatedField) {
          $scope.taskData = angular.isString(updatedField.value) ? JSON.parse(updatedField.value).data : updatedField.value.data || [];
        }
      }, 1000)));
    }

    function createData() {
      var entity = FormEntityService.get();
      let selectedField = $scope.config.jsonField;
      if(entity.fields[selectedField].value){
          $scope.taskData = angular.isString(entity.fields[selectedField].value) ? JSON.parse(entity.fields[selectedField].value).data : entity.fields[selectedField].value.data || [];
          $scope.taskIcons = {
            'queued' : `${$scope.widgetBasePath}widgetAssets/icons/queued.svg`,
            'completed' : `${$scope.widgetBasePath}widgetAssets/icons/completed.svg`,
            'inProgress' : `${$scope.widgetBasePath}widgetAssets/icons/in-progress.svg`,
          }
      }
    }
    // debounce function to delay the frequent calls from fields changes
    function debounce(func, delay) {
      let timeout;
      return function () {
        const context = this;
        const args = arguments;
        const later = function () {
          timeout = null;
          func.apply(context, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, delay);
      };
    }

    $scope.$on('$destroy', function() {
      watchers.forEach((watcher)=> {
        watcher();
        watcher = null;
      })
    })

    init();
  }
})();
