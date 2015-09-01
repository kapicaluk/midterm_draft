app.controller('registration', 
    function($scope, $location, FIREBASE_URL, $firebaseAuth, Authentication ){


    // $scope.firstname = "Dawg";

    var ref = new Firebase(FIREBASE_URL);
    var auth = $firebaseAuth(ref);

    auth.$onAuth(function(authData){
        if(authData !== null)
        {
            var userDataRef = new Firebase(FIREBASE_URL + '/users'); 
            userDataRef.orderByChild("email").equalTo(authData.password.email).on("child_added", function(snapshot) {
                $scope.firstname = snapshot.val().firstname;
                $scope.$apply();
            });
        }
    });

    $scope.logoff = function(){
        auth.$unauth();
        $location.path("/login");
        window.location.reload();
    }
    
    $scope.login = function() {
        Authentication.login($scope.user)
        .then(function(user){
            $location.path("/list");
        }).catch(function(error){
            $scope.message = error.message;
        });
    }

    $scope.register = function() {
        Authentication.register($scope.user)
        .then(function(user){
            Authentication.login($scope.user);
            $location.path("/list");
        }).catch(function(error){
            $scope.message = error.message;
        });
    }
});

















