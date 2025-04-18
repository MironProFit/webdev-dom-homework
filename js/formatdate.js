// Форматирование выводимой даты
export function formatDate(serverTime) {
    const date = new Date(serverTime)
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    }

    return date.toLocaleString('ru-RU', options)
}
