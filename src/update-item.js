const formNode = document.getElementById('create-item');
const nameNode = document.getElementById('name');
const deptNode = document.getElementById('department');
const categoriesNode = document.getElementsByName('category');
const priceNode = document.getElementById('price');
const quantityNode = document.getElementById('quantity');

let items = [];

const jsonItems = window.localStorage.getItem('items');
if(jsonItems) {
    items = JSON.parse(jsonItems);
}

const searchParams = new URLSearchParams(window.location.search);
const itemName = searchParams.get('name');

let index = 0;
let item = null;
for(index = 0; index < items.length; index++) {
    if(items[index].name === itemName) {
        item = items[index];
        break;
    }
}

nameNode.value = item.name;
deptNode.value = item.dept;

for(let i = 0; i < item.categories.length; i++) {
    const cat = item.categories[i];
    const checkBoxNode = document.getElementById(cat);
    checkBoxNode.checked = true;
}

priceNode.value = item.price;
quantityNode.value = item.quantity;

formNode.addEventListener('submit', function(event) {
    event.preventDefault();

    let categoriesSelected = [];

    for(let index = 0; index < categoriesNode.length; index++) {
        if(categoriesNode[index].checked) {
            categoriesSelected.push(categoriesNode[index].value);
        }
    }

    const item = {
        name: nameNode.value,
        dept: deptNode.value,
        categories : categoriesSelected,
        price: priceNode.value,
        quantity: quantityNode.value
    };
    items[index] = item;

    const itemsJSON = JSON.stringify(items);
    window.localStorage.setItem('items', itemsJSON);
    window.location = 'inventory.html';
});
