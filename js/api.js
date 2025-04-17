import { userData, updateUserData } from './userdata.js'
import { fetchAndRender, userComments } from './index.js'
import { renderBlockAuth } from './render.js'

const host = 'https://wedev-api.sky.pro/api/v2/Miron_MPF'
const hostAuth = 'https://wedev-api.sky.pro/api/user'

const maxRetries = 3

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
                id: comment.id,
                date: comment.date,
                text: comment.text,
                likes: comment.likes,
                isLiked: false,
            }))
        })
        .catch((error) => {
            alert(error.messege)
        })
}

export const authorization = (login, password) => {
    console.log('запуск блока авторизации')

    return fetch(hostAuth + '/login', {
        method: 'POST',
        body: JSON.stringify({
            login: login,
            password: password,
        }),
    })
        .then((response) => {
            return response.json()
        })
        .then((responseData) => {
            console.log('возвращает сервер', responseData)

            const newData = {
                id: responseData.user._id,
                token: responseData.user.token,
                name: responseData.user.name,
                login: responseData.user.login,
            }
            updateUserData(newData)
            console.log('данные обновлены')
            renderBlockAuth()
            console.log('перерисовываем блок авторизации')

            fetchAndRender().then(() => {
                console.log('рендер выполнен')
            })
        })
        .catch((error) => console.log(error.massage))
}

export const registration = (login, name, password) => {
    console.log(login, name, password)

    return fetch('https://wedev-api.sky.pro/api/user', {
        method: 'POST',
        body: JSON.stringify({
            login: login,
            name: name,
            password: password,
        }),
    })
        .then((response) => {
            console.log(response)
            return response.json()
        })
        .then((responseData) => {
            const newData = {
                id: responseData.user._id,
                token: responseData.user.token,
                name: responseData.user.name,
                login: responseData.user.login,
            }
            updateUserData(newData)

            return responseData, console.log(responseData), renderBlockAuth(), fetchAndRender()
        })
}

export const postComment = (text, retries = maxRetries) => {
    if (!navigator.onLine) {
        alert('Ваш интернет был похищен инопланетянами')
        return Promise.reject(new Error('Нет интернет-соединения '))
    }

    return fetch(host + '/comments', {
        headers: {
            Authorization: `Bearer ${userData.token}`,
        },
        method: 'POST',
        body: JSON.stringify({
            text,
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
            alert(error.massage)
            throw error
        })
}

export const deleteFetch = (commentId) => {
    return fetch(host + `/comments/${commentId}`, {
        headers: { Authorization: `Bearer ${userData.token}` },
        method: 'DELETE',
    })
        .then((response) => {
            return response.json()
        })
        .then((responseData) => {
            console.log(responseData)
            fetchAndRender()
            return responseData
        })
}

export const switchLike = (likeId) => {
    console.log(`/comments/${likeId}/toggle-like`)
    console.log(likeId)
    return fetch(host + `/comments/${likeId}/toggle-like`, {
        headers: { Authorization: `Bearer ${userData.token}` },
        method: 'POST',
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Что-то пошло не так')
            }
            return response.json()
        })
        .then((responseData) => {
            return responseData.result
        })
        .catch((error) => {
            console.log(error.message)
        })
}
