// Sitebar Logic

function showSondenSitebar(device_id) {
    var sidebar = new Sidebar('.value-sidebar', 'Sonde ' + device_id);
    $.ajax({
        url: "https://hackertonne.azurewebsites.net/api/GetValuesByDevice?device_id=" + device_id,
        type: 'GET',
        dataType: 'json'
    }).then(function (data) {
        console.log(data);
        for (var i = 0; i < data.datasets.length; i++) {
            var current_value = data.datasets[i].data[data.datasets[i].data.length - 1]
            var myvalues = [10, 8, 5, 7, 4, 4, 1, 32, 33, 3, 3, 3, 43, 54, 55, 56, 6, 66, 6, 6];
            var htmlElement = sidebar.setElement(data.datasets[i].label, current_value, data.datasets[i].data);
        }
    })
}
var device_id = 14;

$(document).ready(function () {
    showSondenSitebar(device_id);
});

// Map Logic
var map = new Map('map');
var sensor = new Sensor(1, 'test', 51.9544809, 7.6104615);
map.draw(sensor, function () {
    $.ajax({
        url: "http://tonne.kevit.info/getData"
    }).then(function (data) {
        $('.greeting-id').append(data.id);
        $('.greeting-content').append(data.content);
    });
    alert("message");
});