const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count  = document.getElementById('count');
const total  = document.getElementById('total');
const movieSelect  = document.getElementById('movie');
populateUI();

let  ticketPrice = +movieSelect.value;

// SAVE SELECTED MOVIE INDEX AND PRICE
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}


//  update total count
function updateSelectedCount(){
    const selectedSeats = document.querySelectorAll('.row .seat.Selected');

    const seatsIndex = [...selectedSeats].map( (seat)=> [...seats].indexOf(seat));

    localStorage.setItem('selectedSeatss',JSON.stringify(seatsIndex));

    const selectedSeatsCount  = selectedSeats.length;
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;

}
//  get data from localStorage and populate Ui
function populateUI(){
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    
    if(selectedSeats !== null && selectedSeats.length > 0){
        seats.forEach((seat,index) =>{
            if(selectedSeats.indexOf(index) > -1){
                seat.classList.add('selected');
            }
        })
    }  
}  
//  movie select  event  
movieSelect.addEventListener('change',e => {
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex ,e.target.value);
    updateSelectedCount();
})


//  seat click event 
container.addEventListener('click',(e) => {
    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
       e.target.classList.toggle('Selected');   
        
       updateSelectedCount();
    }
})