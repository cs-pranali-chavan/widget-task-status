/* Copyright start
    MIT License
    Copyright (c) 2026 Fortinet Inc
  Copyright end */
'use strict';
(function () {
  angular
    .module('cybersponse')
    .controller('editTaskStatus100Ctrl', editTaskStatus100Ctrl);

  editTaskStatus100Ctrl.$inject = ['$scope', '$uibModalInstance', 'config', 'FormEntityService'];

  function editTaskStatus100Ctrl($scope, $uibModalInstance, config, FormEntityService) {
    $scope.cancel = cancel;
    $scope.save = save;
    $scope.config = config;

    function loadAttributes() {
      $scope.fields = [];
      $scope.fieldsArray = [];
      $scope.jsonFields = [];
      var entity = FormEntityService.get();
      entity.loadFields().then(function () {
        for (var key in entity.fields) {
          if (entity.fields[key].type === 'object' || entity.fields[key].type === 'text') {
            $scope.jsonFields.push(entity.fields[key]);
          }
        }
        $scope.fields = entity.getFormFields();
        angular.extend($scope.fields, entity.getRelationshipFields());
        $scope.fieldsArray = entity.getFormFieldsArray();
      });
    };

    function init() {
      $scope.header = $scope.config.title ? 'Edit widget' : 'Add widget';
      loadAttributes();
    }

    init();

    function cancel() {
      $uibModalInstance.dismiss('cancel');
    }

    function save() {
      $uibModalInstance.close($scope.config);
    }

  }
})();
