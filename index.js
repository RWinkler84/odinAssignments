const previewData = {
    'landingPage': {
        'title': 'TOP Landing Page Assignment',
        'description': 'There is not much to say about this. It is a simply static web page, styled with CSS according to the assignment.',
        'keyFeatures': ['looks nice I guess', 'does nothing else'],
        'previewImg': './img/landingpage.jpg',
        'imgAlt': 'A preview of the page',
        'href': './LandingPage/'
    },
    'RockPaperScissors': {
        'title': 'TOP Rock Paper Scissors game',
        'description': `This is a simple Rock Paper Scissors game. Because it the assignment was mostly about the underlying JS logic I did not put too much effort into the visuals. Those leave a lot to be desired.
            `,
        'keyFeatures': ['lets your play against a computer opponent', 'you play 5 rounds in one game', 'in the end there is a game overview displaying who one', 'to restart the game just press one of the buttons'],
        'previewImg': './img/rockpaperscissors.png',
        'imgAlt': 'A preview of the page',
        'href': './RockPaperScissors/'
    },
    'EtchASketch': {
        'title': 'TOP Etch-A-Sketch',
        'description': `The Etch-A-Sketch assignment was an interesting one for me. TOP tasks you with building a virtual childs toy used like a drawing tablet.

            While HTML5 offers stuff like Canvas, the idea is too use DIVs that become colored when you hover over them. There is also a catch. After your first draft TOP asks you to let the user decide, which resolution to use (e.g. how many divs are created on the x and y axis).
            
            This one was also the first time I compared to solutions by other TOP participants, which was very valuable. I discovered some very interesting ways to get things done.
            Like letting css calculate the width of each div dynamically.

            On the other hand I purposefully decided against coloring the DIVs in random generated colors although this was part of the assignment. I just didn't like the look.
            `,
        'keyFeatures': ['lets you draw with your mouse', 'you play 5 rounds in one game', 'in the end there is a game overview displaying who one', 'to restart the game just press one of the buttons'],
        'previewImg': './img/rockpaperscissors.png',
        'imgAlt': 'A preview of the page',
        'href': './RockPaperScissors/'
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