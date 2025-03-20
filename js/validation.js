export const validateInput = (inputName, inputComment) => {
    let isValidation = true

    if (inputName.value.length <= 3) {
        inputName.classList.add("error")
        inputName.placeholder = "Ваше имя меньше 5 символов"
        inputName.value = ""
        isValidation = false
    } else if (inputName.value.length >= 30) {
        inputName.classList.add("error")
        inputName.placeholder = "Ваше имя больше 12 символов"
        inputName.value = ""
        isValidation = false
    } else {
        inputName.classList.remove("error")
    }

    if (inputComment.value.length <= 5) {
        inputComment.placeholder = "Ваш комментарий меньше 15 символов"
        inputComment.classList.add("error")
        inputComment.value = ""
        isValidation = false
    } else {
        inputComment.classList.remove("error")
    }

    return isValidation
}
