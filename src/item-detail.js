const name = document.getElementById('name');
const department = document.getElementById('department');
const category = document.getElementById('category');
const price = document.getElementById('unit-price');
const quantity = document.getElementById('quantity');

const jsonItems = window.localStorage.getItem('items');
let items = [];

if(jsonItems) {
    items = JSON.parse(jsonItems);
}

const searchParams = new URLSearchParams(window.location.search);
const itemName = searchParams.get('name');

let item = null;
for(let index = 0; index < items.length; index++) {
    if(items[index].name === itemName) {
        item = items[index];
        break;
    }
}

name.textContent = item.name;
department.textContent = item.dept;
price.textContent = item.price;
quantity.textContent = item.quantity;

for(let index = 0; index < item.categories.length - 1; index++) {
    category.textContent += item.categories[index] + ', ';
}

if(item.categories.length > 0) {
    category.textContent += item.categories[item.categories.length - 1];
}
