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
/*
        Ваш совет безусловно интересен, но он пересекается с требованием задания, в функции renderer как я понял, нельзя не вставлять в DOM.
        либо я Вас не понял.
        "Свойство renderer — это функция, которая отвечает за создание и отрисовку данных на странице."
*/
    addItem(element){
        this._section.append(element);
    }

    prependItem(element){
        this._section.prepend(element);
    }
}