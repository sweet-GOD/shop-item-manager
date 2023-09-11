document.addEventListener('DOMContentLoaded', () => {
    const item = document.getElementById("item");
    const quantity = document.getElementById("quantity");
    const price = document.getElementById("price");
    const submitButton = document.getElementById("submitButton");
    const subtotalDisplay = document.getElementById("subtotalDisplay");
    const itemsContainer = document.getElementById("div1");
    const card = document.querySelector(".card");
    const editToDo = document.getElementById("editToDo");
    const newItem = document.getElementById("newItem");
    const newQuantity = document.getElementById("newQuantity");
    const newPrice = document.getElementById("newPrice");

    let arr1 = JSON.parse(localStorage.getItem("arr1")) || [];

    function renderItems() {
        itemsContainer.innerHTML = "";
        arr1.forEach((el, i) => {
            itemsContainer.innerHTML += `
                <tr>
                    <td>${i}</td>
                    <td>${el.items}</td>
                    <td>${el.quantities}</td>
                    <td>${el.prices}</td>
                    <td>${el.subTotal}</td>
                    <td>
                        <button onclick="editItem(${i})" class="btn btn-light editBtn">Edit</button>
                        <button onclick="deleteItem(${i})" class="btn btn-light deleteBtn"><i class="bi bi-x-lg"></i></button>
                    </td>
                </tr>
            `;
        });
    }

    function updateTotal() {
        let wholeTotal = arr1.reduce((total, itemm) => {
            return total + (itemm.prices * itemm.quantities);
        }, 0);

        subtotalDisplay.textContent = `Total: ${wholeTotal}`;
    }

    card.style.display = "none"
    function editItem(i) {
        card.style.display == "none" ? card.style.display = "block" : card.style.display = "none";
        theIndex = i;
        const selectedItem = arr1[i];
        newItem.value = selectedItem.items;
        newQuantity.value = selectedItem.quantities;
        newPrice.value = selectedItem.prices;
    }

    function deleteItem(i) {
        arr1.splice(i, 1);
        renderItems();
        updateTotal();
        localStorage.setItem("arr1", JSON.stringify(arr1));
    }

    submitButton.addEventListener("click", () => {
        const allObj = {
            items: item.value,
            prices: parseFloat(price.value),
            quantities: parseFloat(quantity.value),
            subTotal: (parseFloat(price.value) * parseFloat(quantity.value))
        }

        arr1.push(allObj);

        item.value = "";
        price.value = "";
        quantity.value = "";

        renderItems();
        updateTotal();
        localStorage.setItem("arr1", JSON.stringify(arr1));
    });

    editToDo.addEventListener("click", () => {
        const newObj = {
            items: newItem.value,
            prices: parseFloat(newPrice.value),
            quantities: parseFloat(newQuantity.value),
            subTotal: (parseFloat(newPrice.value) * parseFloat(newQuantity.value))
        }
        arr1.splice(theIndex, 1, newObj);
        renderItems();
        updateTotal();
        card.style.display = "none";
        localStorage.setItem("arr1", JSON.stringify(arr1));
    });

    window.editItem = editItem;
    window.deleteItem = deleteItem;

    renderItems();
    updateTotal();
});
