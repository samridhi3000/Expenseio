// pages/profile.js - Profile Page

function loadProfilePage() {
    const expenses = userExpenses[currentUser.email] || [];
    const trips = userTrips[currentUser.email] || [];
    const totalAmount = expenses.reduce((sum, e) => sum + e.amount, 0);
    const profile = currentUser.profile || {};

    document.getElementById('profileContent').innerHTML = `
        <div class="card">
            <h2 class="card-title">Your Profile</h2>
            
            <div style="display: flex; gap: 32px; margin-bottom: 32px; flex-wrap: wrap;">
                <div style="width: 120px; height: 120px; background: linear-gradient(135deg, #06b6d4, #3b82f6); border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                    <i class="fas fa-user" style="font-size: 60px; color: #fff;"></i>
                </div>
                
                <div style="flex: 1;">
                    <h3 style="font-size: 28px; font-weight: bold; margin-bottom: 8px;">${currentUser.name}</h3>
                    <p style="color: #9ca3af; margin-bottom: 4px; font-size: 16px;">${currentUser.email}</p>
                    <p style="color: #9ca3af; margin-bottom: 4px; font-size: 14px;">${profile.jobTitle || 'No job title set'}</p>
                    <p style="color: #9ca3af; font-size: 14px;">${profile.company || 'No company set'} ${profile.department ? '• ' + profile.department : ''}</p>
                    
                    <div style="margin-top: 16px; display: flex; gap: 8px; flex-wrap: wrap;">
                        <span class="badge" style="background: #06b6d4;">Active Member</span>
                        <span class="badge" style="background: #10b981;">Verified</span>
                        ${currentUser.onboardingComplete ? '<span class="badge" style="background: #a855f7;">Profile Complete</span>' : ''}
                    </div>
                </div>
            </div>

            <div style="margin-bottom: 32px;">
                <h3 style="font-size: 18px; font-weight: 600; margin-bottom: 16px;">Contact Information</h3>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 16px;">
                    <div>
                        <p style="color: #9ca3af; font-size: 14px; margin-bottom: 4px;">Phone</p>
                        <p style="font-weight: 500;">${profile.phone || 'Not provided'}</p>
                    </div>
                    <div>
                        <p style="color: #9ca3af; font-size: 14px; margin-bottom: 4px;">Employee ID</p>
                        <p style="font-weight: 500;">${profile.employeeID || 'Not provided'}</p>
                    </div>
                    <div>
                        <p style="color: #9ca3af; font-size: 14px; margin-bottom: 4px;">Date of Birth</p>
                        <p style="font-weight: 500;">${profile.dob || 'Not provided'}</p>
                    </div>
                    <div>
                        <p style="color: #9ca3af; font-size: 14px; margin-bottom: 4px;">Gender</p>
                        <p style="font-weight: 500;">${profile.gender || 'Not provided'}</p>
                    </div>
                </div>
            </div>

            <div style="margin-bottom: 32px;">
                <h3 style="font-size: 18px; font-weight: 600; margin-bottom: 16px;">Address</h3>
                <div style="padding: 16px; background: #374151; border-radius: 8px;">
                    <p>${profile.address || 'No address provided'}</p>
                    ${profile.city ? `<p>${profile.city}, ${profile.state} ${profile.postal}</p>` : ''}
                    ${profile.country ? `<p>${profile.country}</p>` : ''}
                </div>
            </div>

            <div style="margin-bottom: 32px;">
                <h3 style="font-size: 18px; font-weight: 600; margin-bottom: 16px;">Statistics</h3>
                <div class="stats-grid">
                    <div class="stat-card">
                        <p class="stat-label">Total Expenses</p>
                        <p class="stat-value">€${totalAmount.toFixed(2)}</p>
                    </div>
                    <div class="stat-card">
                        <p class="stat-label">Expenses Count</p>
                        <p class="stat-value">${expenses.length}</p>
                    </div>
                    <div class="stat-card">
                        <p class="stat-label">Trips Planned</p>
                        <p class="stat-value">${trips.length}</p>
                    </div>
                    <div class="stat-card">
                        <p class="stat-label">Pending</p>
                        <p class="stat-value">${expenses.filter(e => e.status === 'pending').length}</p>
                    </div>
                </div>
            </div>

            <div style="display: flex; gap: 12px; flex-wrap: wrap;">
                <button class="btn-primary" onclick="navigateTo('settings')" style="display: inline-flex; align-items: center; gap: 8px; width: auto;">
                    <i class="fas fa-edit"></i>
                    <span>Edit Profile</span>
                </button>
                <button class="btn-logout" onclick="handleLogout()">
                    <i class="fas fa-sign-out-alt"></i>
                    <span>Logout</span>
                </button>
            </div>
        </div>
    `;
}