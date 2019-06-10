/* eslint-disable no-console */
/* eslint-disable no-undef */
'use strict';

// adding items function
//toggle items function
// delete items function

function addItem() {
  $('#js-shopping-list-form').submit(event => {
    event.preventDefault();
    let itemEntry = $('#shopping-list-entry').val();
    console.log(itemEntry);
    let item = 
    `<li>
    <span class = 'shopping-item'>${itemEntry}</span>
    <div class ='shopping-item-controls'>
      <button class ='shopping-item-toggle'>
        <span class = 'button-label' >check</span>
      </button>
      <button class = 'shopping-item-delete'>
        <span class = 'button-label'>delete</span>
      </button>
    </div>
    </li>`;
    $('.shopping-list').append(item);

  });
}
function checkItem() {
  $('.shopping-list').on('click','.shopping-item-toggle', event => {
    $(event.currentTarget).closest('li').find('.shopping-item').toggleClass('shopping-item__checked');
  });
}

function deleteItem() {
  $('.shopping-list').on('click','.shopping-item-delete', event => {
    $(event.currentTarget).closest('li').remove();
  });
}

$(addItem);
$(deleteItem);
$(checkItem);