// Sitebar Logic
var sidebar = new Sidebar('.value-sidebar');
sidebar.setElement('Temperatur', '20 °C');
sidebar.setElement('Sauerstoffgehalt', '24%');
sidebar.setElement('pH Wert', '5');
sidebar.setElement('Wert 42', '42');

// Map Logic
var map = new Map('map');

var latlng = map.map.getCenter();
var zoom = map.map.getZoom();

$(document).ready(function () {
    $.ajax({
        url: "https://hackertonne.azurewebsites.net/api/GetAllDevices?lat=" + latlng.lat + "&lng=" + latlng.lng + "&zoom=" + zoom,
        type: 'GET',
        dataType: 'json'
    }).then(function (data) {
        data.forEach(element => {
            var sensor = new Sensor(element.device_id, element.name, element.lat, element.lng,element.tmp);
            map.draw(sensor,
                function (e) {
                   //nichts
                }
            );
        });
    });
});

function displayChart(device_id, indicator) {
    drawTimeLine(device_id, indicator);
}

function drawTimeLine(device_id, indicatorText) {
    var color = [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(55, 99, 132, 1)',
        'rgba(160, 170, 70, 1)'];
    
    $.ajax({
        url: "https://hackertonne.azurewebsites.net/api/GetValuesByDevice?device_id=" + device_id,
        type: 'GET',
        dataType: 'json'
    }).then(function (data) {
        var ctx = document.getElementById("myChart").getContext('2d');
        console.log(data);

        colorCounter = 0;

        data.datasets.forEach(function (element) {
            if (element.label != indicatorText) {
                element.hidden = true;
            }
            element.backgroundColor = 'rgba(0,0,0,0)';
            element.pointBackgroundColor = color[colorCounter];
            element.borderColor = color[colorCounter];
            colorCounter += 1;
        });
        var myChart = new Chart(ctx, {
            type: 'line',
            data: data,
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    });
}
