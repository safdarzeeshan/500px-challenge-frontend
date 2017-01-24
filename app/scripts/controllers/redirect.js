'use strict';

/**
 * @ngdoc function
 * @name 500pxChallengeApp.controller:RedirectCtrl
 * @description
 * # RedirectCtrl
 * Controller of the 500pxChallengeApp
 */
angular.module('500pxChallengeApp')
.controller('RedirectCtrl', function ($scope, $state, $stateParams, Auth, $cookies, $localStorage ) {

    var oauth_token = $stateParams.oauth_token;
    var oauth_verifier = $stateParams.oauth_verifier;
    $scope.loading = true;

    Auth.$accessToken(oauth_token, oauth_verifier)
    .then(function(response){

        Auth.$login(response.data)
        .then(function(response){
            $cookies.put('token', response.data.key);
            $localStorage.isAuthenticated = 'true';
            $scope.loading=false;
            $state.go('user.photos');
        })
        .catch(function(errors){
            console.log(errors.data);
        })

    })
    .catch(function(errors){
        console.log(errors.data);
    })

});
