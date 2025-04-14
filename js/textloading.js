import { loadingMassage } from './variables.js'

export const wrapLoadingText = () => {
    loadingMassage.forEach((loadingMassage) => {
        const text = loadingMassage.textContent

        loadingMassage.innerHTML = ''
        text.split('').forEach((char, index) => {
            const span = document.createElement('span')
            span.textContent = char
            span.style.animationDelay = `${index * 0.1}s`
            loadingMassage.appendChild(span)
        })
    })
}
