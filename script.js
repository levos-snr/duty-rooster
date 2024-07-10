//render
//github
//heruku
//vercel

document.addEventListener("DOMContentLoaded", function () {
	const tbody = document.querySelector("tbody");
	const form = document.getElementById("dutyForm");
	let editingDutyId = null;
	const URL = "https://fake-server-json-noid.onrender.com/duties";

	form.addEventListener("submit", function (event) {
		event.preventDefault();
		if (editingDutyId) {
			updateDuty(editingDutyId);
		} else {
			addDuty();
		}
	});

	function loadDuties() {
		fetch(`${URL}`)
			.then((response) => response.json())
			.then((duties) => {
				tbody.innerHTML = "";
				duties.forEach((duty) => {
					const row = document.createElement("tr");
					row.innerHTML = `
                        <td>${duty.username}</td>
                        <td>${duty.cleaningTime}</td>
                        <td>${duty.dutyDate}</td>
                        <td>${duty.dutyType}</td>
                        <td>
                            <button class="edit-btn" data-id="${duty.id}">Edit</button>
                            <button class="delete-btn" data-id="${duty.id}">Delete</button>
                        </td>
                    `;
					tbody.appendChild(row);
				});
				addEventListeners();
			});
	}

	function addEventListeners() {
		document.querySelectorAll(".edit-btn").forEach((button) => {
			button.addEventListener("click", handleEdit);
		});
		document.querySelectorAll(".delete-btn").forEach((button) => {
			button.addEventListener("click", handleDelete);
		});
	}

	function handleEdit(event) {
		const id = event.target.getAttribute("data-id");
		fetch(`${URL}/${id}`)
			.then((response) => response.json())
			.then((duty) => {
				document.getElementById("username").value = duty.username;
				document.getElementById("cleaningTime").value = duty.cleaningTime;
				document.getElementById("dutyDate").value = duty.dutyDate;
				document.getElementById("dutyType").value = duty.dutyType;
				editingDutyId = duty.id;
				form.querySelector('button[type="submit"]').textContent = "Update";
			});
	}

	function handleDelete(event) {
		const id = event.target.getAttribute("data-id");
		fetch(`${URL}/${id}`, {
			method: "DELETE",
		}).then(() => loadDuties());
	}

	//ADD TO LOCALSTORAGE

	function addToLocalStorag() {
		
	}

	function addDuty() {
		const username = document.getElementById("username").value;
		const cleaningTime = document.getElementById("cleaningTime").value;
		const dutyDate = document.getElementById("dutyDate").value;
		const dutyType = document.getElementById("dutyType").value;

		const newDuty = {
			username: username,
			cleaningTime: cleaningTime,
			dutyDate: dutyDate,
			dutyType: dutyType,
		};

		fetch(`${URL}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newDuty),
		}).then(() => {
			form.reset();
			loadDuties();
		});
	}

	function updateDuty(id) {
		const username = document.getElementById("username").value;
		const cleaningTime = document.getElementById("cleaningTime").value;
		const dutyDate = document.getElementById("dutyDate").value;
		const dutyType = document.getElementById("dutyType").value;

		const updatedDuty = {
			username: username,
			cleaningTime: cleaningTime,
			dutyDate: dutyDate,
			dutyType: dutyType,
		};

		fetch(`${URL}/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updatedDuty),
		}).then(() => {
			form.reset();
			form.querySelector('button[type="submit"]').textContent = "Submit";
			editingDutyId = null;
			loadDuties();
		});
	}

	loadDuties();
});
