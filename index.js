const tileData = [
    {
        chance: .1,
        label: 'crab',
        img: './png/023-crab.png'
    },
    {
        chance: .3,
        label: 'croc',
        img: './png/039-crocodile.png'
    },
    {
        chance: .4,
        label: 'chic',
        img: './png/028-chicken.png'
    },
    {
        chance: .2,
        label: 'lion',
        img: './png/048-lion.png'
    },
];
const MATRIX_SIZE = [4, 4];

const gameEl = document.getElementById('game');

addGameTile = (tileImg, tileLabel, tileSize) => {
    let gameTile = document.createElement('div');
    gameTile.style.backgroundImage = 'url(' + tileImg + ')';
    gameEl.appendChild(gameTile);
    gameTile.style.width = tileSize;
};

chooseWeighted = (items, chances) => {
    var sum = chances.reduce((acc, el) => acc + el, 0);
    var acc = 0;
    chances = chances.map(el => (acc = el + acc));
    var rand = Math.random() * sum;
    return items[chances.filter(el => el <= rand).length];
};

generateMatrix = (allChances) => {
    // generate matrix
    var result = [];
    for (var i = 0; i < MATRIX_SIZE[0]; i++) {
        result[i] = [];
        for (var j = 0; j < MATRIX_SIZE[1]; j++) {
            result[i][j] = chooseWeighted(tileData, allChances);
            addGameTile(result[i][j].img, result[i][j].label, 1 / MATRIX_SIZE[0] * 100 + '%')
        }
    }
};

init = () => {
    gameEl.innerHTML = '';
    const allChances = tileData.map((a => a.chance));
    generateMatrix(allChances)
};

init();
