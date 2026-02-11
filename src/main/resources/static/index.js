const API = "http://localhost:8080/api/queue";

// Show order form
function showOrderForm() {
    document.getElementById("orderDiv").style.display = "block";
    document.getElementById("statusDiv").style.display = "none";
    document.getElementById("choiceDiv").style.display = "none";
}

// Show status form
function showStatusForm() {
    document.getElementById("orderDiv").style.display = "none";
    document.getElementById("statusDiv").style.display = "block";
    document.getElementById("choiceDiv").style.display = "none";
}

// Add customer and get token
async function addCustomer() {
    const data = {
        name: document.getElementById("name").value,
        age: parseInt(document.getElementById("age").value),
        email: document.getElementById("email").value,
        orderDetails: document.getElementById("order").value
    };

    try {
        const res = await fetch(`${API}/add`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        if (!res.ok) throw new Error("Failed to add customer");

        const customer = await res.json();

        // Save token in browser
        localStorage.setItem("tokenId", customer.id);

        document.getElementById("result").innerHTML = `
            ✅ Thank you!<br>
            🎫 Your Token ID: <b>${customer.id}</b>
        `;

        // Hide order form
        document.getElementById("orderDiv").style.display = "none";

    } catch (err) {
        console.error(err);
        document.getElementById("result").innerText = "❌ Error: " + err.message;
    }
}

// Check status of a token
async function checkStatus() {
    // Prefer LocalStorage token if exists
    let token = parseInt(document.getElementById("tokenInput").value) || parseInt(localStorage.getItem("tokenId"));

    if (!token || token <= 0) {
        alert("Please enter a valid token ID!");
        return;
    }

    try {
        const res = await fetch(`${API}/status/${token}`);
        if (!res.ok) throw new Error("Invalid token");

        const status = await res.text();

        document.getElementById("result").innerHTML = `
            🔹 Status for Token ID ${token}: <b>${status}</b>
        `;
    } catch (err) {
        console.error(err);
        document.getElementById("result").innerHTML = "❌ Error: " + err.message;
    }
}

// Auto-show order or status based on saved token
window.onload = function() {
    const token = localStorage.getItem("tokenId");
    if (token) {
        showStatusForm();
        document.getElementById("tokenInput").value = token;
        checkStatus();
    }
};
