app.factory('Authentication', function(
    $firebase, $firebaseAuth, $location, FIREBASE_URL, $routeParams){

    var ref = new Firebase(FIREBASE_URL);
    var auth = $firebaseAuth(ref);

    var myObject = {
        login: function(user){
            return auth.$authWithPassword({
                email: user.email,
                password: user.password
            });
        }, // login
        register: function(user){
            return auth.$createUser({
                email: user.email,
                password: user.password
            }).then(function(authData){
                var ref = new Firebase(FIREBASE_URL);
                var postRef = ref.child('users').child(authData.uid);
                postRef.set({
                    date: Firebase.ServerValue.TIMESTAMP,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    email: user.email,
                    password: user.password
                });
            });
        }, // register
        authenticate: function(auth){
            return auth.$onAuth(function(authData){
                if(authData !== null)
                {
                    var userDataRef = new Firebase(FIREBASE_URL + '/users'); 
                    userDataRef.orderByChild("email").equalTo(authData.password.email).on("child_added", function(snapshot) {
                        $scope.firstname = snapshot.val().firstname;
                        $scope.$apply();
                    });
                }
            });
        }
    };

    return myObject;

}); 















