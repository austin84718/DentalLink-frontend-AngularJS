var loginModule = angular.module('login', []);

loginModule.controller('LoginController', ['$scope', 'Auth', 'User', '$location', 'Login', 'redirect',
    function ($scope, Auth, User, $location, Login, redirect) {
        var auth = Auth.get();
        $scope.authenticated = auth;
        $scope.email = (auth || {}).email;

        $scope.result = {failure: false};
        $scope.login = function (user) {   /*{'user': {'email': user.email, 'password': user.password }}*/
            
            // show the loading indicator
            $scope.$parent.loadingIndicatorStart()
            Login.login({'user': {'email': user.email, 'password': user.password }},
                function (success) {
                    Auth.set({token: success.token, email: user.email, roles: success.roles, id: success.id, practice_id: success.practice_id});

                    user = User.get({id: success.id});
                    Auth.current_user = user;

                    $scope.email = user.email;
                    $scope.authenticated = true;
                    $location.path(redirect.path);
                    $scope.result = {success: true};

                    $scope.$parent.loadingIndicatorEnd()

                },
                function (failure) {
                    console.log(failure)
                    Auth.remove();
                    $scope.authenticated = false;
                    if(failure.status == 0){
                        $scope.result = {failure: true, statusText: 'Upstream server connectivity error. Administrator was informed. Please try again later'};
                    }else{
                        $scope.result = {failure: true, statusText: 'Unable to login with provided credentials'};
                    }
                    
                    console.log($scope.result)

                    $scope.$parent.loadingIndicatorEnd()

                });
        };

        $scope.existingReferralId = 7;


    }]);

