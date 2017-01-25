'use strict';

/**
 * @ngdoc function
 * @name 500pxChallengeApp.controller:PhotosCtrl
 * @description
 * # PhotosCtrl
 * Controller of the 500pxChallengeApp
 */
angular.module('500pxChallengeApp')
  .controller('PhotosCtrl', function ($scope, Photos, ModalService, Auth, $window) {

    $scope.userStatus= 'guest';

    //check if user is logged in
    if(Auth.$isLoggedIn())
    {
        $scope.userStatus= 'user';
    }

    Photos.$popularPhotos()
    .then(function(response){
        console.log(response)
        $scope.photos = response.data.photos
    })
    .catch(function(errors){
        console.log(errors.data);
    })

    $scope.enlargePhoto = function(photo_url){

        ModalService.showModal({
        templateUrl: 'views/modal_photo.html',
        controller: "ModalPhotoCtrl",
        inputs: {
            imageURL: photo_url,
        }
        }).then(function(modal) {
            modal.element.modal();
            modal.close.then(function() {
            });
        });
    };

    $scope.login = function(){
        Auth.$authorizationUrl()
        .then(function(response){
            console.log(response.data)
            $window.open(response.data.authorization_url, "_self");
        })
        .catch(function(errors){
            console.log(errors.data);
        })
    }

    $scope.ctaLogin = function(){
        ModalService.showModal({
        templateUrl: 'views/modal_login.html',
        controller: "GuestCtrl",
        inputs: {}
        }).then(function(modal) {
            modal.element.modal();
            modal.close.then(function() {
            });
        });
    }

    $scope.likePhoto = function($index, photoId){
        Photos.$likePhoto(photoId)
        .then(function(response){
            console.log(response.data);
            $scope.photos[$index].voted = true;
        })
        .catch(function(errors){
            console.log(errors.data);
        })
    }

    $scope.unlikePhoto = function($index, photoId){
        Photos.$unlikePhoto(photoId)
        .then(function(response){
            console.log(response.data);
            $scope.photos[$index].voted = false;
        })
        .catch(function(errors){
            console.log(errors.data);
        })
    }

});

angular.module('500pxChallengeApp')
    .controller('ModalPhotoCtrl', function($scope, close, imageURL) {
        $scope.imageURL = imageURL;
    });

angular.module('500pxChallengeApp')
    .controller('ModalLoginCtrl', function($scope, close) {

        // $scope.login = function(){
        //     Auth.$authorizationUrl()
        //     .then(function(response){
        //         console.log(response.data)
        //         $window.open(response.data.authorization_url, "_self");
        //     })
        //     .catch(function(errors){
        //         console.log(errors.data);
        //     })
        // }
});
