function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const getStudents = function () {
  const random = randomIntFromInterval(1, 2);
  console.log(`getStudents:${random}`);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { name: "Dupont", cours: [1, 3, 5] },
        { name: "Lea", cours: [2, 4] },
        { name: "Charles", cours: [1] },
      ]);
    }, random * 1000);
  });
};

const getCourses = function () {
  const random = randomIntFromInterval(2, 4);
  console.log(`getCourses:${random}`);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: "JS" },
        { id: 2, name: "PHP" },
        { id: 3, name: "C#" },
        { id: 4, name: "F#" },
        { id: 5, name: "CSS" },
      ]);
    }, random * 1000);
  });
};

const mapping = async function () {
  const random = randomIntFromInterval(1, 4);
  console.log(`mapping:${random}`);
  const results = await Promise.all([getStudents(), getCourses()]);
  const students = results[0],
    courses = results[1];
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        students.map((student) => {
          student.cours = student.cours.map((cours) =>
            courses.find((_c) => cours === _c.id)
          );
          return student;
        })
      );
    }, random * 1000);
  });
};

const timer = function () {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject();
    }, 7000);
  });
};

Promise.race([mapping(), timer()])
  .then(() => console.log("Merge OK"))
  .catch(() => console.log("Timeout"));
