(function(){
    'use strict';

    var cmod = angular.module('wwwReferralsApp.controllers', []);

    cmod.controller('LinkListCtlr', ['$scope', 'Restangular', function($scope, Restangular) {
        var ReferralLinks = Restangular.all('links');
        
        $scope.links = [];
        $scope.newLink = {
            title: ''
        };
        $scope.isPosting = false;
        
        function fetchLinks() {
            ReferralLinks.getList().then(function(fetchedLinks){
                $scope.links = fetchedLinks;
            });
        }
        fetchLinks();

        $scope.addLink = function(){
            $scope.isPosting = true;
            ReferralLinks.post($scope.newLink).then(function(){
                fetchLinks();
                $scope.newLink.title = '';
                $scope.isPosting = false;
            }, function(errorResponse){
                $scope.errorMessage = errorResponse.data.title;
                $scope.isPosting = false;
            });
        };

        $scope.editLink = function(linkIndex){
            console.log('edit link at ' + linkIndex);
        };

        $scope.deleteLink = function(linkIndex){
            var toDelete = $scope.links[linkIndex];
            toDelete.remove().then(function(){
                fetchLinks();
            }, function(errorResponse){
                console.log(errorResponse.data);
            });
        };

        $scope.hitLink = function(linkIndex){
            $scope.links[linkIndex].hits++;
        };
    }]);

}());