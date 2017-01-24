'use strict';

/**
 * @ngdoc function
 * @name 500pxChallengeApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the 500pxChallengeApp
 */
angular.module('500pxChallengeApp')
.controller('UserCtrl', function ($scope, Auth, $localStorage, $cookies, $state) {
    Auth.$user()
    .then(function(response){
        console.log(response)
        $scope.firstName = response.data.first_name
    })
    .catch(function(errors){
        console.log(errors.data);
    })

    $scope.logout = function(newInteger){
        Auth.$logout()
        .then(function(response){
            $localStorage.$reset();
            delete $cookies.remove('token');
            $state.go('guest.photos');
        })
        .catch(function(errors){
            console.log(errors.data);
        });
    }
});
