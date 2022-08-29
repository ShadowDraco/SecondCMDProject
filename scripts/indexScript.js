// User is a session variable to display username
let user;
// signed in is for the specific session as well
let signedIn = false;
let currentForm = "none";

// When the page finishes loading check for a user 
document.addEventListener("DOMContentLoaded", function() {
    //localStorage.clear(); // <-- easily delete the storage for debugging and testing purposes
    checkLocalStorage();

});

var SIGNUP = function(e) {
    // dont submit yet
    e.preventDefault();

    // check form validity
    if (signupForm.elements['username'].value != null && signupForm.elements['password'].value != null) { 
        //signupForm.submit(); // don't submit yet because it causes [ crbug/1173575, non-JS module files deprecated. ] error

        // set the username
        user = signupForm.elements['username'].value;
        // password only exists here so its not saved on the page constantly
        let password = signupForm.elements['password'].value

        //Set everything on the page that uses the username
        let usernameEls = document.querySelectorAll('.USERNAME');
        usernameEls.forEach(function(element) {
            element.innerHTML = ', ' + user;
            element.classList.remove('hidden');
        });

        // add username and password to localStorage 
        let previousUsers = JSON.parse(localStorage.getItem('allUsers'));
        let previousPasswords = JSON.parse(localStorage.getItem('allPasswords'));

        previousUsers[previousUsers.length] = user; // add current user into previous users
        previousPasswords[previousPasswords.length] = password; // add current password into previous users

        localStorage.setItem('allUsers', JSON.stringify(previousUsers));
        localStorage.setItem('allPasswords', JSON.stringify(previousPasswords));
        localStorage.setItem('hasAUser', true);
        signedIn = true;
        console.log(localStorage);
    }
}

var LOGIN = function(e) {
     // dont submit yet
     e.preventDefault();

     // check form validity
     if (loginForm.elements['username'].value != null && loginForm.elements['password'].value != null) { 
         //signupForm.submit(); // don't submit yet because it causes [ crbug/1173575, non-JS module files deprecated. ] error
       
         // Check the user and password against local storage
         let testUser = loginForm.elements['username'].value; 
         let testPassword = loginForm.elements['password'].value;
         // tests are current, all is local storage
         let allUsers = JSON.parse(localStorage.getItem('allUsers'));
         let allPasswords = JSON.parse(localStorage.getItem('allPasswords'));

        for(let i=0; i<allUsers.length; i++) {
            if (allUsers[i] == testUser) {
                // check all passwords
                if (allPasswords[i] == testPassword) {
                    // set the current username
                    user = testUser;
            
                    //Set everything on the page that uses the username
                    let usernameEls = document.querySelectorAll('.USERNAME');
                    usernameEls.forEach(function(element) {
                        element.innerHTML = ', ' + user;
                        element.classList.remove('hidden');
                    });
                }
            }
        }

    }
    

}

var checkLocalStorage = function() {
    // Check if users have been defined before
    if (localStorage.getItem('hasAUser')) {
        // if there are users than check the current user
        console.log("hasAUser");
    } else {
        // if there are new uses make them
        let allUsers = ['bob', 'marley', 'john', 'brown'];
        localStorage.setItem('allUsers', JSON.stringify(allUsers));
        localStorage.setItem('allPasswords', JSON.stringify(allUsers)); // passwords for generic users are generic
        localStorage.setItem('hasAUser', false);
    }
    checkCurrentUser();
}

// Check currentUser will only work after a log in or a sign up sets the user
var checkCurrentUser = function() {

    if(signedIn) {
        user = JSON.parse(localStorage.getItem(allUsers[user]));
    } else {
        user = 'none';
    }
}

var checkCurrentForm = function() {

    // If the form is supposed to be active defne it all and show the proper thing
    if (currentKey == 'TextKey') {

        // Check which form should be shown
        if (JSON.parse(localStorage.getItem('hasAUser'))) {
            currentForm = "login";
        } else {
            currentForm = "signup";
        }

        // define and hide both forms 
        signupForm = document.querySelector('#signupForm');
        loginForm = document.querySelector('#loginForm');
        // add  hidden class to both then decide which to show later
        signupForm.classList.add('hidden');
        loginForm.classList.add('hidden');

        // add eventListeners
        signupForm.addEventListener('submit', function(event) {
            SIGNUP(event);
        });
        loginForm.addEventListener('submit', function(event) {
            LOGIN(event);
        });

        // Show the form that is currently active
        if (currentForm == "signup") {
            // show the form
            signupForm.classList.remove('hidden');

        } else if (currentForm == "login") {
            // show the form
            loginForm.classList.remove('hidden');
        }

    }
}

// update the footer with the current date and time on page load
const dateStamp = document.getElementById('dateStampEl');
dateStamp.innerText = dateStamp.innerText + " " + Date();