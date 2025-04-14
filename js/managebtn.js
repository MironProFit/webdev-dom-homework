import  {inputName, inputComment, buttonInput, container, loadingMassage, userComments}  from './variables.js'
import { userData, updateUserData } from './userdata.js'
import {renderComments} from './render.js';


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

export const closeWindowInputComment = () => {
    const authButton = document.querySelector('.auth__btn') // кнопка авторизации
    const authorizationContainer = document.querySelector('.auth') // блок авторизации
    const inputWindow = document.querySelector('.window-input') // окно ввода комментария

    // Проверка, если id или token пустые
    if (userData.id === '' || userData.token === '') {
        // authButton.style.display = 'flex'; // Показываем кнопку авторизации
        authorizationContainer.style.display = 'flex' // Показываем блок авторизации
        inputWindow.style.display = 'none' // Скрываем окно ввода комментария
    } else {
        // authButton.style.display = 'none'; // Скрываем кнопку авторизации
        inputWindow.style.display = 'flex' // Показываем окно ввода комментария
        authorizationContainer.style.display = 'none' // Скрываем блок авторизации
    }
}

export const hiddenButtonDelete = () => {
    // const buttons = document.querySelectorAll('.del-comment')
    const hasEmptyValues = Object.values(userData).some((value) => value === '')
    console.log(hasEmptyValues)
    // if (hasEmptyValues && buttons) {
    //     buttons.style.display = 'none'
    // } else {
    //     return
    // }
    const commentContainer = document.querySelector('.comment-footer')
    if (commentContainer) {
        commentContainer.style.justifyContent = 'flex-end'
    } else {
        return
    }
}

// Вызов функции
closeWindowInputComment()

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
