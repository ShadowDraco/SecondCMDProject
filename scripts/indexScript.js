let user = "afdaf";
let currentForm = "blah";


// Signup for mwon't go away but log in form will
var checkCurrentUser = function() {
    // Check which form should be shown
    if (user == "none") {
        currentForm = "signup";
    } else {
        currentForm = "login";
    }
    // If the form is supposed to be active defne it all and show the proper thing
    if (currentKey == 'TextKey') {

        // define and hide both forms 
        signupForm = document.querySelector('#signupForm');
        loginForm = document.querySelector('#loginForm');
        // add  hidden class to both then decide which to show later
        signupForm.classList.add('hidden');
        loginForm.classList.add('hidden');
        // Show the form that is currently active
        if (currentForm == "signup") {
            signupForm.classList.remove('hidden');
        } else if (currentForm == "login") {
            loginForm.classList.remove('hidden');
        }
    }
}

// update the footer with the current date and time on page load
const dateStamp = document.getElementById('dateStampEl');
dateStamp.innerText = dateStamp.innerText + " " + Date();

