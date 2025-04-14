export const escapeHtml = (text) => {
    if (typeof text !== 'string') {
        return
    }
    return text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#39;')
}
