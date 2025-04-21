const authForm = document.getElementById('auth-form');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const submitBtn = document.getElementById('submit-btn');
const toggleForm = document.getElementById('toggle-form');
const formTitle = document.getElementById('form-title');
const authDiv = document.getElementById('auth');
const historyDiv = document.getElementById('history');
const userSpan = document.getElementById('user');
const historyList = document.getElementById('history-list');
const historyInput = document.getElementById('history-input');

let isLogin = true;

// Toggle between login and signup
toggleForm.addEventListener('click', () => {
    isLogin = !isLogin;
    formTitle.textContent = isLogin ? 'Login' : 'Sign Up';
    submitBtn.textContent = isLogin ? 'Login' : 'Sign Up';
    toggleForm.textContent = isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Login';
});

// Form submission
authForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = usernameInput.value;
    const password = passwordInput.value;

    if (isLogin) {
        // Login logic
        const users = JSON.parse(localStorage.getItem('users')) || {};
        if (users[username] && users[username].password === password) {
            localStorage.setItem('currentUser', username);
            showHistory(username);
        } else {
            alert('Invalid credentials');
        }
    } else {
        // Signup logic
        const users = JSON.parse(localStorage.getItem('users')) || {};
        if (users[username]) {
            alert('Username already exists');
        } else {
            users[username] = { password, history: [] };
            localStorage.setItem('users', JSON.stringify(users));
            alert('Sign up successful! Please login.');
            toggleForm.click();
        }
    }
});

// Show history section
function showHistory(username) {
    authDiv.style.display = 'none';
    historyDiv.style.display = 'block';
    userSpan.textContent = username;
    loadHistory(username);
}

// Load history from localStorage
function loadHistory(username) {
    const users = JSON.parse(localStorage.getItem('users')) || {};
    const userHistory = users[username]?.history || [];
    historyList.innerHTML = '';
    userHistory.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        historyList.appendChild(li);
    });
}

// Add to history
function addToHistory() {
    const username = localStorage.getItem('currentUser');
    const users = JSON.parse(localStorage.getItem('users')) || {};
    const item = historyInput.value;
    if (item) {
        users[username].history.push(item);
        localStorage.setItem('users', JSON.stringify(users));
        loadHistory(username);
        historyInput.value = '';
    }
}

// Logout
function logout() {
    localStorage.removeItem('currentUser');
    authDiv.style.display = 'block';
    historyDiv.style.display = 'none';
}

// Check if user is already logged in
const currentUser = localStorage.getItem('currentUser');
if (currentUser) {
    showHistory(currentUser);
}
