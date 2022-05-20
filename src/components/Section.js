export default class Section {
    constructor(renderer, sectionSelector) {
        this._renderer = renderer;
        this._section = document.querySelector(sectionSelector);
    }

    renderItems(items){
        items.forEach(item => {
            this._renderer(item);
        });
    }

    addItem(element){
        this._section.append(element);
    }

    prependItem(element){
        this._section.prepend(element);
    }
}