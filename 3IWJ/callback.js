// Simulation d’appels serveurs
// Créer une Promise getStudents qui récupère une liste d’étudiants entre 1 et 2 secondes
// EX: [ { name: "Dupont", cours: [ 1, 3, 5 ] }, { name: "Lea", cours: [ 2, 4 ] }, { name: "Charles", cours: [ 1 ] } ]
// Créer une Promise getCourses qui récupère une liste de cours entre 2 et 4 secondes
// EX: [ { id: 1, name: "JS" }, { id: 2, name: "PHP" }, { id: 3, name: "C#" }, { id: 4, name: "F#" }, { id: 5, name: "CSS" } ]
// Créer une Promise qui mappe à l’ensemble des étudiants les cours associés entre 1 et 4 secondes
// EX: [ { name: "Lea", cours: [ { id: 2, name: "PHP" }, { id: 4, name: "F#" } ] }, … ]
// Créer une Promise qui contrôle le temps d’accès global
// Celle-ci doit rejeter si le temps max dépasse 7 secondes
// Afficher la fonction et le temps estimé pour chaque Promise
// EX: "getStudents:2"
// Afficher "Merge OK" si tout s’est bien passé sinon "Timeout"
/**
 * firstFunc(ARG1, function (err, data) {
 *      func3(toto, titi, function(err,data) {
 *         func2(function(err,data) {
 *         })
 *      })
 * })
 */
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function wait(timing, callback) {
  setTimeout(callback, timing);
}

function getStudents(callback) {
  wait(randomInt(1, 2) * 1000, function () {
    callback([
      { name: "Dupont", courses: [1, 3, 5] },
      { name: "Lea", courses: [2, 4] },
      { name: "Charles", courses: [1] },
    ]);
  });
}
function getCourses(callback) {
  wait(randomInt(2, 4) * 1000, function () {
    callback([
      { id: 1, name: "JS" },
      { id: 2, name: "PHP" },
      { id: 3, name: "C#" },
      { id: 4, name: "F#" },
      { id: 5, name: "CSS" },
    ]);
  });
}

function mapStudents(students, courses, callback) {
  wait(randomInt(1, 4) * 1000, function () {
    callback(
      students.map(function (student) {
        student.courses = student.courses.map(function (idCourse) {
          return courses.find(function (course) {
            return course.id === idCourse;
          });
        });
        return student;
      })
    );
  });
}

function mainProcess(callback) {
  let results = {};
  getCourses(function (courses) {
    results.courses = courses;
    if (Object.keys(results).length == 2) {
      mapStudents(results.students, results.courses, function () {
        setTimeout(function () {
          callback("Merge OK");
        }, 0);
      });
    }
  });
  getStudents(function (students) {
    results.students = students;
    if (Object.keys(results).length == 2) {
      mapStudents(results.students, results.courses, function () {
        setTimeout(function () {
          callback("Merge OK");
        }, 0);
      });
    }
  });
}

function timer(callback) {
  wait(7 * 1000, callback);
}

let finished = false;
mainProcess(function (message) {
  if (!finished) {
    console.log(message);
    finished = true;
  }
});
timer(function () {
  if (!finished) {
    console.log("Timeout");
    finished = true;
  }
});
