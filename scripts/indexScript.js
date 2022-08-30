let currentForm = "none";
let user;

// When the page finishes loading check for a user 
document.addEventListener("DOMContentLoaded", function() {
    //localStorage.clear(); // <-- easily delete the storage for debugging and testing purposes
    //sessionStorage.clear();
    checkLocalStorage();
    console.log(localStorage);
    console.log(sessionStorage);
});

var setUserEls = function() {
    //Set everything on the page that uses the username
    let usernameEls = document.querySelectorAll('.USERNAME');
    usernameEls.forEach(function(element) {
        element.innerHTML = ', ' + user;
        element.classList.remove('hidden');
    });
}

var SIGNUP = function(e, signupForm) {
    // dont submit yet
    e.preventDefault();

    // check form validity
    if (signupForm.elements['username'].value != null && signupForm.elements['password'].value != null) { 
        //signupForm.submit(); // don't submit yet because it causes [ crbug/1173575, non-JS module files deprecated. ] error

        // set the username
        let user = signupForm.elements['username'].value;
        // password only exists here so its not saved on the page constantly
        let password = signupForm.elements['password'].value


        // add username and password to localStorage 
        let previousUsers = JSON.parse(localStorage.getItem('allUsers'));
        let previousPasswords = JSON.parse(localStorage.getItem('allPasswords'));

        previousUsers[previousUsers.length] = user; // add current user into previous users
        previousPasswords[previousPasswords.length] = password; // add current password into previous users

        // Update local storage users, passwords, and whether anyone has signed up before
        localStorage.setItem('allUsers', JSON.stringify(previousUsers));
        localStorage.setItem('allPasswords', JSON.stringify(previousPasswords));
        localStorage.setItem('hasAUser', true);

        // for this session allow there to be a user and let all pages know someone signed in
        sessionStorage.setItem('signedIn', true);
        sessionStorage.setItem('currentUser', user);

        setUserEls();
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

        for(let i = 0; i < allUsers.length; i++) {
            if (allUsers[i] == testUser) {
                // check all passwords
                if (allPasswords[i] == testPassword) {
                    // set the current username
                    user = testUser;
                    sessionStorage.setItem('signedIn', true);
                    sessionStorage.setItem('currentUser', user);
                    break;
                }
            }
        }
        setUserEls();

    }
    

}

var checkLocalStorage = function() {
    // Check if users have been defined before
    if (localStorage.getItem('hasAUser')) {
        // if there are users than check the current user

    } else {
        // if there are no uses make them
        let allUsers = ['bob', 'marley', 'john', 'brown'];
        localStorage.setItem('allUsers', JSON.stringify(allUsers));
        localStorage.setItem('allPasswords', JSON.stringify(allUsers)); // passwords for generic users are generic
        localStorage.setItem('hasAUser', false);
    }

    // check current user will happen either way
    checkCurrentUser();

    // avoid unnessecary error messages by checking if the current document contains the eement
    if (document.getElementById('signupForm2')) {
        // add event listeners to the form on the second page so it can be used at any time
        let signupForm2 = document.querySelector('#signupForm2');
        signupForm2.addEventListener('submit', function(event) {
            SIGNUP(event, signupForm2);
        });
    }
}

// Check currentUser will only work after a log in or a sign up sets the user
var checkCurrentUser = function() {

    if(JSON.parse(sessionStorage.getItem('signedIn'))) {
        user = sessionStorage.getItem('currentUser');
        setUserEls();
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
            SIGNUP(event, signupForm);
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
if (document.URL.includes('index.html')) { // if the correct page is loaded
    const dateStamp = document.getElementById('dateStampEl');
    dateStamp.innerText = dateStamp.innerText + " " + Date();
}