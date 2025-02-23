const listElement = document.getElementById('list');
const inputName = document.getElementById('input-name');
const inputComment = document.getElementById('input-comment');
const buttonInput = document.getElementById('button');
const errorClass = document.querySelector('.error');

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
    {name: 'Глеб Фокин', date: '12.02.22 12:18', text: 'Это будет первый комментарий на этой странице', likes: 3, like: true},
    {name: 'Варвара Н.', date: '13.02.22 19:22', text: 'Мне нравится как оформлена эта страница! ❤', likes: 75, like: false}
  ];





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

        } else {
            
            inputName.classList.remove('error');
            
        }

        if (inputComment.value.length <= 10) {

            inputComment.classList.add('error');
            inputComment.value = '';

            isValidation = false;

        } else {

            inputComment.classList.remove('error');
        }
        
        return isValidation;
    }

    if(!validateInput()) {

        return;

    } else {
       
        list.innerHTML = `<div class="comment-header">
            <div class="title">${inputName.value}</div>
            <div>${formattedDate}</div>
          </div>
          <div class="comment-body">
            <div class="comment-text">${inputComment.value}
            </div>
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span class="likes-counter">0</span>
              <button class="like-button"></button>
            </div>
          </div>`;

          
          listElement.appendChild(list)
    } 
    
    inputName.value = '';
    inputComment.value = '';
    

})

