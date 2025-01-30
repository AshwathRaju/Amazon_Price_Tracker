document.getElementById('register-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (response.ok) {
        alert(data.message);
        window.location.href = 'login.html';
    } else {
        alert(data.error);
    }
});

document.getElementById('login-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (response.ok) {
        localStorage.setItem('token', data.token);
        window.location.href = 'dashboard.html';
    } else {
        alert(data.error);
    }
});

document.getElementById('tracker-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const productUrl = document.getElementById('product-url').value;
    const token = localStorage.getItem('token');

    const response = await fetch('http://localhost:3000/api/prices/track-price', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify({ productUrl })
    });

    const data = await response.json();

    if (response.ok) {
        document.getElementById('price-result').innerText = 'Current Price: ' + data.price;
        fetchPriceHistory(productUrl, token);
    } else {
        document.getElementById('price-result').innerText = 'Error: ' + data.error;
    }
});

async function fetchPriceHistory(productUrl, token) {
    const response = await fetch(`http://localhost:3000/api/prices/price-history?productUrl=${encodeURIComponent(productUrl)}`, {
        method: 'GET',
        headers: {
            'Authorization': token
        }
    });

    const data = await response.json();

    if (response.ok) {
        renderChart(data);
    } else {
        alert(data.error);
    }
}

document.getElementById('logout').addEventListener('click', function() {
    localStorage.removeItem('token');
    window.location.href = 'login.html';
});
