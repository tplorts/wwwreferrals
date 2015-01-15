(function(){
    'use strict';

    var cmod = angular.module('wwwReferralsApp.controllers', []);

    cmod.controller('LinkListCtlr', ['$scope', 'Restangular', function($scope, Restangular) {
        var ReferralLinks = Restangular.all('links');
        
        $scope.links = {};
        $scope.newLink = {
            title: ''
        };
        $scope.isPosting = false;
        $scope.isEditing = {};
        $scope.ordering = {
            predicate: '-hits'
        };
        
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

        $scope.editLink = function(linkId){
            var toEdit = _.findWhere($scope.links, {id: linkId});
            toEdit.pendingTitle = toEdit.title;
            $scope.isEditing[linkId] = true;
        };

        $scope.commitLinkEdit = function(linkId){
            $scope.isEditing[linkId] = false;
            var toUpdate = _.findWhere($scope.links, {id: linkId});
            if (toUpdate.title == toUpdate.pendingTitle)
                return;
            toUpdate.patch({title: toUpdate.pendingTitle}).then(function(updatedLink){
                $scope.links[linkId] = updatedLink;
            }, function(errorResponse){
                console.log(errorResponse.data);
            });
        };

        $scope.deleteLink = function(linkId){
            var toDelete = _.findWhere($scope.links, {id: linkId});
            toDelete.remove().then(function(){
                fetchLinks();
            }, function(errorResponse){
                console.log(errorResponse.data);
            });
        };

        $scope.hitLink = function(linkId){
            var toHit = _.findWhere($scope.links, {id: linkId});
            toHit.hits++;
        };
    }]);

}());