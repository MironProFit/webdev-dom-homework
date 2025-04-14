import { fetchComments, postComment } from './api.js'
import { renderComments } from './render.js'
import { wrapLoadingText } from './textloading.js'
import { container, loadingMassage } from './variables.js'

export let userComments = []

const updateUserComments = (newComments) => {
    userComments = newComments
    renderComments(userComments, container)
}

const fetchAndRender = () => {
    return fetchComments().then((data) => {
        updateUserComments(data)
        loadingMassage.forEach((element) => {
            element.style.display = 'none'
        })
    })
}

window.onload = () => {
    wrapLoadingText()
    fetchAndRender()
}
