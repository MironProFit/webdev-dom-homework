export const userData = {
    token: localStorage.getItem('token') || '',
    id: localStorage.getItem('id') || '',
    name: localStorage.getItem('name') || '',
    login: localStorage.getItem('login') || '',
    password: localStorage.getItem('password') || '',
}

export const updateUserData = (newData) => {
    Object.assign(userData, newData)
    localStorage.setItem('token', userData.token)
    localStorage.setItem('id', userData.id)
    localStorage.setItem('name', userData.name)
    localStorage.setItem('login', userData.login)
    localStorage.setItem('password', userData.password)
}

console.log(userData)


