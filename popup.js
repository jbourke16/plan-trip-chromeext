document.getElementById('trip-form').addEventListener('submit', (event) => {
    event.preventDefault();
  
    const destination = document.getElementById('destination').value;
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;
    const notes = document.getElementById('notes').value;
  
    const trip = { destination, startDate, endDate, notes };
    
    chrome.storage.sync.get(['trips'], (result) => {
      const trips = result.trips || [];
      trips.push(trip);
      chrome.storage.sync.set({ trips });
    });
  
    document.getElementById('trip-form').reset();
    loadTrips();
  });
  
  function loadTrips() {
    chrome.storage.sync.get(['trips'], (result) => {
      const tripList = document.getElementById('trip-list');
      tripList.innerHTML = '';
      (result.trips || []).forEach((trip) => {
        const tripElement = document.createElement('div');
        tripElement.textContent = `${trip.destination} (${trip.startDate} - ${trip.endDate})`;
        tripList.appendChild(tripElement);
      });
    });
  }
  
  document.addEventListener('DOMContentLoaded', loadTrips);