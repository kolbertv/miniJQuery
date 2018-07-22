// var version = "0.0.1";

var $ = function (selector) {
    return new MiniJQ(selector);
};

function MiniJQ(selector) {

    this.selector = selector;

    var d = document;
    var result = [];

    if (typeof this.selector !== "string") {

            console.log('Ошибка 1: Введите имя селектора правильно: "#id", ".class", "tagName", "[name]"');

        return this.result
    }

    if (!this.selector) {

        console.log('Ошибка 2: Введите имя селектора правильно: "#id", ".class", "tagName", "[name]"');
       return this.result;
    }

    var regExpSelector = /^(?:#([\w-]+)|(\w+)|\.([\w-]+)|\[([\w-]+)\])$/;
    var regExpArr = regExpSelector.exec(selector);
    // console.log(regExpArr);


    if (regExpArr[1]) {
        // console.log('селектор ID');
        result = d.getElementById(regExpArr[1]);
        this.result = result;

    } else if (regExpArr[2]) {

        // console.log('селектор TAG name');
        result = d.getElementsByTagName(regExpArr[2]);
        this.result = result;

    } else if (regExpArr[3]) {

        // console.log('селектор класс');
        this.result = getElementsByClassName(selector.substring(1));


    } else if (regExpArr[4]) {

        // console.log('атрибут NAME');
        result = d.getElementsByName(regExpArr[4]);
        this.result = result;
    }
}

MiniJQ.prototype.addText = function (string) {

    if (!this.result.length) {
        return this.result.innerText = string;
    } else {
        for (var i = 0; i < this.result.length; i++) {
            this.result[i].innerText = string;
        }

        return this;
    }
};

MiniJQ.prototype.getText = function () {

    if (!this.result.length) {

        return this.result.innerText;
    } else {

        return this.result[0].innerText;
    }

};

MiniJQ.prototype.addHtml = function (string) {

    if (!this.result.length) {
        this.result.innerHTML = string;
        return this;
    } else {
        for (var i = 0; i < this.result.length; i++) {
            this.result[i].innerHTML = string;
        }

        return this;
    }
};

MiniJQ.prototype.getHtml = function () {

    if (!this.result.length) {

        return this.result.innerHTML;
    } else {

        return this.result[0].innerHTML;
    }

};

MiniJQ.prototype.addAttr = function (name, value) {

    if (!this.result.length) {

        this.result.setAttribute(name, value);
        return this;
    } else {

        for (var i = 0; i < this.result.length; i++) {
            this.result[i].setAttribute(name, value);
        }

        return this;
    }
};

MiniJQ.prototype.getAttr = function (name) {

    if (!this.result.length) {

        return this.result.getAttribute(name);
    } else {

        return this.result[0].getAttribute(name);
    }

};

MiniJQ.prototype.delAttr = function (name) {

    if (!this.result.length) {

        return this.result.removeAttribute(name);
    } else {

        for (var i = 0; i < this.result.length; i++) {
            this.result[i].removeAttribute(name);
        }
        return this;
    }

};

MiniJQ.prototype.ajax = function(options, callback) {

    ajaxOptions = {
        url: '',
        data: '',
        method: "GET",
        async: true,
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        user: '',
        password: ''
    };

    ajaxOptions = Object.assign(ajaxOptions, options);

    var xhr = new XMLHttpRequest();
    xhr.open(ajaxOptions.method, ajaxOptions.url, ajaxOptions.async, ajaxOptions.user,ajaxOptions.password);
    xhr.setRequestHeader("Content-Type", ajaxOptions.contentType);
    xhr.onreadystatechange = function () {
        if ((xhr.readyState == 4) && (xhr.status ==200)) {
            callback(xhr.responseText);
        } else {
            // можно приделать крутилку вертелку ожидалку
        }
    };
    xhr.send( ajaxOptions.method === "POST"? ajaxOptions.data : null);

};

/**
 * Функция для выборки элеметов по имени класса. Возвращает массив DOM элементов.
 * @param selector str
 * @returns array
 */
function getElementsByClassName(selector) {
    if(document.getElementsByClassName){ // IE8+
        return document.getElementsByClassName(selector);
    }
    else{
        var elements, pattern, i, results = [];

        if (document.querySelectorAll) { // IE8
            return document.querySelectorAll(SELECTOR_SYMBOLS.class + selector);
        }
        else if (document.evaluate) { // IE6, IE7
            pattern = ".//*[contains(concat(' ', @class, ' '), ' " + selector + " ')]";
            elements = document.evaluate(pattern, document, null, 0, null);
            while ((i = elements.iterateNext())) {
                results.push(i);
            }
        }
        else { // остальные
            elements = document.getElementsByTagName("*");
            pattern = new RegExp("(^|\\s)" + selector + "(\\s|$)");
            for (i = 0; i < elements.length; i++) {
                if ( pattern.test(elements[i].className) ) {
                    results.push(elements[i]);
                }
            }
        }
        return results;
    }
}
