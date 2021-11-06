const buttonAuth = document.querySelector('.button-auth');
const modalAuth = document.querySelector('.modal-auth');
const logInForm = document.getElementById('logInForm');
const buttonOut = document.querySelector('.button-out');
const userName = document.querySelector('.user-name');

const inputLogin = document.getElementById('login');
const inputPassword = document.getElementById('password');
let currentInputChar = true;

// функция логина
const login = (user)=>{
    // скрываем после авторизации
    buttonAuth.style.display = 'none';
    // показываем кнопку после авторизации
    buttonOut.style.display = 'flex';
    // показываем логин поле и передаем текст с формы
    userName.textContent = user.login
    userName.style.display = 'flex';
    //закрываем модальное окно
    closeModal(modalAuth);
}
const closeModal = (modal) =>{
    modal.style.display = 'none';
}
// функция пароля
const logout = ()=>{
    // показываем после авторизации
    buttonAuth.style.display = 'flex';
    // скрываем кнопку после авторизации
    buttonOut.style.display = 'none';
    // показываем
    userName.style.display = 'none';
    userName.textContent = "";
    localStorage.removeItem('user');
}
// показываем показываек окно авторизации
buttonAuth.addEventListener('click', ()=>{
    modalAuth.style.display = 'flex';
})
buttonOut.addEventListener('click', ()=>{
    logout();
})
// скрываем модальное окно
modalAuth.addEventListener('click', (e)=>{
    // делегируем событие кнопки с крестиком и проверяем на клик вне формы
    if(e.target.closest('.close-auth')  || !e.target.closest('.modal-dialog-auth')){
        closeModal(modalAuth);
    }

})
document.addEventListener('keyup' ,(e)=>{
    if(e["keyCode"] === 27 && modalAuth.style.display === "flex"){
        closeModal(modalAuth);
    }

})


// онлайн проверка на количество символов
logInForm.addEventListener('input', (e)=>{
    if(e.target.closest('#login')){
        validate(e.target);
    }

})
// функция для вывода ошибок
function validate(input) {
    if (input.value.length < 3 && input.value.length !== 0) {
        input.setCustomValidity('Поле логина содержит меньше трех символов.');
        currentInputChar = false;
    } else if (input.value === '' && input.value.length === 0) {
        input.setCustomValidity('Поле логина пустое. Пожалуйста введите логин.');
        currentInputChar = false;
    } else if (input.value.length > 20) {
        input.setCustomValidity('Поле логина содержит больше 20 символов.');
        currentInputChar = false;
    } else {
        input.setCustomValidity('');
        currentInputChar = true;
    }
    input.reportValidity();
}
// получаем данные с формы авторизации и получаем данные
logInForm.addEventListener('submit', (event)=>{
    event.preventDefault();
    // проверка на пустое поле и количество введенных символов
    if(inputLogin.value.length !== 0 && inputLogin.value !== '' && currentInputChar){
        const user = {
            login: inputLogin.value,
            password: inputPassword.value,
        }
        localStorage.setItem('user', JSON.stringify(user));
        login(user);
    }else{
        validate(inputLogin)
    }


})
if(localStorage.getItem('user')){
    login(JSON.parse(localStorage.getItem('user')));
}