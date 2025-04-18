import { escapeHtml } from './escapehtml.js'
import { formatDate } from './formatdate.js'
import { deleteCommentEvent } from './managebtn.js'
import { clearUserData } from './clearusedate.js'
import { switchLike } from './api.js'
import { renderAuthorizationForm } from './renderauth.js'
import { renderRegistrationForm } from './renderreg.js'
import { userData } from './userdata.js'

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
            <button class="like-button ${comment.isLiked}
                 " data-id="${comment.id}"></button>
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
    const likeCounter = document.querySelectorAll('.likes-counter')
    likeButtons.forEach((button, index) => {
        const comment = userComments[index]
        const allCommnetsLike = userComments[index].isLiked
        console.log(allCommnetsLike);
        console.log(comment);
        // debugger
            if (allCommnetsLike) {
            console.log(comment.isLiked);
            button.classList.add('-active-like')
        } else {
            button.classList.remove('-active-like')
        }
        
        button.addEventListener('click', (event) => {
            if (!userData.token) {
                // button.classList.remove('loading')
                alert('Недоступно без авторизации')
                return
            }

            button.classList.add('loading')
            event.stopPropagation()

            switchLike(comment.id)
                .then((data) => {
                    console.log(data)
                    return data
                })

                .then((like) => {
                    console.log(like)

                    comment.likes = like.likes
                    comment.isLiked = like.isLiked

                    if (comment.isLiked) {
                        console.log('лайк активный')
                        button.classList.add('-active-like')
                    } else {
                        console.log('лайк не активный')
                        button.classList.remove('-active-like')
                    }
                    likeCounter[index].textContent = `${comment.likes}`
                    console.log(comment.isLiked)
                    console.log(comment.likes)
                    button.classList.remove('loading')
                })
                .catch((error) => {
                    console.error('ошибка обновления лайка', error)
                    alert('Не удалось обновить статус лайка. Попробуйте позжу')
                    

                    button.classList.remove('loading')
                })
                .finally(() => {
                    
                    button.classList.remove('loading')
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



    console.log('Блок авторизации отрисован')
    renderAuthorizationForm()
    renderRegistrationForm()
}

export const renderLike = (like) => {
    like.comments.map((comment) => ({
        id: comment.id,
        likes: comment.likes,
        isLiked: false,
    }))
}
