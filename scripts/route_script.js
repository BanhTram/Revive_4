app.config(function ($routeProvider) {
    $routeProvider

        .when('/', {
            templateUrl: '/partials/student_tab.html'
        })

        .when('/student', {
            templateUrl: '/partials/student_tab.html'
        })

        .when('/addStudent', {
            templateUrl: '/partials/add_student.html'
        })

        .when('/editStudent', {
            templateUrl: '/partials/edit_student.html'
        })

        .when('/class', {
            templateUrl: '/partials/class_tab.html'
        })

        .when('/addClass', {
            templateUrl: '/partials/add_class.html'
        })

        .when('/editClass', {
            templateUrl: '/partials/edit_class.html'
        })

});
