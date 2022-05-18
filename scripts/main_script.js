var app = angular.module('myApp', ['ngRoute', 'angularUtils.directives.dirPagination']);

app.controller('myController', function ($scope, $location) {
    $scope.klasses = [
        { name: 'Lop', parentID: 0, prefix: '', belong: 'none', orderBy: 1000 },
        { name: 'Lop 10', parentID: 10, prefix: '', belong: 'none', orderBy: 2000 },
        { name: 'Lop 10A1', parentID: 10, prefix: '____', belong: 'Lop 10', orderBy: 2750 },
        { name: 'Lop 10A2', parentID: 10, prefix: '____', belong: 'Lop 10', orderBy: 2850 },
        { name: 'Lop 11', parentID: 11, prefix: '', belong: 'none', orderBy: 3000 },
        { name: 'Lop 11A', parentID: 11, prefix: '__', belong: 'Lop 11', orderBy: 3500 },
        { name: 'Lop 11A1', parentID: 11, prefix: '____', belong: 'Lop 11', orderBy: 3625 },
        { name: 'Lop 11A2', parentID: 11, prefix: '____', belong: 'Lop 11', orderBy: 3687 },
        { name: 'Lop 11B', parentID: 11, prefix: '__', belong: 'Lop 11', orderBy: 3750 },
        { name: 'Lop 11C', parentID: 11, prefix: '__', belong: 'Lop 11', orderBy: 3875 },
        { name: 'Lop 12', parentID: 12, prefix: '', belong: 'none', orderBy: 4000 },
        { name: 'Lop 12A', parentID: 12, prefix: '__', belong: 'Lop 12', orderBy: 4500 },
        { name: 'Lop 12A1', parentID: 12, prefix: '____', belong: 'Lop 12', orderBy: 4625 },
        { name: 'Lop 12A2', parentID: 12, prefix: '____', belong: 'Lop 12', orderBy: 4687 },
        { name: 'Lop 12B', parentID: 12, prefix: '__', belong: 'Lop 12', orderBy: 4750 },
    ];

    $scope.students = [
        { name: 'Nam', age: new Date(2004, 01, 01), klass: 'Lop 10A1' },
        { name: 'Bede', age: new Date(2006, 01, 01), klass: 'Lop 10A2' },
        { name: 'Hoho', age: new Date(2003, 01, 01), klass: 'Lop 10A2' },
        { name: 'Kaka', age: new Date(2002, 01, 01), klass: 'Lop 11A1' },
        { name: 'Benben', age: new Date(2004, 01, 01), klass: 'Lop 11A2' },
        { name: 'Lunu', age: new Date(2006, 01, 01), klass: 'Lop 12A1' },
        { name: 'Lpaa', age: new Date(2001, 01, 01), klass: 'Lop 12A2' }
    ];

    $scope.calculateAge = function (birthdate) {
        return (new Date().getFullYear()) - (new Date(birthdate).getFullYear());
    }

    $scope.studentDefault = $scope.students.slice();
    $scope.inputDataSearch = {};

    $scope.search = function () {
        var tempName = $scope.inputDataSearch.name;
        var tempAge = $scope.inputDataSearch.age;
        var tempKlass = $scope.inputDataSearch.klass;

        $scope.students = angular.copy(_.filter($scope.studentDefault,
            function (student) {
                return ((tempAge === null || tempAge === undefined) || (tempAge !== null && tempAge !== undefined && $scope.calculateAge(student.age) == tempAge)) &&
                    ((tempKlass === null || tempKlass === undefined) || (tempKlass !== null && tempKlass !== undefined && student.klass.includes(tempKlass))) &&
                    ((tempName === null || tempName === undefined) || (tempName !== null && tempName !== undefined && student.name.includes(tempName)));
            }));
        alert(angular.toJson($scope.students));
    };

    $scope.addStudent = function () {
        $location.path('/addStudent');
    }

    $scope.saveAddStudent = function (name, age, klass) {
        if (
            (name != null || name != undefined) &&
            (age != null || age != undefined) &&
            (klass != null || klass != undefined)
        ) {
            var tempStudent = { name: name, age: $scope.calculateAge(age), klass: klass };

            $scope.students.push(tempStudent);
            $scope.studentDefault.push(tempStudent);

            $location.path('/student');

        }
    }

    $scope.editStudent = function (student) {
        $scope.student = student;
        $location.path('/editStudent');
    }

    $scope.saveEditStudent = function (name, age, klass) {
        if ((name != null || name != undefined) && (age != null || age != undefined) && (klass != null || klass != undefined)) {
            var index = $scope.studentDefault.indexOf(name);

            $scope.studentDefault.splice(index, 1);
            $scope.studentDefault.push({ name: name, age: age, class: klass });

            $location.path('/student');
        }
    }

    $scope.deleteStudent = function (students) {
        var index = $scope.students.indexOf(students);
        var index = $scope.studentDefault.indexOf(students);

        $scope.students.splice(index, 1);
        $scope.studentDefault.splice(index, 1);
    }

    $scope.addClass = function () {
        $location.path('/addClass');
    }

    $scope.saveAddClass = function (name, belong) {
        if ((name != null || name != undefined) &&
            (belong != null || belong != undefined)
        ) {
            let index = $scope.klasses.findIndex(temp => temp.name === belong);
            var tempOrderByBefore = $scope.klasses[index].orderBy * 1;
            var tempOrderByAfter = $scope.klasses[index + 1].orderBy * 1;
            var result = (tempOrderByBefore + tempOrderByAfter) / 2;
            var tempKlass = {
                name: name,
                parentID: $scope.klasses[index].parentID,
                prefix: $scope.klasses[index].prefix + '__',
                belong: belong,
                orderBy: result
            };

            $scope.klasses.push(tempKlass);

            $location.path('/class');
        }
    }

    $scope.editClass = function (klass, belong) {
        if (belong == 'none') {
            alert("Ban khong the sua lop nay!");
        } else {
            $scope.klass = klass;
            $location.path('/editClass');
        }
    }

    $scope.saveEditClass = function (name, belong) {
        if ((name != null || name != undefined) &&
            (belong != null || belong != undefined)
        ) {
            $location.path('/class');
        }
    }

    $scope.deleteClass = function (klass) {
        var index = $scope.klasses.indexOf(klass);
        $scope.klasses.splice(index, 1);
    }
});
