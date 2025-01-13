function showPassword(){
    const showPasswordCheckbox = document.getElementById('checkInput');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');

    
    showPasswordCheckbox.addEventListener('click', () => {
        if (showPasswordCheckbox.checked) { 
            password.type = 'text'; 
            confirmPassword.type = 'text'; 
        } else { 
            password.type = 'password'; 
            confirmPassword.type = 'password'; 
        }
    })
}
showPassword();