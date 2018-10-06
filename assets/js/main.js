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
            map.draw(new Sensor(element.id, element.deviceName, element.lat, element.lng),
                function () {
                    alert(element.id);
                }
            );
        });
    });
});
