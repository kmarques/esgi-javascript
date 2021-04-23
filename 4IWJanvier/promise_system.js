/**
 * function Promise(callback) {
 *     let resolve, reject;
 *     setTimeout(function() {
 *          callback(resolve, reject);
 *     }, 0);
 *
 *     this.then = function(uresolve, ureject) {
 *          uresolve && resolve = uresolve;
 *          ureject && reject = ureject;
 *     }
 *     this.catch = function(ureject) {
 *          ureject && reject = ureject;
 *     }
 * }
 *
 * function async (func, ...args) {
 *    return new Promise((resolve, reject) => {
 *        try {
 *            resolve(func(...args));
 *        } catch (error) {
 *            reject(error);
 *        }
 *    })
 * }
 */
function login(username, password) {
  return new Promise(function (resolve, reject) {
    for (let i = 0; i < 9999999999; i++) {
      //
    }
    console.log("test");
    //reject(new Error('test error'));
    resolve("dzsdezadaz2E423RE3D3E32");
  });
}
/**
 * <==>
 * async function login(username, password) {
 *   for (let i = 0; i < 9999999999; i++) {
 *     ...
 *   }
 *   console.log("test");
 *   //throw new Error('test error');
 *   return "dzsdezadaz2E423RE3D3E32";
 * }
 */

//   ->l1 :  declare login
//   ->l43 : login()
//   ->l2 : new Promise
//   ->l15 : setTimeout
//   ->l46: .then(fn Resolve, fn Reject)
//   ->l20: resolve = uResolve
//   ->l21: reject = uReject
//   ->l61: console.log("End script");
//   //SetTimeout
//   ->l16 : callback(resolve, reject)
//   ->l3: for
//   ->l6: console.log
//   ->l8: resolve("dzsdezadaz2E423RE3D3E32")
//   ->l45: saveToken(token)

// V1
login()
  .then(function (token) {
    saveToken(token).then(function () {
      grabUserMovies(token)
        .then(function (movies) {
          computeMovieList(movies).then(function () {
            console.log("Movie list updated");
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    });
    console.log("login done : " + token);
  })
  .catch(function (error) {
    console.log(error);
  });
console.log("End script");
// <==> v2
login()
  .then((token) => saveToken(token))
  .then(() => grabUserMovies(token))
  .then((movies) => computeMovieList(movies))
  .then(() => console.log("Movie list updated"))
  .catch(function (error) {
    if (error instanceof LoginError) {
      console.error("Login error", error.fields);
    }
    if (error instanceof PermissionError) {
      console.error("Permission error", error.permission);
    }
  });
console.log("End script");
// <==> V3
async function start() {
  try {
    const token = await login();
    await saveToken(token);
    const movies = await grabUserMovies(token);
    await computeMovieList(movies);
    console.log("Movie list updated");
  } catch (error) {
    if (error instanceof LoginError) {
      console.error("Login error", error.fields);
    }
    if (error instanceof PermissionError) {
      console.error("Permission error", error.permission);
    }
  }
}
start();
console.log("End script");
// <==> V4
(async () => {
  try {
    const token = await login();
    await saveToken(token);
    const movies = await grabUserMovies(token);
    await computeMovieList(movies);
    console.log("Movie list updated");
  } catch (error) {
    if (error instanceof LoginError) {
      console.error("Login error", error.fields);
    }
    if (error instanceof PermissionError) {
      console.error("Permission error", error.permission);
    }
  }
})();
(async () => {
  try {
    const token = await login2();
    await saveToken2(token);
    const movies = await grabUserMovies2(token);
    await computeMovieList2(movies);
    console.log("Movie list updated");
  } catch (error) {
    if (error instanceof LoginError) {
      console.error("Login error", error.fields);
    }
    if (error instanceof PermissionError) {
      console.error("Permission error", error.permission);
    }
  }
})();
console.log("End script");

//Synchrone
//  -> l119: declare anonymous function 1
//  -> l134: play anonymous function 1
//  -> l135: declare anonymous function 2
//  -> l150: play anonymous function 2
//  -> l151: console.log("End script");
//  -> l121: login
//  -> l137: login2
//  -> l122: saveToken
//  -> l138: saveToken2
//  -> l123: grabUserMovies
//  -> l139: grabUserMovies2
//  -> l124: computeMovieList
//  -> l125: console.log("Movie list updated");
//  -> l140: computeMovieList2
//  -> l141: console.log("Movie list 2 updated");
//Asynchrone
