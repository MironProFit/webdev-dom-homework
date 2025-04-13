const host = 'https://wedev-api.sky.pro/api/v2/Miron_MPF'

export const fetchComments = () => {
    if (!navigator.onLine) {
        alert('Ваш интернет был похищен инопланетянами')
        return
    }

    return fetch(host + '/comments')
        .then((response) => {
            return response.json()
        })
        .then((responseData) => {
            return responseData.comments.map((comment) => ({
                name: comment.author.name,
                date: comment.date,
                text: comment.text,
                likes: comment.likes,
                isLiked: false,
            }))
        })
        .catch((error) => {
            alert(error.massege)
        })
}
const maxRetries = 3

export const postComment = (text, name, retries = maxRetries) => {
    if (!navigator.onLine) {
        alert('Ваш интернет был похищен инопланетянами')
        return Promise.reject(new Error('Нет интернет-соединения '))
    }
    return fetch(host + '/comments', {
        method: 'POST',
        body: JSON.stringify({
            text,
            name,
            // forceError: true,
        }),
    })
        .then((response) => {
            if (!response.ok) {
                if (response.status === 500 && retries > 0) {
                    alert(`Ошибка 500. Повторная отправка комментария... Осталось попыток: ${retries}`)
                    return postComment(text, name, retries - 1)
                }
                switch (response.status) {
                    case 404:
                        throw new Error('Кажется, у вас сломался интернет, попробуйте позже')

                    default:
                        return response.json().then((errorData) => {
                            throw new Error(errorData.error)
                        })
                }
            }

            return response.json()
        })
        .catch((error) => {
            alert(error.message)
            throw error
        })
}
