if (!Array.indexOf) {
    Array.prototype.indexOf = function (obj) {
        for (var i = 0; i < this.length; i++) {
            if (this[i] == obj) {
                return i;
            }
        }
        return -1;
    };
}

var timeOuts=[];
var activeSecondary;

fadeInSecondary = function(menu){
  stopTimeOut();
  thisID = jQuery(menu).find("ul").attr("id");
  if (thisID != activeSecondary) {
    jQuery("#"+activeSecondary).fadeOut("fast");
  }
  activeSecondary = jQuery(menu).find("ul").attr("id");
  jQuery(menu).find("ul").fadeIn(50);
};

fadeOutSecondary = function(menu){
  timeOuts.mouseOut = setTimeout(secondaryOff,500);
};

secondaryOff = function(){
  jQuery("#"+activeSecondary).fadeOut("fast");
};

stopTimeOut = function(){
  for(var key in timeOuts ){
    clearTimeout(timeOuts[key]);
  }
};

initializePage = function (pageid) {
  switch (pageid) {
    case 1:

            break;
    }
    try {
      jQuery("#hometicker").load( '/content/includes/AJAXtwister.asp?type=homequote' );
    }
    catch(ex) {
      var script   = document.createElement("script");
    script.type  = "text/javascript";
    script.src   = "https://www.marathonpetroleum.com/content/includes/AJAXtwister.asp?type=homequoteinjection";
    document.body.appendChild(script);
    }

  jQuery(".primaryNav>li").hover(function(){
    fadeInSecondary(this);
  },function(){
    fadeOutSecondary(this);
  });

  jQuery(".primaryNav>li").click(function(){
    window.location.href=jQuery(this).children("a").attr('href');
  });

//   supplierRegistration();

  jQuery('a[href*="player.vimeo.com/video/"]').addClass("lightbox");

/*
  jQuery("a.lightbox").fancybox({
    "type": "iframe",
    "width": 500,
    "height": 500
  });
*/
  
  function parseUri(url) {
    var parser = document.createElement('a');
    parser.href = url;
    return parser;
  }
	
	jQuery('a.lightbox, a[rel*="lightbox"]').each(function() {
  	var href = jQuery(this).attr('href'), hostname = parseUri(href).hostname;
  	
  	// For external links, we use iframe.
    var isIframe = hostname !== parseUri(window.location.href).hostname;
    var width = 500, height = 500;
    var matches = href.match(/width=([0-9]+)/i);
    if (matches) {
      width = matches[1];
    }
    matches = href.match(/height=([0-9]+)/i);
    if (matches) {
      height = matches[1];
    }
  	
  	jQuery(this).fancybox({
    	type: isIframe? 'iframe' : undefined,
    	width: Number(width),
    	height: Number(height),
    	iframe : {
        'preload' : true
      },
      aspectRatio: true
  	});
	});

  if (!jQuery.fn.on) {
    jQuery.fn.on = jQuery.fn.bind;
  }

  /*
  This custom tabs effect will close one accordion and then open the other
  as opposed to trying to do both at the same time like "slide"
  */
  jQuery.tools.tabs.addEffect("slipNSlide", function(i, done) {
    var conf = this.getConf();
    if(this.getCurrentTab().length !== 0) {
      this.getPanes().slideUp(conf.slideUpSpeed);
      window.setTimeout( function(that, conf){
        that.getPanes().eq(i).slideDown(conf.slideDownSpeed, done);
      }, conf.slideUpSpeed, this, conf);
    } else {
      this.getPanes().eq(i).slideDown(conf.slideDownSpeed, done);
    }
  });

  var $accordion = jQuery(".accordion");

  $accordion.tabs(".accordion-pane", {
    tabs: '> h3',
    initialIndex: 0,
    effect: 'slide'
  });

  $accordion.find('h3.edit').click().next('.accordion-pane').focus();
};

function clearSearchField(isBlur) {
  if (isBlur) {
    if (document.search.search2.value === '') document.search.search2.value = 'Search';
  } else {
    if (document.search.search2.value === 'Search') document.search.search2.value = '';
  }
}

function emailpage() {
  var temploc = window.location.href.toString().indexOf(":9999") > -1 ? "/staged" : "";
  temploc +='/About_MPC/Contact_Us/Email_Page/?myURL=';
  temploc += escape(window.location.href); //.replace(/\&/, '%26').replace(/\?/, '%3F');
  window.location.href = temploc;
}
/*
function supplierRegistration() {
  var $checklist = jQuery("#checklist")
    , $form = jQuery("#request-form")
    , $continueBtn = $checklist.find("#ctl00_checklist_btnSubmit")
    , $errors = $form.find("#form-errors")
    ;

  $form.find("> table").wrap("<form></form>");

  $checklist.find("#ctl00_content_hasCert_1").click(function() {
    // "No" is selected, disable the submit and show the alternative info.
    $continueBtn.remove();
    $checklist.find("#topSet").remove();
    $checklist.find("#noCertSet").show();
  });

  $checklist.find("#ctl00_content_hasCert_0").click(function () {
    // "Yes" is selected, enable the submit.
    $continueBtn.removeAttr('disabled');
  });

  $continueBtn.click(function() {
    $continueBtn.attr("disabled", "disabled");
    $checklist.remove();
    $form.show();
  });

  $form.find(".certification > td > input:checkbox").click(function() {
    var $thisForm = jQuery(this).find("+ div");
    if (this.checked) {
      $thisForm.show();
      $thisForm.find("input").removeAttr("disabled");
    } else {
      $thisForm.hide();
      $thisForm.find("input").attr("disabled", "disabled").val("");
    }
  });

  if (jQuery.isFunction(jQuery.Zebra_DatePicker)) {
    jQuery('input.datepicker').Zebra_DatePicker({view: 'years', 'readonly_element': false});
    jQuery(".Zebra_DatePicker_Icon").show().css({
      "margin-top": "5px",
      "margin-left": 0
    });
  }

  if (typeof jQuery.fn.validate !== "undefined") {
    jQuery.validator.addMethod("confirmEmail", function (value, el) {
      return value === $(el).parent('li').prev().find('input[name=email]').val()
    }, "Email must match!");

    jQuery.validator.addMethod("phoneUS", function(phone_number, element) {
        phone_number = phone_number.replace(/\s+/g, "");
      return this.optional(element) || phone_number.length > 9 &&
        phone_number.match(/^(1-?)?(\([2-9]\d{2}\)|[2-9]\d{2})-?[1-9]\d{2}-?\d{4}$/);
    }, "Please enter a valid phone number");

    jQuery.validator.addClassRules({
      confirmEmail: {confirmEmail: true},
      phoneUS: {phoneUS: true}
    });

    var onFormSubmitted = function (data) {
      var $h3 = jQuery("<h3>Your Supplier Registration request has been submitted.</h3>");
      $form.html($h3);
    };

    $form.find("form").validate({
      rules: {
            "certification": {
                required: function (element) {
                    var boxes = $form.find(".certification > td > input:checkbox");
                    if (boxes.filter(':checked').length == 0) {
                        return true;
                    }
                    return false;
                },
                minlength: 1
            }
        },
      errorLabelContainer: "#form-errors",
         wrapper: "li",
         messages: {
           "ctl00$content$companyinfo$company": "Please enter company name",
           "ctl00$content$companyinfo$address": "Please enter company address",
           "ctl00$content$contactinfo$contact": "Please enter contact name",
           "ctl00$content$contactinfo$phoneNum": "Please enter valid phone number",
           "ctl00$content$contactinfo$email": "Please enter valid email address",
           "certification": "Please choose one cerfication"
         },
      submitHandler: function (form) {
        // alert('Please make sure you add MPCSupplierDiversity@MarathonPetroleum.com into your safe Email list in order to avoid your Email system from filtering out our important Email notifications such as Login information, Updates, Alerts, and etc.');
        var data = $form.find("form").serialize();
        jQuery.post('/content/includes/mpcc_supplier_request.asp', data, onFormSubmitted);
        // $form.find("input.submit").attr("disabled", "disabled");
        return false;
      }
    });
  }
}
*/