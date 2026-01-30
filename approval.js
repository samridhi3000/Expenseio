// pages/approvals.js - Approvals Page FIXED

function loadApprovalsPage() {
    const approvals = userApprovals[currentUser.email] || [];
    
    let approvalsHTML = '';
    if (approvals.length === 0) {
        approvalsHTML = '<p style="text-align: center; padding: 40px; color: #9ca3af;">No pending approvals. Submit an expense to get started!</p>';
    } else {
        approvalsHTML = approvals.map(approval => `
            <div class="approval-item" data-approval-id="${approval.id}">
                <div class="approval-info">
                    <h3>${approval.name}</h3>
                    <p>${approval.employee} • ${approval.date}</p>
                    ${approval.category ? `<span class="badge" style="background: #6366f1; margin-top: 8px;">${approval.category}</span>` : ''}
                </div>
                <div class="approval-actions">
                    <span class="approval-amount">€${approval.amount.toFixed(2)}</span>
                    <button class="btn-approve" onclick="approveExpense(${approval.id})">
                        <i class="fas fa-check"></i> Approve
                    </button>
                    <button class="btn-reject" onclick="rejectExpense(${approval.id})">
                        <i class="fas fa-times"></i> Reject
                    </button>
                </div>
            </div>
        `).join('');
    }

    document.getElementById('approvalsContent').innerHTML = `
        <div class="card">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; flex-wrap: wrap; gap: 16px;">
                <div>
                    <h2 class="card-title" style="margin: 0;">Pending Approvals</h2>
                    <p style="color: #9ca3af; font-size: 14px; margin-top: 4px;">${approvals.length} expense(s) waiting for approval</p>
                </div>
                <button class="btn-primary" onclick="openModal('expenseModal')" style="width: auto; padding: 10px 20px;">
                    <i class="fas fa-plus"></i> Submit New Expense
                </button>
            </div>
            
            <div id="approvalsList">
                ${approvalsHTML}
            </div>
        </div>

        <div class="card" style="margin-top: 24px;">
            <h3 style="font-size: 18px; font-weight: 600; margin-bottom: 16px;">
                <i class="fas fa-info-circle" style="color: #06b6d4;"></i> How it works
            </h3>
            <div style="display: flex; flex-direction: column; gap: 12px;">
                <div style="display: flex; align-items: start; gap: 12px;">
                    <div style="background: #ec4899; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                        <span style="color: white; font-weight: bold;">1</span>
                    </div>
                    <div>
                        <h4 style="font-weight: 600; margin-bottom: 4px;">Submit Expense</h4>
                        <p style="color: #9ca3af; font-size: 14px;">Click "New Expense" on home page or "Submit New Expense" button above</p>
                    </div>
                </div>
                <div style="display: flex; align-items: start; gap: 12px;">
                    <div style="background: #f59e0b; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                        <span style="color: white; font-weight: bold;">2</span>
                    </div>
                    <div>
                        <h4 style="font-weight: 600; margin-bottom: 4px;">Pending Approval</h4>
                        <p style="color: #9ca3af; font-size: 14px;">Your expense appears here waiting for approval</p>
                    </div>
                </div>
                <div style="display: flex; align-items: start; gap: 12px;">
                    <div style="background: #10b981; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                        <span style="color: white; font-weight: bold;">3</span>
                    </div>
                    <div>
                        <h4 style="font-weight: 600; margin-bottom: 4px;">Approve or Reject</h4>
                        <p style="color: #9ca3af; font-size: 14px;">Click Approve to move it to Expenses page, or Reject to delete it</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}