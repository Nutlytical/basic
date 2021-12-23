const music_container = document.getElementById('music_container');
const title = document.getElementById('title');
const progress_container = document.getElementById('progress_container');
const progress = document.getElementById('progress');
const audio = document.getElementById('audio');
const cover = document.getElementById('cover');
const prev = document.getElementById('prev');
const play = document.getElementById('play');
const next = document.getElementById('next');

const songs=["let her go","a thousand years","we dont talk anymore"];
let index=0;

function loadSongs(song){
    title.innerText=song;
    cover.src=`music/${song}.jpg`;
    audio.src=`music/${song}.mp3`;
}

loadSongs(songs[index])

play.addEventListener('click',()=>{
    const isPlay=music_container.classList.contains('play');

    if(isPlay){
        pauseSong();
    }else{
        playSong();
    }
});

prev.addEventListener('click',()=>{
    index--;
    if(index<0){
        index=songs.length-1;
    }
    loadSongs(songs[index]);
    playSong();
});

next.addEventListener('click',nextSong);

function nextSong(){
    index++;
    if(index>songs.length-1){
        index=0;
    }
    loadSongs(songs[index]);
    playSong();
}

function playSong(){
    music_container.classList.add('play');
    play.querySelector('i.fas').classList.remove('fa-play');
    play.querySelector('i.fas').classList.add('fa-pause');
    audio.play();
}

function pauseSong(){
    music_container.classList.remove('play');
    play.querySelector('i.fas').classList.remove('fa-pause');
    play.querySelector('i.fas').classList.add('fa-play');
    audio.pause();
}

audio.addEventListener('timeupdate',updateProgress);

function updateProgress(e){
    const {duration,currentTime} = e.srcElement;
    const progressPercent = (currentTime/duration)*100;
    progress.style.width=`${progressPercent}%`;
}

progress_container.addEventListener('click',setProcess);

function setProcess(e){
    const width=this.clientWidth;
    const clickX=e.offsetX;
    const duration=audio.duration;
    audio.currentTime=(clickX/width)*duration;
}

audio.addEventListener('ended',nextSong);