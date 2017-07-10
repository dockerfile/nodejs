var app = angular.module("login", ['ngCookies', 'ngRoute', 'ngNotify']);

app.config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {
    $httpProvider.defaults.cache = false;
    if (!$httpProvider.defaults.headers.get) {
        $httpProvider.defaults.headers.get = {};
    }
    $httpProvider.defaults.headers.get['If-Modified-Since'] = '0';
}]);





app.directive('ngCompare', function () {
    return {
        require: 'ngModel',
        link: function (scope, currentEl, attrs, ctrl) {
            var comparefield = document.getElementsByName(attrs.ngCompare)[0]; //getting first element
            compareEl = angular.element(comparefield);

            //current field key up
            currentEl.on('keyup', function () {
                if (compareEl.val() != "") {
                    var isMatch = currentEl.val() === compareEl.val();
                    ctrl.$setValidity('compare', isMatch);
                    scope.$digest();
                }
            });

            //Element to compare field key up
            compareEl.on('keyup', function () {
                if (currentEl.val() != "") {
                    var isMatch = currentEl.val() === compareEl.val();
                    ctrl.$setValidity('compare', isMatch);
                    scope.$digest();
                }
            });
        }
    }
});
 
app.controller('LoginCtrl', ['$rootScope', '$scope', '$http', '$window', '$filter', 
'$location', '$cookieStore','$notify','$timeout',
    function ($rootScope, $scope, $http, $window, $filter, $location, $cookieStore,$notify,$timeout) {

        /**
 * Event-Listner for Back-Button
 */
        

        $scope.loginreset = function () 
        {
           
            $scope.loginbox.$setPristine();
            $scope.loginbox.$setUntouched();
            $scope.login = null;
        }
      
        $scope.LoginClick = function () 
        {
        
            // $("div#divLoading").addClass('show');
            var Email = $scope.login;
            // console.log($scope.login);
            $http.post('/login', $scope.login).success(function (response)
             {
                //$cookieStore.put('LoggedinUser', user);

                if (!response.UserName) 
                {
                    $scope.login = null;
                  $scope.loginreset();
                   // loginreset();


                     if( response.ErrorCode=="HCL001")
                     {
                         $scope.ErrorClass="red"
                      }
                       if( response.ErrorCode=="HCL002")
                     {
                         $scope.ErrorClass="green"
                      }
                       if( response.ErrorCode=="HCL003")
                     {
                         $scope.ErrorClass="red"
                      }
                       if( response.ErrorCode=="HCL004")
                     {
                         $scope.ErrorClass="red"
                        
                      }
                       if( response.ErrorCode=="HCL005")
                     {
                         $scope.ErrorClass="red"
                      }
                $scope.ErrorMessageShown = response.ErrorMsg;
                
                //    $scope.ErrorMessageShown = response;

                    //  $timeout(function(e)
                    //     {
                    // $("div#divLoading").removeClass('show');
                    //     }, 3000)

                    
                }
                else {

                      $cookieStore.put('LoggedinUser', response.UserName);
                   var username = $cookieStore.get('LoggedinUser');
                 //   alert(username);
                    $window.location.href = '/index1.html';
                               }
 
            }).catch(function (response) 
            {
               // alert('login failed');
            });

        };


        
        
$scope.ClearLoginForm = function()
{  
     $scope.login.Email ='';
     $scope.login.Password ="";
        $scope.loginbox='';

     

}

    }]);


app.controller('RegisterCtrl', ['$rootScope', '$scope', '$http', '$window', '$filter','$notify','$timeout',
    function ($rootScope, $scope, $http, $window, $filter,$notify,$timeout) 
    {
        $scope.registerreset = function () 
        {
            
            $scope.registerbox.$setPristine();
            $scope.registerbox.$setUntouched();
            $scope.register = null;
        }
        $scope.registerClick = function ()
         {  
          
          //   $("div#divLoading").addClass('show');
debugger;
            $http.post('/signup', $scope.register).success(function (response) 
            {

                // if (response == "Success") {
                //     Flash.create('success', "Successfully Registered !");
                //     $window.location.href = '/';
                // } else {

                //Flash.create('warning', response);

                $scope.register = null;
              $scope.registerreset();
                 //registerreset();
               
                if( response.ErrorCode=="HCR001"){
                    $scope.ErrorClass="red"
                }
                  if( response.ErrorCode=="HCR002"){
                    $scope.ErrorClass="red"
                }
                  if( response.ErrorCode=="HCR003"){
                    $scope.ErrorClass="red"
                }
                  if( response.ErrorCode=="HCR004"){
                    $scope.ErrorClass="red"
                }
                 if( response.ErrorCode=="HCR005"){
                    $scope.ErrorClass="green"
                }
                 if( response.ErrorCode=="HCR006"){
                    $scope.ErrorClass="red"
                }
                $scope.ErrorMessageShown = response.ErrorMsg;
                
               // console.log(response);
                //   $timeout(function(e)
                //         {
                //     $("div#divLoading").removeClass('show');
                //         }, 3000)
                //}
               // console.log((response));
            }).error(function (err) {
                //$scope.error_message = err;
               // alert(err);
            });
        };


$scope.ClearRegisterationErrorMessage = function()
{  
     $scope.ErrorMessageShown ='';
     $scope.register.FirstName ="";
  $scope.register.LastName ="";
    $scope.register.UserName ="";
  $scope.register.Password ="";
    $scope.register.ConfirmPassword ="";
      $scope.register.PhoneNumber ="";
        $scope.register.Email ="";
          $scope.registerbox='';

     

}
    }]);

app.controller('ForgotCtrl', ['$rootScope', '$scope', '$http', '$window', '$filter','$notify','$timeout',
    function ($rootScope, $scope, $http, $window, $filter,$notify,$timeout) {

        
        $scope.forgotreset = function () {
            $scope.forgotbox.$setPristine();
            $scope.forgotbox.$setUntouched();
            $scope.forgot = null;
        }
        $scope.ForgotClick = function ()
         {
         
           //  $("div#divLoading").addClass('show');

            $http.post('/forgot', $scope.forgot).success(function (response) 
            {
            //   console.log(response);

                // Flash.create('success', response);
                $scope.forgotreset();
                //forgotreset();

                     if( response.ErrorCode=="HCFP001")
                     {
                    $scope.ErrorClass="red"
                }
                 if( response.ErrorCode=="HCFP002"){
                    $scope.ErrorClass="green"
                }
                 if( response.ErrorCode=="HCFP003"){
                    $scope.ErrorClass="red"
                }
                 if( response.ErrorCode=="HCFP004"){
                    $scope.ErrorClass="red"
                }
                 if( response.ErrorCode=="HCFP005"){
                    $scope.ErrorClass="red"
                }
                 if( response.ErrorCode=="HCFP006"){
                    $scope.ErrorClass="green"
                }
                 if( response.ErrorCode=="HCFP007"){
                    $scope.ErrorClass="red"
                }
                
                    $scope.ErrorMessageShown = response.ErrorMsg;
                
               
              //  $scope.ErrorMessageShown = response;
               //   $timeout(function(e)
                //         {
                //     $("div#divLoading").removeClass('show');
                //         }, 3000)
            });
        };

$scope.ClearForgetMailRemainderMessage = function()
{
$scope.ErrorMessageShown='';
}


    }]);

    

app.controller('ResetCtrl', ['$rootScope', '$scope', '$http', '$window', '$filter','$notify','$cookieStore',
    function ($rootScope, $scope, $http, $window, $filter,$notify,$cookieStore) {

        
        

        $scope.resetpage = function () {
            $scope.resetbox.$setPristine();
            $scope.resetbox.$setUntouched();
            $scope.reset = null;
        }
        $scope.resetClick = function () 
        {

            $http.post('/reset/:token', $scope.reset).success(function (response) {
                //console.log(response);
                // Flash.create('success', response);
                $scope.resetpage();
               // resetpage();


                if( response.ErrorCode=="HCRP001"){
                    $scope.ErrorClass="green"
                }
                
                if( response.ErrorCode=="HCRP002"){
                    $scope.ErrorClass="red"
                }
                    $scope.ErrorMessageShown = response.ErrorMsg;
                
              //  $scope.ErrorMessageShown = response;
                $scope.isresetted = true;
               
            });
        };

    }]);



    


app.controller('homeCtrl',
    function ($scope, $http, $window, $filter, $cookieStore,$notify) {

     
           


         var logincheck = function () {
            $http.get('loggedin').success(function (user) {
               // console.log(user);
                $cookieStore.put('LoggedinUser', user);

                var username = $cookieStore.get('LoggedinUser');
                // Authenticated
                if (user != '0') {

                    return;

                }
                    // Not Authenticated
                else {
                    //$window.location.href = '/ManageRole.html';
                    $window.location.href = '/';
                    //$location.path('/');
                }
            });
        };
        logincheck();



    });

app.controller('logoutCtrl',
    function ($scope, $http, $window, $filter,$notify) 
    {




     //   alert("logout");
        var refresh = function () {
            $http.get('/logout').success(function (response) {
                // alert(response);
                if (response == "logout") {
                    $window.location.href = '/';
                  //  $cookieStore.remove('LoggedinUser');
                }


            }).error(function (err) {
                //$scope.error_message = err;
                //alert(err);
              //  console.log(err);

            });
        }
        refresh();
    });





