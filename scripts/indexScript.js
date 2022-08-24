
let hiddenUntilMouseOverEls = document.querySelectorAll('.hiddenUntilMouseOver');
hiddenUntilMouseOverEls.forEach(function (hiddenEl) {
    
    console.log(hiddenEl);
    hiddenEl.onmouseenter = function() {
        console.log("mouseOver");
        hiddenEl.style.display = "block";
    }

});