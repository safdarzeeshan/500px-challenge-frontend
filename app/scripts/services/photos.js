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
        baseUrl = 'http://127.0.0.1:8000/api/';

    photosFactory.$popularPhotos = function() {

        return $http({
            method: 'GET',
            url: baseUrl + 'popularphotos/',
        });
    };

    photosFactory.$photoDetail = function(photoId) {

        return $http({
            method: 'GET',
            url: baseUrl + 'photodetail?photoId=' + photoId,
        });
    };

    return photosFactory;
});
