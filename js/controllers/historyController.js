var historyModule = angular.module('history', ['ui.bootstrap']);

historyModule.controller('HistoryController', ['$scope', 'Auth', 'Referral', function ($scope, Auth, Referral) {

    $scope.findReferrals = function (start, end) {
        $scope.referrals = Referral.findByPractice({id: Auth.get().practice_id, start_date: start.toISOString(), end_date: end.toISOString()});
    };
    $scope.findReferrals( moment().subtract('days', 29), moment());
    console.log($scope.referrals)
}]);
