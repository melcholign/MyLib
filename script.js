const myLibrary = [];
const bookCardContainer = document.querySelector('.card-container')
const addBookDialogButton = document.querySelector('button.add-book');
const addBookDialog = document.querySelector('dialog.add-book');
const addBookForm = document.querySelector('form.add-book');
const addBookInputs = document.querySelectorAll('.add-book input');
const closeAddBookButton = document.querySelector('dialog.add-book button.close')

const TEST_DATA = [
    new Book('The Hobbit', 'J.R.R. Tolkien', 320),
    new Book('The Foundation', 'Isaac Asimov', 255),
    new Book('A Game of Thrones', 'G.R.R. Martin', 835),
    new Book('Sapiens: A Brief History of Mankind', 'Yuval Noah Harari', 464),
    new Book('Freakonomics', 'Steven Levitt', 315),
];

TEST_DATA.forEach(book => {
    bookCardContainer.appendChild(createBookCard(book));
    myLibrary.push(book);
});

function Book(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = false;
}

function addBookToLibrary() {
    const title = addBookInputs[0].value;
    const author = addBookInputs[1].value;
    const pages = addBookInputs[2].value;

    const book = new Book(title, author, pages);

    bookCardContainer.appendChild(createBookCard(book));
    myLibrary.push(book);
}

function createBookCard(book) {
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card');
    cardDiv.setAttribute('data-index', myLibrary.length);

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete');
    deleteButton.appendChild(createDeleteSVG());
    deleteButton.addEventListener('click', () => {
        const cardIndex = cardDiv.getAttribute('data-index');
        let newSiblingIndex = cardIndex;
        let siblingCard = cardDiv.nextSibling;
        while(siblingCard !== null) {
            siblingCard.setAttribute('data-index', newSiblingIndex);
            siblingCard = siblingCard.nextSibling;
            newSiblingIndex++;
        }
        cardDiv.remove();
        myLibrary.splice(cardIndex, 1);
    })
    cardDiv.appendChild(deleteButton);

    const titleP = document.createElement('p');
    titleP.classList.add('book-title');
    titleP.textContent = book.title;
    cardDiv.appendChild(titleP);

    const authorP = document.createElement('p');
    authorP.classList.add('book-author');
    authorP.textContent = book.author;
    cardDiv.appendChild(authorP);

    const pagesP = document.createElement('p');
    pagesP.classList.add('book-pages');
    pagesP.textContent = `${book.pages} pages`;
    cardDiv.appendChild(pagesP);

    const readP = document.createElement('p');
    readP.classList.add('book-read');
    const readButton = document.createElement('button');
    readButton.textContent = 'Read';
    readButton.addEventListener('click', () => {
        if(readButton.textContent === 'Read') {
            readButton.textContent = 'Unread';
            myLibrary[cardDiv.getAttribute('data-index')].read = true;
        } else {
            readButton.textContent = 'Read';
            myLibrary[cardDiv.getAttribute('data-index')].read = false;
        }
    })

    readP.appendChild(readButton);
    cardDiv.appendChild(readP);

    return cardDiv;
}

function createDeleteSVG() {
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
}

addBookDialogButton.addEventListener('click', () => {
    addBookDialog.showModal();
})

addBookForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addBookDialog.close();
    addBookToLibrary();
    addBookInputs.forEach(input => input.value = '')
})

closeAddBookButton.addEventListener('click', () => {
    addBookDialog.close();
    addBookInputs.forEach(input => input.value = '')
})

