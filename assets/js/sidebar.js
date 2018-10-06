class Sidebar {

    constructor(selector, header = "") {
        this.htmlElement = $(selector);
        this.elements = [];
        this.header = header;
        this.refreshView();
    }

    setElement(title, value, data = []) {
        var existingElement = this.elements.find((element) => {
            return element.title == title;
        });
        if (existingElement == null) {
            existingElement = new SidebarElement(title, value, data);
            this.elements.push(existingElement);
        }
        else {
            existingElement.value = value;
            if (data.length > 0) {
                existingElement.data = data;
            }
        }
        this.refreshView();
        return existingElement;
    }

    removeAllElements() {
        this.htmlElement.empty();
    }

    refreshView() {
        this.htmlElement.empty();

        this.htmlElement.append('<h4>' + this.header + '</h4>');

        this.elements.forEach(element => {
            this.htmlElement.append(element.getHtml());
            element.drawSparkline();
        });
    }

}

class SidebarElement {
    constructor(title, value, data = []) {
        this.title = title;
        this.value = value;
        this.data = data;
    }

    getHtml() {
        //return '<div class="sidebar-entry">' + this.title + ' => ' + this.value + '</div>';
        return '<div class="info-box">\
            <span class="info-box-icon bg-aqua"><i class="icon ion-alert"></i></span>\
            <div class="info-box-content" >\
        <span class="info-box-text">' + this.title + '</span>\
        <span class="info-box-number">' + this.value + '</span>\
        <div class="sparkline-block"><span class="sparkline' + getHashFromString(this.title) + '">Laden..</span></div>\
            </div >\
          </div > ';
    }

    drawSparkline() {
        $('.sparkline' + getHashFromString(this.title)).sparkline(this.data, { width: '100%' });
    }

}

function getHashFromString(text) {
    var hash = 0, i, chr;
    if (text.length === 0) return hash;
    for (i = 0; i < text.length; i++) {
        chr = text.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
};