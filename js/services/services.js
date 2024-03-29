/**
 * Created by TopaZ on 26.02.14.
 */
var dentalLinksServices = angular.module('dentalLinksServices', ['ngResource']);

//var host = 'http://localhost:3000';
var host = 'http://referral-server.herokuapp.com';

dentalLinksServices.factory('Auth', ['$cookieStore', function ($cookieStore) {
    return {
        authorize: function (roles) {
            if (roles === undefined) {
                return true;
            }
            var auth = $cookieStore.get('auth') || {};

            if (auth.roles) {
                for (var i = 0; i < roles.length; i++) {
                    if (auth.roles.indexOf(roles[i]) >= 0) {
                        return true;
                    }
                }
            }
            return false;
        },
        get: function () {
            return $cookieStore.get('auth');
        },
        set: function (value) {
            $cookieStore.put('auth', value);
        },
        remove: function () {
            $cookieStore.remove('auth');
        }
    };
}]);

dentalLinksServices.factory('Alert', ['$timeout', function ($timeout) {
    return {
        push: function (alerts, type, message) {
            var alert = { type: type, message: message, promise: $timeout(function () {
                alerts.splice(alerts.indexOf(alert), 1);
            }, 5000) };
            alerts.push(alert);

        },
        close: function (alerts, index) {
            $timeout.cancel(alerts[index].promise); //cancel automatic removal
            alerts.splice(index, 1);
        }
    }
}]);

dentalLinksServices.factory('Practice', ['$resource',
    function ($resource) {
        return $resource(host + '/practices/:practiceId', {}, {
            searchPractice: {method: 'GET', url: host + '/practices/search', isArray: true, headers : {
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Pragma' : 'no-cache',
                'Expires' : '0'
            }},
            update: {method: 'PUT'}
        });
    }]);


dentalLinksServices.factory('PracticeInvitation', ['$resource',
    function ($resource) {
        return $resource(host + '/practice_invitations/:id');
    }]);

dentalLinksServices.factory('Patient', ['$resource', function ($resource) {
    return $resource(host + '/patients/:id', {}, {
        searchPatient: {method: 'GET', url: host + '/patients/search', isArray: true,  headers : {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma' : 'no-cache',
            'Expires' : '0'
        }}
    });
}]);

dentalLinksServices.factory('Referral', ['$resource', function ($resource) {
    return $resource(host + '/referrals/:id', {id: '@id'}, {
        saveTemplate: {method: 'POST', url: host + '/referrals/new/template'},
        update: {method: 'PUT'},
        updateStatus: {method: 'PUT', url: host + '/referrals/:id/status'},
        findByPractice: {method: 'GET', url: host + '/referrals/practice/:id', isArray: true}
    });
}]);

dentalLinksServices.factory('Login', ['$resource', function ($resource) {
    return $resource(host + '/sign_in', {}, {
        login: { method: 'POST'},
        logout: {method: 'DELETE', url: host + '/sign_out'}
    });
}]);
dentalLinksServices.factory('ProviderInvitation', ['$resource', function($resource){
    return $resource(host + '/invitations/:invitation_token', {}, {
        delete: {method: 'DELETE', url: host + '/invitations/:id'}
    });
}]);

dentalLinksServices.factory('Registration', ['$resource', function($resource){
   return $resource(host + '/sign_up')
}]);

dentalLinksServices.factory('Password', ['$resource', function ($resource) {
    return $resource(host + '/password', {}, {
        reset: {method: 'POST'},
        change: {method: 'PUT'}
    })
}]);

dentalLinksServices.factory('S3Bucket', ['$resource', function ($resource) {
    return $resource(host + '/s3', {}, {
        getCredentials: {method: 'GET'}
    });
}]);

dentalLinksServices.factory('Note', ['$resource', function ($resource) {
    return $resource(host + '/notes');
}]);

dentalLinksServices.factory('Attachment', ['$resource', function ($resource) {
    return $resource(host + '/attachments');
}]);

dentalLinksServices.factory('Procedure', ['$resource', function ($resource) {
    return $resource(host + '/procedures', {}, {
        practiceTypes: {method: 'GET', url: host + '/practice_types', isArray: true}
    })
}]);

dentalLinksServices.factory('User', ['$resource', function ($resource) {
    return $resource(host + '/users/:id', {}, {
        getInvitees: {method: 'GET', url: host + '/invitees/:user_id', isArray: true},
        update: {method: 'PUT' }
    })
}]);

dentalLinksServices.factory('File', [function () {
    return {
        isImage: function (filename) {
            return filename.toLowerCase().search(/\.(jpg|png|gif)$/) >= 0;
        }
    }
}]);


