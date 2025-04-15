import { escapeHtml } from './escapehtml.js'
import { formatDate } from './formatdate.js'
import { deleteCommentEvent } from './managebtn.js'
import { fetchAndRender } from './index.js'
import { clearUserData } from './clearusedate.js'

export const renderComments = (userComments, container) => {
    console.log(userComments, container)
    container.innerHTML = userComments
        .map(
            (comment, id) => `<li class="comment">
        <div class="comment-header">
          <div class="title">${escapeHtml(comment.name)}</div>
          <div>${formatDate(comment.date)}</div>
        </div>
        <div class="comment-body">
          <div class="comment-text">${escapeHtml(comment.text)}</div>
        </div>
        <div class="comment-footer">
            <div class="container-del"></div>

          <div class="likes">
            <span class="likes-counter">${comment.likes}</span>
            <button class="like-button ${comment.isLiked ? '-active-like' : ''}" data-id="${id}"></button>
          </div>
        </div>
      </li>`
        )
        .join('')

    addLikeButtonListeners(userComments)
    addClickEventToComments(userComments)

    // const commentContainer = document.querySelector('.comment-footer')

    // hiddenButtonDelete()
}

export const addClickEventToComments = (userComments) => {
    const commentElements = document.querySelectorAll('.comment')
    commentElements.forEach((commentElement, index) => {
        commentElement.addEventListener('click', () => {
            const comment = userComments[index]
            const inputComment = document.getElementById('input-comment')
            inputComment.value = `[Цитата пользователя: "${comment.text}"]`
        })
    })
}

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

export const renderBlockAuth = () => {
    const authorButtonsContainer = document.getElementById('authorization')

    authorButtonsContainer.innerHTML = `<div class="exit__btn button btn--close">Выход</div>`
    const exitBtn = document.querySelector('.exit__btn')
    exitBtn.style.display = 'flex'
    // window.onload()
    fetchAndRender()
    clearUserData()
    deleteCommentEvent()

    console.log('рендер блока авторизации выполнен')
}
