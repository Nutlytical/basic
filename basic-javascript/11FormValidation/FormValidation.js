const form=document.getElementById('form');
const username=document.getElementById('username');
const email=document.getElementById('email');
const password=document.getElementById('password');
const repassword=document.getElementById('re-password');

form.addEventListener('submit',function(event){
    event.preventDefault(); // preventDefault ไม่ให้มีการกระพริบหน้าจอ
    checkInput([username,email,password,repassword]);
    if(!validateEmail(email.value.trim())){
        showerror(email,'กรุณาป้อน Email');
    }else{
        showsuccess(email);
    }
    checkPassword(password,repassword);
    checkInputLength(username,5,10);
    checkInputLength(password,5,10);
});

function checkInput(inputArray){
    inputArray.forEach(function(input){
        if(input.value.trim() === ''){ // ลบช่องว่างซ้ายขวา
            showerror(input, `กรุณาป้อน ${getInputCase(input)}`);
        }else{
            showsuccess(input);
        }
    });
}

function showerror(input,message){
    const formControl=input.parentElement; // .parantElement ย้าย input ไป formcontrol
    formControl.className='form-control error';
    const small=formControl.querySelector('small');
    small.innerText=message;
}

function showsuccess(input){
    const formControl=input.parentElement;
    formControl.className='form-control success';
}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function getInputCase(input){
    return input.id.charAt(0).toUpperCase()+input.id.slice(1);
}

function checkPassword(password1,password2){
    if(password1.value.trim() !== password2.value.trim()){
        showerror(password2, 'รหัสผ่านไม่ตรงกัน');
    }
}

function checkInputLength(input,min,max){
    if(input.value.length<=min){
        showerror(input,`${getInputCase(input)} ต้องมากกว่า ${min} ตัวอักษร`)
    }else if(input.value.length>max){
        showerror(input,`${getInputCase(input)} ต้องไม่เกิน ${max} ตัวอักษร`)
    }else{
        showsuccess(input);
    }
}