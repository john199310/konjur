$("#contactForm").validator().on("submit", function (event) {
    if (event.isDefaultPrevented()) {
        // handle the invalid form...
        formError();
        submitMSG(false, "Did you fill in the form properly?");
    } else {
        // everything looks good!
        event.preventDefault();
        submitForm();
    }
});


function submitForm(){
    
    // Initiate Variables With Form Content
    var name = $("#name").val();
    var email = $("#email").val();
    var msg_subject = $("#msg_subject").val();
    var message = $("#message").val();
    console.log('😀😀😀😀😀😀', name, email);
    
    $.ajax({
        type: "POST",
        url: "http://localhost:8000/sendmail",
        timeout : 0,
        headers : {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
            "name": name,
            "email": email,
            "subject": msg_subject,
            "message": message
          },
        success : function(text){
            if (text == "success"){
                formSuccess();
            } else {
                formError();
                submitMSG(false,text);
            }
        }
    }).done((response)=>{console.log('successful!', response)});
}

// function submitForm() {
//     var settings = {
//         "url": "http://localhost:8000/sendmail",
//         "method": "POST",
//         "timeout": 0,
//         "headers": {
//           "Content-Type": "application/x-www-form-urlencoded"
//         },
//         "data": {
//           "name": "mun",
//           "email": "maleasdfafa",
//           "subject": "sfasdfa",
//           "message": "feiaeijowaf"
//         }
//       };
      
//       $.ajax(settings).done(function (response) {
//         console.log(response);
//       });
// }

function formSuccess(){
    $("#contactForm")[0].reset();
    submitMSG(true, "Message Submitted!")
}

function formError(){
    //$("#contactForm").removeClass().addClass('shake animated-').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
    //    $(this).removeClass();
    //});
}

function submitMSG(valid, msg){
    if(valid){
        var msgClasses = "h5 text-center tada- animated- text-success";
    } else {
        var msgClasses = "h5 text-center text-danger";
    }
    $("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
}