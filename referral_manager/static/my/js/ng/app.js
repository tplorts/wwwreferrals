(function(){
    'use strict';

    var wwwReferralsApp = angular.module('wwwReferralsApp', [
        'ngRoute',
        'restangular',
        'wwwReferralsApp.controllers'
    ]);

    wwwReferralsApp.config(
        ['$interpolateProvider', 'RestangularProvider',
         function($interpolateProvider, RestangularProvider) {
             $interpolateProvider.startSymbol('[[');
             $interpolateProvider.endSymbol(']]');

             RestangularProvider.setBaseUrl('/api');
             RestangularProvider.setRequestSuffix('/.json');
         }
        ]
    );

}());
