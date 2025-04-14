import { escapeHtml } from './escapehtml.js'
import { formatDate } from './formatdate.js'
import {addLikeButtonListeners, hiddenButtonDelete,} from './managebtn.js';


export const renderComments = (userComments, container) => {
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
            <div class="del-comment button btn--close" data-id="${id}">Удалить</div>

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
    const commentContainer = document.querySelector('.comment-footer')

    console.log(commentContainer)
    hiddenButtonDelete()
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
