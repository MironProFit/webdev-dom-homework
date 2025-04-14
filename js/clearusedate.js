import { updateUserData } from './userdata.js'

export const clearUserData = () => {
    const buttonClear = document.getElementById('clear-data')
    buttonClear.addEventListener('click', () => {
        const btns = document.querySelectorAll('.button')
        btns.forEach((btn) => {
            btn.style.display = 'flex'
        })
        const authorButtonsContainer = document.getElementById('authorization')
        authorButtonsContainer.style.display = 'flex'
        authorButtonsContainer.innerHTML = `<button class="auth__btn button btn--close">Вход</button>
        <button class="reg__btn button btn--close">Регистрация</button>`

        const newData = {
            id: '',
            token: '',
            name: '',
            login: '',
        }
        updateUserData(newData)
        console.log('данные авторизации очищены');
        
        location.reload()
        window.scrollTo(0, 0)
    })
}
