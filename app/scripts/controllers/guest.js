'use strict';

/**
 * @ngdoc function
 * @name 500pxChallengeApp.controller:GuestCtrl
 * @description
 * # GuestCtrl
 * Controller of the 500pxChallengeApp
 */
angular.module('500pxChallengeApp')
  .controller('GuestCtrl', function ($scope, Auth, $window) {

    $scope.login = function(){
        Auth.$authorizationUrl()
        .then(function(response){
            console.log(response.data);
            $window.open(response.data.authorization_url, "_self");
        })
        .catch(function(errors){
            console.log(errors.data);
        })
    };
});
