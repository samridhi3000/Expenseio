// pages/expenses.js - Expenses Page

function loadExpensesPage() {
    const expenses = userExpenses[currentUser.email] || [];
    
    let tableRows = '';
    if (expenses.length === 0) {
        tableRows = '<tr><td colspan="6" style="text-align: center; padding: 40px; color: #9ca3af;">No expenses yet. Click "Add Expense" to create your first expense!</td></tr>';
    } else {
        tableRows = expenses.sort((a, b) => new Date(b.date) - new Date(a.date)).map(expense => `
            <tr data-status="${expense.status}" data-expense-id="${expense.id}">
                <td>${expense.date}</td>
                <td>${expense.subject}</td>
                <td>${expense.category}</td>
                <td><span class="badge badge-${expense.status}">${expense.status.charAt(0).toUpperCase() + expense.status.slice(1)}</span></td>
                <td style="text-align: right;">€${expense.amount.toFixed(2)}</td>
                <td style="position: relative;">
                    <button class="btn-delete" onclick="deleteExpense(${expense.id})">×</button>
                </td>
            </tr>
        `).join('');
    }

    document.getElementById('expensesContent').innerHTML = `
        <div class="card">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; flex-wrap: wrap; gap: 16px;">
                <h2 class="card-title" style="margin: 0;">My Expenses</h2>
                <button class="btn-primary" onclick="openModal('expenseModal')" style="width: auto; padding: 10px 20px;">
                    <i class="fas fa-plus"></i> Add Expense
                </button>
            </div>
            
            <div class="filter-buttons">
                <button class="filter-btn active" onclick="filterExpenses('all')">All</button>
                <button class="filter-btn" onclick="filterExpenses('pending')">Pending</button>
                <button class="filter-btn" onclick="filterExpenses('approved')">Approved</button>
            </div>

            <div style="overflow-x: auto;">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Subject</th>
                            <th>Category</th>
                            <th>Status</th>
                            <th style="text-align: right;">Amount</th>
                            <th style="width: 50px;"></th>
                        </tr>
                    </thead>
                    <tbody id="expensesTableBody">
                        ${tableRows}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

function filterExpenses(status) {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    const rows = document.querySelectorAll('#expensesTableBody tr');
    rows.forEach(row => {
        if (status === 'all') {
            row.style.display = '';
        } else {
            row.style.display = row.dataset.status === status ? '' : 'none';
        }
    });
}