const previewData = {
    'landingPage': {
        'title': 'TOP Landing Page Assignment',
        'previewImg': './img/landingpage.jpg',
        'imgAlt': 'A preview of the page',
        'href': './LandingPage/',
        'keyFeatures': [
            'looks nice I guess',
            'does nothing else'
            ],
        'description': 'There is not much to say about this. It is a simply static web page, styled with CSS according to the assignment.',
    },
    'RockPaperScissors': {
        'title': 'TOP Rock Paper Scissors game',
        'previewImg': './img/rockpaperscissors.png',
        'imgAlt': 'A preview of the page',
        'href': './RockPaperScissors/',
        'keyFeatures': [
            'lets your play against a computer opponent',
            'you play 5 rounds in one game',
            'in the end there is a game overview displaying who one',
            'to restart the game just press one of the buttons'
            ],
        'description': `This is a simple Rock Paper Scissors game. Because it the assignment was mostly about the underlying JS logic I did not put too much effort into the visuals. Those leave a lot to be desired.
            `
    },
    'EtchASketch': {
        'title': 'TOP Etch-a-Sketch',
        'previewImg': './img/etchasketch.png',
        'imgAlt': 'A preview of the page',
        'href': './EtchASketch/',
        'keyFeatures': [
            'lets you draw with your mouse', 
            'dynamically generated drawing board, that lets you choose your preferred resolution (up to 100 DIVs per axis)', 
            'good performance even on higher resolution thanks to event deligation'
            ],
        'description': `The Etch-a-Sketch assignment was an interesting one for me. TOP tasks you with building a virtual childs toy used like a drawing tablet.

            While HTML5 offers stuff like Canvas, the idea is to use DIVs that become colored when you hover over them. There is also a catch. After your first draft TOP asks you to let the user decide, which resolution to use (e.g. how many DIVs are created on the x and y axis).
            
            This one was also the first time I compared to solutions by other TOP participants, which was very valuable. I discovered some very interesting ways to get things done.
            Like letting CSS calculate the width of each DIV dynamically.

            On the other hand I purposefully decided against coloring the DIVs in random generated colors although this was part of the assignment. I just didn't like the look.
            `,
    },
    'Calculator': {
        'title': 'TOP Calculator',
        'previewImg': './img/calculator.png',
        'imgAlt': 'A preview of the page',
        'href': './Calculator/',
        'keyFeatures': [
            'calculates basic operations (+,-,*,/)', 'handles division by 0',
            'prevents entering multiple decimal points per number',
            'prevents entering leading zeros',
            'trims trailing zeros and decimal points, if there are no fractional part',
            'allows continuing to calculate with the result of the previous calculation',
            'keyboard support'
        ],
        'description': `Well...nomen est omen. This is a calculator. And this is my take on the last assignment of the TOP foundational course. 
        
        It sounded easy at first - implement basic calculations, take the user input and put out the result - no problem. But, as always, one you finished the first part of the task, TOP asks you for more:

        Add a "Clear" button, take care of text overflow, what if the user tries to run operations with only one number, make sure the numbers don't push past the boundaries of your display, add a "Backspace" button and - finally - add keyboard support.

        Needles to say, there was quite a bit of refactoring involved. Not just because of the task at hand, but also because of many edge cases. Those led to a couple more if-statements than I liked at first, but right now I'm happy with the result.  
            `,
    },
};

const imgContainer = document.querySelector('#imgContainer');
const textContainer = document.querySelector('#textContainer');

function renderPreview(item) {
    let headline = document.createElement('h2');
    let image = document.createElement('img');
    let para = document.createElement('p');
    let list = document.createElement('ul');
    let link = document.createElement('a');

    clearContainer(imgContainer);
    clearContainer(textContainer);

    imgContainer.appendChild(image);
    imgContainer.appendChild(link);

    textContainer.appendChild(headline);
    textContainer.appendChild(para);
    textContainer.appendChild(list);


    headline.textContent = previewData[item].title;

    image.setAttribute('src', previewData[item].previewImg);
    image.setAttribute('alt', previewData[item].imgAlt);

    para.innerText = previewData[item].description;
    getListItems(item, list);
    link.textContent = 'View this project';
    link.setAttribute('href', previewData[item].href);
}

function getListItems(item, listElement) {
    previewData[item].keyFeatures.forEach(feature => {
        let li = document.createElement('li');
        li.textContent = feature;
        listElement.appendChild(li);
    });
}

function clearContainer(container) {
    if (container.firstChild) {
        container.firstChild.remove();
        clearContainer(container);
    }
}

function evalInput(event) {
    if (!event.target.classList.contains('selectionItem')) return;

    document.querySelectorAll('.selectionItem').forEach(item => item.classList.remove('selected'));
    event.target.classList.add('selected');
    renderPreview(event.target.id);
}


window.addEventListener('DOMContentLoaded', renderPreview('landingPage'));
document.addEventListener('click', evalInput);