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

var app = angular.module("challengeApp",[]);

app.controller('mainCtrl',function($scope){
    // $scope.schedule = [{'parent':'Parent Name','child':'Child Name','activity':'Activity for the child'}];
    
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
        // console.log("age group ", age_group)
        $scope.schedule = [];
        for(i in parents) {
            // console.log("Hi", i, "! \nWelcome to the activity planner. \nHere you can find all the activities for your little toddler.");
            if(parents[i].childName) {
                // console.log("For",parents[i].childName,"we have the following activities : ");
            } else {
                // console.log("However, we don't have information about your child. So cannot suggest any activity.\n");
                $scope.schedule.push({'parent':i,'child':'Name not available.','activity':'Incomplete Info'});
                continue;
            }
            for(a in activities) {
                // var lookup_age = parents[i].age;
                
                if(!(age_group.includes(parents[i].age))){
                    //console.log("Sorry, we have no activity for", parents[i].age,"year old child!!");
                    $scope.schedule.push({'parent':i,'child':parents[i].childName,'activity': 'No activity for '+parents[i].childName+'\'s age.'});
                    break;
                    // lookup_age--;
                    // console.log("However you can try these activities for a ",lookup_age," year old : ")
                }
                for(b in activities[a].activity){
                    // console.log(b)
                    if(activities[a].age == parents[i].age){
                        $scope.schedule.push({'parent':i,'child':parents[i].childName,'activity':activities[a].activity[b]});
                        // console.log(">",activities[a].activity[b]);
                    }
                }
            }
            // console.log("Curriculum complete!..\n");
        }
    }
    scheduleActivities(activities, parents);
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
    }
    $scope.parent_save = function() {
        parents[$scope.parent_name] = {'childName':$scope.child_name,'age':$scope.child_age};
        console.log(activities, parents);
        scheduleActivities(activities, parents);
    }
})