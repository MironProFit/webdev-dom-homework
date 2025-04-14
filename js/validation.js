import {inputComment} from './variables.js';

export const validateInput = (inputComment) => {
    let isValidation = true
    if (inputComment.value === '') {
        inputComment.placeholder = 'Не может быть пустым'
        inputComment.classList.add('error')
        isValidation = false
    } else {
        inputComment.classList.remove('error')
    }
    return isValidation
}
