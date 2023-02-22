const form=document.querySelector("form");
const email = document.getElementById("email");
const emailError = document.querySelector(".email>span");

const zipCode=document.getElementById('zip');
const zipCodeError=document.querySelector(".zipCode>span");
const zipPattern=/^[a-z0-9][a-z0-9\- ]{0,10}[a-z0-9]$/;

const password=document.getElementById('password');
const passwordError=document.querySelector(".password>span");
const passwordConfirm=document.getElementById('password_confirm');
const passwordConfirmError=document.querySelector('.password_confirm>span')
const passwordPattern=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d]{8,}$/;

//check email validity
email.addEventListener("blur", (event) => {
    if (email.validity.valid) {
        emailError.textContent = ""; 
        emailError.className = "error"}
        else showError();
        
    });

function showError() {
  if (email.validity.valueMissing){
     emailError.textContent = "*You need to enter an email address.";
     } else if (email.validity.typeMismatch) {
     emailError.textContent = "*Entered value needs to be an email address.";
     } else if (email.value.length < email.minLength) {
     emailError.textContent = `*Email should be at least ${email.minLength} characters; you entered ${email.value.length}.`;
     }
     emailError.className = "error active"
}

//check zip validity

zipCode.addEventListener('blur', (event)=>{
  if (zipPattern.test(zipCode.value)){
        zipCodeError.textContent = ""; 
        zipCodeError.className = "error" }
        else showZipError();
  }
)

function showZipError(){
    if (! zipPattern.test(zipCode.value)){
        zipCodeError.textContent='*Entered value needs to be a valid zip code';
    } else if (zipCode.validity.valueMissing){
         zipCodeError.textContent= '*You need to enter a zip code.';
    }

    zipCodeError.className= 'error active';
}

//check password validity

password.addEventListener('blur', (event)=>{
  if (passwordPattern.test(password.value)){
        passwordError.textContent = ""; 
        passwordError.className = "error" }
        else showPasswordError();
  }
)

function showPasswordError(){
  if (password.validity.valueMissing){
    passwordError.textContent= '*You need to enter a password.';
}
  else if(password.validity.tooShort){
    passwordError.textContent=`*Your password must be at least ${password.minLength} characters long`
  }
  else if (! passwordPattern.test(password.value)){
      passwordError.textContent='*Your password should be a combination of small letters, capital letters and numbers';
  } 
  passwordError.className= 'error active';
}

//check password match
passwordConfirm.addEventListener('blur', (event)=>{
  if (passwordConfirm.value === password.value){
        passwordConfirmError.textContent = ""; 
        passwordConfirmError.className = "error" }
        else showPasswordConfirmError();
  }
)

function showPasswordConfirmError(){
  if (passwordConfirm.value !== password.value){
     passwordConfirmError.textContent ="*Passwords do not match. Please make sure both fields contain the same password."
     passwordConfirmError.className= 'error active';
    }
}

//submit button
form.addEventListener("submit", (event) => {
  let validity_check=true;
  if (!email.validity.valid || email.value.length < email.minLength) {
    showError();
    validity_check=false;
    event.preventDefault();}

  if (!zipPattern.test(zipCode.value)||(zipCode.validity.valueMissing)){
    showZipError();
    validity_check=false;
    event.preventDefault();
  }

  if (!passwordPattern.test(password.value)||(password.validity.valueMissing)){
    showPasswordError();
    validity_check=false;
    event.preventDefault();
  }

  if (passwordConfirm.value !== password.value){
    showPasswordConfirmError();
    validity_check=false;
    event.preventDefault();
  }

  if (validity_check===true) alert("High Five!");

  }
)