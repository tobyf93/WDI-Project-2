$(document).ready(function() {
  
  $.ajax({
    url: '/word',
    dataType: 'json'
  }).done(function(data) {
    console.log(data);

    $word = $('<p>The Word to Draw is: <b>' + data.name + '</b></p>');
    $word.appendTo('#drawingGive');

    $image = $('<img src="' + data.related_image + '">');
    $image.appendTo('#drawingGive')

    for ( var i = 0; i < data.hints.length; i++ ) {
      $hint = $('<p>First hint is: ' + data.hints[i].name + '</p>');
      $hint.appendTo('#drawingGive');
    };
  });

});