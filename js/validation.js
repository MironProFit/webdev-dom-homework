export const validateInput = (inputName, inputComment) => {
    let isValidation = true

    if (inputName.value === '') {
        inputName.classList.add('error')
        inputName.placeholder = 'Не может быть пустым'
        isValidation = false
    } else {
        inputName.classList.remove('error')
    }

    if ((inputComment.value === '')) {
        inputComment.placeholder = 'Не может быть пустым'
        inputComment.classList.add('error')
        isValidation = false
    } else {
        inputComment.classList.remove('error')
    }
    return isValidation
}
