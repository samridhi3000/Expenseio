// app.js - Core Application Logic

// User database
let users = {};
let currentUser = null;
let userExpenses = {};
let userTrips = {};
let userApprovals = {};

// Initialize user data
function initUserData(email) {
    if (!userExpenses[email]) userExpenses[email] = [];
    if (!userTrips[email]) userTrips[email] = [];
    if (!userApprovals[email]) userApprovals[email] = [];
}

// Authentication Functions
function toggleAuthForm() {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    
    if (loginForm.style.display === 'none') {
        loginForm.style.display = 'block';
        signupForm.style.display = 'none';
    } else {
        loginForm.style.display = 'none';
        signupForm.style.display = 'block';
    }
}

function handleLogin() {
    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value;
    
    if (!username || !password) {
        alert('Please enter both email/username and password');
        return;
    }

    let foundUser = null;
    for (let email in users) {
        if (email === username || users[email].name === username) {
            if (users[email].password === password) {
                foundUser = users[email];
                break;
            }
        }
    }

    if (foundUser) {
        currentUser = foundUser;
        initUserData(currentUser.email);
        document.getElementById('userName').textContent = currentUser.name;
        
        if (currentUser.onboardingComplete) {
            showDashboard();
            loadHomePage();
        } else {
            showOnboarding();
        }
    } else {
        alert('Invalid email/username or password. Please try again or sign up if you don\'t have an account.');
    }
}

function handleSignup() {
    const name = document.getElementById('signupName').value.trim();
    const email = document.getElementById('signupEmail').value.trim();
    const password = document.getElementById('signupPassword').value;
    const confirm = document.getElementById('signupConfirm').value;
    
    if (!name || !email || !password || !confirm) {
        alert('Please fill all fields');
        return;
    }

    if (password !== confirm) {
        alert('Passwords do not match');
        return;
    }

    if (password.length < 6) {
        alert('Password must be at least 6 characters long');
        return;
    }

    if (users[email]) {
        alert('User already exists with this email. Please login instead.');
        return;
    }

    users[email] = { 
        name, 
        email, 
        password,
        onboardingComplete: false,
        profile: {}
    };
    currentUser = users[email];
    initUserData(email);
    
    alert('Account created successfully! Please complete your profile setup.');
    showOnboarding();
}

function handleLogout() {
    currentUser = null;
    document.getElementById('dashboardPage').classList.remove('active');
    document.getElementById('onboardingPage').classList.remove('active');
    document.getElementById('loginPage').classList.add('active');
    
    document.getElementById('loginUsername').value = '';
    document.getElementById('loginPassword').value = '';
    document.getElementById('signupName').value = '';
    document.getElementById('signupEmail').value = '';
    document.getElementById('signupPassword').value = '';
    document.getElementById('signupConfirm').value = '';
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('signupForm').style.display = 'none';
}

function showOnboarding() {
    document.getElementById('loginPage').classList.remove('active');
    document.getElementById('dashboardPage').classList.remove('active');
    document.getElementById('onboardingPage').classList.add('active');
}

function showDashboard() {
    document.getElementById('loginPage').classList.remove('active');
    document.getElementById('onboardingPage').classList.remove('active');
    document.getElementById('dashboardPage').classList.add('active');
}

// Onboarding Steps
let currentStep = 1;

function nextStep(step) {
    if (step === 2) {
        const phone = document.getElementById('onboardPhone').value;
        const dob = document.getElementById('onboardDOB').value;
        const gender = document.getElementById('onboardGender').value;
        
        if (!phone || !dob || !gender) {
            alert('Please fill all fields');
            return;
        }
    } else if (step === 3) {
        const company = document.getElementById('onboardCompany').value;
        const department = document.getElementById('onboardDepartment').value;
        const jobTitle = document.getElementById('onboardJobTitle').value;
        
        if (!company || !department || !jobTitle) {
            alert('Please fill required fields');
            return;
        }
    } else if (step === 4) {
        const address = document.getElementById('onboardAddress').value;
        const city = document.getElementById('onboardCity').value;
        const state = document.getElementById('onboardState').value;
        const postal = document.getElementById('onboardPostal').value;
        const country = document.getElementById('onboardCountry').value;
        
        if (!address || !city || !state || !postal || !country) {
            alert('Please fill all fields');
            return;
        }
    }

    document.getElementById('step' + currentStep).classList.remove('active');
    currentStep = step;
    document.getElementById('step' + currentStep).classList.add('active');
    
    const progress = (step / 4) * 100;
    document.getElementById('progressFill').style.width = progress + '%';
}

function prevStep(step) {
    document.getElementById('step' + currentStep).classList.remove('active');
    currentStep = step;
    document.getElementById('step' + currentStep).classList.add('active');
    
    const progress = (step / 4) * 100;
    document.getElementById('progressFill').style.width = progress + '%';
}

function completeOnboarding() {
    currentUser.profile = {
        phone: document.getElementById('onboardPhone').value,
        dob: document.getElementById('onboardDOB').value,
        gender: document.getElementById('onboardGender').value,
        company: document.getElementById('onboardCompany').value,
        department: document.getElementById('onboardDepartment').value,
        jobTitle: document.getElementById('onboardJobTitle').value,
        employeeID: document.getElementById('onboardEmployeeID').value,
        address: document.getElementById('onboardAddress').value,
        city: document.getElementById('onboardCity').value,
        state: document.getElementById('onboardState').value,
        postal: document.getElementById('onboardPostal').value,
        country: document.getElementById('onboardCountry').value,
        currency: document.getElementById('onboardCurrency').value,
        threshold: document.getElementById('onboardThreshold').value,
        emailNotif: document.getElementById('onboardEmailNotif').checked
    };
    
    currentUser.onboardingComplete = true;
    users[currentUser.email] = currentUser;
    document.getElementById('userName').textContent = currentUser.name;
    
    currentStep = 1;
    
    alert('Profile setup complete! Welcome to Expensio.');
    showDashboard();
    loadHomePage();
}

// Navigation Functions
function navigateTo(page) {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => item.classList.remove('active'));
    event.target.closest('.nav-item').classList.add('active');
    
    const contentPages = document.querySelectorAll('.content-page');
    contentPages.forEach(p => p.classList.remove('active'));
    
    document.getElementById(page + 'Content').classList.add('active');
    
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

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.querySelector('.main-content');
    sidebar.classList.toggle('collapsed');
    sidebar.classList.toggle('show');
    mainContent.classList.toggle('expanded');
}

// Modal Functions
function openModal(modalId) {
    document.getElementById(modalId).classList.add('active');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

// Expense Functions
function addExpense() {
    const subject = document.getElementById('expenseSubject').value.trim();
    const category = document.getElementById('expenseCategory').value;
    const amount = document.getElementById('expenseAmount').value;
    const date = document.getElementById('expenseDate').value;

    if (!subject || !amount || !date) {
        alert('Please fill all fields');
        return;
    }

    const expense = {
        id: Date.now(),
        date,
        subject,
        category,
        amount: parseFloat(amount),
        status: 'pending'
    };

    userExpenses[currentUser.email].push(expense);
    
    document.getElementById('expenseSubject').value = '';
    document.getElementById('expenseAmount').value = '';
    document.getElementById('expenseDate').value = '';
    
    closeModal('expenseModal');
    loadExpensesPage();
    loadHomePage();
    alert('Expense added successfully!');
}

function deleteExpense(id) {
    if (confirm('Are you sure you want to delete this expense?')) {
        userExpenses[currentUser.email] = userExpenses[currentUser.email].filter(e => e.id !== id);
        loadExpensesPage();
        loadHomePage();
    }
}

// Trip Functions
function addTrip() {
    const destination = document.getElementById('tripDestination').value.trim();
    const purpose = document.getElementById('tripPurpose').value.trim();
    const startDate = document.getElementById('tripStartDate').value;
    const endDate = document.getElementById('tripEndDate').value;
    const budget = document.getElementById('tripBudget').value;

    if (!destination || !purpose || !startDate || !endDate || !budget) {
        alert('Please fill all fields');
        return;
    }

    const trip = {
        id: Date.now(),
        destination,
        purpose,
        startDate,
        endDate,
        budget: parseFloat(budget),
        status: 'planned'
    };

    userTrips[currentUser.email].push(trip);
    
    document.getElementById('tripDestination').value = '';
    document.getElementById('tripPurpose').value = '';
    document.getElementById('tripStartDate').value = '';
    document.getElementById('tripEndDate').value = '';
    document.getElementById('tripBudget').value = '';
    
    closeModal('tripModal');
    loadTripsPage();
    loadHomePage();
    alert('Trip planned successfully!');
}

function deleteTrip(id) {
    if (confirm('Are you sure you want to delete this trip?')) {
        userTrips[currentUser.email] = userTrips[currentUser.email].filter(t => t.id !== id);
        loadTripsPage();
        loadHomePage();
    }
}

// Approval Functions
function addApproval() {
    const name = document.getElementById('approvalName').value.trim();
    const employee = document.getElementById('approvalEmployee').value.trim();
    const amount = document.getElementById('approvalAmount').value;
    const date = document.getElementById('approvalDate').value;

    if (!name || !employee || !amount || !date) {
        alert('Please fill all fields');
        return;
    }

    const approval = {
        id: Date.now(),
        name,
        employee,
        amount: parseFloat(amount),
        date
    };

    userApprovals[currentUser.email].push(approval);
    
    document.getElementById('approvalName').value = '';
    document.getElementById('approvalEmployee').value = '';
    document.getElementById('approvalAmount').value = '';
    document.getElementById('approvalDate').value = '';
    
    closeModal('approvalModal');
    loadApprovalsPage();
    loadHomePage();
    alert('Approval request submitted!');
}

function approveExpense(id) {
    if (confirm('Approve this expense?')) {
        const item = document.querySelector(`[data-approval-id="${id}"]`);
        item.style.backgroundColor = '#10b981';
        setTimeout(() => {
            item.style.transition = 'opacity 0.3s';
            item.style.opacity = '0';
            setTimeout(() => {
                userApprovals[currentUser.email] = userApprovals[currentUser.email].filter(a => a.id !== id);
                loadApprovalsPage();
                loadHomePage();
            }, 300);
        }, 500);
    }
}

function rejectExpense(id) {
    if (confirm('Reject this expense?')) {
        const item = document.querySelector(`[data-approval-id="${id}"]`);
        item.style.backgroundColor = '#ef4444';
        setTimeout(() => {
            item.style.transition = 'opacity 0.3s';
            item.style.opacity = '0';
            setTimeout(() => {
                userApprovals[currentUser.email] = userApprovals[currentUser.email].filter(a => a.id !== id);
                loadApprovalsPage();
                loadHomePage();
            }, 300);
        }, 500);
    }
}