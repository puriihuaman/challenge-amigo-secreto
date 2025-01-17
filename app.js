const listFriends = [];
const winnersList = [];

function getFriendName() {
  const friendName = document.getElementById("friendName").value;

  if (!friendName.trim() || friendName.trim() === "") {
    alert("Por favor, inserte un nombre.");
    return;
  }

  return friendName;
}

function addFriend() {
  const name = getFriendName();

  if (listFriends.includes(name)) {
    alert("El amigo ya se encuentra en la lista.");
    return;
  }

  listFriends.push(name);

  const input = document.getElementById("friendName");
  input.value = "";
  input.focus();

  showFriends();
}

function showFriends() {
  const friendsList = document.getElementById("friends-list");
  friendsList.innerHTML = "";
  const fragment = document.createDocumentFragment();

  for (let index = 0; index < listFriends.length; index++) {
    const friend = listFriends[index];

    const li = document.createElement("li");

    li.textContent = friend;
    fragment.prepend(li);
  }

  friendsList.appendChild(fragment);
}

function generateRandomNumber() {
  return Math.floor(Math.random() * listFriends.length);
}

function drawFriends() {
  if (listFriends.length < 2) {
    alert("Por favor, ingrese al menos dos amigos.");
    return;
  }

  const randomNumber = generateRandomNumber();
  const winnerName = listFriends.splice(randomNumber, 1);
  showWinner(winnerName);
}

function showWinner(winner) {
  document.getElementById("friends-list").innerHTML = "";
  const winnerElement = document.getElementById("result");

  const item = document.createElement("li");
  item.textContent = `El amigo secreto sorteado es: ${winner}`;

  winnerElement.appendChild(item);
  showWinners(winner);

  const anotherDraw = document.getElementById("another-draw");
  anotherDraw.removeAttribute("disabled");
  anotherDraw.classList.remove("disabled");

  const buttonDraw = document.querySelector(".button-draw");
  buttonDraw.setAttribute("disabled", true);
  buttonDraw.classList.add("disabled");
}

function drawAgain() {
  document.getElementById("result").innerHTML = "";
  showFriends();

  const buttonDraw = document.querySelector(".button-draw");
  buttonDraw.removeAttribute("disabled");
  buttonDraw.classList.remove("disabled");

  const anotherDraw = document.getElementById("another-draw");
  anotherDraw.setAttribute("disabled", true);
  anotherDraw.classList.add("disabled");
}

function showWinners(winner) {
  winnersList.push(winner);

  const winners = document.getElementById("winners");

  const fragment = document.createDocumentFragment();
  winners.innerHTML = "";

  for (let index = 0; index < winnersList.length; index++) {
    const item = document.createElement("li");

    item.textContent = winnersList[index];
    fragment.prepend(item);
  }

  winners.appendChild(fragment);
}
