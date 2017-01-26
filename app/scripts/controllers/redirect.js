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

    //500px.com redirect user to this page with oauth token and verifier as url params
    var oauth_token = $stateParams.oauth_token;
    var oauth_verifier = $stateParams.oauth_verifier;
    $scope.loading = true;

    //Passes token and verifier to api which returns the oauth token and secret
    Auth.$accessToken(oauth_token, oauth_verifier)
    .then(function(response){

        //Pass ouath token and secret to api, which return an auth token.
        Auth.$login(response.data)
        .then(function(response){
            //Save Auth token in cookies.
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
