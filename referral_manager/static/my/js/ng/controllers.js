(function(){
    'use strict';

    var cmod = angular.module('wwwReferralsApp.controllers', []);

    function LinkListCtlr($scope) {
        $scope.theWord = 'Hej';
    }
    cmod.controller('LinkListCtlr', ['$scope', LinkListCtlr]);

}());