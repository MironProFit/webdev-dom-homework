const getIdDelComment = () => {
    const delButtons = document.querySelectorAll('.del-comment')
    delButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            const commentId = btn.dataset.commentId
            deliteComment(commentId)
        })
    })
}

console.log(getIdDelComment())
