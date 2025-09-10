/* Copyright start
  Copyright (C) 2008 - 2025 Fortinet Inc.
  All rights reserved.
  FORTINET CONFIDENTIAL & FORTINET PROPRIETARY SOURCE CODE
  Copyright end */
'use strict';
(function () {
  angular
    .module('cybersponse')
    .controller('editTaskStatus100Ctrl', editTaskStatus100Ctrl);

  editTaskStatus100Ctrl.$inject = ['$scope', '$uibModalInstance', 'config', 'widgetUtilityService', '$timeout', 'appModulesService', 'modelMetadatasService', 'Entity', 'FormEntityService'];

  function editTaskStatus100Ctrl($scope, $uibModalInstance, config, widgetUtilityService, $timeout, appModulesService, modelMetadatasService, Entity, FormEntityService) {
    $scope.cancel = cancel;
    $scope.save = save;
    $scope.config = config;

    function _handleTranslations() {
      let widgetNameVersion = widgetUtilityService.getWidgetNameVersion($scope.$resolve.widget, $scope.$resolve.widgetBasePath);

      if (widgetNameVersion) {
        widgetUtilityService.checkTranslationMode(widgetNameVersion).then(function () {
          $scope.viewWidgetVars = {
            // Create your translating static string variables here
          };
          $scope.header = $scope.config.title ? 'Edit widget' : 'Add widget';
          loadAttributes();
        });
      } else {
        $timeout(function () {
          $scope.cancel();
        });
      }
    }

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
      // To handle backward compatibility for widget
      _handleTranslations();
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
