class Item {
  constructor(product, price, info, productPicture, productId) {
    this.product = product;
    this.price = price;
    this.info = info;
    this.productPicture = productPicture;
    this.productId = productId;
  }
}

class Cart {
  constructor(productId, amount) {
    this.productId = productId;
    this.amount = amount;
  }
}

document.body.style.backgroundImage = "url(startpage2.webp)";

const items = [];

const itemList = document.querySelector("#items");

const cartList = document.querySelector("#cart");

const modalInfo = document.querySelector("#modal");

const amountsInCart = [];

items.push(
  new Item("Poster Girl", "99", "bla bla 1", "postergirl.jpg", "Item001"),
  new Item("Midnights", "100", "bla bla 2", "midnights.jpg", "Item002"),
  new Item("Dawn FM", "100", "bla bla 3", "dawnfm.jpg", "Item003")
);

DisplayItems();
DisplayCart();

function DisplayItems() {
  for (const item of items) {
    if (!amountsInCart.includes(item.productId)) {
      amountsInCart.push(new Cart(item.productId, 0));
    }

    const card = document.createElement("li");
    const cardPicture = document.createElement("img");
    const cardHeader = document.createElement("h2");
    const cardBody = document.createElement("div");
    const cardText = document.createElement("p");
    const cardPrice = document.createElement("p");
    const cardFooter = document.createElement("h4");

    const container = document.createElement("div");
    const cardModalButton = document.createElement("button");

    const cardAddButton = document.createElement("button");
    const cardRemoveButton = document.createElement("button");
    const cardAmountInCart = document.createElement("h4");

    card.setAttribute("id", item.productId);
    container.classList.add("container");
    cardModalButton.classList.add("btn");
    cardAddButton.classList.add("btn", "m-3");
    cardRemoveButton.classList.add("btn", "m-3");

    cardModalButton.setAttribute("data-bs-toggle", "modal");
    cardModalButton.setAttribute("data-bs-target", "#modal");

    card.classList.add("card", "mt-3", "ms-4");

    cardPicture.src = item.productPicture;
    cardPicture.alt = "Picture on album";
    cardHeader.innerText = item.product;
    cardPrice.innerText = `${item.price}kr`;
    cardText.innerText = item.info;
    cardModalButton.innerText = "More info";
    cardAddButton.innerText = "+";
    cardRemoveButton.innerText = "-";
    cardAmountInCart.innerText = 0;
    cardAmountInCart.setAttribute("id", "price");

    const modal = document.createElement("div");
    const modalDialog = document.createElement("div");
    const modalContent = document.createElement("div");
    const modalBody = document.createElement("div");

    //////

    modal.classList.add("modal", "fade");
    modal.setAttribute("id", "modal");
    modalDialog.classList.add("modal-dialog", "modal-dialog-centered");
    modalContent.classList.add("modal-content");
    modalBody.classList.add("modal-body");

    modalBody.innerText = item.info;

    ////////

    container.appendChild(cardModalButton);
    cardModalButton.appendChild(modal);
    modal.appendChild(modalDialog);
    modalDialog.appendChild(modalContent);
    modalContent.appendChild(modalBody);

    //modal.append(modalDialog, modalContent, modalBody);

    //cardModalButton.append(modal, modalDialog, modalContent, modalBody);

    // cardModalButton.onclick = () => {
    //   moreInfoAboutItem(item);
    // };

    cardAddButton.onclick = () => {
      addItemToCart(item.product, item.price);
    };

    cardRemoveButton.onclick = () => {
      removeItemFromCart(item.product);
    };

    cardBody.append(cardText, cardPrice, container);
    cardFooter.append(cardAddButton, cardRemoveButton, cardAmountInCart);
    card.append(cardPicture, cardHeader, cardBody, cardFooter);
    itemList.append(card);
  }
}

function moreInfoAboutItem(item) {
  const modal = document.createElement("div");
  const modalDialog = document.createElement("div");
  const modalContent = document.createElement("div");
  const modalBody = document.createElement("div");

  //////

  modal.classList.add("modal", "fade");
  modalDialog.classList.add("modal-dialog", "modal-dialog-centered");
  modalContent.classList.add("modal-content");
  modalBody.classList.add("modal-body");

  modalBody.innerText = item.info;

  ////////

  modal.appendChild(modalDialog, modalContent, modalBody);

  modalInfo.append(modal);
}

function addItemToCart(product, price) {
  for (const item of items) {
    if (item.product === product) {
      const cardItem = document.querySelector(`#${item.productId}`);
      const cardPrice = cardItem.querySelector("#price");

      for (const amount of amountsInCart) {
        if (item.productId === amount.productId) {
          amount.amount = amount.amount + 1;
          cardPrice.innerText = amount.amount;
          DisplayCart();
        }
      }
    }
  }
}

function removeItemFromCart(product) {
  for (const item of items) {
    if (item.product === product) {
      const cardItem = document.querySelector(`#${item.productId}`);
      const cardPrice = cardItem.querySelector("#price");

      for (const amount of amountsInCart) {
        if (item.productId === amount.productId) {
          if (amount.amount > 0) {
            amount.amount = amount.amount - 1;
            cardPrice.innerText = amount.amount;
            DisplayCart();
          } else {
            amount.amount = 0;
            cardPrice.innerText = amount.amount;
            DisplayCart();
          }
        }
      }
    }
  }
}

function DisplayCart() {
  while (cartList.childElementCount > 0) {
    cartList.children[0].remove();
  }

  const card = document.createElement("li");
  const cardHeader = document.createElement("h2");
  const cardBody = document.createElement("div");

  card.classList.add("card");

  cardHeader.innerText = "Cart";

  for (const item of amountsInCart) {
    const cardText = document.createElement("p");

    if (item.amount > 0) {
      cardText.innerText = `${item.productId} ${item.amount}`;
    }

    cardBody.append(cardText);
  }

  card.append(cardHeader, cardBody);
  cartList.append(card);
}
