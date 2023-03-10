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
  constructor(item, amount, totalPricePerItem) {
    this.item = item;
    this.amount = amount;
    this.totalPricePerItem = totalPricePerItem;
  }
}

if (!/Android|iPhone/i.test(navigator.userAgent)) {
  document.body.style.backgroundImage = "url(../Pics/startpage2.webp)";
}

const items = [];

const itemList = document.querySelector("#items");

const cartList = document.querySelector("#cart");

const modalInfo = document.querySelector("#modal");

const amountsInCart = [];

let totalPrice = 0;
//let totalPricePerItem = 0;

items.push(
  new Item(
    "Poster Girl",
    99,
    `Poster Girl is the third studio album by Swedish singer Zara Larsson and her second released internationally. 
    It was released on 5 March 2021.`,
    "../Pics/postergirl.webp",
    "Item001"
  ),
  new Item(
    "Midnights",
    100,
    `Midnights is the tenth studio album by American singer-songwriter Taylor Swift. 
    It was released on October 21, 2022.`,
    "../Pics/midnights.webp",
    "Item002"
  ),
  new Item(
    "Dawn FM",
    100,
    `Dawn FM is the fifth studio album by Canadian singer-songwriter the Weeknd. 
    It was released on January 7 2022.`,
    "../Pics/dawnfm.webp",
    "Item003"
  )
);

DisplayItems();
DisplayCart();

function DisplayItems() {
  for (const item of items) {
    if (!amountsInCart.includes(item)) {
      amountsInCart.push(new Cart(item, 0, 0));
    }

    const card = document.createElement("li");
    const cardPicture = document.createElement("img");
    const cardHeader = document.createElement("h2");
    const cardBody = document.createElement("div");
    const cardText = document.createElement("p");
    const cardFooter = document.createElement("h4");

    const container = document.createElement("div");
    const cardModalButton = document.createElement("button");

    const cardAddButton = document.createElement("button");
    const cardRemoveButton = document.createElement("button");
    const cardAmountInCart = document.createElement("h4");

    card.setAttribute("id", item.productId);
    container.classList.add("container");
    cardModalButton.classList.add("btn", "btn-secondary");
    cardAddButton.classList.add("btn", "m-3");
    cardRemoveButton.classList.add("btn", "m-3");
    cardPicture.classList.add("card-img");

    cardModalButton.setAttribute("data-bs-toggle", "modal");
    cardModalButton.setAttribute("data-bs-target", `#modal${item.productId}`);
    cardModalButton.setAttribute("id", `btn${item.productId}`);

    card.classList.add("card", "mt-3", "ms-4");
    cardHeader.classList.add("card-header");
    cardBody.classList.add("card-body");
    cardText.classList.add("card-text");
    cardFooter.classList.add("card-footer");

    cardPicture.src = item.productPicture;
    cardPicture.rel;
    cardPicture.alt = "Picture on album";
    cardHeader.innerText = item.product;

    cardText.innerText = `${item.price}kr`;
    cardModalButton.innerText = "More info";
    cardAddButton.innerText = "+";
    cardRemoveButton.innerText = "-";
    cardAmountInCart.innerText = 0;
    cardAmountInCart.setAttribute("id", "amount");

    cardAddButton.onclick = () => {
      addItemToCart(item.product, item.price);
    };

    cardRemoveButton.onclick = () => {
      removeItemFromCart(item.product);
    };
    container.appendChild(cardModalButton);
    cardBody.append(cardText, container);
    cardFooter.append(cardAddButton, cardRemoveButton, cardAmountInCart);
    card.append(cardPicture, cardHeader, cardBody, cardFooter);
    itemList.append(card);

    modal(item);
  }
}

function addItemToCart(product, price) {
  for (const item of items) {
    if (item.product === product) {
      const cardItem = document.querySelector(`#${item.productId}`);
      const cardPrice = cardItem.querySelector("#amount");

      for (const amount of amountsInCart) {
        if (item.productId === amount.item.productId) {
          amount.amount += 1;
          cardPrice.innerText = amount.amount;
          amount.totalPricePerItem += item.price;
          console.log(amount.totalPricePerItem);
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
      const cardPrice = cardItem.querySelector("#amount");

      for (const amount of amountsInCart) {
        if (item.productId === amount.item.productId) {
          if (amount.amount > 0) {
            amount.amount = amount.amount - 1;
            cardPrice.innerText = amount.amount;
            amount.totalPricePerItem -= item.price;
            DisplayCart();
          } else if (amount.amount === 0) {
            amount.amount = 0;
            cardPrice.innerText = amount.amount;
            amount.totalPricePerItem -= item.price;
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
  const cardFooter = document.createElement("div");
  const cardButton = document.createElement("button");

  card.classList.add("card", "mt-3", "ms-4", "cart");
  cardHeader.classList.add("card-header");
  cardBody.classList.add("card-body");
  cardFooter.classList.add("card-footer");
  cardButton.classList.add("btn", "btn-secondary");

  cardHeader.innerText = "Cart";
  cardButton.innerText = "Complete";

  const total = [];

  for (const item of amountsInCart) {
    const cardText = document.createElement("p");

    if (item.amount > 0) {
      cardText.innerText = `${item.item.product} ${item.amount}`;
      total.push(item.totalPricePerItem);
    }

    cardBody.append(cardText);
  }

  totalPrice = total.reduce((acc, curr) => acc + curr, 0);

  const cardTextPrice = document.createElement("p");
  cardTextPrice.setAttribute("id", "totalPrice");
  cardTextPrice.innerText = `Total: ${totalPrice} Kr`;

  cardButton.onclick = () => {
    ClearCart();
  };

  cardBody.append(cardTextPrice);
  cardFooter.append(cardButton);
  card.append(cardHeader, cardBody, cardFooter);
  cartList.append(card);
}

function ClearCart() {
  const text = document.querySelector("#totalPrice");

  text.innerText =
    "Thanks for your purchase! You will soon be sent back to home";

  setTimeout(() => {
    window.location.replace("../index.html");
  }, 10000);
}

function modal(item) {
  const findBtn = document.querySelector(`#btn${item.productId}`);

  const modal = document.createElement("div");
  const modalDialog = document.createElement("div");
  const modalContent = document.createElement("div");
  const modalHeader = document.createElement("h4");
  const modalBody = document.createElement("div");
  const modalButton = document.createElement("button");

  modal.classList.add("modal", "fade");
  modal.setAttribute("id", `modal${item.productId}`);
  modalDialog.classList.add("modal-dialog", "modal-dialog-centered");
  modalContent.classList.add("modal-content");
  modalHeader.classList.add("modal-header", "text-black");
  modalBody.classList.add("modal-body", "text-black");
  modalButton.classList.add("btn-close");

  modalButton.setAttribute("data-bs-dismiss", `modal${item.productId}`);

  modalHeader.innerText = item.product;
  modalBody.innerText = item.info;

  modal.appendChild(modalDialog);
  modalDialog.appendChild(modalContent);
  modalContent.append(modalButton, modalHeader, modalBody);

  findBtn.appendChild(modal);
}
