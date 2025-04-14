import { fetchComments, postComment } from './api.js'
import { renderComments } from './render.js'
import { wrapLoadingText } from './textloading.js'
import { container, userComments, loadingMassage } from './variables.js'

const updateUserComments = (newComments) => {
    userComments.push(newComments)
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
