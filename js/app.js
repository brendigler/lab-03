'use strict';


// Image constructor
function Image(url, title, description, keyword, horns) {
  this.image_url = url;
  this.title = title;
  this.description = description;
  this.keyword = keyword;
  this.horns = horns;
}

// // Render image prototype jQuery
// Image.prototype.render = function () {
//   const $imageclone = $('li:first-child').clone();
//   const $h2 = $imageclone.find('h2');
//   $h2.text(this.title);
//   $imageclone.find('img').attr('src', this.image_url);
//   $imageclone.find('img').attr('alt', this.description);
//   $imageclone.find('p').text(this.description);
//   $imageclone.find('h3').text(this.keyword);
//   $h2.addClass(this.keyword);
//   $('ul').append($imageclone);
// }

// Mustache render prototype
Image.prototype.render = function () {
  const htmlTemplateString = $('#horn-template').html();
  const object = this;

  const renderedHtml = Mustache.render(htmlTemplateString, object);
  $('ul').append(renderedHtml);
};

//Render Menu options
Image.prototype.renderMenu = function () {
  if ($(`select:contains("${this.keyword}")`).length > 0) {
    return;
  }
  const $menuClone = $('option:first-child').clone();
  $menuClone.attr('value', this.keyword);
  $menuClone.html(this.keyword);
  $('select').append($menuClone);
}

let pageToShow = '/data/page-1.json'
const horns = [];

// Ajax functions
$.ajax(`${pageToShow}`).then(returnData => {
  returnData.forEach(horn => {
    horns.push(new Image(horn.image_url, horn.title, horn.description, horn.keyword, horn.horns));
  });
  horns.forEach(horn => {
    horn.render();
    horn.renderMenu();
  });
});

// filter menu
$('select').on('change', function (e) {
  $('li').hide();
  $('li:contains(' + e.target.value + ')').show();
});

// Page 2 button
$('#page2').on('click', function () {
  $('li').remove();
  horns.length = 0;
  pageToShow = '/data/page-2.json';
  $.ajax(`${pageToShow}`).then(returnData => {
    returnData.forEach(horn => {
      horns.push(new Image(horn.image_url, horn.title, horn.description, horn.keyword, horn.horns));
    });
    horns.forEach(horn => {
      horn.render();
      horn.renderMenu();
    });
  });
});

// Page 1 button
$('#page1').on('click', function () {
  $('li').remove();
  horns.length = 0;
  pageToShow = '/data/page-1.json';
  $.ajax(`${pageToShow}`).then(returnData => {
    returnData.forEach(horn => {
      horns.push(new Image(horn.image_url, horn.title, horn.description, horn.keyword, horn.horns));
    });
    horns.forEach(horn => {
      horn.render();
      horn.renderMenu();
    });
  });
});

// Sort Horns button
$('#hornSorter').on('click', function () {
  // sort horns array
  horns.sort((first, second) => {
    if (second.horns > first.horns) {
      return -1;
    } else if (first.horns > second.horns) {
      return 1;
    } else {
      return 0;
    }
  })
  // re-render the page
  $('li').remove();
  console.log(horns)
  horns.forEach(horn => {
    horn.render();
    horn.renderMenu();
  });
})


// Sort Title button
$('#titleSorter').on('click', function () {
  // sort horns array
  horns.sort((first, second) => {
    if (second.title.toLowerCase() > first.title.toLowerCase()) {
      return -1;
    } else if (first.title.toLowerCase() > second.title.toLowerCase()) {
      return 1;
    } else {
      return 0;
    }
  })
  // re-render the page
  $('li').remove();
  console.log(horns)
  horns.forEach(horn => {
    horn.render();
    horn.renderMenu();
  });
})