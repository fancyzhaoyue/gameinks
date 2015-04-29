!function(){
    angular.module('vx.index_controller', []).controller("index_ctrl", ["$rootScope", function($rootScope) {
            $rootScope.global.title = '墨水游戏';
    }]).controller('home_ctrl', ['$rootScope', '$scope', function($rootScope, $scope){
        $rootScope.getData('/data/games.json', function(data){
            $scope.games = data;
            console.log(data);
        })
    }]);
}();

var initOuterApp = function(){
    var vx = window.vx || {};
    vx.version = '0.0.1';
    var modules = ['ngRoute', 'vx.index_controller'];
    vx.ng = angular.module('vx', modules).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
        $routeProvider.when('/',{
            templateUrl:'/views/home.html',
            controller:'home_ctrl'
        }).otherwise({
            redirectTo: '/'
        });
        $locationProvider.html5Mode(true);
    }]).run(['$rootScope', '$http', function($rootScope, $http){
        $rootScope.global = {
            config: 'config',
            title: '',
            me: vx.me,
            is_login: false,
        };
        $rootScope.getData = function(url, callaback, failback){
            $http.get(url).success(function(data ,status, headers, config){
                callaback(data, status, headers, config);
            }).error(function(data ,status, headers, config){
                failback(data, status, headers, config);
            })
        };
    }])
};