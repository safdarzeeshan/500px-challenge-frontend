'use strict';

/**
 * @ngdoc service
 * @name 500pxChallengeApp.photos
 * @description
 * # photos
 * Service in the 500pxChallengeApp.
 */
angular.module('500pxChallengeApp')
.factory('Photos', function( $http, $cookies, $localStorage ) {

    var photosFactory = {},
        //local API
        baseUrl = 'http://127.0.0.1:8000/api/';
        //prod API
        // baseUrl = 'http://500pxapi.zeeshansafdar.com/api/';

    //Get popular photos from 500px
    photosFactory.$popularPhotos = function() {

        return $http({
            method: 'GET',
            url: baseUrl + 'popularphotos/',
        });
    };

    //Get individual photo details by passing photo ID
    photosFactory.$photoDetail = function(photoId) {

        return $http({
            method: 'GET',
            url: baseUrl + 'photodetail?photoId=' + photoId,
        });
    };

    //Like specific photo. Actually a user votes for the photo which is a like
    photosFactory.$likePhoto = function(photoId) {

        return $http({
            method: 'GET',
            url: baseUrl + 'likephoto?photoId=' + photoId,
        });
    };

    photosFactory.$unlikePhoto = function(photoId) {

        return $http({
            method: 'GET',
            url: baseUrl + 'unlikephoto?photoId=' + photoId,
        });
    };

    return photosFactory;
});
