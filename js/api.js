const host = "https://wedev-api.sky.pro/api/v1/Miron_MPF"

export const fetchComments = () => {
    return fetch(host + "/comments")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok")
            }
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
            console.error("Error fetching comments:", error)
        })
}

export const postComment = (text, name) => {
    return fetch(host + "/comments", {
        method: "POST",
        body: JSON.stringify({
            text,
            name,
        }),
    }).then((response) => {
        return response.json()
    })
}
