class Map {
    constructor(selector) {
        this.sensors = [];
        this.map = L.map(selector).setView([51.9475746, 7.6007236], 15);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }
        ).addTo(this.map);
    }
    draw(sensor, onclick) {
        var marker = L.marker([sensor.lat,sensor.lng]).addTo(this.map);
        marker.on('click', onclick);
    }
}

class Sensor {
    constructor(id,deviceName,lat,lng) {
        this.id = id;
        this.deviceName = deviceName;
        this.lat = lat;
        this.lng = lng;
    }
}