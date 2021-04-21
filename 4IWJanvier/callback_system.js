function login(username, password, onSuccess, onError) {
  setTimeout(function () {
    for (let i = 0; i < 9999999999; i++) {
      //
    }
    console.log("test");
    onError(new Error('test error'));
    onSuccess("dzsdezadaz2E423RE3D3E32");
  }, 0);
}

login("", "", function (token) {
    saveToken(token, function() {
        grabUserMovies(token, function(movies) {
            computeMovieList(movies, function() {
                console.log("Movie list updated");
            });
        }, function(error) {
            console.log(error);
        });
    });
    console.log("login done : " + token);
},
function(error) {
    console.error(error);
});
console.log("End script");


// Synchro
-> l1
-> l12
-> l2
-> l9
-> l15


// User1
->l3
->l6
->l7
->l13
// User2
->l3
->l6
->l7
->l13
// User3
->l3
->l6
->l7
->l13