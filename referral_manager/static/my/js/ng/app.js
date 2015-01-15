(function(){
    'use strict';

    var wwwReferralsApp = angular.module('wwwReferralsApp', [
        'wwwReferralsApp.controllers'
    ]);

    wwwReferralsApp.config(
        ['$interpolateProvider', function($interpolateProvider) {
            $interpolateProvider.startSymbol('[[');
            $interpolateProvider.endSymbol(']]');
        }]
    );

}());
