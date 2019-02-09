const tableBodyNode = document.getElementById('inventory');
const jsonItems = window.localStorage.getItem('items');
let dairy = 0;
let meat = 0;
let prepared = 0;
let vegetables = 0;

let items = [];

if(jsonItems) {
    items = JSON.parse(jsonItems);
}

const filter = document.getElementById('filter');
console.log(filter.value);

filter.addEventListener('change', function() {
    console.log(filter.value);
    const allRows = document.getElementsByTagName('tr');

    if(filter.value === 'all') {
        for(let index = 0; index < allRows.length; index++) {
            const row = allRows[index];
            row.hidden = false;
        }
    }
    else {
        const dairyRows = document.querySelectorAll('.dairy');
        const meatRows = document.querySelectorAll('.meat');
        const preparedRows = document.querySelectorAll('.prepared');
        const vegetablesRows = document.querySelectorAll('.vegetables');

        for(let index = 0; index < dairyRows.length; index++) {
            dairyRows[index].hidden = true;
        }
        for(let index = 0; index < meatRows.length; index++) {
            meatRows[index].hidden = true;
        }
        for(let index = 0; index < preparedRows.length; index++) {
            preparedRows[index].hidden = true;
        }
        for(let index = 0; index < vegetablesRows.length; index++) {
            vegetablesRows[index].hidden = true;
        }
        if(filter.value === 'dairy') {
            for(let index = 0; index < dairyRows.length; index++) {
                dairyRows[index].hidden = false;
            }
        }
        if(filter.value === 'meat') {
            for(let index = 0; index < meatRows.length; index++) {
                meatRows[index].hidden = false;
            }
        }
        if(filter.value === 'prepared') {
            for(let index = 0; index < preparedRows.length; index++) {
                preparedRows[index].hidden = false;
            }
        }
        if(filter.value === 'vegetables') {
            for(let index = 0; index < vegetablesRows.length; index++) {
                vegetablesRows[index].hidden = false;
            }
        }
    }
});

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
        const thisCategory = item.categories[index];
        category.textContent += thisCategory + ', ';
        if(thisCategory === 'dairy') {
            dairy++;
        }
        if(thisCategory === 'meat') {
            meat++;
        }
        if(thisCategory === 'prepared') {
            prepared++;
        }
        if(thisCategory === 'vegetables') {
            vegetables++;
        }
        row.classList.add(thisCategory);
    }
    if(item.categories.length > 0) {
        const thisCategory = item.categories[item.categories.length - 1];
        row.classList.add(thisCategory);
        category.textContent += thisCategory;
        if(thisCategory === 'dairy') {
            dairy++;
        }
        if(thisCategory === 'meat') {
            meat++;
        }
        if(thisCategory === 'prepared') {
            prepared++;
        }
        if(thisCategory === 'vegetables') {
            vegetables++;
        }
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

const totalsNode = document.getElementById('totals');

const totalRow = document.createElement('tr');
const dairyTotal = document.createElement('td');
const meatTotal = document.createElement('td');
const preparedTotal = document.createElement('td');
const vegetablesTotal = document.createElement('td');

dairyTotal.textContent = dairy;
meatTotal.textContent = meat;
preparedTotal.textContent = prepared;
vegetablesTotal.textContent = vegetables;

totalRow.appendChild(dairyTotal);
totalRow.appendChild(meatTotal);
totalRow.appendChild(preparedTotal);
totalRow.appendChild(vegetablesTotal);

totalsNode.appendChild(totalRow);