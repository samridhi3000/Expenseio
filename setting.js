// pages/settings.js - Settings Page

function loadSettingsPage() {
    const profile = currentUser.profile || {};
    
    document.getElementById('settingsContent').innerHTML = `
        <div class="card">
            <h2 class="card-title">Account Settings</h2>
            
            <div style="margin-bottom: 32px;">
                <h3 style="font-size: 18px; font-weight: 600; margin-bottom: 16px;">Profile Information</h3>
                <div style="display: grid; gap: 16px;">
                    <div class="form-group">
                        <label>Full Name</label>
                        <input type="text" id="settingsName" value="${currentUser.name}">
                    </div>
                    <div class="form-group">
                        <label>Email</label>
                        <input type="email" value="${currentUser.email}" readonly style="opacity: 0.6;">
                    </div>
                    <div class="form-group">
                        <label>Phone Number</label>
                        <input type="tel" id="settingsPhone" value="${profile.phone || ''}">
                    </div>
                    <div class="form-group">
                        <label>Job Title</label>
                        <input type="text" id="settingsJobTitle" value="${profile.jobTitle || ''}">
                    </div>
                </div>
            </div>

            <div style="margin-bottom: 32px;">
                <h3 style="font-size: 18px; font-weight: 600; margin-bottom: 16px;">Company Information</h3>
                <div style="display: grid; gap: 16px;">
                    <div class="form-group">
                        <label>Company Name</label>
                        <input type="text" id="settingsCompany" value="${profile.company || ''}">
                    </div>
                    <div class="form-group">
                        <label>Department</label>
                        <select id="settingsDepartment">
                            <option ${profile.department === 'Marketing' ? 'selected' : ''}>Marketing</option>
                            <option ${profile.department === 'Sales' ? 'selected' : ''}>Sales</option>
                            <option ${profile.department === 'Operations' ? 'selected' : ''}>Operations</option>
                            <option ${profile.department === 'Finance' ? 'selected' : ''}>Finance</option>
                            <option ${profile.department === 'HR' ? 'selected' : ''}>HR</option>
                            <option ${profile.department === 'IT' ? 'selected' : ''}>IT</option>
                            <option ${profile.department === 'Other' ? 'selected' : ''}>Other</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Employee ID</label>
                        <input type="text" id="settingsEmployeeID" value="${profile.employeeID || ''}">
                    </div>
                </div>
            </div>

            <div style="margin-bottom: 32px;">
                <h3 style="font-size: 18px; font-weight: 600; margin-bottom: 16px;">Preferences</h3>
                <div style="display: grid; gap: 16px;">
                    <div class="form-group">
                        <label>Default Currency</label>
                        <select id="settingsCurrency">
                            <option ${profile.currency === 'EUR (€)' ? 'selected' : ''}>EUR (€)</option>
                            <option ${profile.currency === 'USD ($)' ? 'selected' : ''}>USD ($)</option>
                            <option ${profile.currency === 'GBP (£)' ? 'selected' : ''}>GBP (£)</option>
                            <option ${profile.currency === 'JPY (¥)' ? 'selected' : ''}>JPY (¥)</option>
                            <option ${profile.currency === 'INR (₹)' ? 'selected' : ''}>INR (₹)</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Expense Approval Threshold (€)</label>
                        <input type="number" id="settingsThreshold" value="${profile.threshold || 500}">
                    </div>
                </div>
            </div>

            <div style="display: flex; gap: 12px;">
                <button class="btn-primary" onclick="saveSettings()" style="width: auto;">
                    <i class="fas fa-save"></i> Save Changes
                </button>
                <button class="btn-secondary" onclick="loadSettingsPage()">
                    Cancel
                </button>
            </div>
        </div>
    `;
}

function saveSettings() {
    const name = document.getElementById('settingsName').value.trim();
    
    if (name) {
        currentUser.name = name;
        currentUser.profile.phone = document.getElementById('settingsPhone').value;
        currentUser.profile.jobTitle = document.getElementById('settingsJobTitle').value;
        currentUser.profile.company = document.getElementById('settingsCompany').value;
        currentUser.profile.department = document.getElementById('settingsDepartment').value;
        currentUser.profile.employeeID = document.getElementById('settingsEmployeeID').value;
        currentUser.profile.currency = document.getElementById('settingsCurrency').value;
        currentUser.profile.threshold = document.getElementById('settingsThreshold').value;
        
        users[currentUser.email] = currentUser;
        document.getElementById('userName').textContent = name;
        alert('Settings saved successfully!');
        loadHomePage();
        navigateToPage('home');
    }
}