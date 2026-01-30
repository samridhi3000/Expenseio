// pages/home.js - Home Page

function loadHomePage() {
    const expenses = userExpenses[currentUser.email] || [];
    const trips = userTrips[currentUser.email] || [];
    const approvals = userApprovals[currentUser.email] || [];
    
    const pendingCount = expenses.filter(e => e.status === 'pending').length;
    const approvedCount = expenses.filter(e => e.status === 'approved').length;
    const totalAmount = expenses.reduce((sum, e) => sum + e.amount, 0);

    document.getElementById('homeContent').innerHTML = `
        <div class="card">
            <h2 class="card-title">Welcome back, ${currentUser.name}! 👋</h2>
            <p style="color: #9ca3af; margin-bottom: 24px;">Here's your expense overview</p>
            
            <div class="task-list">
                <div class="task-item" onclick="navigateToPage('approvals')" style="cursor: pointer;">
                    <div class="task-info">
                        <div class="task-icon" style="background: #9333ea;">
                            <i class="fas fa-check-square"></i>
                        </div>
                        <span>Pending Approvals</span>
                    </div>
                    <span class="task-count">${approvals.length}</span>
                </div>
                <div class="task-item" onclick="navigateToPage('trips')" style="cursor: pointer;">
                    <div class="task-info">
                        <div class="task-icon" style="background: #3b82f6;">
                            <i class="fas fa-plane"></i>
                        </div>
                        <span>Planned Trips</span>
                    </div>
                    <span class="task-count">${trips.length}</span>
                </div>
                <div class="task-item" onclick="navigateToPage('expenses')" style="cursor: pointer;">
                    <div class="task-info">
                        <div class="task-icon" style="background: #ec4899;">
                            <i class="fas fa-credit-card"></i>
                        </div>
                        <span>Total Expenses</span>
                    </div>
                    <span class="task-count">${expenses.length}</span>
                </div>
            </div>
        </div>

        <div class="card">
            <h2 class="card-title">Quick Actions</h2>
            <div class="quick-access">
                <button class="quick-btn" style="background: #ec4899;" onclick="openModal('expenseModal')">
                    <div class="quick-btn-icon" style="background: #db2777;">
                        <i class="fas fa-plus"></i>
                    </div>
                    <span>New Expense</span>
                </button>
                <button class="quick-btn" style="background: #3b82f6;" onclick="openModal('tripModal')">
                    <div class="quick-btn-icon" style="background: #2563eb;">
                        <i class="fas fa-plane"></i>
                    </div>
                    <span>Plan Trip</span>
                </button>
                <button class="quick-btn" style="background: #06b6d4;" onclick="openModal('approvalModal')">
                    <div class="quick-btn-icon" style="background: #0891b2;">
                        <i class="fas fa-check"></i>
                    </div>
                    <span>Add Approval</span>
                </button>
            </div>
        </div>

        <div class="stats-grid">
            <div class="stat-card">
                <p class="stat-label">Total Spent</p>
                <p class="stat-value">€${totalAmount.toFixed(2)}</p>
            </div>
            <div class="stat-card">
                <p class="stat-label">Pending</p>
                <p class="stat-value">${pendingCount}</p>
            </div>
            <div class="stat-card">
                <p class="stat-label">Approved</p>
                <p class="stat-value">${approvedCount}</p>
            </div>
            <div class="stat-card">
                <p class="stat-label">Trips</p>
                <p class="stat-value">${trips.length}</p>
            </div>
        </div>

        ${expenses.length > 0 ? `
        <div class="card">
            <h2 class="card-title">Recent Expenses</h2>
            <div style="overflow-x: auto;">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Subject</th>
                            <th>Category</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${expenses.slice(0, 5).sort((a, b) => new Date(b.date) - new Date(a.date)).map(expense => `
                            <tr>
                                <td>${expense.date}</td>
                                <td>${expense.subject}</td>
                                <td>${expense.category}</td>
                                <td style="text-align: right;">€${expense.amount.toFixed(2)}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
            <div style="margin-top: 16px; text-align: center;">
                <button class="btn-secondary" onclick="navigateToPage('expenses')" style="display: inline-flex; align-items: center; gap: 8px;">
                    View All Expenses
                    <i class="fas fa-arrow-right"></i>
                </button>
            </div>
        </div>
        ` : ''}
    `;
}

function navigateToPage(page) {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => item.classList.remove('active'));
    
    navItems.forEach(item => {
        const itemText = item.textContent.trim().toLowerCase();
        if (itemText === page.toLowerCase()) {
            item.classList.add('active');
        }
    });
    
    const contentPages = document.querySelectorAll('.content-page');
    contentPages.forEach(p => p.classList.remove('active'));
    
    const selectedPage = document.getElementById(page + 'Content');
    selectedPage.classList.add('active');
    
    switch(page) {
        case 'home': loadHomePage(); break;
        case 'expenses': loadExpensesPage(); break;
        case 'trips': loadTripsPage(); break;
        case 'approvals': loadApprovalsPage(); break;
        case 'settings': loadSettingsPage(); break;
        case 'support': loadSupportPage(); break;
        case 'profile': loadProfilePage(); break;
    }
}