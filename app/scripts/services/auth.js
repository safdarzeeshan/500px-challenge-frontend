'use strict';

/**
 * @ngdoc service
 * @name 500pxChallengeApp.auth
 * @description
 * # auth
 * Factory in the 500pxChallengeApp.
 */
angular.module('500pxChallengeApp')
  .factory('Auth', function( $http, $cookies, $localStorage ) {


    var authFactory = {},
        baseUrl = 'http://127.0.0.1:8000/api/';

    // Public API here
    authFactory.$authorizationUrl = function() {

        return $http({
            method: 'GET',
            url: baseUrl + 'requesttoken/',
        });
    };

    authFactory.$accessToken = function(oauth_token, oauth_verifier) {

        return $http({
            method: 'GET',
            url: baseUrl + 'accesstoken?oauth_token=' + oauth_token + '&oauth_verifier=' + oauth_verifier
        });
    };

    authFactory.$login = function(login_data) {

        return $http({
            method: 'POST',
            url: baseUrl + 'rest-auth/fivehundredpx/',
            data: login_data
        });
    };

    authFactory.$logout = function(login_data) {

        return $http({
            method: 'POST',
            url: baseUrl + 'rest-auth/fivehundredpx/',
            data: login_data
        });
    };

    authFactory.$logout = function() {

        return $http({
            method: 'POST',
            url: baseUrl + 'rest-auth/logout/',
        });
    };

    authFactory.$user = function() {

        return $http({
            method: 'GET',
            url: baseUrl + 'rest-auth/user/'
        });
    };

    authFactory.$isLoggedIn = function(){
        if ($localStorage.isAuthenticated === 'true'){
            return true;
        }

        else{
            return false;
        }
    };

    return authFactory;
  });
