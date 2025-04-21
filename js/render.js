import { escapeHtml } from './escapehtml.js'
import { formatDate } from './formatdate.js'
import { deleteCommentEvent } from './managebtn.js'
import { clearUserData } from './clearusedate.js'
import { switchLike } from './api.js'
import { renderAuthorizationForm } from './renderauth.js'
import { renderRegistrationForm } from './renderreg.js'
import { userData } from './userdata.js'
import { container } from './index.js'

export const renderComments = (userComments, container) => {
    console.log(userComments)
    container.innerHTML = userComments
        .map(
            (comment) =>
                `<li class="comment">
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
            <button class="like-button ${comment.isLiked ? '.-active-like' : ''}" data-id="${comment.id}"></button>
          </div>
        </div>
      </li>`
        )
        .join('')

    renderNameComment()
    renderBlockAuth()
    addClickEventToComments(userComments)
    clearUserData()
    deleteCommentEvent()
    renderAuthorizationForm()
    renderRegistrationForm()
    addLikeButtonListeners(userComments)
    console.log('Комментарии отрисованы')
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

export const renderNameComment = () => {
    const inputName = document.getElementById('input-name')
    console.log(userData.name)
    if (inputName && userData && userData.token) {
        inputName.value = userData.name
        console.log('Имя перезаписано')
    } else {
        return
    }
}

export const addLikeButtonListeners = (userComments) => {
    const likeButtons = document.querySelectorAll('.like-button')
    const likeCounter = document.querySelectorAll('.likes-counter')
    likeButtons.forEach((button, index) => {
        const comment = userComments[index]
        likeCounter[index].textContent = `${comment.likes}`
        console.log(comment.isLiked)
        if (comment.isLiked) {
            button.classList.add('-active-like')
        }
        button.addEventListener('click', (event) => {
            event.stopPropagation()
            switchLike(comment.id).then((result) => {
                console.log(result.likes)
                console.log(result.isLiked)
                likeCounter[index].textContent = `${result.likes}`
                if (result.isLiked) {
                    button.classList.add('-active-like')
                }
            })
            // const likeId = button.getAttribute('data-id')
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

    console.log('Блок авторизации отрисован')

    renderAuthorizationForm()
    renderRegistrationForm()
}

export const renderResizeAuth = async () => {
    const authorButtonsContainer = document.getElementById('authorization')
    authorButtonsContainer.style.height = '450px'
    authorButtonsContainer.style.paddingRight = '50px'
    authorButtonsContainer.style.paddingLeft = '50px'
    authorButtonsContainer.style.flexDirection = 'column'
    // authorButtonsContainer.style.

    const buttonInputLogPass = document.querySelector('.button-input')

    // buttonInputLogPass.style.width = '50%'

    const inputForm = document.querySelectorAll('.input-form')
    inputForm.forEach((element) => {
        element.style.width = '10%'
    })
    return
}

export const resetResizeAuth = () => {
    const authorButtonsContainer = document.getElementById('authorization')
    if (authorButtonsContainer) {
        authorButtonsContainer.style.height = ''
        authorButtonsContainer.style.paddingRight = ''
        authorButtonsContainer.style.paddingLeft = ''
        authorButtonsContainer.style.flexDirection = ''
        // authorButtonsContainer.style.
    }

    const buttonInputLogPass = document.querySelector('.button-input')
    if (buttonInputLogPass) {
        buttonInputLogPass.style.width = ''
        console.log('Очищены стили')
        // return
    }
    return
}
