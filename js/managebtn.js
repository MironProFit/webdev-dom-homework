import { userData, updateUserData } from './userdata.js'
import { renderComments } from './render.js'
import { buttonInput } from './index.js'
import { validateInput } from './validation.js'
import { clearUserData } from './clearusedate.js'
import { inputComment } from './index.js'

export const quoteComment = () => {
    buttonInput.addEventListener('click', () => {
        if (!validateInput(inputComment)) {
            return
        }
        document.querySelector('.comment-loaded').style.display = 'flex'
        document.querySelector('.add-form').style.display = 'none'

        const newComments = 'text: inputComment.value'

        postComment(inputComment.value)
            .then(() => {
                fetchAndRender()
            })
            .then(() => {
                inputComment.value = ''
            })
            .finally(() => {
                document.querySelector('.comment-loaded').style.display = 'none'
                document.querySelector('.add-form').style.display = 'flex'
            })
    })
}

export const hiddenElement = () => {
    const deleteBtn = document.querySelectorAll('.del-comment') //кнопка удаления комента
    const authBtn = document.querySelectorAll('.auth__btn') // кнопка авторизации
    const regBtn = document.querySelectorAll('.reg__btn') // кнопка регистрации
    const exitBtn = document.querySelectorAll('.exit__btn')
    const authBlock = document.getElementById('authorization') // блок авторизации
    const commentBlock = document.querySelectorAll('.window-input') // окно ввода комментария
    const delBtnBlock = document.querySelectorAll('.container-del')
    const delBtn = document.querySelectorAll('.del-comment')

    if (!userData.token && !userData.login && !userData.password) {
        console.log('Пользован не авторизован')

        commentBlock.forEach((item) => {
            item.style.display = 'none'
        })
        authBtn.forEach((item) => {
            item.style.display = 'flex'
        })
        regBtn.forEach((item) => {
            item.style.display = 'flex'
        })
        exitBtn.forEach((item) => {
            item.style.display = 'none'
        })

        // <div class="del-comment button btn--close" data-id="${id}">Удалить</div>
    } else {
        console.log('Пользован авторизован')

        commentBlock.forEach((item) => {
            item.style.display = 'flex'
        })
        authBtn.forEach((item) => {
            item.style.display = 'none'
        })
        regBtn.forEach((item) => {
            item.style.display = 'none'
        })
        // authBlock.forEach((item) => {

        //     console.log("перерисовка блока аунтификации");
        //     exitBtn.style.display = 'flex'
        //     item.innerHTML = '<div class="exit__btn button btn--close">Выход</div>'
        // })
        delBtnBlock.forEach((item) => {
            item.innerHTML = '<div class="del-comment button btn--close" data-id="${id}">Удалить</div>'
        })
    }
}

{
    /* <button class="auth__btn button btn--close">Вход</button>
        <button class="reg__btn button btn--close">Регистрация</button> */
}

// export const closeWindowInputComment = () => {
//     const authButton = document.querySelector('.auth__btn') // кнопка авторизации
//     const authorizationContainer = document.querySelector('.auth') // блок авторизации
//     const inputWindow = document.querySelector('.window-input') // окно ввода комментария

//     // Проверка, если id или token пустые
//     if (userData.id === '' || userData.token === '') {
//         // authButton.style.display = 'flex'; // Показываем кнопку авторизации
//         authorizationContainer.style.display = 'flex' // Показываем блок авторизации
//         inputWindow.style.display = 'none' // Скрываем окно ввода комментария
//     } else {
//         // authButton.style.display = 'none'; // Скрываем кнопку авторизации
//         inputWindow.style.display = 'flex' // Показываем окно ввода комментария
//         authorizationContainer.style.display = 'none' // Скрываем блок авторизации
//     }
// }

// export const hiddenButtonDelete = () => {
//     // const buttons = document.querySelectorAll('.del-comment')
//     const hasEmptyValues = Object.values(userData).some((value) => value === '')
//     console.log(hasEmptyValues)
//     // if (hasEmptyValues && buttons) {
//     //     buttons.style.display = 'none'
//     // } else {
//     //     return
//     // }
//     const commentContainer = document.querySelector('.comment-footer')
//     if (commentContainer) {
//         commentContainer.style.justifyContent = 'flex-end'
//     } else {
//         return
//     }
// }

// // Вызов функции
// closeWindowInputComment()

export const addLikeButtonListeners = (userComments) => {
    const likeButtons = document.querySelectorAll('.like-button')
    likeButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
            event.stopPropagation()
            const index = button.dataset.id
            const comment = userComments[index]
            button.disabled = true
            button.classList.add('loading')

            setTimeout(function () {
                comment.isLiked ? comment.likes-- : comment.likes++
                comment.isLiked = !comment.isLiked
                renderComments(userComments, document.getElementById('list'))
                button.disabled = false
                button.classList.remove('loading')
            }, 3000)
        })
    })
}

export const deleteCommentEvent = () => {
    console.log('функция удаления комента запущена')
    const delBtn = document.querySelectorAll('.del-comment')
    const comments = document.querySelectorAll('.comment')
    console.log(`кнопки удаления найдено ${delBtn.length}`);
    if (delBtn.length > 0) {
        delBtn.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                console.log(`${index}`)
            })
        })
    }

    // delBtn.forEach(() => {

    // })
}
