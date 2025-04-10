const host = 'https://wedev-api.sky.pro/api/v1/Miron_MPF'

export const fetchComments = () => {
    if (!navigator.onLine) {
        alert('Ваш интернет был похищен инопланетянами')
        return }

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
        .catch(error => {
            alert(error.massege)
        })
    
}

export const postComment = (text, name) => {
    if (!navigator.onLine) {
        alert('Ваш интернет был похищен инопланетянами')
        return 
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
                switch (response.status) {
                    case 500:
                        throw new Error('Сервер не отвечает попробуйте позже')

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
        })

        .finally(

        )
}
