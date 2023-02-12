if (/Android|iPhone/i.test(navigator.userAgent)) {
  const img = document.createElement("img");
  img.src = "Pics/startpage2.webp";
  img.alt = "Picture on the store";
  img.classList.add("card-img");
  const card = document.getElementById("startcard");
  card.appendChild(img);
} else {
  document.body.style.backgroundImage = "url(Pics/startpage2.webp)";
}
