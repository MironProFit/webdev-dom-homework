const path = require('path')

module.exports = {
    entry: "./js/index.js", // Входной файл, где пишем свой код
    output: {
       filename: "main.js" // Выходной файл, который подключаем к HTML
       // Сохранится он по пути "./dist/main.js"
       ,
       path: path.resolve(__dirname, 'dist')
    }
 }