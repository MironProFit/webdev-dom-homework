import { fetchComments } from './api.js'
import { renderComments } from './render.js'
import { clearUserData } from './clearusedate.js'
import { renderAuthorizationForm } from './renderauth.js'
import { renderRegistrationForm } from './renderreg.js'
import { quoteComment, hiddenElement, deleteCommentEvent } from './managebtn.js'

export const inputComment = document.getElementById('input-comment')
export const inputName = document.getElementById('input-name')
export const buttonInput = document.getElementById('button')
export const container = document.getElementById('list')
export const loadingMassage = document.querySelectorAll('.loading-message')

export let userComments = []

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

const updateUserComments = (newComments) => {
    userComments = newComments
    renderComments(userComments, container)
    hiddenElement()
}

export const fetchAndRender = () => {
    return fetchComments().then((data) => {
        updateUserComments(data)
        loadingMassage.forEach((element) => {
            element.style.display = 'none'
        })
        hiddenElement()
    })
}
clearUserData()
renderAuthorizationForm()
renderRegistrationForm()
quoteComment()
deleteCommentEvent()

window.onload = () => {
    wrapLoadingText()
    fetchAndRender()
}
