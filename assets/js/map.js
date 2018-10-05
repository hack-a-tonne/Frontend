class Map {

    constructor(selector) {
        this.map = L.map(selector).setView([51.9475746, 7.6007236], 15);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }
        ).addTo(this.map);
    }
}