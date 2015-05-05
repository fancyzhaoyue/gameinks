!function(){
  angular.module('vx.controller', []).controller('homeCtrl', ['$rootScope', '$scope', function($rootScope, $scope){
    
    $rootScope.global.title = '墨水游戏';
    $rootScope.global.hasGoback = false;

    var currentPage = 0;
    $scope.hasMore = true;

    $scope.reloadGame = function() {
      $scope.enjoyGames = [];
      $scope.get2SVR('/api/games?limit=8', function(data){
        $scope.enjoyGames = data;
      });
    }
    $scope.loadMore = function(){
      $scope.games = $scope.games || [];
      $scope.get2SVR('/api/games?page='+ ++currentPage, function(data){
        $scope.games = $scope.games.concat(data);
        $scope.hasMore = 10 > data.length ? false : true;
      });
    }

    $scope.reloadGame();
    $scope.loadMore();
    $('.am-slider-manual').flexslider();

  }]).controller('gameDetailCtrl', ['$rootScope', '$scope', '$routeParams', function($rootScope, $scope, $routeParams){
    
    $rootScope.global.hasGoback = true;

    $rootScope.get2SVR('/api/games/' + $routeParams.gameId, function(data){
      $scope.game = data;
      $rootScope.global.title = $scope.game.name;
    });

    $scope.play = function(){  
      window.location.href = 'http://192.168.1.102/games/' + $scope.game._id;
    }

    // 此代码需要优化 
    $('.am-slider-manual').flexslider();
  }]).controller('rankCtrl', ['$rootScope', '$scope', '$routeParams', function($rootScope, $scope, $routeParams){
  
    $rootScope.global.title = '排行';
    $rootScope.global.hasGoback = true;
    
    var currentPage = 1;
    var url = '';
    $scope.hasMore = true;
    $scope.currentTab = 'last';
    
    $scope.changeTab = function(tab){
      currentPage = 1;
      $scope.hasMore = true;
      $scope.currentTab = tab;

      if($routeParams.categoryId){
        url = '/api/games?sortBy=' + $scope.currentTab + '&categoryId=' + $routeParams.categoryId;
        $scope.get2SVR('/api/categories/' + $routeParams.categoryId, function(data){
          $rootScope.global.title = data.name;
        }); 
      }else{
        url = '/api/games?sortBy=' + $scope.currentTab;
      }

      $scope.get2SVR(url, function(data){
        $scope.games = data;
      });
    };

    $scope.loadMore = function(){
      $scope.games = $scope.games || [];
      $scope.get2SVR(url+'&page='+ ++currentPage, function(data){
        $scope.games = $scope.games.concat(data);
        $scope.hasMore = 10 > data.length ? false : true;
      });
    }
    $scope.changeTab($scope.currentTab);

  }]).controller('cateCtrl', ['$rootScope', '$scope', function($rootScope, $scope){
    $rootScope.global.title = '分类';
    $rootScope.global.hasGoback = true;

    $rootScope.get2SVR('/api/categories', function(data){
      $scope.items = data;
    });
  }]);
}();

var initApp = function(){
  var vx = window.vx || {};
  vx.version = '0.0.1';
  var modules = ['ngRoute', 'vx.controller'];
  vx.ng = angular.module('vx', modules).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
    $routeProvider.when('/',{
      templateUrl:'/views/home.html',
      controller:'homeCtrl'
    }).when('/game/:gameId',{
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
    }).when('/user',{
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
        if(data.retcode == 200){
          angular.isFunction(callback) && callback(data.data);
        }else{
          console.log(data.retcode + ":" + data.errmsg);
        }
          
      }).error(function(data ,status, headers, config){
        angular.isFunction(failback) && failback(data);
      })
    };

    // API post
    $rootScope.post2SVR = function(url, postData, callback, failback){
      $http.post(url, postData).success(function(data ,status, headers, config){
        angular.isFunction(callback) && callback(data.data);
      }).error(function(data ,status, headers, config){
        angular.isFunction(failback) && failback(data);
      })
    };

    // API put
    $rootScope.put2SVR = function(url, putData, callback, failback){
      $http.put(url, putData).success(function(data ,status, headers, config){
        angular.isFunction(callback) && callback(data);
      }).error(function(data ,status, headers, config){
        angular.isFunction(failback) && failback(data);
      })
    };

    // API delete
    $rootScope.del2SVR = function(url, callback, failback){
      $http.delete(url).success(function(data ,status, headers, config){
        angular.isFunction(callback) && callback(data);
      }).error(function(data ,status, headers, config){
        angular.isFunction(failback) && failback(data);
      })
    };
  }])
};
