const movieSelect = document.getElementById('movie');

const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');

const count = document.getElementById('count');
const total = document.getElementById('total');

let price = +movieSelect.value;

movieSelect.addEventListener('change',e=>{
    price = +e.target.value;
    setMovieData(e.target.selectedIndex,e.target.value);
    updateSelected();
});

container.addEventListener('click',e=>{
    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
        e.target.classList.toggle('selected');
        updateSelected();
    }
});

function updateSelected(){
    const selectedSeats=document.querySelectorAll('.row .seat.selected');
    const countseats=selectedSeats.length;
    const seatsIndex =[...selectedSeats].map(seat=>[...seats].indexOf(seat));
    
    // localStorage เก็บค่าแบบออฟไลน์
    localStorage.setItem("selectedSeats",JSON.stringify(seatsIndex));

    count.innerText=countseats;
    total.innerText=countseats*price;
}
    // localStorage.setItem(key,value)
function setMovieData(movieIndex,moviePrice){
    localStorage.setItem("movieIndex",movieIndex);
    localStorage.setItem("moviePrive",moviePrice);
}

function showDatatoUI(){
    const selectedSeats=JSON.parse(localStorage.getItem("selectedSeats"));
    const selectmovieIndex=localStorage.getItem("movieIndex"); //ตำแหน่งที่เรากดจองไว้
    seats.forEach((seat,index)=>{
        if(selectedSeats.indexOf(index)>-1){
            seat.classList.add("selected");
        }
    });
    if(selectmovieIndex != null){
        movieSelect.selectedIndex=selectmovieIndex;
    }
}

showDatatoUI();
updateSelected();