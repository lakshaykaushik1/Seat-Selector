const seats = JSON.parse(localStorage.getItem('selectedSeats') || '[]');
const seatListEl = document.getElementById('seat-list');
const ticketCountEl = document.getElementById('ticket-count');
const totalPriceEl = document.getElementById('total-price');
const form = document.getElementById('checkout-form');
const payBtn = document.getElementById('pay-btn');
const backBtn = document.getElementById('back-btn');
const PRICE_PER_SEAT = 100; // USD per ticket

// Populate seat list
if (seats.length === 0) {
  seatListEl.innerHTML = '<li>No seats selected.</li>';
  ticketCountEl.textContent = 'Tickets: 0';
  payBtn.disabled = true;
} else {
  seats.forEach(i => {
    const li = document.createElement('li');
    const cols = 10;
    li.textContent = `Row ${Math.floor(i/cols)+1} Seat ${i%cols+1}`;
    seatListEl.appendChild(li);
  });
  ticketCountEl.textContent = `Tickets: ${seats.length}`;
  const total = seats.length * PRICE_PER_SEAT;
  totalPriceEl.textContent = `Total: $${total}`;
}

// Back button handler
backBtn.addEventListener('click', () => {
  window.location.href = 'index.html';
});

// Handle form submission
form.addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Payment successful! Thank you for your purchase.');
  localStorage.removeItem('selectedSeats');
  window.location.href = 'index.html';
});
