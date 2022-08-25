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


/* Drag and drop objects */ 

function dragStart(e) {
    setTimeout(() => {
        e.target.classList.add('hideItem');
    }, 0);
}

function dragEnter(e) {
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
            // display it
            item.classList.remove('hideItem');
        }
        
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
        this.containers.forEach(function(container) {
        
            container.addEventListener('dragenter', dragEnter);
            container.addEventListener('dragover', dragOver);
            container.addEventListener('dragleave', dragLeave);
            container.addEventListener('drop', drop);

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

let itemSorter = new DragAndDropArea('item-sorter');
itemSorter.setItemsAndContainers();

let contentKey = new DragAndDropArea('content-key');
contentKey.setItemsAndContainers();