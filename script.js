const listElement = document.getElementById("list");
const inputName = document.getElementById("input-name");
const inputComment = document.getElementById("input-comment");
const buttonInput = document.getElementById("button");
const errorClass = document.querySelector(".error");
const likeButton = document.querySelector(".like-button");

// Форматирование выводимой даты

const currentDate = new Date();
const formattedDate = formatDate(currentDate);

function formatDate(date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear()).slice(-2);
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${day}.${month}.${year} ${hours}:${minutes}`;
}

// обновление массива с коментариями

let userComments = [];

const updateUserComments = (newComments) => {
  userComments = newComments;
};

// API запрос на получение данных с сервера

const host = "https://wedev-api.sky.pro/api/v1/Miron_MPF";

const fetchComments = () => {
  return fetch(host + "/comments")
    .then((response) => {
      return response.json();
    })
    .then((responseData) => {
      console.log(responseData);
      const appComents = responseData.comments.map((comment) => {
        return {
          name: comment.author.name,
          date: comment.date,
          text: comment.text,
          likes: comment.likes,
          isLiked: false,
        };
      });
      return appComents;
    });
};

fetchComments().then((data) => {
  updateUserComments(data);
  renderComments();
});

function escapeHtml(text) {
  const escapeText = text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
  return escapeText;
}

const renderComments = () => {
  const container = document.getElementById("list");

  container.innerHTML = userComments
    .map(
      (comments, id) =>
        `<li class="comment">
          <div class="comment-header">
            <div class="title">${escapeHtml(comments.name)}</div>
            <div>${comments.date}</div>
          </div>
          <div class="comment-body">
            <div class="comment-text">${escapeHtml(comments.text)}</div>
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span class="likes-counter">${comments.likes}</span>
              <button class="like-button ${
                comments.isLiked ? "-active-like" : ""
              }" data-id ="${id}"></button>
            </div>
          </div>
        </li>`
    )
    .join("");

  const likeButtons = document.querySelectorAll(".like-button");

  likeButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const index = button.dataset.index;
      const comment = userComments[index];

      if (comment.isLiked) {
        comment.likes--;
      } else {
        comment.likes++;
      }
      comment.isLiked = !comment.isLiked;

      renderComments();
    });
  });

  const addClickEventToComments = () => {
    const commentElements = document.querySelectorAll(".comment");
    commentElements.forEach((commentElement, index) => {
      commentElement.addEventListener("click", () => {
        const comment = userComments[index];

        const inputComment = document.getElementById("input-comment");
        inputComment.value = `[Цитата пользователя: "${comment.text}"]`;

        console.log(`клик по тексту коментария: ${userComments[index].text} `);
      });
    });
  };
  addClickEventToComments();
};

renderComments();

buttonInput.addEventListener("click", () => {
  const list = document.createElement("li");

  list.classList.add("comment");

  function validateInput() {
    let isValidation = true;

    if (inputName.value.length <= 3) {
      inputName.classList.add("error");
      inputName.placeholder = "Ваше имя меньше 5 символов";
      inputName.value = "";
      isValidation = false;
    } else if (inputName.value.length >= 12) {
      inputName.classList.add("error");
      inputName.placeholder = "Ваше имя больше 12 символов";
      inputName.value = "";
      isValidation = false;
    } else {
      inputName.classList.remove("error");
    }

    if (inputComment.value.length <= 5) {
      inputComment.placeholder = "Ваш коментарий меньше 15 символов";
      inputComment.classList.add("error");
      inputComment.value = "";
      isValidation = false;
    } else {
      inputComment.classList.remove("error");
    }

    return isValidation;
  }

  if (!validateInput()) {
  } else {
    const newComment = {
      name: escapeHtml(inputName.value),
      date: formatDate,
      text: escapeHtml(inputComment.value),
      likes: 0,
      isLiked: false,
    };
  }

  postComment(escapeHtml(inputComment.value), escapeHtml(inputName.value)).then(
    () => {
      renderComments();
      inputName.value = "";
      inputComment.value = "";
    }
  );
});


const postComment = (text, name) => {
  return fetch(host + "/comments", {
    method: "POST",
    body: JSON.stringify({
      text,
      name,
    }),
  }).then(() => {
    return fetchComments();
  });
};

