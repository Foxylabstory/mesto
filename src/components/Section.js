export default class Section {
    constructor({items, renderer}, sectionSelector) {
        this._items = items;
        this._renderer = renderer;
        this._sectionSelector = document.querySelector(sectionSelector);
    }

    renderItems(){
        this._items.forEach(item => {
            this._renderer(item);
        });
    }

    addItem(element){
        this._sectionSelector.append(element);
    }

    addItemPrepend(element){
        this._sectionSelector.prepend(element);
    }
}