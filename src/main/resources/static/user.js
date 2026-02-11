const API = "http://localhost:8080/api/queue";

// Show order form
function showOrderForm() {
    document.getElementById("chooseAction").style.display = "none";
    document.getElementById("orderForm").style.display = "block";
}

// Show status form
function showStatusForm() {
    document.getElementById("chooseAction").style.display = "none";
    document.getElementById("statusForm").style.display = "block";
}

// Add customer
async function addCustomer() {
    const data = {
        name: document.getElementById("name").value,
        age: parseInt(document.getElementById("age").value),
        email: document.getElementById("email").value,
        orderDetails: document.getElementById("order").value
    };

    try {
        const res = await fetch(API + "/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
        const result = await res.json();

        localStorage.setItem("tokenId", result.id);
        document.getElementById("orderResult").innerHTML =
            `✅ Thank you for ordering!<br>🎫 Your Token ID: <b>${result.id}</b>`;
    } catch (err) {
        console.error(err);
        document.getElementById("orderResult").innerText = "❌ Error adding customer";
    }
}

// Check status
async function checkStatus() {
    const tokenId = document.getElementById("tokenId").value;
    if (!tokenId) return;

    try {
        const res = await fetch(`${API}/status/${tokenId}`);
        const status = await res.text();
        document.getElementById("statusResult").innerHTML = `🔹 Status for Token ID ${tokenId}: ${status}`;
    } catch (err) {
        console.error(err);
        document.getElementById("statusResult").innerText = "❌ Error fetching status";
    }
}

// -----------------
// SSE: Real-time updates
// -----------------
const evtSource = new EventSource(API + "/stream");
evtSource.onmessage = function(event) {
    const waiting = JSON.parse(event.data);
    const tokenId = localStorage.getItem("tokenId");
    if (tokenId) {
        const entry = waiting.find(q => q.id == tokenId);
        const statusElem = document.getElementById("statusResult");
        if (entry) {
            const position = waiting.indexOf(entry) + 1;
            statusElem.innerHTML = `🔹 Status for Token ID ${tokenId}: WAITING | Position: ${position}`;
        } else {
            statusElem.innerHTML = `🔹 Status for Token ID ${tokenId}: Now Serving You / Already Served`;
        }
    }
};
