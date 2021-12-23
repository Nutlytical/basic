const levelBtnE=document.getElementById('levelBtn');
const settingsE=document.getElementById('settings');
const wordE=document.getElementById('word');
const textE=document.getElementById('text');
const timeE=document.getElementById('time');
const scoreE=document.getElementById('score');
const levelFormE=document.getElementById('levelForm');
const levelE=document.getElementById('level');
const gameoverE=document.getElementById('gameover');

const words = ['pig','cat','dog','bird','fish']

let randomText;
let score=0;
let time=10;
const timeInterval=setInterval(updateTime,1000);
const saveMode=localStorage.getItem('mode') !==null ? localStorage.getItem('mode') : 'medium' ;

let level = 'medium';

function getRandomWord(){
    return words[Math.floor(Math.random()*words.length)]
}

function displayWordToUI(){
    randomText=getRandomWord();
    wordE.innerHTML = randomText;
    timeE.innerHTML = time;
}

textE.addEventListener('input',(e)=>{
    const inputText=e.target.value;

    if(inputText === randomText){
        if(saveMode == 'easy'){
            time+=5;
        }else if(saveMode == 'medium'){
            time+=3;
        }else{
            time+=2;
        }
        displayWordToUI();
        updateScore();
        e.target.value='';
    }
});

function updateScore(){
    score+=2;
    scoreE.innerHTML=score;
}

function updateTime(){
    time--;
    timeE.innerHTML=time;
    if(time === 0){
        clearInterval(timeInterval);
        gameOver();
    }
}

function gameOver(){
    gameoverE.innerHTML=`
    <h1>Game Over</h1>
    <p>Your Score = ${score}</p>
    <button onclick="location.reload()">Play Agian</button>`;
    gameoverE.style.display='flex';
}

levelBtnE.addEventListener('click',()=>{
    settingsE.classList.toggle('hide');
});

levelE.addEventListener('change',(e)=>{
    level=e.target.value;
    localStorage.setItem("mode",level);
});

function startGame(){
    levelE.value=saveMode;

    if(saveMode == 'easy'){
        time=15;
    }else if(saveMode == 'medium'){
        time=10;
    }else{
        time=5;
    }
    displayWordToUI();
}

startGame();
textE.focus();


