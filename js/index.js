import { fetchComments, postComment } from "./api.js";
import { validateInput } from "./validation.js";
import { renderComments } from "./render.js";


const inputName = document.getElementById("input-name");
const inputComment = document.getElementById("input-comment");
const buttonInput = document.getElementById("button");
const container = document.getElementById("list");

let userComments = [];

const updateUserComments = (newComments) => {
  userComments = newComments;
  renderComments(userComments, container);
};

const fetchAndRender = () => {
  fetchComments().then((data) => {
    updateUserComments(data);
  });
};

buttonInput.addEventListener("click", () => {
  if (!validateInput(inputName, inputComment)) {
    return;
  }

  postComment(inputComment.value, inputName.value).then(() => {
    fetchAndRender();
    inputName.value = "";
    inputComment.value = "";
  });
});

window.onload = fetchAndRender;