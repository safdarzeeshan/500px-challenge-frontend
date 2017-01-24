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

        // this is added so any request after logging in has the Auth Token in the header
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

        .state('guest',{
            url:'/guest',
            templateUrl:'views/guest.html',
            controller:'GuestCtrl',
            requireLogin:false
        })

        .state('user',{
            url:'/user',
            templateUrl:'views/user.html',
            controller:'UserCtrl',
            requireLogin:true
        })

        .state('guest.photos',{
            url:'/photos',
            templateUrl:'views/photos.html',
            controller:'PhotosCtrl',
            requireLogin:false
        })

        .state('user.photos',{
            url:'/photos',
            templateUrl:'views/photos.html',
            controller:'PhotosCtrl',
            requireLogin:true
        })

        .state('redirect',{
            url:'/redirect?oauth_token&oauth_verifier',
            templateUrl:'views/redirect.html',
            controller:'RedirectCtrl',
            requireLogin:false
        });

    }).run(function ($state, Auth, $rootScope) {
        $rootScope.$on('$stateChangeStart', function(event, toState){

            //to validate a user can view either pages after logging in
            if (toState.requireLogin && !Auth.$isLoggedIn()){

                $state.transitionTo('guest.photos');
                event.preventDefault();
            }

            if (!toState.requireLogin && Auth.$isLoggedIn()){

                $state.transitionTo('user.photos');
                event.preventDefault();
            }
        })
    });
