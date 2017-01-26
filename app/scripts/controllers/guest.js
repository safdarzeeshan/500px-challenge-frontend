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

    //Allows a user to login to the app with their 500px credentials
    $scope.login = function(){
        Auth.$authorizationUrl()
        .then(function(response){
            //This redirect user to 500px authorization URL
            $window.open(response.data.authorization_url, "_self");
        })
        .catch(function(errors){
            console.log(errors.data);
        })
    };
});
