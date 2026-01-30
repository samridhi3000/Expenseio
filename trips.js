// pages/trips.js - Trips Page

function loadTripsPage() {
    const trips = userTrips[currentUser.email] || [];
    
    let tripsHTML = '';
    if (trips.length === 0) {
        tripsHTML = '<p style="text-align: center; padding: 40px; color: #9ca3af;">No trips planned yet. Click "Plan New Trip" to start planning your next business trip!</p>';
    } else {
        tripsHTML = trips.map(trip => `
            <div class="trip-card">
                <button class="btn-delete" onclick="deleteTrip(${trip.id})">×</button>
                <div class="trip-header">
                    <i class="fas fa-plane trip-icon" style="color: #3b82f6;"></i>
                    <span class="badge" style="background: #3b82f6;">${trip.status}</span>
                </div>
                <h3 class="trip-title">${trip.destination}</h3>
                <p class="trip-date">${trip.startDate} to ${trip.endDate}</p>
                <div style="margin-top: 16px;">
                    <p style="color: #9ca3af; font-size: 14px;">${trip.purpose}</p>
                    <p style="color: #9ca3af; font-size: 14px; margin-top: 4px;">Budget: €${trip.budget.toFixed(2)}</p>
                </div>
            </div>
        `).join('');
    }

    document.getElementById('tripsContent').innerHTML = `
        <div class="card">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; flex-wrap: wrap; gap: 16px;">
                <h2 class="card-title" style="margin: 0;">My Trips</h2>
                <button class="btn-primary" onclick="openModal('tripModal')" style="width: auto; padding: 10px 20px;">
                    <i class="fas fa-plus"></i> Plan New Trip
                </button>
            </div>
            
            <div class="trips-grid">
                ${tripsHTML}
            </div>
        </div>
    `;
}