var countCaptcha = 0;
var countName = 0;
var countEmail = 0;
var countPhone = 0;
var countMessage = 0;

//samstudio Form Submission
function formSubmmision()
{
if(countCaptcha != 0 && countName != 0 && countEmail != 0 && countPhone != 0 && countMessage != 0)
{
document.samstudio.submit();
}
}


//Captcha Validation
$(document).ready(function(e) {

var captcha1 = $("#captchatext");

$('#Submit').click(function(event) {
countCaptcha = 0;
countName = 0;
countEmail = 0;
countPhone = 0;
countMessage = 0;

			if(captcha1.val() == "")
			{
				$("#captchaStatus").text("Error! Captcha cannot be Empty.");
				countCaptcha = 0;
				$("#captchatext").css({
                    "border": "0px solid rgb(182, 210, 25)",
                    "background": "rgb(179, 82, 82)",
					"color":"black"
                });
				return false;
			}
			else
			{
				$.post("/contact-us/captcha/post.php?"+$("#samstudio").serialize(), {
			      }, function(response){
			
			         if(response==1)
			         {
			       	 $("#captchaStatus").text("");
					 countCaptcha = 1;
					 formSubmmision();
					 $("#captchatext").css({
                    "border": "",
                    "background": "",
                    });
			         }
			         else
			         {
				     $("#captchaStatus").text("Error! Invalid Captcha code.");
					 countCaptcha = 0;
					 $("#captchatext").css({
                    "border": "0px solid rgb(182, 210, 25)",
                    "background": "rgb(179, 82, 82)",
					"color":"black"
                    });
			         }			
		        });		   
	       }
		   return false;		   
	  });


	 // refresh captcha
	 $('img#refresh').click(function() {  
			
			change_captcha();
	 });	
	 
	 // refresh captcha
	 $('img#refreshSub').click(function() {  
			
			change_captchaSub();
	 });	
	 
	 function change_captcha()
	 {
	 	document.getElementById('captcha').src="contact-us/captcha/get_captcha.php?rnd=" + Math.random();
	 }	 
	
	 function change_captchaSub()
	 {
	 	document.getElementById('captcha').src="/contact-us/captcha/get_captcha.php?rnd=" + Math.random();
	 }	 

});


//  Name Validation

$(document).ready(function(e) {
    //global variables
    var form = $("#samstudio");
 
    var email = $("#Name"); //textbox u are going to validate
    var emailInfo = $("#NameStatus"); //to display error message
 
    //first validation on form submit
    $('#Submit').click(function(e) {
        //alert("form submitted...!");
 
        // validation begin before submit
        if (validateEmail()) {
			countName = 1;
			formSubmmision();
			 $("#Name").css({
                    "border": "",
                    "background": ""
                });
            return true;
        } else {
			countName = 0;            
			 $("#Name").css({						
                    "border": "0px solid rgb(182, 210, 25)",
                    "background": "rgb(179, 82, 82)",
					"color":"black"
                });
			 return false;
			
        }
 
    });
	
    function validateEmail() {
        //validation for empty emails
        if (email.val() == "") {
            email.addClass("error");
            emailInfo.text("Name cannot be empty!");
            emailInfo.addClass("error");
			            return false;
        } else {
            email.removeClass("error");
			emailInfo.text("");
            emailInfo.removeClass("error"); 
        }
 
        //validation for proper email formats
        //testing regular expression
        var a = $("#Name").val();
 
        var filter = /^[a-zA-Z\s]+$/;
        //if it's valid email
        if (filter.test(a)) {
            email.removeClass("error");
			emailInfo.text("");
            emailInfo.removeClass("error");
            return true;
        }
        //if it's NOT valid
        else {
            email.focus();
            email.addClass("error");
            emailInfo.text("Valid Name please!");
            emailInfo.addClass("error");
            return false;
        }
    }
 
});



// E-Mail Validation

$(document).ready(function(e) {
 
    var email = $("#Email"); //textbox u are going to validate
    var emailInfo = $("#emailInfo"); //to display error message
 
    //first validation on form submit
    $('#Submit').click(function(e) {
        //alert("form submitted...!");
 
        // validation begin before submit
        if (validateEmail()) {
			countEmail = 1;
			formSubmmision();
			$("#Email").css({
                    "border": "",
                    "background": ""
                });
            return true;
        }
		else {
			countEmail = 0;
			 $("#Email").css({
                    "border": "0px solid rgb(182, 210, 25)",
                    "background": "rgb(179, 82, 82)",
					"color":"black"
                });
            return false;
        }
 
    });
	
    function validateEmail() {
        //validation for empty emails
        if (email.val() == "") {
            email.addClass("error");
            emailInfo.text("E-mail cannot be empty!");
            emailInfo.addClass("error");
            return false;
        } else {
            email.removeClass("error");
			emailInfo.text("");
            emailInfo.removeClass("error");
 
        }
 
        //validation for proper email formats
        //testing regular expression
        var a = $("#Email").val();
 
        var filter = /^[a-zA-Z0-9]+[a-zA-Z0-9_.-]+[a-zA-Z0-9_-]+@[a-zA-Z0-9]+[a-zA-Z0-9.-]+[a-zA-Z0-9]+.[a-z]{2,4}$/;
        //if it's valid email
        if (filter.test(a)) {
            email.removeClass("error");
			emailInfo.text("");
            emailInfo.removeClass("error");
            return true;
        }
        //if it's NOT valid
        else {
			email.focus();
			email.addClass("error");
            emailInfo.text("Valid E-mail Id please!");
            emailInfo.addClass("error");
            return false;
        }
    }
 
});



//Phone
$(document).ready(function(e) {
    //global variables
    var email = $("#Phone"); //textbox u are going to validate
    var emailInfo = $("#spnPhoneStatus"); //to display error message
 
    //first validation on form submit
    $('#Submit').click(function(e) {
        //alert("form submitted...!");
 
        // validation begin before submit
        if (validateEmail()) {
			countPhone = 1;
			formSubmmision();
			$("#Phone").css({
                    "border": "",
                    "background": ""
                });
            return true;
        } else {
			countPhone = 0;
			$("#Phone").css({
                    "border": "0px solid rgb(182, 210, 25)",
                    "background": "rgb(179, 82, 82)",
					"color":"black"
                });
            return false;
        }
 
    });
    function validateEmail() {
        //validation for empty emails
        if (email.val() == "") {
            email.addClass("error");
            emailInfo.text("Phone cannot be empty!");
            emailInfo.addClass("error");
            return false;
        } else {
            email.removeClass("error");
			emailInfo.text("");
            emailInfo.removeClass("error"); 
        }
 
        //validation for proper email formats
        //testing regular expression
        var a = $("#Phone").val();
 
        var filter = /^((\+[1-9]{1,4}[ \-]*)|(\([0-9]{2,3}\)[ \-]*)|([0-9]{2,4})[ \-]*)*?[0-9]{3,4}?[ \-]*[0-9]{3,4}?$/;
        //if it's valid email
        if (filter.test(a)) {
            email.removeClass("error");
			emailInfo.text("");
            emailInfo.removeClass("error");
            return true;
        }
        //if it's NOT valid
        else {
			email.focus();
		    email.addClass("error");
            emailInfo.text("Valid Phone Number please!");
            emailInfo.addClass("error");
            return false;
        }
    }
 
});


//Text Area
$(document).ready(function(e) {
    $('#Submit').click(function(e) {
        var isValid = true;
        $('#Message').each(function() {
            if ($.trim($(this).val()) == '') {
				 $(this).focus();
                isValid = false;
                $(this).css({
                    "border": "0px solid rgb(182, 210, 25)",
                    "background": "rgb(179, 82, 82)",
					"color":"black"
                });
            }
            else {				
                $(this).css({
                    "border": "",
                    "background": ""
                });
            }
        });
        if (isValid == false) 
        {
		   countMessage = 0;
            e.preventDefault();
		}
        else 
		{
		countMessage = 1;
		return true;
		}
            
    });
});



