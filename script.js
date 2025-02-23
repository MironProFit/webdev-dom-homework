const listElement = document.getElementById('list');
const inputName = document.getElementById('input-name');
const inputComment = document.getElementById('input-comment');
const buttonInput = document.getElementById('button');
const errorClass = document.querySelector('.error');
const likeButton = document.querySelector('.like-button');

const currentDate = new Date();
const formattedDate = formatDate(currentDate)

function formatDate (date) {
    const day = String(date.getDate()).padStart(2,'0');
    const month = String(date.getMonth() + 1).padStart(2,'0');
    const year = String(date.getFullYear()).slice(- 2);
    const hours = String(date.getHours()).padStart(2,'0');
    const minutes = String(date.getMinutes()).padStart(2,'0');
    
    return `${day}.${month}.${year} ${hours}:${minutes}`;
}

const userComments = [
    {name: 'Глеб Фокин', date: '12.02.22 12:18', text: 'Это будет первый комментарий на этой странице', likes: 3, like: false},
    {name: 'Варвара Н.', date: '13.02.22 19:22', text: 'Мне нравится как оформлена эта страница! ❤', likes: 75, like: false}
  ];

  function escapeHtml(text) {
    const escapeText = text
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#39;');
        return escapeText
    };


const renderComments = () => {

    const container = document.getElementById('list');

    container.innerHTML = userComments.map((comment, index) => 

        `<li class="comment">
          <div class="comment-header">
            <div class="title">${escapeHtml(comment.name)}</div>
            <div>${comment.date}</div>
          </div>
          <div class="comment-body">
            <div class="comment-text">${escapeHtml(comment.text)}</div>
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span class="likes-counter">${comment.likes}</span>
              <button class="like-button ${comment.like ? '-active-like' : ''}" data-index ="${index}"></button>
            </div>
          </div>
        </li>`

    ).join("");

    const likeButtons = document.querySelectorAll('.like-button');

    likeButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.stopPropagation();
            const index = button.dataset.index;
            const comment = userComments[index];
    
            if (comment.like) {
    
                comment.likes--;
    
            } else {
    
                comment.likes++
    
            } 
            comment.like = !comment.like;
    
            renderComments();
        })
        
    });

    const quoteComment = document.getElementById('list');

    const addClickEventToComments = () => {
        const commentElements = document.querySelectorAll('.comment');
        commentElements.forEach((commentElement, index) => {
            commentElement.addEventListener('click', () => {
                const comment = userComments[index];

                
                const inputComment = document.getElementById('input-comment');
                inputComment.value = `[Цитата пользователя: "${comment.text}"]`;

            console.log(`клик по тексту коментария: ${userComments[index].text} `);
            })
        })
    }
    addClickEventToComments();
};

renderComments();


buttonInput.addEventListener('click', () => {

    const list = document.createElement('li');

    list.classList.add('comment');


    function validateInput() {

        let isValidation = true;

        if (inputName.value.length <= 3) {

            inputName.classList.add('error');
            inputName.placeholder = 'Ваше имя меньше 5 символов';
            inputName.value = '';
            isValidation = false;
        } else if (inputName.value.length >= 12) {

            inputName.classList.add('error');
            inputName.placeholder = 'Ваше имя больше 12 символов';
            inputName.value = '';
            isValidation = false;

        } else {
            
            inputName.classList.remove('error');
            
        }

        if (inputComment.value.length <= 5) {
            inputComment.placeholder = 'Ваш коментарий меньше 15 символов';
            inputComment.classList.add('error');
            inputComment.value = '';
            isValidation = false;

        } else {

            inputComment.classList.remove('error');
        }
        
        return isValidation;
    }

    if(!validateInput()) {

    } else {
       
        const newComment = {
          name: inputName.value, 
          date: formattedDate, 
          text: inputComment.value, 
          likes: 0, 
          like: false
        };

        userComments.push(newComment);

        renderComments();
    } 
    
    inputName.value = '';
    inputComment.value = '';
});

renderComments();




