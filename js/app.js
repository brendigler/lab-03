'use strict';

// Image constructor
function Image (url, title, description, keyword, horns) {
  this.image_url = url;
  this.title = title;
  this.description = description;
  this.keyword = keyword;
  this.horns = horns;
}

// Render image prototype
Image.prototype.render = function () {
  const $imageclone = $('li:first-child').clone();
  const $h2 = $imageclone.find('h2');
  $h2.text(this.title);
  $imageclone.find('img').attr('src', this.image_url);
  $imageclone.find('img').attr('alt', this.description);
  $imageclone.find('p').text(this.description);
  $imageclone.find('h3').text(this.keyword);
  $h2.addClass(this.keyword);
  $('ul').append($imageclone);
}
//Render Menu options
Image.prototype.renderMenu = function () {
  if ( $(`select:contains("${this.keyword}")`).length > 0){
    return;
  }
  const $menuClone = $('option:first-child').clone();
  $menuClone.attr('value', this.keyword);
  $menuClone.html(this.keyword);
  $('select').append($menuClone);
}

// Ajax functions
$.ajax('data/page-1.json').then(returnData => {
  const horns = [];
  returnData.forEach(horn => {
    horns.push(new Image(horn.image_url, horn.title, horn.description, horn.keyword, horn.horns));
  });
  horns.forEach(horn => {
    horn.render();
    horn.renderMenu();
  });

});

// filter menu
$('select').on('change', function(e) {
  $('li').hide();
  $('li:contains('+ e.target.value +')').show();
  console.log(e.target.value);
});