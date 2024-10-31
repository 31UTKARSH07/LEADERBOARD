const users = [
    { name: "Alice", codechef: 1500, codeforces: 1200, atcoder: 800, leetcode: 2000 },
    { name: "Bob", codechef: 2000, codeforces: 1800, atcoder: 1600, leetcode: 2500 },
    { name: "Charlie", codechef: 2500, codeforces: 2200, atcoder: 2000, leetcode: 3000 },
    { name: "David", codechef: 1800, codeforces: 1600, atcoder: 1400, leetcode: 2200 },
    { name: "Eve", codechef: 3000, codeforces: 2800, atcoder: 2400, leetcode: 3500 },
];

let ascendingOrder = true;

function getRatingColor(rating) {
    if (rating < 1200) return "gray";
    if (rating < 1400) return "green";
    if (rating < 1600) return "blue";
    if (rating < 1900) return "yellow";
    if (rating < 2100) return "red";
    return "purple";
}

function populateLeaderboard() {
    const tbody = document.getElementById("leaderboardBody");
    tbody.innerHTML = "";
    users.forEach(user => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${user.name}</td>
            <td><span class="rating ${getRatingColor(user.codechef)}" data-tooltip="CodeChef Rating">${user.codechef}</span></td>
            <td><span class="rating ${getRatingColor(user.codeforces)}" data-tooltip="Codeforces Rating">${user.codeforces}</span></td>
            <td><span class="rating ${getRatingColor(user.atcoder)}" data-tooltip="AtCoder Rating">${user.atcoder}</span></td>
            <td><span class="rating ${getRatingColor(user.leetcode)}" data-tooltip="LeetCode Rating">${user.leetcode}</span></td>
        `;
        tbody.appendChild(row);
    });
}

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}

function sortTable(columnIndex) {
    ascendingOrder = !ascendingOrder; // Toggle sorting order
    const fields = ["name", "codechef", "codeforces", "atcoder", "leetcode"];
    users.sort((a, b) => {
        const aValue = a[fields[columnIndex]];
        const bValue = b[fields[columnIndex]];
        return ascendingOrder ? (aValue < bValue ? -1 : 1) : (aValue > bValue ? -1 : 1);
    });
    populateLeaderboard();
}

function filterLeaderboard() {
    const query = document.getElementById("searchInput").value.toLowerCase();
    const tbody = document.getElementById("leaderboardBody");
    tbody.innerHTML = "";
    users
        .filter(user => user.name.toLowerCase().includes(query))
        .forEach(user => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${user.name}</td>
                <td><span class="rating ${getRatingColor(user.codechef)}">${user.codechef}</span></td>
                <td><span class="rating ${getRatingColor(user.codeforces)}">${user.codeforces}</span></td>
                <td><span class="rating ${getRatingColor(user.atcoder)}">${user.atcoder}</span></td>
                <td><span class="rating ${getRatingColor(user.leetcode)}">${user.leetcode}</span></td>
            `;
            tbody.appendChild(row);
        });
}

window.addEventListener("load", () => {
    document.querySelector(".container").style.opacity = "1";
    populateLeaderboard();
});
