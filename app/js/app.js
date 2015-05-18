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
      window.location.href = $scope.game.url;
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
  }]).controller('userCtrl', ['$rootScope', '$scope', function($rootScope, $scope){
    $rootScope.global.title = '用户';
    $rootScope.global.hasGoback = true;
  }]).controller('signinCtrl', ['$rootScope', '$scope', '$location', function($rootScope, $scope, $location){
    $rootScope.global.title = '登录';
    $rootScope.global.hasGoback = true;

    $rootScope.signin = function(){
      $rootScope.post2SVR('/api/user/signin', $scope.user, function(data){
        $rootScope.global.me = data;
        $rootScope.global.isLogin = true;
        $location.path('/user');
      })
    };
  }]).controller('signupCtrl', ['$rootScope', '$scope', '$location',
    function($rootScope, $scope, $location){
      $rootScope.global.title = '注册';
      $rootScope.global.hasGoback = true;

      $scope.signup = function(){
        $rootScope.post2SVR('/api/user/signup', $scope.user, function(data){
          $rootScope.global.me = data;
          $rootScope.global.isLogin = true;
          $location.path('/user');
        })
      };
    }
  ]);
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
      templateUrl:'/views/user.html',
      controller:'userCtrl'
    }).when('/signin',{
      templateUrl:'/views/signin.html',
      controller:'signinCtrl'
    }).when('/signup',{
      templateUrl:'/views/signup.html',
      controller:'signupCtrl'
    }).otherwise({
      redirectTo: '/'
    });
    $locationProvider.html5Mode(true);
  }]).run(['$rootScope', '$http', '$location', '$window', function($rootScope, $http, $location){

    // 全局变量 包括:标题,用户,是否登录,有无返回按钮
    $rootScope.global = {
      title: '',
      me: vx.me,
      isLogin: false,
      hasGoback: false,
      errmsg: ''
    };


    $rootScope.$on('$routeChangeStart', function(event, next, current){

      // 进入'我'页面之前,如果没有登录则跳转到登录页面
      if($rootScope.global.isLogin == false && /^\/user/g.test($location.$$path)){
        $location.path('/signin');
      }

    });
    
    $rootScope.$on('$routeChangeSuccess', function(event, current, previous){

    });


    // API get json格式 {"retcode": 200, "retMsg":"成功", data":{...}}
    $rootScope.get2SVR = function(url, callback, failback){
      $http.get(url).success(function(data ,status, headers, config){
        if(data.retcode == 200){
          angular.isFunction(callback) && callback(data.data);
        }else{
          console.log(data.retcode + ":" + data.errmsg);
          $rootScope.global.errmsg = data.errmsg;
        }
          
      }).error(function(data ,status, headers, config){
        angular.isFunction(failback) && failback(data);
      })
    };

    // API post json格式 {"retcode": 200, "retMsg":"成功", data":{...}}
    $rootScope.post2SVR = function(url, postData, callback, failback){
      $http.post(url, postData).success(function(data ,status, headers, config){
        if(data.retcode == 200){
          angular.isFunction(callback) && callback(data.data);
        }else{
          console.log(data.retcode + ":" + data.errmsg);
          $rootScope.global.errmsg = data.errmsg;
        }
      }).error(function(data ,status, headers, config){
        angular.isFunction(failback) && failback(data);
      })
    };

    // API put json格式 {"retcode": 200, "retMsg":"成功", data":{...}}
    $rootScope.put2SVR = function(url, putData, callback, failback){
      $http.put(url, putData).success(function(data ,status, headers, config){
        angular.isFunction(callback) && callback(data);
      }).error(function(data ,status, headers, config){
        angular.isFunction(failback) && failback(data);
      })
    };

    // API delete json格式 {"retcode": 200, "retMsg":"成功", data":{...}}
    $rootScope.del2SVR = function(url, callback, failback){
      $http.delete(url).success(function(data ,status, headers, config){
        angular.isFunction(callback) && callback(data);
      }).error(function(data ,status, headers, config){
        angular.isFunction(failback) && failback(data);
      })
    };


    
  }])
};
