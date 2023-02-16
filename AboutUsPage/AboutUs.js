if (!/Android|iPhone/i.test(navigator.userAgent)) {
  document.body.style.backgroundImage = "url(../Pics/startpage2.webp)";
}

const stories = document.querySelector("#story");

const questionForQuiz = [];

CardStory();

let story = "";

function CardStory() {
  const card = document.createElement("div");
  const cardHeader = document.createElement("h5");
  const cardBody = document.createElement("div");
  const cardText = document.createElement("p");
  const cardButton = document.createElement("button");

  card.classList.add("card", "mt-5");
  cardBody.classList.add("card-body");
  cardText.classList.add("card-text");
  cardText.setAttribute("id", "textstory");
  cardButton.classList.add("btn");

  cardButton.innerText = "New Story";
  cardHeader.innerHTML = "A short story about music:";

  cardButton.onclick = () => {
    MusicStory();
  };

  cardBody.append(cardHeader, cardText, cardButton);
  card.append(cardBody);
  stories.append(card);

  MusicStory();
}

async function MusicStory() {
  const text = document.querySelector(`#textstory`);

  const quizUrl = new URL(
    `https://binaryjazz.us/wp-json/genrenator/v1/story/1/`
  );

  const response = await fetch(quizUrl);
  if (response.status === 200) {
    const jsonresponse = await response.json();

    story = jsonresponse;

    text.innerText = story;
  }
}
