import { escapeHtml } from './escapehtml.js'
import { formatDate } from './formatdate.js'
import { deleteCommentEvent } from './managebtn.js'
import { clearUserData } from './clearusedate.js'
import { switchLike } from './api.js'
import { fetchAndRender, userComments } from './index.js'
import { renderAuthorizationForm } from './renderauth.js'
import { renderRegistrationForm } from './renderreg.js'
import { userData } from './userdata.js'

export const renderComments = (userComments, container) => {
    container.innerHTML = userComments
        .map(
            (comment) => `<li class="comment">
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
            <button class="like-button ${comment.isLiked ? '-active-like' : ''}" data-id="${comment.id}"></button>
          </div>
        </div>
      </li>`
        )
        .join('')

    renderBlockAuth()
    addLikeButtonListeners(userComments)
    addClickEventToComments(userComments)
    clearUserData()
    deleteCommentEvent()
    renderAuthorizationForm()
    renderRegistrationForm()

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
    likeButtons.forEach((button, index) => {
        button.addEventListener('click', (event) => {
            event.stopPropagation()
            console.log(userComments)

            const comment = userComments[index]
            if (comment.isLiked === true) {
                
                button.disabled = false
                button.classList.add('.loading')
            } else {
                button.disabled = true
                button.classList.remove('loading')
            }
            console.log(`Лайк у коментария ${comment.id} ${comment.likes} ${comment.isLiked}`)

            // comment.isLiked ? comment.likes-- : comment.likes++
            // comment.isLiked = !comment.isLiked
            console.log(comment)
            switchLike(comment.id).then((result) => {
                result.likes = comment.likes
                result.isLiked = comment.isLiked
                console.log(comment)
                console.log(result)
                fetchAndRender()
            })
        })
    })
}

export const renderBlockAuth = () => {
    const authorButtonsContainer = document.getElementById('authorization')
    if (userData && userData && userData.token.length > 2) {
        console.log('Пользователь АВТОРИЗОВАН!!!!')
        authorButtonsContainer.innerHTML = `<div class="exit__btn button btn--close">Выход</div>`
        const exitBtn = document.querySelector('.exit__btn')
        exitBtn.style.display = 'flex'
        const delBtnContainer = document.querySelectorAll('.container-del')
        delBtnContainer.forEach((item, index) => {
            item.innerHTML = `<div class="del-comment button btn--close" data-id="${userData[index]}">Удалить</div>`
        })
        const inputCommentContainer = document.querySelector('.add-form')
        inputCommentContainer.style.display = 'flex'
    } else {
        console.log('Пользователь НЕ АВТОРИЗОВАН!!!!')
        const inputCommentContainer = document.querySelector('.add-form')
        inputCommentContainer.style.display = 'none'
        authorButtonsContainer.innerHTML = `<div class="auth__btn button btn--close" >Вход</div>
        <div class="reg__btn button btn--close" >Регистрация</div>`
    }

    // window.onload()
    // fetchAndRender()

    console.log('Блок авторизации отрисован')
    // debugger
}
