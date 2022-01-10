const canvas = document.querySelector('#game');
const ctx = canvas.getContext('2d');

//поле игры
const field = new Image();
field.src = 'field.png';

//еда для змейки
const food = new Image();
food.src = 'food.png';
food.width = '32px';
food.height = '32px';

let box = 32;

//счет игры
let score = 0;

//координаты еды
let foodCoord = {
    x: Math.floor((Math.random() * 17 + 1)) * box,
    y: Math.floor((Math.random() * 15 + 3)) * box,
};

//змейка
let snake = [];
snake[0] = {
    x: 9 * box,
    y: 10 * box,
}
//заставляем змейку двигаться
document.addEventListener('keydown', direction)

let dir;

function direction(event) {
    if (event.keyCode == 37 && dir != 'right') {
        dir = 'left';
    } else if (event.keyCode == 38 && dir != 'down') {
        dir = 'up';
    } else if (event.keyCode == 39 && dir != 'left') {
        dir = 'right';
    } else if (event.keyCode == 40 && dir != 'up') {
        dir = 'down';
    }
}

function eatTail(head, arr) {
    for (let i = 0; i < arr.length; i++) {
        if (head.x == arr[i].x && head.y == arr[i].y) {
            ctx.fillText('GAME OVER', box * 4, box * 10)
            clearInterval(game);
        }
    }
}

function drawGame() {
    //рисуем поле
    ctx.drawImage(field, 0, 0);

    ctx.drawImage(food, foodCoord.x, foodCoord.y);
    // рисуем змейку
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = 'green';
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    //отображаем счет
    ctx.fillStyle = 'white';
    ctx.font = '50px Arial';
    ctx.fillText(score, box * 2.5, box * 1.7);

    //рисуем движение змейки
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    //змейка кушает еду
    if (snakeX == foodCoord.x && snakeY == foodCoord.y) {
        score++;
        foodCoord = {
            x: Math.floor((Math.random() * 17 + 1)) * box,
            y: Math.floor((Math.random() * 15 + 3)) * box,
        };
    } else {
        snake.pop();
    }
    //задаем границы поля игры
    if (snakeX < box || snakeX > box * 17 || snakeY < 3 * box || snakeY > box * 17) {
        ctx.fillText('GAME OVER', box * 4, box * 10)
        clearInterval(game);
    }


    // продолжаем движение змейки
    if (dir == 'left') snakeX -= box;
    if (dir == 'right') snakeX += box;
    if (dir == 'up') snakeY -= box;
    if (dir == 'down') snakeY += box;

    let newHead = {
        x: snakeX,
        y: snakeY
    };

    eatTail(newHead, snake)

    snake.unshift(newHead);
}

let game = setInterval(drawGame, 100);