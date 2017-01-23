'use strict';

/**
 * @ngdoc function
 * @name 500pxChallengeApp.controller:PhotosCtrl
 * @description
 * # PhotosCtrl
 * Controller of the 500pxChallengeApp
 */
angular.module('500pxChallengeApp')
  .controller('PhotosCtrl', function ($scope, Photos, ModalService) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    Photos.$popularPhotos()
    .then(function(response){
        console.log(response)
        $scope.photos = response.data.photos
    })
    .catch(function(errors){
        console.log(errors.data);
    })

    $scope.enlargePhoto = function(photoId){
        console.log('enlarging')
        Photos.$photoDetail(photoId)
        .then(function(response){
            console.log(response.data.photo.image_url)

            ModalService.showModal({
            templateUrl: 'views/modal_photo.html',
            controller: "ModalCtrl",
            inputs: {
                imageURL: response.data.photo.image_url,
            }
            }).then(function(modal) {
                modal.element.modal();
                modal.close.then(function() {
                });
            });
        })
        .catch(function(errors){
            console.log(errors.data);
        })

    };
});

angular.module('500pxChallengeApp')
    .controller('ModalCtrl', function($scope, close, imageURL) {
        $scope.imageURL = imageURL;
    });
