var nameInput = document.querySelector(".name-input");
var priceInput = document.querySelector(".price-input");
var submitBtn = document.querySelector(".submit");
var resetBtn = document.querySelector(".reset");
var totalList = document.querySelector(".total-list tbody");
var totalPriceElement = document.querySelector(".total-price");

let total = [];
let totalPrice = 0;

function displayTotal() {
	totalList.innerHTML = "";

	totalPrice = 0;

	total.forEach((item, index) => {
		let row = document.createElement("tr");
		row.innerHTML = `
            <td class="border p-2">${item.name}</td>
            <td class="border p-2">$${item.price.toFixed(2)}</td>
            <td class="border p-2">
                <button data-index="${index}" class="remove-item bg-red-500 text-white py-1 px-2 rounded hover:bg-red-700">Remove</button>
            </td>
        `;
		totalList.appendChild(row);

		totalPrice += item.price;
	});

	totalPriceElement.textContent = `Total: $${totalPrice.toFixed(2)}`;

	document.querySelectorAll(".remove-item").forEach((button) => {
		button.addEventListener("click", function () {
			const index = parseInt(this.getAttribute("data-index"));
			removeItem(index);
		});
	});
}

function removeItem(index) {
	total.splice(index, 1); 
	displayTotal();
}


submitBtn.addEventListener("click", () => {
	update();
});

function update() {
	var inputName = nameInput.value;
	var inputPrice = parseFloat(priceInput.value);

	if (inputName && !isNaN(inputPrice)) {

		total.push({ name: inputName, price: inputPrice });

		displayTotal();

		nameInput.value = "";
		priceInput.value = "";
	} else {
		alert("Please enter a valid name and price.");
	}
}

resetBtn.addEventListener("click", () => {
	nameInput.value = "";
	priceInput.value = "";
	totalList.innerHTML = "";
	total = [];
	totalPrice = 0;
	totalPriceElement.textContent = `Total: $0.00`;
});
