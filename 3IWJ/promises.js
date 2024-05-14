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

function wait(timing) {
  return new Promise(function (resolve) {
    setTimeout(resolve, timing);
  });
}

function getStudents() {
  return wait(randomInt(1, 2) * 1000).then(function () {
    return [
      { name: "Dupont", courses: [1, 3, 5] },
      { name: "Lea", courses: [2, 4] },
      { name: "Charles", courses: [1] },
    ];
  });
}
function getCourses() {
  return wait(randomInt(2, 4) * 1000).then(function () {
    return [
      { id: 1, name: "JS" },
      { id: 2, name: "PHP" },
      { id: 3, name: "C#" },
      { id: 4, name: "F#" },
      { id: 5, name: "CSS" },
    ];
  });
}

function mapStudents(students, courses) {
  return wait(randomInt(1, 4) * 1000).then(function () {
    return students.map(function (student) {
      student.courses = student.courses.map(function (idCourse) {
        return courses.find(function (course) {
          return course.id === idCourse;
        });
      });
      return student;
    });
  });
}

function mainProcess() {
  return Promise.all([getCourses(), getStudents()]).then(function (results) {
    return mapStudents(results[1], results[0]).then(function (students) {
      return students;
    });
  });
}

function timer() {
  return wait(2 * 1000).then(function(){
    return Promise.reject();
  });
}

Promise.race([mainProcess(), timer()])
.then(function() {
  console.log("Merge OK");
})
.catch(function() {
  console.log('Timeout');
})
