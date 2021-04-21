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
// <==>
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
