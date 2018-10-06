// Sitebar Logic
var sidebar = new Sidebar('.value-sidebar');
sidebar.setElement('Temperatur', '20 °C');
sidebar.setElement('Sauerstoffgehalt', '24%');
sidebar.setElement('pH Wert', '5');
sidebar.setElement('Wert 42', '42');

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
