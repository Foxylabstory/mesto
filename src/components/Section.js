export default class Section {
    constructor({items, renderer}, sectionSelector) {
        this._items = items;
        this._renderer = renderer;
        this._section = document.querySelector(sectionSelector);
    }

    renderItems(){
        this._items.forEach(item => {
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