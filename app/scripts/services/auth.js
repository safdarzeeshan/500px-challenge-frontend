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
        //local API
        baseUrl = 'http://127.0.0.1:8000/api/';
        //prod API
        // baseUrl = 'http://500pxapi.zeeshansafdar.com/api/';

    //API returns a url to authenticate a user with 500px
    authFactory.$authorizationUrl = function() {

        return $http({
            method: 'GET',
            url: baseUrl + 'requesttoken/',
        });
    };

    //Pass token and verifier to return 500px oauth token and secret
    authFactory.$accessToken = function(oauth_token, oauth_verifier) {

        return $http({
            method: 'GET',
            url: baseUrl + 'accesstoken?oauth_token=' + oauth_token + '&oauth_verifier=' + oauth_verifier
        });
    };

    //Pass 500px oauth token and secret to return an Auth token frm the api
    //Allows a user to login and register with their 500px credentials
    authFactory.$login = function(login_data) {

        return $http({
            method: 'POST',
            url: baseUrl + 'rest-auth/fivehundredpx/',
            data: login_data
        });
    };

    //Log out from API.
    authFactory.$logout = function() {

        return $http({
            method: 'POST',
            url: baseUrl + 'rest-auth/logout/',
        });
    };

    //Get user information. First name, last name, email and username
    authFactory.$user = function() {

        return $http({
            method: 'GET',
            url: baseUrl + 'rest-auth/user/'
        });
    };

    //To check if a user is logged in. The method verfies a boolen value in localstorage
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
