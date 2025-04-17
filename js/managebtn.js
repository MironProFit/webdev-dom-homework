import { userData, updateUserData } from './userdata.js'
import { renderComments, renderBlockAuth } from './render.js'
import { buttonInput, userComments } from './index.js'
import { validateInput } from './validation.js'
import { inputComment, fetchAndRender } from './index.js'
import { deleteFetch, postComment } from './api.js'

export const quoteComment = () => {
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
}

export const deleteCommentEvent = () => {
    console.log('Удаление комента активирована')
    const delBtn = document.querySelectorAll('.del-comment')
    const comments = document.querySelectorAll('.comment')
    console.log(`Кнопок удаления найдено ${delBtn.length}`)
    if (delBtn.length > 0) {
        delBtn.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                console.log(btn)
                console.log(`нажата кнопка с id:${index}`)
                const commentId = userComments[index].id
                console.log(commentId)
                deleteFetch(commentId)
            })
        })
    }
}
