const API = "http://localhost:8080/api/queue";

// Call next customer (normal)
async function callNext() {
    const res = await fetch(API + "/next");
    const data = await res.json();
    if (!data) {
        document.getElementById("now").innerText = "No one waiting";
    } else {
        document.getElementById("now").innerText = 
            `Now Serving: ${data.customer.name} | Token ID: ${data.id}`;
    }
    loadWaiting();
}

// Call priority customer
async function callPriorityNext() {
    const res = await fetch(API + "/priorityNext");
    const data = await res.json();
    if (!data) {
        document.getElementById("now").innerText = "No one waiting";
    } else {
        document.getElementById("now").innerText = 
            `Now Serving (Priority): ${data.customer.name} | Token ID: ${data.id}`;
    }
    loadWaiting();
}

// Load waiting list
async function loadWaiting() {
    const res = await fetch(API + "/waiting");
    const data = await res.json();
    const list = document.getElementById("list");
    list.innerHTML = "";

    if (!data || data.length === 0) {
        list.innerHTML = "<li>No one waiting</li>";
        return;
    }

    const totalCustomers = data.length;

    data.forEach((q, index) => {
        const li = document.createElement("li");

        const estimatedWait = (index + 1) * 5; // 5 minutes per customer (example)
        const progressPercent = ((index + 1) / totalCustomers) * 100;

        li.innerHTML = `
            <b>${q.customer.name}</b> | Token ID: ${q.id} | Age: ${q.customer.age} 
            <br>Estimated Wait: ${estimatedWait} min
            <div class="progress-container">
                <div class="progress-bar" style="width:${progressPercent}%"></div>
            </div>
        `;

        if (q.priority > 0) li.classList.add("priority");

        list.appendChild(li);
    });
}

// Auto refresh every 3 seconds
loadWaiting();
setInterval(loadWaiting, 3000);
