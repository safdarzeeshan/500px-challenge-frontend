'use strict';

/**
 * @ngdoc overview
 * @name 500pxChallengeApp
 * @description
 * # 500pxChallengeApp
 *
 * Main module of the application.
 */
angular
  .module('500pxChallengeApp', [
    'ngCookies',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'ngStorage',
    'angularModalService'
  ]).config(function($stateProvider, $httpProvider, $locationProvider){

        //this is added so any request after logging in has the Auth Token in the header
        // $httpProvider.interceptors.push(function ($cookies) {
        //     return {
        //         'request': function (config) {
        //             if($cookies.get('token')){
        //                 config.headers['Authorization'] = 'Token ' + $cookies.get('token');
        //             }
        //             return config;
        //         }
        //     };
        // });

        $stateProvider
        .state('photos',{
            url:'',
            templateUrl:'views/photos.html',
            controller:'PhotosCtrl',
            requireLogin:false
        });
    });
