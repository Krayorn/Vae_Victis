$.fn.foxholder = function(number) {
  this.addClass("form-container").attr("id", "example-"+number.demo);

  //adding labels with placeholders content. Removing placeholders
  this.find('form').find('input,textarea').each(function() {
    var placeholderText, formItemId, inputType; 

  inputType = $(this).attr('type');

    //wrapping form elements in their oun <div> tags

    if (inputType == 'hidden' || inputType == 'radio'){

    }else{
        $(this).wrap('<div class="form-item-block"></div>'); 
    }

    //creating labels

    if (inputType == 'hidden' || inputType == 'radio') {

    } else {
      placeholderText = $(this).attr('placeholder');
      formItemId = $(this).attr('id')
      $(this).after('<label class="placeholder" for="'+ formItemId +'"><span>'+ placeholderText +'</span></label>');
      $(this).removeAttr('placeholder');
    }
  });

  //adding class on blur
  $('.form-container form').find('input,textarea').blur(function(){
    if ($.trim($(this).val())!="") {
      $(this).addClass("active");
    } else {
      $(this).removeClass("active");
    }
  });

  //adding line-height for block with textarea 
  $('.form-item-block').each(function() {
    if ($(this).has('textarea').length > 0) {
      $(this).css({'line-height': '0px'});
    }
  });


  //examples scripts

  if (number.demo == 2) {

    //example-2 adding top property for label
    $('#example-2 input, #example-2 textarea').focus(function() {
      var labelTop;
      labelTop = parseInt($(this).css('padding-top'));
      $(this).next('label').css({'top': 0 - (labelTop + 6)});
    });

    $('#example-2 input, #example-2 textarea').blur(function() {
      if ($(this).hasClass('active')) {
      } else {
        $(this).next('label').css({'top': 0});
      }
    });
  }

  if (number.demo == 3) {

    //example-3 paddings for inputs
    $('#example-3 input').focus(function() {
      var labelWidth;
      labelWidth = $(this).siblings('label').width() + 36;
      $(this).css({'padding-left': labelWidth});
    });

    $('#example-3 input').blur(function() {
      if ($(this).hasClass('active')) {
      } else {
        $(this).css({'padding-left': 20});
      }
    });

    //example-3 paddings for textarea
    $('#example-3 textarea').focus(function() {
      var labelWidth;
      labelWidth = $(this).siblings('label').height() + 41;
      $(this).css({'padding-top': labelWidth});
    });

    $('#example-3 textarea').blur(function() {
      if ($(this).hasClass('active')) {
      } else {
        $(this).css({'padding-top': 20});
      }
    });

  }

  if (number.demo == 4) {

    //example-4 moving to the left
    $('#example-4 input, #example-4 textarea').focus(function() {

      var labelWidth;
      labelWidth = $(this).next('label').width();
      console.log(labelWidth);
      $(this).next('label').css({'left': 0 - (labelWidth + 60)});
    });

    $('#example-4 input, #example-4 textarea').blur(function() {
      if ($(this).hasClass('active')) {
      } else {
        $(this).next('label').css({'left': 1});
      }
    });

  }

  if (number.demo == 7) {

    //example-7 adding icon
    $('#example-7 input, #example-7 textarea').each(function() {
      $(this).parent().append('<div class="icon-triangle"></div>');
    });

    $('#example-7 input').each(function() {

      var inputHeight = $(this).outerHeight();
      console.log(inputHeight);

      $(this).siblings('.icon-triangle').css({
        'border-width': inputHeight / 2,
        'border-left-width': 24
      })
    });

  }

  if (number.demo == 9) {

    //example-9 adding background
    $('#example-9 input, #example-9 textarea').each(function() {
      $(this).parent().append('<div class="overlay"></div>');

      var labelWidth, labelHeight;
      labelWidth = $(this).siblings('label').width();
      labelHeight = $(this).siblings('label').height();

      if ($(this).is('input')) {
        $(this).siblings('.overlay').css({
          'width': labelWidth,
          'height': '100%',
          'left': 0 - (labelWidth + 40),
        });
      } else {
        $(this).siblings('.overlay').css({
          'width': labelWidth, 
          'height' : labelHeight + 40,
          'left': 0 - (labelWidth + 40),
        });
      }

      $(this).focus(function() {
        $(this).css({'padding-left': labelWidth + 36});
      });

      $(this).blur(function() {
        if (!$(this).hasClass('active')) {
          $(this).css({'padding-left': 20});
        }
      });
    });

  }

  if (number.demo == 10) {

    //example-10 label top position
    $('#example-10 input, #example-10 textarea').focus(function() {
      var labelTop;
      labelTop = parseInt($(this).css('padding-top'));
      $(this).next('label').css({'top': 0 - (labelTop + 10)});
      console.log(labelTop);
    });

    $('#example-10 input, #example-10 textarea').blur(function() {
      if ($(this).hasClass('active')) {
      } else {
        $(this).next('label').css({'top': 0});
      }
    });

  }

  if (number.demo == 11) {

    //example-11 adding borders
    $('#example-11 .form-item-block').each(function() {
      $(this).append('<div class="top-line"></div>').append('<div class="bottom-line"></div>').append('<div class="left-line"></div>').append('<div class="right-line"></div>');
    });

  }

  if (number.demo == 12) {

    //example-12 adding icon
    $('#example-12 input, #example-12 textarea').each(function() {
      $(this).parent().append('<div class="icon"></div>');
    });

  }

  if (number.demo == 13) {

    //example-13 elements padding
    $('#example-13 input, #example-13 textarea').focus(function() {
      var labelWidth;
      labelWidth = $(this).siblings('label').width() + 66;
      $(this).css({'padding-left': labelWidth});
    });

    $('#example-13 input, #example-13 textarea').blur(function() {
      if ($(this).hasClass('active')) {
      } else {
        $(this).css({'padding-left': 20});
      }
    });

  }

  if (number.demo == 14) {

    //example-14 adding borders
    $('#example-14 .form-item-block').each(function() {
      $(this).append('<div class="top-line"></div>').append('<div class="left-line"></div>').append('<div class="right-line"></div>');
    });

    //example-14 elements padding
    $('#example-14 input, #example-14 textarea').focus(function() {
      var labelWidth;
      labelWidth = $(this).siblings('label').width() + 66;
      $(this).css({'padding-left': labelWidth});
    });

    $('#example-14 input, #example-14 textarea').blur(function() {
      if ($(this).hasClass('active')) {
      } else {
        $(this).css({'padding-left': 20});
      }
    });    

  }


  if (number.demo == 15) {

    //example-15 adding triangle icons
    $('#example-15 input, #example-15 textarea').each(function() {
      $(this).next('label').append('<div class="top-triangle"></div>').append('<div class="bottom-triangle"></div>');
    });

    //example-15 elements padding
    $('#example-15 input, #example-15 textarea').focus(function() {
      var labelWidth;
      labelWidth = $(this).siblings('label').width() + 86;
      $(this).css({'padding-left': labelWidth});
    });

    $('#example-15 input, #example-15 textarea').blur(function() {
      if ($(this).hasClass('active')) {
      } else {
        $(this).css({'padding-left': 20});
      }
    });
    
  }

}
