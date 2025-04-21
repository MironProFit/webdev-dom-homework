export const validateInput = (inputComment) => {
    let isValidation = true

    inputComment.addEventListener('input', () => {
        inputComment.classList.remove('error')
        inputComment.placeholder = ''
    })
    if (inputComment.value === '') {
        inputComment.placeholder = 'Не может быть пустым'
        inputComment.classList.add('error')

        isValidation = false
    }
    return isValidation
}
