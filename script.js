document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start-button');
    let isGameOver = false;

    startButton.addEventListener('click', startGame);
    startButton.addEventListener('touchstart', startGame);

    function startGame() {
        console.log("Il gioco sta iniziando!");
        startButton.style.display = "none";

        document.getElementById('sium').style.display = 'none';

        SetBackground();
        OnGame();
        var backgroundMusic = document.getElementById("background-music");
        backgroundMusic.play();
        console.log("backgound attivo");

        document.addEventListener('mousemove', (event) => {
            if (!isGameOver) {
                MoveQueen(event);
            }
        });

        document.addEventListener('touchmove', (event) => {
            if (!isGameOver) {
                const touch = event.touches[0];
                const fakeMouseEvent = new MouseEvent('mousemove', {
                    clientX: touch.clientX,
                    clientY: touch.clientY
                });
                MoveQueen(fakeMouseEvent);
            }
        });

        document.addEventListener('click', () => {
            ChangeLife();
        });

        document.addEventListener('touchstart', () => {
            ChangeLife();
        });
    }

    function OnGame() {
        document.getElementById('LifeQ').style.display = 'block';
        document.getElementById('queen').style.display = 'block';
        document.getElementById('snowwhite').style.display = 'block';
    }

    function SetBackground() {
        document.body.style.backgroundImage = "url('https://wallpapercave.com/wp/wp2758170.gif')";
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundAttachment = "fixed";
    }

    function MoveQueen(event) {
        var queen = document.getElementById("queen");
        queen.style.display = "block";
        queen.style.left = event.clientX + "px";
        queen.style.top = event.clientY + "px";

        var snowwhite = document.getElementById("snowwhite");

        if (isColliding(queen, snowwhite)) {
            ChangeLife();
            MoveSnowwhiteRandomly();
        }
    }

    function MoveSnowwhiteRandomly() {
        var snowwhite = document.getElementById("snowwhite");
        var maxX = window.innerWidth - snowwhite.clientWidth;
        var maxY = window.innerHeight - snowwhite.clientHeight;

        var newX = Math.random() * maxX;
        var newY = Math.random() * maxY;

        snowwhite.style.left = newX + "px";
        snowwhite.style.top = newY + "px";
    }

    function isColliding(element1, element2) {
        const rect1 = element1.getBoundingClientRect();
        const rect2 = element2.getBoundingClientRect();

        return (
            rect1.left < rect2.right &&
            rect1.right > rect2.left &&
            rect1.top < rect2.bottom &&
            rect1.bottom > rect2.top
        );
    }

    function ChangeLife() {
        if (!isGameOver) {
            var LifeQ = document.getElementById("LifeQ");
            LifeQ.value -= 10;

            if (LifeQ.value <= 0) {
                LifeQ.value = 0;
                document.body.style.backgroundColor = "red";
                var snowwhite = document.getElementById("snowwhite");
                snowwhite.src = "biancaneve.jpg";
                ShowGameOver();
                StopGame();
                console.log("gioco finito");
            }
        }
    }

    function ShowGameOver() {
        var gameOverText = document.createElement("h2");
        gameOverText.textContent = "Biancaneve è morta";
        gameOverText.className = "game-over";
        document.body.appendChild(gameOverText);
        ZoomOnQueen();
        var backgroundMusic = document.getElementById("background-music");
        backgroundMusic.pause();
        console.log("musica spenta")
        var gameover_Music = document.getElementById("game-over-sound");
        gameover_Music.play();
       
    }

    function ZoomOnQueen() {
        var queen = document.getElementById("queen");
        queen.style.transition = "all 2s ease-in-out";
        queen.style.transform = "scale(2)";

        setTimeout(() => {
            queen.style.transition = "none";
        }, 2000);
       
    }
    function StopGame() {
        isGameOver = true;
        document.removeEventListener('mousemove', MoveQueen);
        document.removeEventListener('touchmove', MoveQueen);
        document.removeEventListener('click', ChangeLife);
        document.removeEventListener('touchstart', ChangeLife);
    }
});