/* eslint-disable no-console */
/* eslint-disable no-undef */
'use strict';

// adding items function
//toggle items function
// delete items function

//shopping list data model
const STORE = {
  items: [
    {id: cuid(), name: 'apples', checked: false},
    {id: cuid(), name: 'oranges', checked: false},
    {id: cuid(), name: 'milk', checked: true},
    {id: cuid(), name: 'bread', checked: false}
  ],
  hideCompleted: false
};

//function to generate shopping items element
function generateItemElement(item) {
  return `
  <li data-item-id="${item.id}">
    <span class="shopping-item js-shopping-item ${item.checked ? 'shopping-item__checked' : ''}">${item.name}</span>
    <div class="shopping-item-controls">
      <button class="shopping-item-toggle">
          <span class="button-label">check</span>
      </button>
      <button class="shopping-item-delete">
          <span class="button-label">delete</span>
      </button>
    </div>
  </li>`;
}

//function to generate shopping item string
function generateItemString(storedList) {
  const items = storedList.map((item) => generateItemElement (item));
  return items.join('');
}

//A shopping List should be rendered to the page
function renderList() {
  // set up a copy of the store's items in a local variable that we will reassign to a new
  // version if any filtering of the list occurs
  let filteredItems = STORE.items;

  if (STORE.hideCompleted) {
    filteredItems = filteredItems.filter(item => !item.checked);
  }

  const shoppingListItemsString = generateItemString(filteredItems);

  //render the shopping list into the DOM
  $('.js-shopping-list').html(shoppingListItemsString);
}


function addItemToArray(itemName) {
  STORE.items.push({id: cuid(), name: itemName, checked: false});
}

//should be able to add items to the STORE array
function handleItemSubmit() {
  $('#js-shopping-list-form').submit(event => {
    event.preventDefault();
    let itemEntry = $('#shopping-list-entry').val();

    //clears entry box for new user input
    $('.js-shopping-list-entry').val('');
    
    //submits adds entry to STORE array
    addItemToArray(itemEntry);

    //render list again with new input
    renderList();

  });
}

//grabs item ID
function getItemId(item) {
  return $(item).closest('li').data('item-id');
}

//function to change check status in store array
function checkToggle(itemId) {
  const item = STORE.items.find(item => item.id === itemId);
  item.checked = !item.checked;
}

function handleCheckItem() {
  $('.shopping-list').on('click','.shopping-item-toggle', event => {
    const id = getItemId(event.currentTarget);
    checkToggle(id);
    renderList();
  });
}

// should be able to delete items on the STORE array at the current index
function deleteItemInArray (itemId) {
  const itemIndex = STORE.items.findIndex(item => item.id === itemId);
  STORE.items.splice(itemIndex, 1);
}

function handleDeleteItem() {
  $('.shopping-list').on('click','.shopping-item-delete', event => {
    const id = getItemId(event.currentTarget);
    deleteItemInArray(id);
    renderList();
  });
}

// Toggles the STORE.hideCompleted property
function toggleHideFilter() {
  STORE.hideCompleted = !STORE.hideCompleted;
}

// Places an event listener on the checkbox for hiding completed items
function handleToggleHideFilter() {
  $('.js-hide-completed-toggle').on('click', () => {
    toggleHideFilter();
    renderList();
  });
}


//responsible for calling all other funcitons.  Callback funciton when app is ready.
function handleShoppingList() {
  renderList();
  handleItemSubmit();
  handleDeleteItem();
  handleCheckItem();
  handleToggleHideFilter();
}

// call handleShoppingList when page loads
$(handleShoppingList);

