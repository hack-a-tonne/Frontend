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