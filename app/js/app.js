!function(){
    angular.module('vx.controller', []).controller('homeCtrl', ['$rootScope', '$scope', function($rootScope, $scope){
        $rootScope.global.title = '墨水游戏';
        $rootScope.global.hasGoback = false;
        $scope.get2SVR('/api/games', function(data){
            $scope.games = data;
        });
        $('.am-slider-manual').flexslider();
    }]).controller('gameDetailCtrl', ['$rootScope', '$scope', '$routeParams', function($rootScope, $scope, $routeParams){
        $rootScope.global.title = '墨水游戏';
        $rootScope.global.hasGoback = true;
        $rootScope.get2SVR('/data/games.json', function(data){
            data.forEach(function(game){
                if(game.id = $routeParams.id){
                    $scope.game = game;
                    $rootScope.global.title = game.name
                }
            })
        });
        $('.am-slider-manual').flexslider();
    }]).controller('rankCtrl', ['$rootScope', '$scope', '$routeParams', function($rootScope, $scope, $routeParams){
        console.log($routeParams.categoryId)
        $scope.current_tab = 'hot';
        $rootScope.global.title = '排行';
        $rootScope.global.hasGoback = true;
        $rootScope.get2SVR('/data/games.json', function(data){
            $scope.games = data;
        });
        $scope.changeTab = function(tabName){
            $scope.current_tab = tabName;
        }
    }]).controller('cateCtrl', ['$rootScope', '$scope', function($rootScope, $scope){
        $rootScope.global.title = '分类';
        $rootScope.global.hasGoback = true;
        $rootScope.get2SVR('/data/category.json', function(data){
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
        }).when('/game/:id',{
            templateUrl:'/views/gameDetail.html',
            controller:'gameDetailCtrl'
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

        // global
        $rootScope.global = {
            config: 'config',
            title: '',
            me: vx.me,
            isLogin: false,
            hasGoback: false
        };

        // API get
        $rootScope.get2SVR = function(url, callback, failback){
            $http.get(url).success(function(data ,status, headers, config){
                angular.isFunction(callback) && callback(data);
            }).error(function(data ,status, headers, config){
                angular.isFunction(failback) && failback(data);
            })
        };

        // API post
        $rootScope.post2SVR = function(url, postData, callback, failback){
            $http.post(url, postData).success(function(data ,status, headers, config){
                angular.isFunction(callback) && callback(data);
            }).error(function(data ,status, headers, config){
                angular.isFunction(failback) && failback(data);
            })
        }
    }])
};