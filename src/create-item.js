const formNode = document.getElementById('create-item');
const nameNode = document.getElementById('name');
const deptNode = document.getElementById('department');
const categoriesNode = document.getElementsByName('category');
const priceNode = document.getElementById('price');
const quantityNode = document.getElementById('quantity');

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
    }
});