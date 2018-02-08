// Initialize Firebase
  var config = {
    apiKey: "AIzaSyAKbp5Fok4UvJmfFirCJjR6Jdt3x9vyxuY",
    authDomain: "auth-lab2.firebaseapp.com",
    databaseURL: "https://auth-lab2.firebaseio.com",
    projectId: "auth-lab2",
    storageBucket: "auth-lab2.appspot.com",
    messagingSenderId: "43200638651"
  };
  firebase.initializeApp(config);

  const db = firebase.database();

//github provider object
var provider = new firebase.auth.GithubAuthProvider();

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      
        console.log('onAuthStateChanged: user is signed in', user);

        //go to account page
        gotoAccountPage(user);


    } else {
      // User is signed out.
      // ...
    console.log('onAuthStateChanged: user is signed out');
    }
  });


window.addEventListener('load', function(event) {

  var btnLogin = document.getElementById('btnLogIn');
  var btnLogOut = document.getElementById('logOut');

  btnLogIn.addEventListener('click', function(event){

      //To sign in with a pop-up window, call signInWithPopup
      firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        var token = result.credential.accessToken;
        console.log('Token: ' + token);
        // The signed-in user info.
        var user = result.user;
        console.log('User info: ' + user) 

        // Here comes code for account page
        gotoAccountPage(user);


      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        console.log('sign in is uncessful: ' + errorMessage);
      });//end of signInWithPopup function
  })//end of btnLogIn eventListener


  // Klicka på knappen för att logga in med redirect
  /*  document.getElementById('btnRedirect').addEventListener('click', function(e) {
      firebase.auth().signInWithRedirect(provider);
    });*/



  //Sign out functionality

  btnLogOut.addEventListener('click', function(event) {
      firebase.auth().signOut().then(function(result) {
        console.log('Signed out user');
        btnLogOut.innerText = 'Logged out';

        //changing back to front page
        var wrap = document.getElementById('wrap');
        wrap.style.display = 'block';

        var accountWrap = document.getElementById('accountWrap');
        accountWrap.style.display = 'none';

      })
      .catch(function(error) {
        console.log('Signout failed');
      })
    })

	

}); //windows.load

//changing into account page
function gotoAccountPage(userObj){
  console.log('User is here');
  // User is signed in.
        let user = userObj;
        var displayName = user.displayName;
        //console.log('display name: ' + displayName);
        var email = user.email;
        //console.log('Email: ' + email);
        var emailVerified = user.emailVerified;
        //console.log('Email verfiied: ' + emailVerified);
        var photoURL = user.photoURL;
        //console.log('photoURL: ' + photoURL);
        var isAnonymous = user.isAnonymous;
        //console.log('isAnonymous:' + isAnonymous);
        var uid = user.uid;
        //console.log('user id: ' + uid);
        var providerData = user.providerData;
        //console.log('providerData: ' + providerData);

        //window.location ='http://localhost/Lab2-Auth/account.html';
        
  //Button sign out pops up when user log in
  var btnLogOut = document.getElementById('logOut');
  btnLogOut.style.display = 'block'; 
  btnLogOut.innerText = 'Sign out';

    //Change into account page
  var wrap = document.getElementById('wrap');
  wrap.style.display = 'none';

  var accountWrap = document.getElementById('accountWrap');
  accountWrap.style.display = 'block';

  //Filling out account info
  var usernameP = document.getElementById('usernameP');
  usernameP.innerText = 'Username :  ' + displayName;

  var emailP = document.getElementById('emailP');
  emailP.innerText = 'Email :  ' + email;

  var uidP = document.getElementById('uidP');
  uidP.innerText = 'User id :  ' + uid;

  var footerPic = document.getElementById('footerPic');
  footerPic.src = photoURL;


  //Changing characters

  //generating random number between 1-20
  var randomNr = Math.floor((Math.random() * 20) + 1);
  console.log('Random number: ' + randomNr);

  fetchFromDB(randomNr);

  

}//end of gotoAccountPage

function fetchFromDB(number){

  var key = number;

  //retrieving single object från DB and publishing
  db.ref('characters/' + key).on('value', function(snapshot) {
    let data = snapshot.val();
    console.log('Here is single data: ' + data);
    
        console.log('Name: ' + data.name);
        console.log('Pic src: ' + data.src);
        console.log('Trait1: ' + data.trait1);
        console.log('Trait2: ' + data.trait2);
        console.log('Trait3: ' + data.trait3);
        console.log('Trait4: ' + data.trait4);


      var titleH3 = document.getElementById('titleH3');
      titleH3.innerText = 'You are ' + data.name;

      var pic = document.getElementById('pic');
      pic.src = data.src;

      var traitP1 = document.getElementById('traitP1');
      traitP1.innerText = data.trait1;

      var traitP2 = document.getElementById('traitP2');
      traitP2.innerText = data.trait2;

      var traitP3 = document.getElementById('traitP3');
      traitP3.innerText = data.trait3;

      var traitP4 = document.getElementById('traitP4');
      traitP4.innerText = data.trait4;


  })

} //end of function fetch from DB








	

