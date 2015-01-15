(function(){
    'use strict';

    var cmod = angular.module('wwwReferralsApp.controllers', []);

    cmod.controller('LinkListCtlr', ['$scope', 'Restangular', function($scope, Restangular) {
        $scope.links = [];
        Restangular.all('links').getList().then(function(fetchedLinks){
            $scope.links = fetchedLinks;
        });
    }]);

}());