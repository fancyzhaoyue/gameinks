!function(){
    angular.module('vx.controller', []).controller('homeCtrl', ['$rootScope', '$scope', function($rootScope, $scope){
        $rootScope.global.title = '墨水游戏';
        $rootScope.global.hasGoback = false;
        $rootScope.getData('/data/games.json', function(data){
            $scope.games = data;
        });
        $('.am-slider-manual').flexslider();
    }]).controller('rankCtrl', ['$rootScope', '$scope', '$routeParams', function($rootScope, $scope, $routeParams){
        console.log($routeParams.categoryId)
        $scope.current_tab = 'hot';
        $rootScope.global.title = '排行';
        $rootScope.global.hasGoback = true;
        $rootScope.getData('/data/games.json', function(data){
            $scope.games = data;
        });
        $scope.changeTab = function(tabName){
            $scope.current_tab = tabName;
        }
    }]).controller('cateCtrl', ['$rootScope', '$scope', function($rootScope, $scope){
        $rootScope.global.title = '分类';
        $rootScope.global.hasGoback = true;
        $rootScope.getData('/data/category.json', function(data){
            $scope.items = data;
        });
    }]);
}();

var initOuterApp = function(){
    var vx = window.vx || {};
    vx.version = '0.0.1';
    var modules = ['ngRoute', 'vx.controller'];
    vx.ng = angular.module('vx', modules).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
        $routeProvider.when('/',{
            templateUrl:'/views/home.html',
            controller:'homeCtrl'
        }).when('/rank',{
            templateUrl:'/views/rank.html',
            controller:'rankCtrl'
        }).when('/rank/:categoryId',{
            templateUrl:'/views/rank.html',
            controller:'rankCtrl'
        }).when('/category',{
            templateUrl:'/views/category.html',
            controller:'cateCtrl'
        }).otherwise({
            redirectTo: '/'
        });
        $locationProvider.html5Mode(true);
    }]).run(['$rootScope', '$http', function($rootScope, $http){
        $rootScope.global = {
            config: 'config',
            title: '',
            me: vx.me,
            isLogin: false,
            hasGoback: false
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