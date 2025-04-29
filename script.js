const rows = 8;
const cols = 10;
const occupiedSeats = new Set([3, 7, 12, 18, 27]);

const seatMap = document.getElementById('seat-map');
const selectedOutput = document.getElementById('selected-output');
const proceedBtn = document.getElementById('proceed-btn');
let selectedSeats = [];

// Generate grid
for (let i = 0; i < rows * cols; i++) {
  const seat = document.createElement('div');
  seat.className = 'seat ' + (occupiedSeats.has(i) ? 'occupied' : 'available');
  seat.dataset.index = i;

  seat.addEventListener('click', () => {
    if (seat.classList.contains('occupied')) return;
    const idx = +seat.dataset.index;
    if (seat.classList.toggle('selected')) {
      selectedSeats.push(idx);
    } else {
      selectedSeats = selectedSeats.filter(s => s !== idx);
    }
    seat.classList.toggle('available');
    updateUI();
  });

  seatMap.appendChild(seat);
  if ((i + 1) % 5 === 0 && i < rows * cols - 1) {
    seatMap.appendChild(Object.assign(document.createElement('div'), { className: 'aisle' }));
  }
}

function updateUI() {
  selectedOutput.textContent = selectedSeats.length
    ? selectedSeats.map(i => `Row ${Math.floor(i/cols)+1} Seat ${i%cols+1}`).join(', ')
    : 'None';
  proceedBtn.disabled = !selectedSeats.length;
}

proceedBtn.addEventListener('click', () => {
    localStorage.setItem('selectedSeats', JSON.stringify(selectedSeats));
    window.location.href = 'transaction.html';
  });
  