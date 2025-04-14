export const loadingOverlay = document.getElementById('loading')
export const loader = document.querySelector('.loader')

if (!loadingOverlay) {
    console.error('Элемент Loading не найден')
}
export const showLoader = () => {
    loadingOverlay.style.display = 'flex'

    let dotCount = 0
    const maxDots = 3
    const loadingInterval = setInterval(() => {
        dotCount = (dotCount + 1) % (maxDots + 1)
        loader.textContent = 'Загрузка' + '.'.repeat(dotCount)
    }, 100)
    return loadingInterval
}
export const hideLoading = (loadingInterval) => {
    clearInterval(loadingInterval)
    loader.textContent = 'Загрузка'
    loadingOverlay.style.display = 'none'
}


