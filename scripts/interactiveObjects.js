
// Current key is used to decide whether or not to show content from the .hiddenContent class
var currentKey = 'none';
// These are the items in the hidden content class
let gameCanvas = document.querySelector('.gameCanvas');
let loginForm = document.querySelector('.loginForm');
let funnyImage = document.querySelector('.funnyImage');


// These are elements that have some interaction
let enlargableElements = document.querySelectorAll('.enlargeOnMouseOver');
let hiddenUntilMouseOverEls = document.querySelectorAll('.hiddenUntilMouseOver');

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
enlargableElements.forEach(function (enlargableEl) {
    enlargableEl.addEventListener('mouseenter', function() { enlargeElement(this) });
    enlargableEl.addEventListener('mouseleave', function() { unenlargeElement(this) });
});


/* Unlock content with drag and drop "keys" */
var unlockCurrentKey = function() {

    // add the hidden class to everything so the correct thing can be unhidden
    gameCanvas.classList.add('hidden');
    loginForm.classList.add('hidden');
    funnyImage.classList.add('hidden');

    if (currentKey == 'GameKey') {
        gameCanvas.classList.remove('hidden');
        activateGame();
    }
    else if (currentKey == 'TextKey') {
        // reveal the hidden content 
        loginForm.classList.remove('hidden');
        // show the correct form
        checkCurrentForm();
    }
    else if (currentKey == 'ImageKey') {
        funnyImage.classList.remove('hidden');
    }
    
}


/*  Drag 
    and drop
    objects 
*/ 

function dragStart(e) {
    // Wait until the object is dropped 
    setTimeout(() => {
        e.target.classList.add('hideItem');
    }, 0);
}

function dragEnter(e) {
    // Keep the item from doing default behaiviors and make it do .drag-over instead
    e.preventDefault();
    e.target.classList.add('drag-over');
}

function dragOver(e) {
    e.preventDefault();
    e.target.classList.add('drag-over');
}

function dragLeave(e) {
    e.target.classList.remove('drag-over');
}

function drop(e) {
    e.target.classList.remove('drag-over');

    let allItems = document.querySelectorAll('.item');
    allItems.forEach(function (item) {
    
        if (item.classList.contains('hideItem')) {
            // Give item to new container
            e.target.appendChild(item); 

            // Check if the item is in the last container (the lock)
            let lock = document.querySelector('#content-key').lastElementChild;
            
            // Get the item
            let itemKey = lock.lastElementChild;  // (Check it before removing hideItem so that we know this item is the current item being interacted with)
            if (itemKey.querySelector('.key')) {
                // If its an item in the lock, get the element with the key name
                let key = itemKey.querySelector('.key');
                // Set the key for the page
                currentKey = key.innerHTML;
            } else {
                // If there is no key in the lock - reset
                currentKey = 'none';
            }
            unlockCurrentKey();
        }

            
            // display the item
            item.classList.remove('hideItem');
    });
        
}
// DragAndDropArea is an object that takes a certain layout in the html and handles itself entirely
// Takes the id of whatever has the class .DragAndDropArea to start creating itself 
var DragAndDropArea = function(id) {
    // Wrapper - containers - items
    this.dadElement = document.querySelector('#'+id);
    this.containers = this.dadElement.querySelectorAll('.item-container');
    this.items = this.dadElement.querySelectorAll('.item');

    let itemNum = 0;
    let containerNum = 0;
    
    // Organize the items in the containers by number on creation
    this.setItemsAndContainers = function() {
        // Make sure all items are labeled 
        this.items.forEach(function (item) {

            let itemLabel = item.querySelector('.label');
            // Set the label so it can be identified, but hide it from the page
            itemLabel.innerHTML = "Item " + (itemNum+1);
            itemLabel.style.display="none";
            // Make the item draggable
            item.setAttribute("draggable", true);
            item.addEventListener('dragstart', dragStart);

            // for labeling with numbers
            itemNum++;
        });

        // Give  containers eventListeners
        let containerNum = 0;
        this.containers.forEach(function(container) {
            let containerLabel = container.querySelector('.label');
            // Set the label so it can be identified, but hide it from the page
            containerLabel.innerHTML = "Container " + (containerNum+1);
            containerLabel.style.display="none";

            container.addEventListener('dragenter', dragEnter);
            container.addEventListener('dragover', dragOver);
            container.addEventListener('dragleave', dragLeave);
            container.addEventListener('drop', drop);

            containerNum++;
        });

        // Set it back to 0 so it can be used for organizing
        itemNum = 0;
        startItemNum = this.items.length; // Fixes an error with nodes
        while (itemNum < startItemNum) {
            // start back at the first container instead of stacking somewhere else
            if (containerNum > this.containers.length-1) {
                containerNum = 0;
            }
            // Get the container and then take the item from the main div 
            // and adppend it to the container
            let container = this.containers[containerNum];
            let item = this.items[itemNum];
            container.appendChild(item);
            itemNum++;
            containerNum++;
        }
    }

}

// Create drag and drop objects
let itemSorter = new DragAndDropArea('item-sorter');
itemSorter.setItemsAndContainers();

let contentKey = new DragAndDropArea('content-key');
contentKey.setItemsAndContainers();