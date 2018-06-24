// # Without directly modifying the data structures, create a script in either
// # python or javascript that cycles through all the parents and prints to the
// # terminal the proper activities for their child's age group. When there are no
// # more activities for that parent, print “Curriculum complete!”..
// #
// # (Make sure your script accounts for any edge cases in the provided data!)

parents = {
    'Henry': {'childName': 'Calvin', 'age': 1},
    'Ada': {'childName': 'Lily', 'age': 4},
    'Emilia': {'childName': 'Petra', 'age': 2},
    'Biff': {'childName': 'Biff Jr', 'age': 3},
    'Milo': {}
}

activities = [
    {
        'age': 1,
        'activity': [
            'Go outside and feel surfaces.',
            'Try singing a song together.',
            'Point and name objects.'
            ]
    },
    {
        'age': 2,
        'activity': [
            'Draw with crayons.',
            'Play with soundmaking toys or instruments.',
            'Look at family pictures together.'
            ]
    },
    {
        'age': 3,
        'activity': [
            'Build with blocks.',
            'Try a simple puzzle.',
            'Read a story together.'
            ]
    }
]

// # Want to really shine and show us your chops?  Work in some of these stretch
// # goals using any tools or libraries you see fit.
// # - Document your creation process with proper git workflow.
// # - Personalize the message output to make it more friendly.
// # - Allow users to input new activities & parents before executing the script.
// # - Print one activity at a time per parent and continue cycling through until
// #   all parents have recieved all their activities.

//declaring the angular module for the app
var app = angular.module("challengeApp",[]);

// main angular controller for the web page
app.controller('mainCtrl',function($scope){    
    // function to assign activities to each parent according to the age of their child
    window.alert('Welcome to the Activity Schedule for your child!');
    var scheduleActivities = function(act, par){
        $scope.activities = act;
        $scope.parent = par;
        var keys = [];
        for(k in parents){
            keys.push(k);
        }
        $scope.key = keys;
        var age_group = [];
        for(c in activities){
            age_group.push(activities[c].age);
        }
        //scope array that will store the scheduled activity list
        $scope.schedule = [];
        for(i in parents) { // for each parent
            if(parents[i].childName) { // for each parents child
            } else {
                $scope.schedule.push({'parent':i,'child':'Name not available.','activity':'Incomplete Info'});
                continue;
            }
            for(a in activities) { // for each activity check the age range and if the child is of the same age then assign the activity to the child
                
                if(!(age_group.includes(parents[i].age))){ // if there is no activity for the child
                    $scope.schedule.push({'parent':i,'child':parents[i].childName,'activity': 'No activity for '+parents[i].childName+'\'s age.','age':parents[i].age});
                    break;
                }
                for(b in activities[a].activity){ // assign activities to the child's activity array
                    if(activities[a].age == parents[i].age){ // if a child can be assigned an activity in a age range lower than his/her age then jsut change '==' with '<='
                        $scope.schedule.push({'parent':i,'child':parents[i].childName,'activity':activities[a].activity[b]});
                    }
                }
            }
        }
    }
    scheduleActivities(activities, parents); // call the scheduling function
    
    // function to save a new activity in the activity array
    $scope.activity_save = function() {
        var age_group = [];
        for(c in activities){
            age_group.push(activities[c].age);
        }
        if(age_group.includes($scope.activity_age)){
            activities[$scope.activity_age-1].activity.push($scope.activity_detail);
        } else {
            activities.push({'age':$scope.activity_age,'activity':[$scope.activity_detail]});
        }
        console.log(activities, parents);
        scheduleActivities(activities, parents);
        window.alert('New activity added!');
    }

    //function to add a new parent-child entry in the parents array
    $scope.parent_save = function() {
        parents[$scope.parent_name] = {'childName':$scope.child_name,'age':$scope.child_age};
        console.log(activities, parents);
        scheduleActivities(activities, parents);
        window.alert('New parent detail added!');
    }
})