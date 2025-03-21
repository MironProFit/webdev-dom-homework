import { fetchComments, postComment } from './api.js'
import { validateInput } from './validation.js'
import { renderComments } from './render.js'

const inputName = document.getElementById('input-name')
const inputComment = document.getElementById('input-comment')
const buttonInput = document.getElementById('button')
const container = document.getElementById('list')
const loadingMassage = document.querySelectorAll('.loading-message')

let userComments = []

const updateUserComments = (newComments) => {
    userComments = newComments
    renderComments(userComments, container)
}

const wrapLoadingText = () => {
    loadingMassage.forEach((loadingMassage) => {
        const text = loadingMassage.textContent

        loadingMassage.innerHTML = ''
        text.split('').forEach((char, index) => {
            const span = document.createElement('span')
            span.textContent = char
            span.style.animationDelay = `${index * 0.1}s`
            loadingMassage.appendChild(span)
        })
    })
}

const fetchAndRender = () => {
    fetchComments().then((data) => {
        updateUserComments(data)
        loadingMassage.forEach((element) => {
            element.style.display = 'none'
        })
    })
}

buttonInput.addEventListener('click', () => {
    if (!validateInput(inputName, inputComment)) {
        return
    }
    document.querySelector('.comment-loaded').style.display = 'flex'
    document.querySelector('.add-form').style.display = 'none'

    const newComments = {
        name: inputName.value,
        date: new Date().toISOString(),
        text: inputComment.value,
        likes: 0,
        isLiked: false,
    }

    postComment(inputComment.value, inputName.value)
        .then(() => {
            fetchAndRender()
        })
        // .catch((error) => {
        //     const errorMessage = error.error || 'Неизвестная ошибка'
        //     alert(errorMessage)
        // })
        .finally(() => {
            document.querySelector('.comment-loaded').style.display = 'none'
            document.querySelector('.add-form').style.display = 'flex'

            inputName.value = ''
            inputComment.value = ''
        })
})

window.onload = () => {
    wrapLoadingText()
    fetchAndRender()
}
