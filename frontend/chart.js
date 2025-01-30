function renderChart(priceData) {
    const ctx = document.getElementById('price-chart').getContext('2d');

    const dates = priceData.map(entry => new Date(entry.date).toLocaleDateString());
    const prices = priceData.map(entry => parseFloat(entry.price.replace(/[^0-9.-]+/g, "")));

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: 'Price',
                data: prices,
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                fill: false
            }]
        },
        options: {
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'day'
                    }
                },
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
