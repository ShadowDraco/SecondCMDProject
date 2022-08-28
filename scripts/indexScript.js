let user = "none";
let currentForm = "blah";

var checkCurrentUser = function() {
    if (user == "none") {
        currentForm = "signup";
    } else {
        currentForm = "login";
    }

    // define and hide both forms 
    signupForm = document.querySelector('#signupForm');
    loginForm = document.querySelector('#loginForm');
           
    signupForm.classList.add('hidden');
    loginForm.classList.add('hidden');
    // Show the form that is currently active
    if (currentForm == "signup") {
        signupForm.classList.remove('hidden');
    } else if (currentForm == "login") {
        loginForm.classList.remove('hidden');
    }
}

// update the footer with the current date and time on page load
const dateStamp = document.getElementById('dateStampEl');
dateStamp.innerText = dateStamp.innerText + " " + Date();

