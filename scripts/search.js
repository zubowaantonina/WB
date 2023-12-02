// import {cartCountTotal} from "./cart.js";


const Search = () => {
    const blockSearch = document.querySelector(".search-block");
    const inputSearch = blockSearch.querySelector("input.form-control");
    const searchBtn = document.querySelector("#button-addon2");
    const searchMore = document.querySelector(".more");
    const cartCount = document.querySelector(".cart-count");

   
    // inputSearch.addEventListener("input", (e) => {
    //     console.log(e.target.value);
    // })

    const renderGoods = (goods) => {
       
        const goodsContainer = document.querySelector(".long-goods-list");
        goodsContainer.innerHTML = "";
        goods.forEach((good) => {
            const goodBlock = document.createElement("div");
            goodBlock.classList.add("col-lg-3");
            goodBlock.classList.add("col-sm-6");
            // console.log(goodBlock);
            goodBlock.innerHTML = `
            <div class="goods-card">
						<span class="label ${good.label ? null : "d-none"}">${good.label}</span>
						<img src="db/${good.img}" alt="${good.name}" class="goods-image">
						<h3 class="goods-title">${good.name}</h3>
						<p class="goods-description">${good.description}</p>
						<button class="button goods-card-btn add-to-cart" data-id="${good.id}">
							<span class="button-price">$${good.price}</span>
						</button>
					</div>
            `;
            goodsContainer.append(goodBlock);
        });
    };
    const getData = (value) => {
        // fetch("https://wildberris-6298f-default-rtdb.firebaseio.com/db.json")
        fetch("db/db.json")
            .then(
                (res) => res.json() //response===res
            )
            .then((data) => {
                const array = data.filter((good) =>
                    good.name.toLowerCase().includes(value.toLowerCase())
                );
                localStorage.setItem("goods", JSON.stringify(array));
                if (window.location.pathname !== "/goods.html") {
                    window.location.href = "/goods.html";
                } else {
                    renderGoods(array);
                }
               
                // console.log(localStorage);
            });
    };
    //проверка на ошибку
    try {
        // inputSearch.addEventListener("input", (e) => {
        //     console.log(e.target.value);
        // })
        searchBtn.addEventListener("click", (e) => {
            e.stopPropagation(); //остановка прохождения клика вниз
            
            getData(inputSearch.value);
        });
    
        if (searchMore) {
            searchMore.addEventListener("click", () => {
                getData("");
                cartCountTotal()
            });
        }
    
    } catch (e) {
        console.error(e.message);
    }

    // inputSearch.addEventListener("input", (e) => {
    //     console.log(e.target.value);
    // });
    // searchBtn.addEventListener("click", (e) => {
    //     e.stopPropagation(); //остановка прохождения клика вниз
    //     console.log(inputSearch.value);
    //     getData(inputSearch.value);
    // });

    // if (searchMore) {
    //     searchMore.addEventListener("click", () => {
    //         getData("");
    //     });
    // }
};
Search();
