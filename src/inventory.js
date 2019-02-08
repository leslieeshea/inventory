const tableBodyNode = document.getElementById('inventory');
const jsonItems = window.localStorage.getItem('items');

let items = [];

if(jsonItems) {
    items = JSON.parse(jsonItems);
}

for(let index = 0; index < items.length; index++) {
    const item = items[index];
    const row = document.createElement('tr');
    const name = document.createElement('td');
    const category = document.createElement('td');
    const price = document.createElement('td');
    const quantity = document.createElement('td');
    const link = document.createElement('a');
    const deleteCell = document.createElement('td');
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'X';
    deleteButton.value = item.name;
    const updateCell = document.createElement('td');
    const updateButton = document.createElement('button');
    updateButton.textContent = 'Update';
    updateButton.value = item.name;

    link.href = 'item-detail.html?name=' + encodeURIComponent(item.name);
    link.textContent = item.name;
    
    for(let index = 0; index < item.categories.length - 1 ; index++) {
        category.textContent += item.categories[index] + ', ';
    }
    if(item.categories.length > 0) {
        category.textContent += item.categories[item.categories.length - 1];
    }
    price.textContent = item.price;
    quantity.textContent = item.quantity;

    deleteButton.addEventListener('click', function() {
        items.splice(index, 1);

        const jsonItems = JSON.stringify(items);

        window.localStorage.setItem('items', jsonItems);

        window.location = '../inventory.html';
    });

    updateButton.addEventListener('click', function() {
        window.location = '../update-item.html?name=' + encodeURIComponent(item.name);
    });

    name.appendChild(link);
    row.appendChild(name);
    row.appendChild(category);
    row.appendChild(price);
    row.appendChild(quantity);
    deleteCell.appendChild(deleteButton);
    row.appendChild(deleteCell);
    updateCell.appendChild(updateButton);
    row.appendChild(updateCell);

    tableBodyNode.appendChild(row);
}