const libraryData = (function () {

    class Book {

        title;
        author;
        pages;
        read;

        constructor(title, author, pages) {
            this.title = title;
            this.author = author;
            this.pages = pages;
            this.read = false;
        }

    }

    class Library {

        #books = [];

        constructor() { }

        add({ title, author, pages }) {
            this.#books.push(new Book(title, author, pages));
        }

        remove(index) {
            this.#books.splice(index, index);
        }

        get(index) {
            return this.#clone(this.#books[index]);
        }

        read(index) {
            this.#books[index].read = true;
        }

        unread(index) {
            this.#books[index].read = false;
        }

        size() {
            return this.#books.length;
        }

        // returns a shallow copy of book
        #clone(book) {
            return Object.assign({}, book);
        }

    }

    return new Library();

})();

const TEST_DATA = [
    ['The Hobbit', 'J.R.R. Tolkien', 320],
    ['The Foundation', 'Isaac Asimov', 255],
    ['A Game of Thrones', 'G.R.R. Martin', 835],
    ['Sapiens: A Brief History of Mankind', 'Yuval Noah Harari', 464],
    ['Freakonomics', 'Steven Levitt', 315],
];

TEST_DATA.forEach(data => {
    book = {
        title: data[0],
        author: data[1],
        pages: data[2],
    }

    addBook(book);
});

(function addBook(onAdd) {

    const form = document.querySelector("form.add-book");
    const inputs = form.querySelectorAll("input");

    const dialog = document.querySelector("dialog.add-book");

    const onFormSubmit = (event) => {
        event.preventDefault();
        dialog.close();

        const book = {
            title: inputs[0].value,
            author: inputs[1].value,
            pages: inputs[2].value,
        }

        onAdd(book);

        inputs.forEach(input => input.value = "");
    }

    const onDialogOpen = () => {
        dialog.showModal();
    }

    const onDialogClose = () => {
        dialog.close();
        inputs.forEach(input => input.value = "")
    }

    form.addEventListener("submit", onFormSubmit);
    document.querySelector("button.add-book").addEventListener("click", onDialogOpen);
    dialog.querySelector("button.close").addEventListener("click", onDialogClose);

})(addBook);

function addBook(book) {
    document.querySelector(".card-container").appendChild(renderLatest(book));
    libraryData.add(book);
}

function renderLatest(book) {

    const latestIndex = libraryData.size();

    const bookDiv = document.createElement("div");
    bookDiv.classList.add("card");
    bookDiv.setAttribute("data-index", latestIndex);

    const removeButton = createRemoveButton(bookDiv, libraryData.remove.bind(libraryData));
    bookDiv.appendChild(removeButton);

    const titlePara = document.createElement('p');
    titlePara.classList.add('book-title');
    titlePara.textContent = book.title;
    bookDiv.appendChild(titlePara);

    const authorPara = document.createElement('p');
    authorPara.classList.add('book-author');
    authorPara.textContent = book.author;
    bookDiv.appendChild(authorPara);

    const pagesPara = document.createElement('p');
    pagesPara.classList.add('book-pages');
    pagesPara.textContent = `${book.pages} pages`;
    bookDiv.appendChild(pagesPara);

    const readPara = document.createElement('p');
    readPara.classList.add('book-read');
    const readButton = createReadButton(bookDiv, libraryData.read.bind(libraryData), libraryData.unread.bind(libraryData));
    readPara.appendChild(readButton);
    bookDiv.appendChild(readPara);

    return bookDiv;
}

function createReadButton(target, onRead, onUnread) {

    const button = document.createElement("button");
    button.value = 1;
    button.textContent = "Read";

    const onClick = () => {
        const index = target.getAttribute("data-index");

        if (Number(button.value) === 1) {
            button.value = 0;
            button.textContent = "Unread";
            button.classList.add("unread");

            onRead(index);
        }

        else {
            button.value = 1;
            button.textContent = "Read";
            button.classList.remove("unread");

            onUnread(index);
        }
    }

    button.addEventListener("click", onClick);

    return button;
}

function createRemoveButton(target, onRemove) {

    const button = document.createElement("button");
    button.classList.add("remove");

    const onClick = () => {

        let targetIndex = target.getAttribute("data-index");
        let sibling = target.nextSibling;
        let newSiblingIndex = targetIndex;

        while (sibling !== null) {
            sibling.setAttribute("data-index", newSiblingIndex);
            sibling = sibling.nextSibling;
            newSiblingIndex++;
        }

        target.remove();

        onRemove(targetIndex);
    }

    const svg = (function () {

        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');
        svg.setAttribute('version', '1.1');
        svg.setAttribute('x', '0px');
        svg.setAttribute('y', '0px');
        svg.setAttribute('viewBox', '0 0 100 100');
        svg.setAttribute('enable-background', 'new 0 0 100 100');
        svg.setAttribute('xml:space', 'preserve');

        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute('d', 'M75.7,19.5H61.6C60.7,13.8,55.9,9.4,50,9.4c-5.9,0-10.8,4.4-11.6,10.1H24.5c-2.7,0-4.9,2.2-4.9,4.9v5c0,2.5,1.8,4.5,4.2,4.8  v48.8c0,3.6,2.9,6.5,6.5,6.5h39.7c3.6,0,6.5-2.9,6.5-6.5V34.3c2.4-0.4,4.2-2.4,4.2-4.8v-5C80.6,21.7,78.4,19.5,75.7,19.5z M50,13.1  c3.9,0,7.1,2.7,7.8,6.4H42.1C42.9,15.9,46.1,13.1,50,13.1z M72.7,83.1c0,1.5-1.2,2.8-2.8,2.8H30.2c-1.5,0-2.8-1.2-2.8-2.8V34.4h45.2  V83.1z M76.9,29.4c0,0.7-0.5,1.2-1.2,1.2H24.5c-0.7,0-1.2-0.5-1.2-1.2v-5c0-0.7,0.5-1.2,1.2-1.2h51.1c0.7,0,1.2,0.5,1.2,1.2V29.4z   M35.7,76.3V44.7c0-1,0.8-1.8,1.8-1.8c1,0,1.8,0.8,1.8,1.8v31.6c0,1-0.8,1.8-1.8,1.8C36.5,78.2,35.7,77.3,35.7,76.3z M48.4,76.3  V44.7c0-1,0.8-1.8,1.8-1.8c1,0,1.8,0.8,1.8,1.8v31.6c0,1-0.8,1.8-1.8,1.8C49.2,78.2,48.4,77.3,48.4,76.3z M61.1,76.3V44.7  c0-1,0.8-1.8,1.8-1.8c1,0,1.8,0.8,1.8,1.8v31.6c0,1-0.8,1.8-1.8,1.8C62,78.2,61.1,77.3,61.1,76.3z');

        svg.appendChild(path);

        return svg;

    })();

    button.appendChild(svg);
    button.addEventListener("click", onClick);

    return button;
}
