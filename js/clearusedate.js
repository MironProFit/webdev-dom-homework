import { updateUserData } from './userdata.js'

export const clearUserData = () => {
    const buttonClear = document.querySelectorAll('.exit__btn')
    buttonClear.forEach((item) => {
        if (buttonClear) {
            item.addEventListener('click', () => {
                const btns = document.querySelectorAll('.button')
                btns.forEach((btn) => {
                    btn.style.display = 'flex'
                })

                const newData = {
                    id: '',
                    token: '',
                    name: '',
                    login: '',
                }
                updateUserData(newData)
                console.log('данные авторизации очищены')
                alert('Вы вышли из системы')

                location.reload()
                window.scrollTo(0, 0)
            })
        } else {
            return
        }
    })
}
