// let w = window.innerWidth;
// let h = window.innerHeight;

// console.log(w);
// console.log(h);

// console.log(document.body.style.backgroundImage);

// document.body.style.backgroundImage = "url('startpagemini.webp')";

// console.log(document.body.style.backgroundImage);

// document.body.style.backgroundImage = "url(startpage2.webp)";

// function changeImg() {
//   var windowWidth = window.innerWidth;
//   if (windowWidth <= 800) {
//     document.body.style.backgroundImage = "none";

//   } else {
//     document.body.style.backgroundImage = "url(startpage2.webp)";
//   }
// }
// window.changeImg();

if (/Android|iPhone/i.test(navigator.userAgent)) {
  document.body.style.backgroundImage = "url(startpagemini.webp)";
} else {
  document.body.style.backgroundImage = "url(startpage2.webp)";
}
