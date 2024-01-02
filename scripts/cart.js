const cart = () => {
  const cartBtn = document.querySelector(".button-cart");
  const cart = document.getElementById("modal-cart");
  const closeBtn = document.querySelector(".modal-close");
  const goodsContainer = document.querySelector(".long-goods-list");
  const cartTable = document.querySelector(".cart-table__goods");
  const cardTableTotal = document.querySelector(".card-table__total");
  const cartCount = document.querySelector(".cart-count");
  const modalForm = document.querySelector(".modal-form");

  //количество товара в корзине
  const cartCountTotal = () => {
    // const cart = JSON.parse(localStorage.getItem("cart"));
    // const newCart = cart.reduce((sum, good) => {
    //   return sum + good.count;
    // }, 0);
    // if (newCart === 0) {
    //   cartCount.textContent = "";
    // } else {
    //   cartCount.textContent = newCart;
    // }
    const cartsCounter = document.querySelector('.cart-count');
    const cart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : []
    cartsCounter.textContent = cart.length;
  };
//   cartCountTotal()

  const deleteCartItem = (id) => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    const newCart = cart.filter((good) => {
      return good.id !== id;
    });
    localStorage.setItem("cart", JSON.stringify(newCart));
    renderCartGoods(JSON.parse(localStorage.getItem("cart")));
    cartCountTotal();
  };
  const plusCartItem = (id) => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    const newCart = cart.map((good) => {
      if (good.id === id) {
        good.count++;
      }
      return good;
    });
    localStorage.setItem("cart", JSON.stringify(newCart));
    renderCartGoods(JSON.parse(localStorage.getItem("cart")));
    cartCountTotal();
  };
  const minusCartItem = (id) => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    cart.map((good) => {
      if (good.id === id) {
        // if (good.count > 0) {
        //     good.count--;
        // }
        if (good.count <= 1) {
          // good.count = 0;
          cart.splice(cart, 1);
        } else {
          good.count--;
        }
      }
      return good;
    });
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCartGoods(JSON.parse(localStorage.getItem("cart")));
    cartCountTotal();
  };
  
  const addToCart = (id) => {
    const goods = JSON.parse(localStorage.getItem("goods"));
    const clickedGood = goods.find((good) => good.id == id);
    const cart = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];
    
    if (cart.some((good) => good.id === clickedGood.id)) {
      cart.map((good) => {
        if (good.id === clickedGood.id) {
          good.count++;
        }
        return good;
      });
    } else {
      clickedGood.count = 1;
      cart.push(clickedGood);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    cartCountTotal();
  };
  const renderCartGoods = (goods) => {
    cartTable.innerHTML = "";
    goods.forEach((good) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${good.name}</td>
		<td>${good.price}</td>$</td>
		<td><button class="cart-btn-minus"">-</button></td>
		<td>${good.count}</td>
		<td><button class=" cart-btn-plus"">+</button></td>
		<td>${+good.price * +good.count}$</td>
		<td><button class="cart-btn-delete"">x</button></td>
`;
      cartTable.append(tr);
      tr.addEventListener("click", (e) => {
        if (e.target.classList.contains("cart-btn-minus")) {
          minusCartItem(good.id);
        } else if (e.target.classList.contains("cart-btn-plus")) {
          plusCartItem(good.id);
        } else if (e.target.classList.contains("cart-btn-delete")) {
          deleteCartItem(good.id);
        }
      });

      // console.log(good);
    });
    //общая сумма
    const totalPrice = goods.reduce((sum, good) => {
      return sum + good.price * good.count;
    }, 0);
    cardTableTotal.textContent = totalPrice + "$";
  };

  const sendForm = () => {
    const cartArray = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];
      const formElement = document.querySelector('.modal-form');
      const formData = new FormData(formElement); // создаём объект FormData, передаём в него элемент формы
      // теперь можно извлечь данные
      const name = formData.get('nameCustomer');
      const phone = formData.get('phoneCustomer');

    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        cart: cartArray,
        name: name,
        phone: phone,
      }),
    }).then(() => {
      cart.style.display = "";
     
    });
  };
  modalForm.addEventListener("submit", (e) => {
    e.preventDefault();
    sendForm();
    console.log("submit");
    localStorage.removeItem('cart');
    cartCount.textContent = "";
    // cartCountTotal()
  });

  cartBtn.addEventListener("click", () => {
    const cartArray = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];
    cart.style.display = "flex";
    renderCartGoods(cartArray);
  });
  // closeBtn.addEventListener('click',()=>{
  //     cart.style.display=""
  // })
  document.addEventListener("click", ({ target }) => {
    if (
      !target.closest(".overlay") ||
      (target.closest(".modal") && !target.classList.contains("modal-close"))
    ) {
      return;
    }
    cart.style.display = "";
  });
  if (goodsContainer) {
    cartCountTotal()
    goodsContainer.addEventListener("click", (event) => {
      if (event.target.closest(".add-to-cart")) {
        const buttonToCart = event.target.closest(".add-to-cart");
        const goodId = buttonToCart.dataset.id;

        addToCart(goodId);
      }
    });
  }
};
cart();
