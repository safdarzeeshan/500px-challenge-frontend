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
    'angularModalService',
  ]).config(function($stateProvider, $httpProvider, $locationProvider, $urlRouterProvider){

        // Auth Token is added in the header to send authorized request
        $httpProvider.interceptors.push(function ($cookies) {
            return {
                'request': function (config) {
                    if($cookies.get('token')){
                        config.headers['Authorization'] = 'Token ' + $cookies.get('token');
                    }
                    return config;
                }
            };
        });

        $urlRouterProvider.otherwise(function($injector, $location){
            $injector.invoke(function($state) {
                $state.go('guest.photos');
            });
        });

        $locationProvider.html5Mode(true).hashPrefix('!');

        $stateProvider

        //Parent route when user is not logged in
        .state('guest',{
            url:'/guest',
            templateUrl:'views/guest.html',
            controller:'GuestCtrl',
            requireLogin:false
        })

        //Parent route when user is logged in
        .state('user',{
            url:'/user',
            templateUrl:'views/user.html',
            controller:'UserCtrl',
            requireLogin:true
        })

        // Image gallery state with user not logged in
        .state('guest.photos',{
            url:'/photos',
            templateUrl:'views/photos.html',
            controller:'PhotosCtrl',
            requireLogin:false
        })

        // Image gallery state with user is logged in
        .state('user.photos',{
            url:'/photos',
            templateUrl:'views/photos.html',
            controller:'PhotosCtrl',
            requireLogin:true
        })

        //After user's logs in with 500px they are redirected to this page
        .state('redirect',{
            url:'/redirect?oauth_token&oauth_verifier',
            templateUrl:'views/redirect.html',
            controller:'RedirectCtrl',
            requireLogin:false
        });

    }).run(function ($state, Auth, $rootScope) {
        $rootScope.$on('$stateChangeStart', function(event, toState){

            //Validate that a user is loggged in to view a user page
            if (toState.requireLogin && !Auth.$isLoggedIn()){

                $state.transitionTo('guest.photos');
                event.preventDefault();
            }

            //Validate that a user is not loggged in to view a guest page
            if (!toState.requireLogin && Auth.$isLoggedIn()){

                $state.transitionTo('user.photos');
                event.preventDefault();
            }
        })
    });
