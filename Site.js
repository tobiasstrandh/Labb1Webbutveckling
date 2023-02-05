class Item {
  constructor(product, price, info, productPicture) {
    this.product = product;
    this.price = price;
    this.info = info;
    this.productPicture = productPicture;
  }
}

document.body.style.backgroundImage = "url(startpage2.webp)";

const items = [];

const itemList = document.querySelector("#items");

items.push(
  new Item("Poster Girl", "100", "bla bla bla", "postergirl.jpg"),
  new Item("Midnights", "100", "bla bla bla", "midnights.jpg"),
  new Item("Dawn FM", "100", "bla bla bla", "dawnfm.jpg")
);

console.log(items);

DisplayItems();

function DisplayItems() {
  for (const item of items) {
    const card = document.createElement("li");
    const cardPicture = document.createElement("img");
    const cardHeader = document.createElement("h2");
    const cardBody = document.createElement("div");
    const cardText = document.createElement("p");
    const cardFooter = document.createElement("h4");

    card.classList.add("card", "mt-3", "ms-4");

    cardPicture.src = item.productPicture;
    cardPicture.alt = "Picture on album";
    cardHeader.innerText = item.product;
    cardText.innerText = item.info;
    cardFooter.innerText = item.price;

    cardBody.append(cardText);
    card.append(cardPicture, cardHeader, cardBody, cardFooter);
    itemList.append(card);
  }
}
