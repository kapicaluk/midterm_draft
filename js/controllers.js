var trailControllers = angular.module('trailControllers', ['ngAnimate']);

trailControllers.controller('ListController', ['$scope', '$http', function($scope, $http) {
  $http.get('js/data.json').success(function(data) {
    $scope.trails = data;
    $scope.trailOrder = 'name';
    $scope.new_trail = {};
    $scope.add_trail_error = "";

    $scope.addTrail = function( new_trail ){
         
            if (typeof(new_trail) === 'undefined') {
      
        $scope.add_trail_error = "The form is not properly filled out";
        return false;
    };
    if (!new_trail.title) 
    {
        $scope.add_trail_error = "Add title";
    }
    else if (!new_trail.date || !is_valid_date(new_trail.date))
    {
        $scope.add_trail_error = "You must provide a date in format yyyy/mm/dd";
    }
    else if (!new_trail.description)
    {
        $scope.add_trail_error = "Tell us more about your hike";
    }
    else if (!new_trail.name)
    {
        $scope.add_trail_error = "Missing name - six characters";
    }
    else {
        $scope.trails.push( new_trail );
        $scope.adding_trail = {};
        $scope.add_trail_error = "";
    };
};
function is_valid_date (the_date){
        //http://eloquentjavascript.net/09_regexp.html
        if (the_date.match(/^[0-9]{4,4}\/[0-9]{2,2}\/[0-9]{2,2}$/)){
            var d = new Date(the_date);
            return !(isNaN(d.getTime()));
        } else {
            return false;
        };
    };

  });
}]);

trailControllers.controller('DetailsController', ['$scope', '$http','$routeParams', function($scope, $http, $routeParams) {
  $http.get('js/data.json').success(function(data) {
    $scope.trails = data;
    $scope.whichItem = $routeParams.itemId;

    if ($routeParams.itemId > 1) {
      $scope.prevItem = Number($routeParams.itemId)-1;
    } else {
      $scope.prevItem = $scope.trails.length-1;
    }

    if ($routeParams.itemId < $scope.trails.length-1) {
      $scope.nextItem = Number($routeParams.itemId)+1;
    } else {
      $scope.nextItem = 0;
    }


    

  });

}]);

