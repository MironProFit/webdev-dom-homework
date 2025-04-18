import { registration } from './api.js'

export const renderRegistrationForm = () => {
    const authorButtonsContainer = document.getElementById('authorization')

    let formRendered = false

    const regButton = document.querySelector('.reg__btn')
    if (!regButton) {
        console.log('Кнопка регистрации не найдена')
        return
    } else {
        console.log('продолжение регистраци')
    }

    console.log(formRendered)
    regButton.addEventListener('click', (event) => {
        console.log('нажата кнопка регистрации')
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
          id="name"
          type="text"
          class="add-form-login input-form"
          placeholder="Введите имя"
        />
        <input
          id="password"
          type="text"
          class="add-form-pass input-form"
          placeholder="Введите ваш пароль"
          >
          <button class="button-input button">Регистрация</button>
        `
            console.log('отрисобал блок регистрации')

            const loginInput = document.getElementById('login')
            if (loginInput) {
                loginInput.focus()
            }
            formRendered = true
        }
        const buttonInputLogPass = document.querySelector('.button-input')
        if (buttonInputLogPass) {
            buttonInputLogPass.addEventListener('click', () => {
                const inputLogin = document.getElementById('login')
                const inputName = document.getElementById('name')
                const inputPass = document.getElementById('password')
                const dataAuth = {
                    login: inputLogin.value,
                    name: inputName.value,
                    password: inputPass.value,
                }
                registration(dataAuth.login, dataAuth.name, dataAuth.password).catch((error) => console.error(error))
            })
        }
    })
}
renderRegistrationForm()
