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

    //Get popular photos
    Photos.$popularPhotos()
    .then(function(response){
        $scope.photos = response.data.photos
    })
    .catch(function(errors){
        console.log(errors.data);
    })

    //When user clicks on a specific photo, a modal open with the photo enlarged
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

    //When a user not logged in tries to like a photo they are prompted to sign in
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
            //Once an image has been liked outlined heart changes to filled in heart
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

//Controller to enlarge image modal
angular.module('500pxChallengeApp')
    .controller('ModalPhotoCtrl', function($scope, close, imageURL) {
        $scope.imageURL = imageURL;
    });

//Controller for login Modal
angular.module('500pxChallengeApp')
    .controller('ModalLoginCtrl', function($scope, close) {
});
