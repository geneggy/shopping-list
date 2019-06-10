/* eslint-disable no-console */
/* eslint-disable no-undef */
'use strict';

// adding items function
//toggle items function
// delete items function

//shopping list data model
const STORE = [
  {name: 'apples', checked: false},
  {name: 'oranges', checked: false},
  {name: 'milk', checked: true},
  {name: 'bread', checked: false}
];

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
// for each item in store, generate a string representing a <li> with item name rendered as inner text
//items index in the STORE set as a data attribute on the <li>
//checked state rendered as the presence or absence of css class .shopping-item_+checked from index.css

  const shoppingListItemsString = generateItemString(STORE);

  //render the shopping list into the DOM
  $('.js-shopping-list').html(shoppingListItemsString);
}


function addItemToArray(itemName) {
  STORE.push({name: itemName, checked: false});
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

//function to change check status in store array
function checkToggle(itemId) {
  const item = STORE.find(item => item.id === itemId);
  item.checked = !item.checked;
}

//grabs item ID
function getItemId(item) {
  return $(item).closest('li').data('item-id');
}


function handleCheckItem() {
  $('.shopping-list').on('click','.shopping-item-toggle', event => {
    const id = getItemId(event.currentTarget);
    checkToggle(id);
    renderList();
  });
}

//function to 

// should be able to delete items on the STORE array
function deleteItem() {
  $('.shopping-list').on('click','.shopping-item-delete', event => {
    $(event.currentTarget).closest('li').remove();
  });
}


//responsible for calling all other funcitons.  Callback funciton when app is ready.
function handleShoppingList() {
  renderList();
  handleItemSubmit();
  deleteItem();
  handleCheckItem();
}

$(handleShoppingList);

