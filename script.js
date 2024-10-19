var productNameInput = document.getElementById("productName");
var productPriceInput = document.getElementById("productPrice");
var productCategoryInput = document.getElementById("productCategory");
var productDescriptionInput = document.getElementById("productDescription");
var productImageInput = document.getElementById("productImage");
var searchInput = document.getElementById("searchInput");
var btnAddProduct = document.getElementById("btnAdd");
var btnUpdateProduct = document.getElementById("btnUpdate");
var index = 0;
var productList = [];
if (localStorage.getItem("productList") != null) {
  productList = JSON.parse(localStorage.getItem("productList"));
  displayData();
}
function addProduct() {
  if (
    validationinput(productNameInput, "msgName") &&
    validationinput(productPriceInput, "msgPrice") &&
    validationinput(productCategoryInput, "msgCategory") &&
    validationinput(productDescriptionInput, "msgDescription") &&
    validationinput(productImageInput, "msgtImage")
  ) {
    var product = {
      name: productNameInput.value,
      price: productPriceInput.value,
      category: productCategoryInput.value,
      description: productDescriptionInput.value,
      image: productImageInput.files[0]?.name
        ? `img/${productImageInput.files[0].name}`
        : "img/2.jpg",
    };
    productList.push(product);
    clearform();
    localStorage.setItem("productList", JSON.stringify(productList));
    displayData();
  }
}
function clearform() {
  productNameInput.value = null;
  productPriceInput.value = null;
  productCategoryInput.value = null;
  productDescriptionInput.value = null;
  productImageInput.value = null;
  productNameInput.classList.remove("is-valid");
  productPriceInput.classList.remove("is-valid");
  productCategoryInput.classList.remove("is-valid");
  productDescriptionInput.classList.remove("is-valid");
  productImageInput.classList.remove("is-valid");
}
function deleteItem(deleteIndex) {
  productList.splice(deleteIndex, 1);
  localStorage.setItem("productList", JSON.stringify(productList));
  displayData();
}
function displayData() {
  var search = searchInput.value;
  var record = "";

  for (var i = 0; i < productList.length; i++) {
    if (productList[i].name.toLowerCase().includes(search.toLowerCase())) {
      record += `
          <tr>
            <td>${i + 1}</td>
            <td>${productList[i].name}</td>
            <td>${productList[i].price}</td>
            <td>${productList[i].category}</td>
            <td>${productList[i].description}</td>
            <td><img width="100px" src="${productList[i].image}" alt=""></td>
            <td>
              <button  onclick="setFormUPdate(${i})" class="btn btn-outline-warning btn-sm">Update</button>
              <button onclick="deleteItem(${i})" class="btn btn-outline-danger btn-sm">Delete</button>
            </td>
          </tr>
        `;
    }
  }

  document.getElementById("tableData").innerHTML = record;
}

function validationinput(element, msgId) {
  var text = element.value;
  var regex = {
    productName: /^[a-zA-Z0-9 ]{3,50}$/,
    productPrice: /^\d+(\.\d{1,2})?$/,
    productCategory: /^(tv|Mobile|Screens|Electronic)$/i,
    productDescription: /^.{10,500}$/m,
    productImage: /\.(jpeg|jpg|gif|png)$/i,
  };

  var msg = document.getElementById(msgId);
  if (regex[element.id].test(text)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    msg.classList.add("d-none");
    return true;
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    msg.classList.remove("d-none");
    return false;
  }
}

function setFormUPdate(indexElement) {
  productNameInput.value = productList[indexElement].name;
  productPriceInput.value = productList[indexElement].price;
  productCategoryInput.value = productList[indexElement].category;
  productDescriptionInput.value = productList[indexElement].description;
  btnAddProduct.classList.add("d-none");
  btnUpdateProduct.classList.remove("d-none");
  index = indexElement;
}

function updateData(index) {
  if (
    validationinput(productNameInput, "msgName") &&
    validationinput(productPriceInput, "msgPrice") &&
    validationinput(productCategoryInput, "msgCategory") &&
    validationinput(productDescriptionInput, "msgDescription")
  ) {
    var product = {
      name: productNameInput.value,
      price: productPriceInput.value,
      category: productCategoryInput.value,
      description: productDescriptionInput.value,
      image: productImageInput.files[0]?.name
        ? `img/${productImageInput.files[0].name}`
        : "img/2.jpg",
    };
    productList.splice(index, 1, product);
    clearform();
    localStorage.setItem("productName", JSON.stringify(productList));
    displayData();
  }
}
