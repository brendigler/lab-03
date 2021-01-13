'use strict';

function Image (url, title, description, keyword, horns) {
  this.image_url = url;
  this.title = title;
  this.description = description;
  this.keyword = keyword;
  this.horns = horns;
}

Image.prototype.render = function () {
  const $imageclone = $('li:first-child').clone();
  const $h2 = $imageclone.find('h2');
  $h2.text(this.title);
  $imageclone.find('img').attr('src', this.image_url);
  $imageclone.find('img').attr('alt', this.description);
  $imageclone.find('p').text(this.description);
  $h2.addClass(this.keyword);
  $('ul').append($imageclone);
}
Image.prototype.menu = function () {
  // if ($('select:contains("rhino")')){
  //   break;
  // }
  const $menuClone = $('option:first-child').clone();
  $menuClone.attr('value', this.keyword);
  $menuClone.html(this.keyword);
  $('select').append($menuClone);
}

$.ajax('data/page-1.json').then(returnData => {
  const horns = [];
  returnData.forEach(horn => {
    horns.push(new Image(horn.image_url, horn.title, horn.description, horn.keyword, horn.horns));
  });
  horns.forEach(horn => {
    console.log(horn)
    horn.render();
    horn.menu();
  });

});

// filter menu

$('select').on('change', () => {
  $('li').hide();
  $('li:contains(unicorn)').show();
});