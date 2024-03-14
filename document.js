let products = [
  {
    title: "Кабачки",
    price: 20000,
  },
  {
    title: "Баклажаны",
    price: 32000,
  },
  {
    title: "Бананы",
    price: 25000,
  },
  {
    title: "Огурцы",
    price: 40000,
  },
  {
    title: "Манго",
    price: 500000,
  },
  {
    title: "Ананас",
    price: 40000,
  },
  {
    title: "Пиёз",
    price: 6000,
  },
  {
    title: "Картошка",
    price: 5000,
  },
  {
    title: "Сабзи для плов",
    price: 4000,
  },
];

let add = document.querySelector(".btn-show");
let menu = document.querySelector(".menu");
let close = document.querySelector(".switch");
let form = document.querySelector(".dd");
let main = document.querySelector(".main");

function renderProducts(products) {
  main.innerHTML = "";
  for (let item of products) {
    let block = document.createElement("div");
    let h1 = document.createElement("h1");
    let p = document.createElement("p");

    h1.textContent = item.title;
    p.textContent = item.price + " сум";
    block.classList.add("block");
    p.classList.add("h3");
    block.append(h1, p);

    main.append(block);
  }
}

renderProducts(products);

add.onclick = () => {
  menu.style.right = "0";
};
close.onclick = () => {
  menu.style.right = "-100%";
};

form.onsubmit = (e) => {
  e.preventDefault();
  let mistake = document.querySelector(".mistake-text");
  let mistakemodal = document.querySelector(".mistake");
  let titleInput = form.querySelector('input[name="title"]');
  let priceInput = form.querySelector('input[name="price"]');
  let titleRegex = /^[A-Za-zА-Яа-яёЁ]+$/;
  let priceRegex = /^\d*$/;

  if (!titleRegex.test(titleInput.value)) {
    setTimeout(() => {
      mistakemodal.style.top = "-100%";
    }, 3000);
    mistake.innerHTML = "Название товара должно содержать только буквы";
    mistakemodal.style.top = "20%";
    return;
  }

  if (!priceRegex.test(priceInput.value) && priceInput.value === "") {
    mistake.innerHTML = "Цена товара должна содержать только цифры";
    setTimeout(() => {
      mistakemodal.style.top = "-100%";
    }, 3000);

    mistakemodal.style.top = "20%";
    return;
  }

  if (priceInput.value === "") {
    setTimeout(() => {
      mistakemodal.style.top = "-100%";
    }, 3000);

    mistake.innerHTML = "Укажите цену";
    mistakemodal.style.top = "20%";
    return;
  }

  let obj = {
    title: titleInput.value,
    price: parseInt(priceInput.value),
  };

  products.push(obj);

  renderProducts(products);
  form.reset();
};

let form_show = document.querySelector(".show");
let filtered = document.querySelector(".filtered");
let mistake2 = document.querySelector(".mistake2");

filtered.onclick = () => {
    mistake2.style.top = '10%'
}


form_show.onsubmit = (e) => {
    e.preventDefault();
    let fd = new FormData(form_show);
    let objFilter = {};
    
    fd.forEach((value, key) => {
        objFilter[key] = value;
    });
    
    setTimeout(() => {
        mistake2.style.top = "-100%";
      }, 1000);
  let filteredProducts = products.filter((product) => {
    if (product.price < objFilter.min) {
      return false;
    }
    if ( product.price > objFilter.max) {
      return false;
    }

    return true;
  });

  renderProducts(filteredProducts);

  form_show.reset();
};
