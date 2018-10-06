class Sidebar {

    constructor(selector) {
        this.htmlElement = $(selector);
        this.elements = [];
        this.refreshView();
    }

    setElement(title, value) {
        var existingValue = this.elements.find((element) => {
            return element.title == title;
        });
        if (existingValue == null) {
            this.elements.push(new SidebarElement(title, value));
        }
        else {
            existingValue.value = value;
        }
        this.refreshView();
    }

    removeAllElements() {
        this.htmlElement.empty();
    }

    refreshView() {
        this.htmlElement.empty();
        this.elements.forEach(element => {
            this.htmlElement.append(element.getHtml());
        });
    }


}

class SidebarElement {
    constructor(title, value) {
        this.title = title;
        this.value = value;
    }

    getHtml() {
        return '<div class="sidebar-entry">' + this.title + ' => ' + this.value + '</div>';
    }

}