//form
const contactForm = document.forms[0];
//form button
const btn = document.querySelector('.btn');
//email regEx
const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//error array
let errorArray = [];
//error fields
const nameErrField = document.querySelector('.form__error--name');
const emailErrField = document.querySelector('.form__error--email');
const msgErrField = document.querySelector('.form__error--message');
//name err, email err, message err messages
const nameErr = 'Name Required';
const emailErr = ' Valid Email Required';
const msgErr = 'Message Required';


/*FUNCTIONALITY*/
//function to check for blank/empty strings

function blankOrEmpty(formField){
    return (formField.value === '' || formField.value === ' ');
}

//check if valid email
function emailValid(email){
    return emailRegEx.test(email);
}

//perform checks and store data upon submission
function submitForm(e){
    e.preventDefault();
    errorArray = [];

    nameErrField.innerHTML = '';
    emailErrField.innerHTML = '';
    msgErrField.innerHTML = '';
    

    if(blankOrEmpty(contactForm.name)){
        errorArray.push('name');
        nameErrField.innerHTML = nameErr;
    }

    if(blankOrEmpty(contactForm.email) || !emailValid(contactForm.email.value)){
        errorArray.push('email');
        emailErrField.innerHTML = emailErr;
    }

    if(blankOrEmpty(contactForm.message)){
        errorArray.push('message');
        msgErrField.innerHTML = msgErr;
    }

    if(errorArray.length === 0){
        //form data
        const formData = new FormData();

        formData.append('name', contactForm.name.value);
        formData.append('email', contactForm.email.value);
        formData.append('message', contactForm.message.value);

        const ajax = new XMLHttpRequest();

        ajax.open("POST", "includes/contact.php");
        ajax.onreadystatechange = function(){
            if(ajax.responseText == 4 && ajax.status == 200){
                msgErrField.innerHTML = 'Success';
            } else {
                msgErrField.innerHTML = ajax.responseText;

            }
        }   
        
        ajax.send(formData);
    }
}


contactForm.onsubmit = submitForm;
