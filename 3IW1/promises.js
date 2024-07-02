function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getStudents() {
  return new Promise(function (resolve) {
    setTimeout(() => {
      resolve([
        { name: "Dupont", cours: [1, 3, 5] },
        { name: "Lea", cours: [2, 4] },
        { name: "Charles", cours: [1] },
      ]);
    }, randomInt(1, 2));
  });
}
function getCourses() {
  return new Promise(function (resolve) {
    setTimeout(() => {
      resolve([
        { id: 1, name: "JS" },
        { id: 2, name: "PHP" },
        { id: 3, name: "C#" },
        { id: 4, name: "F#" },
        { id: 5, name: "CSS" },
      ]);
    }, randomInt(2, 4));
  });
}

function mapStudents(students, courses) {
  return new Promise(function (resolve) {
    setTimeout(() => {
      resolve(
        students.map((student) => {
          student.cours = student.cours.map((idCours) =>
            courses.find(({ id }) => id === idCours)
          );
          return student;
        })
      );
    }, randomInt(1, 4));
  });
}

function timer() {
  return new Promise(function (resolve, reject) {
    setTimeout(reject, 7);
  });
}

function saveDb(result) {}

function main() {
  return Promise.all([getStudents(), getCourses()]).then((results) => {
    const [students, courses] = results;
    mapStudents(students, courses).then((result) => saveDb(result));
  });
}

Promise.race([main(), timer()])
  .then(() => console.log("Merge OK"))
  .catch(() => console.log("Timeout"));
