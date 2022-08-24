/* Define the functions to show and hide 
   - hidden elements -
   with the class .hiddenUntilMouseOver 
*/
revealHiddenElement = function(hiddenEl) {
    hiddenEl.style.opacity=1;
}
hideHiddenElement = function(hiddenEl) {
    hiddenEl.style.opacity=0;
}

// Get every hidden element and add a mouse enter and leave listener to them on page laod
let hiddenUntilMouseOverEls = document.querySelectorAll('.hiddenUntilMouseOver');
hiddenUntilMouseOverEls.forEach(function (hiddenEl) {

    hiddenEl.addEventListener('mouseenter', function () { revealHiddenElement(this); });
    hiddenEl.addEventListener('mouseleave', function () { hideHiddenElement(this); });
});


/* Define the functions to enlarge and unenlarge 
   - enlargable elements -
   with the class .enlargeOnMouseOver 
*/

enlargeElement = function(enlargableEl) {
    enlargableEl.classList.add('enlargedText');
}

unenlargeElement = function(enlargableEl) {
    enlargableEl.classList.remove('enlargedText');
}

// Get every enlargable element and give it event listeners on page load
let enlargableElements = document.querySelectorAll('.enlargeOnMouseOver');
enlargableElements.forEach(function (enlargableEl) {
    enlargableEl.addEventListener('mouseenter', function() { enlargeElement(this) });
    enlargableEl.addEventListener('mouseleave', function() { unenlargeElement(this) });
});