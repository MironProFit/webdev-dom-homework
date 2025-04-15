import { authorization } from './api.js'

export const renderAuthorizationForm = () => {
    console.log('запущен renderAuthorizationForm')
    const authorButtonsContainer = document.getElementById('authorization')
    let formRendered = false

    // authorButtonsContainer.innerHTML = `<div class="auth__btn button btn--close" >Вход 3</div>
    // <div class="reg__btn button btn--close" >Регистрация 3</div>`
    const authButton = document.querySelector('.auth__btn')
    if (authButton) {
        console.log('кнопка найдена');
    } else {
        console.log('кнопка не найдена');

    }

    authButton.addEventListener('click', (event) => {
        console.log('кнопка входа нажата');
        event.stopPropagation()
        const btnAuthContainer = document.querySelectorAll('.btn--close')
        btnAuthContainer.forEach((button) => {
            button.style.display = 'none'
        })
        if (!formRendered) {
            authorButtonsContainer.innerHTML = `<input
          id="login"
          type="text"
          class="add-form-login input-form"
          placeholder="Введите логин"
        />
        <input
          id="password"
          type="text"
          class="add-form-pass input-form"
          placeholder="Введите ваш пароль"
        >
        <button class="button-input button">Вход</button>

        `
            const loginInput = document.getElementById('login')
            if (loginInput) {
                loginInput.focus()
            }
            formRendered = true
        }
        const buttonInputLogPass = document.querySelector('.button-input')

        buttonInputLogPass.addEventListener('click', () => {
            const inputLogin = document.getElementById('login')
            const inputPass = document.getElementById('password')
            const dataAuth = {
                login: inputLogin.value,
                password: inputPass.value,
            }

            console.log(dataAuth)
            authorization(dataAuth.login, dataAuth.password)
        })
    })
}

