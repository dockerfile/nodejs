
app.factory('StoreService', function () {
    return {
        storedObject: ''
    };


});





app.config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {
    $httpProvider.defaults.cache = false;
    if (!$httpProvider.defaults.headers.get) {
        $httpProvider.defaults.headers.get = {};
    }
    $httpProvider.defaults.headers.get['If-Modified-Since'] = '0';
}]);



app.controller('UserNameShowCtrl', ['$scope', '$http', '$window', '$filter', '$cookieStore', 'StoreService',
    function ($scope, $http, $window, $filter, $cookieStore, StoreService) 
    {

           //Prevent Browser back button press
         $scope.$on('$locationChangeStart', function(event, next, current)
            {            
             event.preventDefault();            
            });


        $http.get('/GetDistinctFacilityID').then(function (response) 
        {
            $scope.Facilities = response.data;
        });

        $scope.value = $cookieStore.get('FacilityID');
        
        


        $scope.FacilityChange = function (data) 
        {
            var SelectStream = [];
            SelectStream = $filter('filter')($scope.FacilityNames, { _id: data});
            SelectStream[0].FacilityName;
            
            $scope.value = StoreService;
            if ($scope.value.storedObject == "") {

                $scope.value.storedObject = data;
            }
            $cookieStore.put("FacilityID", StoreService);
            $cookieStore.put("FacilityID1", $scope.value.storedObject);
            $cookieStore.put("FacilityName", SelectStream[0].FacilityName);


        };
        $scope.AssignCookietoFacility= function (data) {
            $cookieStore.put("FacilityID1", data);
        }


        $scope.LoggedinUsers = $cookieStore.get('LoggedinUser');
        var Loggedinusers = $scope.LoggedinUsers;

        $http.get('/GetFacilityNameFromFacilityUserMapping').then(function (response) 
        {
            $scope.FacilityNames = response.data;
             $scope.FacilityIDSource=[];



            $http.get('/GetFacilityIDFromFacilityUserMapping/' + Loggedinusers).then(function (response) {
                $scope.FacilityIDs = response.data;
              
                for (i = 0; i < $scope.FacilityNames.length; i++) {

                    var MainFacilityID = $scope.FacilityNames[i]._id;
                    var FacilityName = $scope.FacilityNames[i].FacilityName;
                    for (j = 0; j < $scope.FacilityIDs.length; j++) {
                        var obj = {};
                        var SubFacilityID = $scope.FacilityIDs[j].FacilityID;

                        if (SubFacilityID == MainFacilityID) {
                            var MainIsActive = $scope.FacilityNames[i].IsActive;
                            if (MainIsActive == true) {
                                obj.FacilityID = SubFacilityID;
                                obj.FacilityName = FacilityName;
                                $scope.FacilityIDSource.push(obj);
                            }
                        }
                    }
                }


                $scope.ShowActiveFacilityName = function (sd) {
                    var SelectStream = [];
                    if (sd.FacilityID) {
                        SelectStream = $filter('filter')($scope.FacilityNames, { _id: sd.FacilityID });
                    }
                    return SelectStream[0].FacilityName;

                };
            });
        });




        $http.get('/HCConfig/HCCartEstimationToolConfig.json').then(function (response) {
            $scope.ProjectName = response.data.ProjectName[0].ProjectName;
            //   $scope.Cart_SizeValues = response.data.Cart_Sizes;
        });

        $scope.LogoutClick = function () 
        {
           
                $cookieStore.remove('LoggedinUser');
                $cookieStore.remove("FloorID");
                $cookieStore.remove("BuildingID");
                $cookieStore.remove("NoOfUnits");
                $cookieStore.remove('FacilityID1');
                $cookieStore.remove("FacilityID");
                 $cookieStore.remove("ElevatorTripBID"); 
                  $cookieStore.remove("DistanceBuildingID"); 

           

        }
    }

]);

app.controller('FooterController', ['$scope', '$http', '$window', '$filter',
    function ($scope, $http, $window, $filter) 
    {

             //Prevent Browser back button press
         $scope.$on('$locationChangeStart', function(event, next, current)
            {            
             event.preventDefault();            
            });

        //get footer version from the HCCartEstimationToolConfig.json

        $http.get('/HCConfig/HCCartEstimationToolConfig.json').then(function (response) {
            $scope.HCCartEstimationVersion = response.data.HCCartEstimationVersion[0].VersionNumber;
            // console.log($scope.HCCartEstimationVersion);
        });



        //get organization name from the HCCartEstimationToolConfig.json
        $http.get('/HCConfig/HCCartEstimationToolConfig.json').then(function (response) {
            $scope.OrganizationName = response.data.OrganizationName[0].OrganizationName;

        });


        //get copyright from the HCCartEstimationToolConfig.json
        $http.get('/HCConfig/HCCartEstimationToolConfig.json').then(function (response) {
            $scope.CopyRight = response.data.CopyRight[0].CopyRight;

        });
    }]);



app.controller('SlideController', ['$scope', '$http', '$window', '$filter', '$cookieStore',
    function ($scope, $http, $window, $filter, $cookieStore) 
    {

             //Prevent Browser back button press
         $scope.$on('$locationChangeStart', function(event, next, current)
            {            
             event.preventDefault();            
            });

        var username = $cookieStore.get('LoggedinUser');
        $scope.menuactive = $cookieStore.get('MenuActive');
        $scope.MenuActiveopen = $cookieStore.get('MenuActiveopen');
        var refresh = function () {
            $http.get('/user/' + username).then(function (response) {
                var id = response.data[0].Role;
                $http.get('/Manage_RoleshowPopup/' + id).then(function (response) {
                    $scope.Manage_RolesUIshows = response.data;
                    var viewsshow0 = $scope.Manage_RolesUIshows[0].UIList[0].View;
                    var Editshow0 = $scope.Manage_RolesUIshows[0].UIList[0].Edit;
                    if (viewsshow0 == true) 
                    {
                        $scope.show0 = true;
                        $scope.Security = true;
                        $scope.Securityactive0 = "active open";

                    }
                    else {
                        $scope.show0 = false;
                        $scope.Security = false;
                        $scope.Securityactive0 = "";
                        $scope.HideSecurityMenu="";

                    }

                    if (Editshow0 == true) {
                        $scope.RoleButtonShow = true;
                    }
                    else {
                        $scope.RoleButtonShow = false;
                    }

                    
                    //Manage User

                    var show1 = $scope.Manage_RolesUIshows[0].UIList[1].View;
                    var Editshow1 = $scope.Manage_RolesUIshows[0].UIList[1].Edit;
                    if (show1 == true) {
                        $scope.show1 = true;
                        $scope.Security1 = true;
                        $scope.Securityactive1 = "active open";
                    }
                    else {
                        $scope.show1 = false;
                        $scope.Security1 = false;
                        $scope.Securityactive1 = "";
                      $scope.HideSecurityMenu="";
                    }
                      if (Editshow1 == true) {
                        $scope.UserButtonShow = true;
                    }
                    else {
                        $scope.UserButtonShow = false;
                    }

                   //Manage Facility

                    var show2 = $scope.Manage_RolesUIshows[0].UIList[2].View;
                     var Editshow2 = $scope.Manage_RolesUIshows[0].UIList[2].Edit;

                    if (show2 == true) {
                        $scope.show2 = true;
                        $scope.Security2 = true;
                        $scope.Securityactive2 = "active open";
                    }
                    else {
                        $scope.show2 = false;
                        $scope.Security2 = false;
                        $scope.Securityactive2 = " ";
                     $scope.HideSecurityMenu="";
                    }
                      if (Editshow2 == true) {
                        $scope.FacilityButtonShow = true;
                    }
                    else {
                        $scope.FacilityButtonShow = false;
                    }

                    //Manage units

                    var show3 = $scope.Manage_RolesUIshows[0].UIList[3].View;
                    var Editshow3 = $scope.Manage_RolesUIshows[0].UIList[3].Edit;
                    if (show3 == true) {
                        $scope.show3 = true;
                        $scope.Configuration3 = true;
                        $scope.Securityactive3 = "active open";
                    }
                    else {
                        $scope.show3 = false;
                        $scope.Configuration3 = false;
                        $scope.Securityactive3 = "";
                       $scope.HideConfigurationMenu = "";
                    }
                    
                    if (Editshow3 == true) {
                        $scope.UnitButtonShow = true;
                    }
                    else {
                        $scope.UnitButtonShow = false;
                    }


                     //Manage Buildings

                    var show4 = $scope.Manage_RolesUIshows[0].UIList[4].View;
                    var Editshow4 = $scope.Manage_RolesUIshows[0].UIList[4].Edit;
                    if (show4 == true) {
                        $scope.show4 = true;
                        $scope.Configuration4 = true;
                        $scope.Securityactive4 = "active open";
                    }
                    else {
                        $scope.show4 = false;
                        $scope.Configuration4 = false;
                        $scope.Securityactive4 = "";
                     $scope.HideConfigurationMenu = "";
                    }
                    if (Editshow4 == true) {
                        $scope.BuildingsButtonShow = true;
                    }
                    else {
                        $scope.BuildingsButtonShow = false;
                    }

                      //Material Stream Master

                    var show5 = $scope.Manage_RolesUIshows[0].UIList[5].View;
                     var Editshow5 = $scope.Manage_RolesUIshows[0].UIList[5].Edit;
                    if (show5 == true) {
                        $scope.show5 = true;
                        $scope.Configuration5 = true;
                        $scope.Securityactive5 = "active open";
                    }
                    else {
                        $scope.show5 = false;
                        $scope.Configuration5 = false;
                        $scope.Securityactive5 = "";
                         $scope.HideConfigurationMenu = "";
                    }
                    if (Editshow5 == true) {
                        $scope.MaterialStreamButtonShow = true;
                    }
                    else {
                        $scope.MaterialStreamButtonShow = false;
                    }


                    var show6 = $scope.Manage_RolesUIshows[0].UIList[6].View;
                     var Editshow6 = $scope.Manage_RolesUIshows[0].UIList[6].Edit;
                    if (show6 == true) {
                        $scope.show6 = true;
                        $scope.Configuration6 = true;
                        $scope.Securityactive6 = "active open";
                    }
                    else {
                        $scope.show6 = false;
                        $scope.Configuration6 = false;
                        $scope.Securityactive6 = "";
                       $scope.HideConfigurationMenu = "";
                    }
                    if (Editshow6 == true) {
                        $scope.ElevatorMasterButtonShow = true;
                    }
                    else {
                        $scope.ElevatorMasterButtonShow = false;
                    }


                    var show7 = $scope.Manage_RolesUIshows[0].UIList[7].View;
                    var Editshow7 = $scope.Manage_RolesUIshows[0].UIList[7].Edit;
                    if (show7 == true) {
                        $scope.show7 = true;
                        $scope.Configuration7 = true;
                        $scope.Securityactive7 = "active open";
                    }
                    else {
                        $scope.show7 = false;
                        $scope.Configuration7 = false;
                        $scope.Securityactive7 = "";
                         $scope.HideConfigurationMenu = "";
                    }
                    if (Editshow7 == true) {
                        $scope.ElevatorMappingButtonShow = true;
                    }
                    else {
                        $scope.ElevatorMappingButtonShow = false;
                    }


                    var show8 = $scope.Manage_RolesUIshows[0].UIList[8].View;
                    var Editshow8 = $scope.Manage_RolesUIshows[0].UIList[8].Edit;
                    if (show8 == true) {
                        $scope.show8 = true;
                        $scope.Configuration8 = true;
                        $scope.Securityactive8 = "active open";
                    }
                    else {
                        $scope.show8 = false;
                        $scope.Configuration8 = false;
                        $scope.Securityactive8 = "";
                      $scope.HideConfigurationMenu = "";
                    }
                     if (Editshow8 == true) {
                        $scope.DistanceMatrixButtonShow = true;
                    }
                    else {
                        $scope.DistanceMatrixButtonShow = false;
                    }


                    var show9 = $scope.Manage_RolesUIshows[0].UIList[9].View;
                     var Editshow9 = $scope.Manage_RolesUIshows[0].UIList[9].Edit;
                    if (show9 == true) {
                        $scope.show9 = true;
                        $scope.Configuration9 = true;
                        $scope.Securityactive9 = "active open";
                    }
                    else {
                        $scope.show9 = false;
                        $scope.Configuration9 = false;
                        $scope.Securityactive9 = "";
                        $scope.HideConfigurationMenu = "";
                    }
                    if (Editshow9 == true) {
                        $scope.ETripMasterButtonShow = true;
                    }
                    else {
                        $scope.ETripMasterButtonShow = false;
                    }



                    var show10 = $scope.Manage_RolesUIshows[0].UIList[10].View;
                     var Editshow10 = $scope.Manage_RolesUIshows[0].UIList[10].Edit;
                    if (show10 == true) {
                        $scope.show10 = true;
                        $scope.Configuration10 = true;
                        $scope.Securityactive10 = "active open";
                    }
                    else {
                        $scope.show10 = false;
                        $scope.Configuration10 = false;
                        $scope.Securityactive10 = "";
                         $scope.HideConfigurationMenu = "";
                    }
                    if (Editshow10 == true) {
                        $scope.EAssumptionButtonShow = true;
                    }
                    else {
                        $scope.EAssumptionButtonShow = false;
                    }

                    var show11 = $scope.Manage_RolesUIshows[0].UIList[11].View;
                    var Editshow11 = $scope.Manage_RolesUIshows[0].UIList[11].Edit;
                  
                    if (show11 == true) {
                        $scope.show11 = true;
                        $scope.Configuration11 = true;
                        $scope.Securityactive11 = "active open";
                    }
                    else {
                        $scope.show11 = false;
                        $scope.Configuration11 = false;
                        $scope.Securityactive11 = "";
                          $scope.HideConfigurationMenu = "";
                    }
                     if (Editshow11 == true) {
                        $scope.AssignUnitsBuildingsButtonShow = true;
                    }
                    else {
                        $scope.AssignUnitsBuildingsButtonShow = false;
                    }


                    var show12 = $scope.Manage_RolesUIshows[0].UIList[12].View;
                    var Editshow12 = $scope.Manage_RolesUIshows[0].UIList[12].Edit;
                    if (show12 == true) {
                        $scope.show12 = true;
                        $scope.Configuration12 = true;
                        $scope.Securityactive12 = "active open";
                    }
                    else {
                        $scope.show12 = false;
                        $scope.Configuration12 = false;
                        $scope.Securityactive12 = "";
                       $scope.HideConfigurationMenu = "";
                    }
                    if (Editshow12 == true) {
                        $scope.MCartsButtonShow = true;
                    }
                    else {
                        $scope.MCartsButtonShow = false;
                    }


                    var show13 = $scope.Manage_RolesUIshows[0].UIList[13].View;
                     var Editshow13 = $scope.Manage_RolesUIshows[0].UIList[13].Edit;
                    if (show13 == true) {
                        $scope.show13 = true;
                        $scope.Configuration13 = true;
                        $scope.Securityactive13 = "active open";
                    }
                    else {
                        $scope.show13 = false;
                        $scope.Configuration13 = false;
                        $scope.Securityactive13 = "";
                          $scope.HideConfigurationMenu = "";
                    }
                    if (Editshow13 == true) {
                        $scope.SKUMasterButtonShow = true;
                    }
                    else {
                        $scope.SKUMasterButtonShow = false;
                    }

                    var show14 = $scope.Manage_RolesUIshows[0].UIList[14].View;
                     var Editshow14 = $scope.Manage_RolesUIshows[0].UIList[14].Edit;
                    if (show14 == true) {
                        $scope.show14 = true;
                        $scope.ManageMaterialFlow = true;
                        $scope.Securityactive14 = "active open";
                    }
                    else {
                        $scope.show14 = false;
                        $scope.ManageMaterialFlow = false;
                        $scope.Securityactive14 = "";
                       $scope.HideWorkLoadMenu="";
                    }
                     if (Editshow14 == true) {
                        $scope.MMaterialFlowButtonShow = true;
                    }
                    else {
                        $scope.MMaterialFlowButtonShow = false;
                    }


                    var show15 = $scope.Manage_RolesUIshows[0].UIList[15].View;
                    var Editshow15 = $scope.Manage_RolesUIshows[0].UIList[15].Edit;
                    if (show15 == true) {
                        $scope.show15 = true;
                        $scope.CartEstimationByMaterialFlowStream = true;
                        $scope.Securityactive15 = "active open";
                    }
                    else {
                        $scope.show15 = false;
                        $scope.CartEstimationByMaterialFlowStream = false;
                        $scope.Securityactive15 = "";
                          $scope.HideOpeerationMenu="";
                    }
                    if (Editshow15 == true) {
                        $scope.CEMFstreamButtonShow = true;
                    }
                    else {
                        $scope.CEMFstreamButtonShow = false;
                    }

                      var show16 = $scope.Manage_RolesUIshows[0].UIList[16].View;
                       var Editshow16 = $scope.Manage_RolesUIshows[0].UIList[16].Edit;
                    if (show16 == true) {
                        $scope.show16 = true;
                        $scope.CartEstimationByVolume = true;
                        $scope.Securityactive16 = "active open";
                    }
                    else {
                        $scope.show16 = false;
                        $scope.CartEstimationByVolume = false;
                        $scope.Securityactive16 = "";
                        $scope.HideOpeerationMenu="";
                    }
                     if (Editshow16 == true) {
                        $scope.CEByVolumeButtonShow = true;
                    }
                    else {
                        $scope.CEByVolumeButtonShow = false;
                    }

                       var show17= $scope.Manage_RolesUIshows[0].UIList[17].View;
                        var Editshow17 = $scope.Manage_RolesUIshows[0].UIList[17].Edit;
                    if (show17 == true) {
                        $scope.show17 = true;
                        $scope.CartEstimationbyMaterialFlowStreamReport = true;
                        $scope.Securityactive17 = "active open";
                    }
                    else {
                        $scope.show17 = false;
                        $scope.CartEstimationbyMaterialFlowStreamReport = false;
                        $scope.Securityactive17 = "";
                       $scope.HideReportsMenu="";
                    }
                      if (Editshow17 == true) {
                        $scope.CEMFstreamReportButtonShow = true;
                    }
                    else {
                        $scope.CEMFstreamReportButtonShow = false;
                    }

                     var show18 = $scope.Manage_RolesUIshows[0].UIList[18].View;
                     var Editshow18 = $scope.Manage_RolesUIshows[0].UIList[18].Edit;
                    if (show18 == true) {
                        $scope.show18 = true;
                        $scope.ElevatorWorkLoad = true;
                        $scope.Securityactive18 = "active open";
                    }
                    else {
                        $scope.show18 = false;
                        $scope.ElevatorWorkLoad = false;
                        $scope.Securityactive18 = "";
                        $scope.HideReportsMenu="";
                    }
                      if (Editshow18 == true) {
                        $scope.ElevatorWorkLoadButtonShow = true;
                    }
                    else {
                        $scope.ElevatorWorkLoadButtonShow = false;
                    }

                      var show19 = $scope.Manage_RolesUIshows[0].UIList[19].View;
                        var Editshow19 = $scope.Manage_RolesUIshows[0].UIList[19].Edit;
                    if (show19 == true) {
                        $scope.show19 = true;
                        $scope.CartEstimationByVolumeReport = true;
                        $scope.Securityactive19 = "active open";
                    }
                    else {
                        $scope.show19 = false;
                        $scope.CartEstimationByVolumeReport = false;
                        $scope.Securityactive19 = "";
                       $scope.HideReportsMenu="";
                    }
                     if (Editshow19 == true) {
                        $scope.CEByVolumeReportButtonShow = true;
                    }
                    else {
                        $scope.CEByVolumeReportButtonShow = false;
                    }





                });
            });
        }
        refresh();






    }]);

app.controller('ChangePasswordctrl', ['$http', '$scope', '$window', '$cookieStore', '$notify',
    function ($http, $scope, $window, $cookieStore, $notify) 
    {

         //Prevent Browser back button press
         $scope.$on('$locationChangeStart', function(event, next, current)
            {            
             event.preventDefault();            
            });

        $scope.ChangeButtonClick = function () 
        { 
            var confirmPwd='';
            var username = $cookieStore.get('LoggedinUser');

            $http.get('/Header/ChangePassword/' + username).then(function (response) {
                $scope.ChangePasswordShow = response.data;
                var checkuserpassword = $scope.ChangePasswordShow[0].Password;
                var CurrentPWD = $scope.ChangePassword.OldPassword;

                $http.post('/Headers/ChangeCheckPassword', {
                    'checkuserpassword': checkuserpassword,
                    'CurrentPWD': CurrentPWD

                }).then(function (response) {
                    $scope.Manage_RolesUIshows12 = response.data;
                    if (response.data == "Same") 
                    {

                        confirmPwd = $scope.ChangePassword.ConfirmPassword;
                        $http.put('/Header/ConfirmPassword/' + confirmPwd + '/' + username).then(function (response) {
                            $scope.Manage_RolesUIshows12 = response.data;
                          //  console.log(response);
                            $scope.ChangePassword = "";
                            $notify.success('Information', 'Password Successfully Changed');
                        });

                        

                    }
                    else if (response.data == 'Not Same') {
                        $notify.warning('Warning', 'Old Password Mismatched');
                    }
                });

            });
        };

        $scope.deselect = function () 
        {
           
              //$scope.profileform.Newpassord="";
             // $scope.profileform.Confirmpassord="";
              $scope.ChangePassword.NewPassword= "";
             $scope.ChangePassword.ConfirmPassword= "";
             $scope.ChangePassword.OldPassword= "";
            

        };

 
    }]);
