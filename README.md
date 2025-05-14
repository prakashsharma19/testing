<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PPH Advertisement Processor</title>
    <style>
        :root {
            --primary-color: #2c3e50;
            --secondary-color: #1171ba;
            --accent-color: #28a745;
            --danger-color: #dc3545;
            --light-color: #f8f9fa;
            --dark-color: #343a40;
            --border-color: #dee2e6;
            --text-color: #495057;
            --text-light: #6c757d;
        }

        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f5f7fa;
            color: var(--text-color);
            line-height: 1.6;
            padding: 20px;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            display: grid;
            grid-template-columns: 300px 1fr;
            gap: 20px;
        }

        /* Header Styles */
        .header {
            grid-column: 1 / -1;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            padding-bottom: 15px;
            border-bottom: 1px solid var(--border-color);
        }

        .logo {
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .logo img {
            height: 40px;
        }

        .logo h1 {
            font-size: 24px;
            color: var(--primary-color);
        }

        .user-controls {
            display: flex;
            align-items: center;
            gap: 15px;
        }

        /* Sidebar Styles */
        .sidebar {
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.05);
            padding: 20px;
            height: fit-content;
        }

        .panel {
            margin-bottom: 25px;
        }

        .panel-title {
            font-size: 18px;
            font-weight: 600;
            color: var(--primary-color);
            margin-bottom: 15px;
            padding-bottom: 8px;
            border-bottom: 2px solid var(--border-color);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .panel-title button {
            background: none;
            border: none;
            color: var(--secondary-color);
            cursor: pointer;
            font-size: 14px;
        }

        /* Main Content Styles */
        .main-content {
            display: flex;
            flex-direction: column;
            gap: 20px;
        }

        .card {
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.05);
            padding: 20px;
        }

        .card-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
            cursor: pointer;
        }

        .card-header h2 {
            font-size: 18px;
            color: var(--primary-color);
        }

        .card-header .toggle {
            font-size: 20px;
            color: var(--secondary-color);
        }

        .card-body {
            display: none;
        }

        .card-body.show {
            display: block;
        }

        /* Form Elements */
        textarea {
            width: 100%;
            padding: 12px;
            border: 1px solid var(--border-color);
            border-radius: 6px;
            font-family: inherit;
            font-size: 14px;
            resize: vertical;
            min-height: 150px;
        }

        input[type="text"],
        input[type="password"],
        input[type="email"],
        select {
            width: 100%;
            padding: 10px;
            border: 1px solid var(--border-color);
            border-radius: 6px;
            font-family: inherit;
            font-size: 14px;
            margin-bottom: 10px;
        }

        .form-group {
            margin-bottom: 15px;
        }

        .form-group label {
            display: block;
            margin-bottom: 5px;
            font-weight: 500;
        }

        /* Button Styles */
        .btn {
            padding: 10px 15px;
            border: none;
            border-radius: 6px;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 5px;
        }

        .btn-primary {
            background-color: var(--secondary-color);
            color: white;
        }

        .btn-primary:hover {
            background-color: #0d5a8a;
        }

        .btn-success {
            background-color: var(--accent-color);
            color: white;
        }

        .btn-success:hover {
            background-color: #218838;
        }

        .btn-danger {
            background-color: var(--danger-color);
            color: white;
        }

        .btn-danger:hover {
            background-color: #c82333;
        }

        .btn-light {
            background-color: var(--light-color);
            color: var(--dark-color);
        }

        .btn-light:hover {
            background-color: #e2e6ea;
        }

        .btn-sm {
            padding: 6px 10px;
            font-size: 13px;
        }

        /* Toggle Switch */
        .toggle-switch {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 10px;
        }

        .switch {
            position: relative;
            display: inline-block;
            width: 50px;
            height: 24px;
        }

        .switch input {
            opacity: 0;
            width: 0;
            height: 0;
        }

        .slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #ccc;
            transition: .4s;
            border-radius: 24px;
        }

        .slider:before {
            position: absolute;
            content: "";
            height: 18px;
            width: 18px;
            left: 3px;
            bottom: 3px;
            background-color: white;
            transition: .4s;
            border-radius: 50%;
        }

        input:checked + .slider {
            background-color: var(--secondary-color);
        }

        input:checked + .slider:before {
            transform: translateX(26px);
        }

        /* Country List */
        .country-list {
            max-height: 300px;
            overflow-y: auto;
            margin-top: 10px;
        }

        .country-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 8px 0;
            border-bottom: 1px solid var(--border-color);
        }

        .country-name {
            flex-grow: 1;
        }

        .country-count {
            font-weight: bold;
            min-width: 30px;
            text-align: right;
            margin: 0 10px;
        }

        /* Stats */
        .stats {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 15px;
            margin-top: 20px;
        }

        .stat-card {
            background: white;
            border-radius: 8px;
            padding: 15px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.05);
        }

        .stat-card h3 {
            font-size: 14px;
            color: var(--text-light);
            margin-bottom: 5px;
        }

        .stat-card p {
            font-size: 24px;
            font-weight: 600;
            color: var(--primary-color);
        }

        /* Progress Bar */
        .progress-container {
            width: 100%;
            height: 8px;
            background-color: var(--border-color);
            border-radius: 4px;
            margin-top: 10px;
            overflow: hidden;
        }

        .progress-bar {
            height: 100%;
            background-color: var(--secondary-color);
            transition: width 0.3s ease;
        }

        /* Output Area */
        #output {
            border: 1px solid var(--border-color);
            border-radius: 6px;
            padding: 15px;
            min-height: 200px;
            background: white;
        }

        #output p {
            margin-bottom: 10px;
            padding-bottom: 10px;
            border-bottom: 1px solid var(--border-color);
        }

        /* Utility Classes */
        .text-success {
            color: var(--accent-color);
        }

        .text-danger {
            color: var(--danger-color);
        }

        .text-muted {
            color: var(--text-light);
        }

        .mt-3 {
            margin-top: 15px;
        }

        .mb-3 {
            margin-bottom: 15px;
        }

        .d-none {
            display: none;
        }

        /* Responsive */
        @media (max-width: 768px) {
            .container {
                grid-template-columns: 1fr;
            }
            
            .sidebar {
                order: 2;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <header class="header">
            <div class="logo">
                <img src="https://raw.githubusercontent.com/prakashsharma19/hosted-images/main/pphlogo.png" alt="PPH Logo">
                <h1>PPH Advertisement Processor</h1>
            </div>
            <div class="user-controls" id="userControls" style="display: none;">
                <span id="loggedInUser"></span>
                <button class="btn btn-danger btn-sm" id="logoutButton" onclick="logout()">Logout</button>
            </div>
        </header>

        <!-- Login Section -->
        <div class="card" id="loginSection">
            <div class="card-header">
                <h2>Login</h2>
            </div>
            <div class="card-body show">
                <div class="form-group">
                    <label for="username">Username</label>
                    <input type="text" id="username" placeholder="Enter your username">
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" placeholder="Enter your password">
                </div>
                <button class="btn btn-primary" id="loginButton" onclick="login()">Login</button>
            </div>
        </div>

        <!-- Main App (hidden until login) -->
        <div id="appContent" style="display: none;">
            <aside class="sidebar">
                <!-- Country Processing Panel -->
                <div class="panel">
                    <div class="panel-title">
                        <span>Country Processing</span>
                        <button onclick="toggleAllCountries()">Toggle All</button>
                    </div>
                    <div class="country-list" id="countryListContainer">
                        <!-- Country items will be added here dynamically -->
                    </div>
                </div>

                <!-- Settings Panel -->
                <div class="panel">
                    <div class="panel-title">
                        <span>Processing Settings</span>
                    </div>
                    <div class="toggle-switch">
                        <label class="switch">
                            <input type="checkbox" id="dearProfessorToggle" onchange="toggleDearProfessor()">
                            <span class="slider round"></span>
                        </label>
                        <span id="dearProfessorLabel">Include "Dear Professor"</span>
                    </div>
                    <div class="form-group">
                        <label for="fontStyle">Font</label>
                        <select id="fontStyle" onchange="updateFont()">
                            <option value="Arial">Arial</option>
                            <option value="Times New Roman">Times New Roman</option>
                            <option value="Courier New">Courier New</option>
                            <option value="Georgia">Georgia</option>
                            <option value="Calibri Light">Calibri Light</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="fontSize">Font Size</label>
                        <input type="number" id="fontSize" value="16" onchange="updateFont()">
                    </div>
                    <div class="form-group">
                        <label for="gapOption">Line Gap</label>
                        <select id="gapOption" onchange="saveGapPreferences()">
                            <option value="default">Default</option>
                            <option value="nil">No Gap</option>
                        </select>
                    </div>
                    <div class="toggle-switch">
                        <label class="switch">
                            <input type="checkbox" id="effectsToggle" onchange="saveEffectPreferences()">
                            <span class="slider round"></span>
                        </label>
                        <span>Enable Effects</span>
                    </div>
                    <div class="form-group">
                        <label for="effectType">Effect Type</label>
                        <select id="effectType" onchange="saveEffectPreferences()">
                            <option value="none">None</option>
                            <option value="fadeOut">Fade Out</option>
                            <option value="vanish">Vanish</option>
                            <option value="explode">Explode</option>
                        </select>
                    </div>
                    <div class="toggle-switch">
                        <label>
                            <input type="radio" name="cutOption" value="keyboard" checked> Keyboard
                        </label>
                        <label>
                            <input type="radio" name="cutOption" value="mouse"> Mouse
                        </label>
                    </div>
                </div>

                <!-- Unsubscribe Panel -->
                <div class="panel">
                    <div class="panel-title">
                        <span>Unsubscribe Management</span>
                    </div>
                    <div class="form-group">
                        <input type="email" id="unsubscribedEmail" placeholder="Enter email to unsubscribe">
                    </div>
                    <div class="form-group">
                        <button class="btn btn-success btn-sm" onclick="saveUnsubscribedEmail()">Add Email</button>
                        <button class="btn btn-danger btn-sm" onclick="deleteUnsubscribedEntries()">Delete Entries</button>
                    </div>
                    <div class="form-group">
                        <button class="btn btn-light btn-sm" onclick="viewUnsubscribedEmails()">View List</button>
                        <button class="btn btn-light btn-sm" onclick="syncWithGoogleSheets()">Sync Now</button>
                    </div>
                    <div id="successMessage" class="text-success mt-3" style="display: none;"></div>
                    <div id="syncStatus" class="text-muted mt-1">Last sync: Never</div>
                </div>
            </aside>

            <main class="main-content">
                <!-- Input Text Card -->
                <div class="card">
                    <div class="card-header" onclick="toggleCardBody(this)">
                        <h2>Paste Your Text</h2>
                        <span class="toggle">+</span>
                    </div>
                    <div class="card-body">
                        <textarea id="inputText" placeholder="Paste your advertisement text here..."></textarea>
                        <button class="btn btn-primary mt-3" id="okButton" onclick="processText()">Process Text</button>
                    </div>
                </div>

                <!-- Incomplete Entries Card -->
                <div class="card">
                    <div class="card-header" onclick="toggleCardBody(this)">
                        <h2>Incomplete Entries</h2>
                        <span class="toggle">+</span>
                    </div>
                    <div class="card-body">
                        <textarea id="incompleteText" placeholder="Incomplete entries will appear here..." readonly></textarea>
                        <button class="btn btn-light mt-3" onclick="copyIncompleteEntries()">Copy to Clipboard</button>
                    </div>
                </div>

                <!-- Rough Work Card -->
                <div class="card">
                    <div class="card-header" onclick="toggleCardBody(this)">
                        <h2>Rough Work</h2>
                        <span class="toggle">+</span>
                    </div>
                    <div class="card-body">
                        <textarea id="roughText" placeholder="Use this area for notes or rough work..."></textarea>
                    </div>
                </div>

                <!-- Output Card -->
                <div class="card">
                    <div class="card-header">
                        <h2>Processed Output</h2>
                    </div>
                    <div class="card-body show">
                        <div id="output" contenteditable="true">
                            <p id="cursorStart">Place your cursor here to start processing</p>
                        </div>
                    </div>
                </div>

                <!-- Stats Card -->
                <div class="card">
                    <div class="card-header">
                        <h2>Statistics</h2>
                    </div>
                    <div class="card-body show">
                        <div class="stats">
                            <div class="stat-card">
                                <h3>Total Advertisements</h3>
                                <p id="totalAds">0</p>
                            </div>
                            <div class="stat-card">
                                <h3>Ads Sent Today</h3>
                                <p id="dailyAdCount">0</p>
                            </div>
                            <div class="stat-card">
                                <h3>Completion Time</h3>
                                <p id="remainingTimeText">0m</p>
                            </div>
                            <div class="stat-card">
                                <h3>Completion %</h3>
                                <p id="completionPercentage">0%</p>
                            </div>
                        </div>
                        <div class="progress-container mt-3">
                            <div class="progress-bar" id="progressBar" style="width: 0%"></div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>

    <script>
        const countryList = [
            "Afghanistan", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia",
            "Bahamas", "Bahrain", "Barbados", "Belize", "Benin", "Bolivia", "Bosnia and Herzegovina", "Brazil", "Brasil", "Brunei", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Canada", "Central African Republic", "Chad", "Tchad", "Chile", "Colombia", "Comoros", "Congo", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Eswatini", "Fiji", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "India", "Indonesia", "Iraq", "Ireland", "Italy", "Jamaica", "Japan", "Jordan", "Kenya", "Kiribati", "Kuwait", "Laos", "Latvia", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Montenegro", "Morocco", "Mozambique", "Namibia", "Nauru", "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Oman", "Pakistan", "Palau", "Palestine", "Philippines", "Qatar", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Seychelles", "Sierra Leone", "Solomon Islands", "Somalia", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Switzerland", "Syria", "Taiwan", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "United Arab Emirates", "United States", "Vanuatu", "Vatican City", "Vietnam", "Yemen", "USA", "U.S.A.", "U.S.A", "U. S. A.", "U. S. A", "Korea", "UAE", "U.A.E.", "U. A. E", "U. A. E.", "Hong Kong", "Ivory Coast", "Cote d'Ivoire", "Côte d'Ivoire", "Cote D'Ivoire", "Macau", "Macao", "Macedonia", "Greece", "Albania", "Austria", "Azerbaijan", "Bangladesh", "Belgium", "Bhutan", "Botswana", "Bulgaria", "Cameroon", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Estonia", "Ethiopia", "Finland", "Hungary", "Iceland", "Iran", "Israel", "Kazakhstan", "Kyrgyzstan", "Lebanon", "Lithuania", "Maldives", "Mongolia", "Myanmar", "Burma", "Nepal", "Netherlands", "New Zealand", "Norway", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Poland", "Portugal", "Romania", "Serbia", "Singapore", "Slovakia", "Slovenia", "Sweden", "Tajikistan", "Tanzania", "Ukraine", "United Kingdom", "Uruguay", "Uzbekistan", "Venezuela", "Zambia", "Zimbabwe", "UK", "U.K.", "Viet Nam", "Belarus", "South Africa"
        ];

        // Google Sheets Configuration
        const SHEET_ID = 'YOUR_SHEET_ID'; // Replace with your Google Sheet ID
        const API_KEY = 'YOUR_API_KEY'; // Replace with your Google API key
        const SHEET_NAME = 'Unsubscribed'; // Name of the sheet in your Google Sheet

        let currentUser = null;
        let dailyAdCount = 0;
        let cutHistory = [];
        let isLocked = false;
        let isProcessing = false;
        let totalParagraphs = 0;
        let cutCooldown = false;
        let countryToggleStates = {};
        let includeDearProfessor = true;

        // Initialize the application
        document.addEventListener('DOMContentLoaded', () => {
            // Load unsubscribed emails on startup
            loadUnsubscribedEmails();
        });

        // Toggle card body visibility
        function toggleCardBody(header) {
            const cardBody = header.nextElementSibling;
            const toggle = header.querySelector('.toggle');
            
            if (cardBody.classList.contains('show')) {
                cardBody.classList.remove('show');
                toggle.textContent = '+';
            } else {
                cardBody.classList.add('show');
                toggle.textContent = '-';
            }
        }

        // Country Toggle Functions
        function initializeCountryToggles() {
            const outputContainer = document.getElementById('output');
            const text = outputContainer.innerText;
            const countryCounts = countCountryOccurrences(text);
            
            // Load saved toggle states from localStorage
            const savedToggleStates = localStorage.getItem('countryToggleStates');
            if (savedToggleStates) {
                countryToggleStates = JSON.parse(savedToggleStates);
            }
            
            const sortedCountries = Object.entries(countryCounts).sort((a, b) => b[1] - a[1]);
            let countryListHTML = '';
            
            sortedCountries.forEach(([country, count]) => {
                // Default to true if no state is saved
                if (countryToggleStates[country] === undefined) {
                    countryToggleStates[country] = true;
                }
                
                countryListHTML += `
                    <div class="country-item">
                        <span class="country-name">${country}</span>
                        <span class="country-count">${count}</span>
                        <label class="switch">
                            <input type="checkbox" id="toggle-${country}" 
                                   ${countryToggleStates[country] ? 'checked' : ''} 
                                   onchange="toggleCountryProcessing('${country}')">
                            <span class="slider round"></span>
                        </label>
                    </div>
                `;
            });
            
            document.getElementById('countryListContainer').innerHTML = countryListHTML;
            
            // Save initial states if they weren't loaded
            if (!savedToggleStates) {
                localStorage.setItem('countryToggleStates', JSON.stringify(countryToggleStates));
            }
        }

        function toggleCountryProcessing(country) {
            const toggle = document.getElementById(`toggle-${country}`);
            countryToggleStates[country] = toggle.checked;
            localStorage.setItem('countryToggleStates', JSON.stringify(countryToggleStates));
            
            // Re-process the text to apply the changes
            processText();
        }

        function toggleAllCountries() {
            const allEnabled = Object.values(countryToggleStates).every(state => state);
            Object.keys(countryToggleStates).forEach(country => {
                countryToggleStates[country] = !allEnabled;
                const toggle = document.getElementById(`toggle-${country}`);
                if (toggle) toggle.checked = !allEnabled;
            });
            localStorage.setItem('countryToggleStates', JSON.stringify(countryToggleStates));
            processText();
        }

        // Unsubscribe Email Functions
        function saveUnsubscribedEmail() {
            const emailInput = document.getElementById('unsubscribedEmail');
            const email = emailInput.value.trim();
            
            if (!email) {
                showSuccessMessage('Please enter an email address', false);
                return;
            }
            
            if (!validateEmail(email)) {
                showSuccessMessage('Please enter a valid email address', false);
                return;
            }
            
            // Save to local storage
            const unsubscribedEmails = JSON.parse(localStorage.getItem('permanentUnsubscribedEmails')) || [];
            if (!unsubscribedEmails.includes(email.toLowerCase())) {
                unsubscribedEmails.push(email.toLowerCase());
                localStorage.setItem('permanentUnsubscribedEmails', JSON.stringify(unsubscribedEmails));
                
                // Sync with Google Sheets
                syncWithGoogleSheets(email);
                
                showSuccessMessage('Email saved and synced successfully!');
                emailInput.value = '';
                
                // Re-process text to apply changes
                processText();
            } else {
                showSuccessMessage('Email already exists in unsubscribe list');
            }
        }

        function validateEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        }

        async function syncWithGoogleSheets(email = null) {
            try {
                if (email) {
                    // Single email sync
                    const appendUrl = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}!A1:append?valueInputOption=USER_ENTERED&key=${API_KEY}`;
                    
                    const response = await fetch(appendUrl, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            values: [[email, new Date().toISOString()]]
                        })
                    });
                    
                    if (!response.ok) {
                        throw new Error('Failed to sync with Google Sheets');
                    }
                } else {
                    // Full sync of all emails
                    const unsubscribedEmails = JSON.parse(localStorage.getItem('permanentUnsubscribedEmails')) || [];
                    if (unsubscribedEmails.length === 0) return;
                    
                    // First clear existing data
                    const clearUrl = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}!A2:Z?key=${API_KEY}`;
                    const clearResponse = await fetch(clearUrl, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            values: []
                        })
                    });
                    
                    if (!clearResponse.ok) {
                        throw new Error('Failed to clear sheet data');
                    }
                    
                    // Then add all emails
                    const appendUrl = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}!A1:append?valueInputOption=USER_ENTERED&key=${API_KEY}`;
                    const values = unsubscribedEmails.map(email => [email, new Date().toISOString()]);
                    
                    const response = await fetch(appendUrl, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            values: values
                        })
                    });
                    
                    if (!response.ok) {
                        throw new Error('Failed to sync with Google Sheets');
                    }
                }
                
                document.getElementById('syncStatus').textContent = `Last sync: ${new Date().toLocaleString()}`;
                return true;
            } catch (error) {
                console.error('Error syncing with Google Sheets:', error);
                showSuccessMessage('Sync failed. Please try again.', false);
                return false;
            }
        }

        async function loadUnsubscribedEmails() {
            try {
                const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}!A2:B?key=${API_KEY}`;
                const response = await fetch(url);
                const data = await response.json();
                
                if (data.values) {
                    const emails = data.values.map(row => row[0].toLowerCase());
                    localStorage.setItem('permanentUnsubscribedEmails', JSON.stringify(emails));
                    document.getElementById('syncStatus').textContent = `Last sync: ${new Date().toLocaleString()}`;
                }
            } catch (error) {
                console.error('Error loading unsubscribed emails:', error);
                // Fallback to local storage if API fails
                const localEmails = JSON.parse(localStorage.getItem('permanentUnsubscribedEmails')) || [];
                if (localEmails.length > 0) {
                    document.getElementById('syncStatus').textContent = 'Using local data (sync failed)';
                }
            }
        }

        function deleteUnsubscribedEntries() {
            const outputContainer = document.getElementById('output');
            const paragraphs = outputContainer.querySelectorAll('p');
            const unsubscribedEmails = JSON.parse(localStorage.getItem('permanentUnsubscribedEmails')) || [];
            const deletedEmails = [];

            paragraphs.forEach(paragraph => {
                unsubscribedEmails.forEach(email => {
                    if (paragraph.innerHTML.includes(email)) {
                        paragraph.remove();
                        deletedEmails.push(email);
                    }
                });
            });

            if (deletedEmails.length > 0) {
                displayDeletedAddressesPopup(deletedEmails);
                showSuccessMessage(`Deleted ${deletedEmails.length} unsubscribed entries`);
            } else {
                showSuccessMessage('No unsubscribed entries found');
            }

            saveText();
        }

        function viewUnsubscribedEmails() {
            const unsubscribedEmails = JSON.parse(localStorage.getItem('permanentUnsubscribedEmails')) || [];
            if (unsubscribedEmails.length === 0) {
                alert('No unsubscribed emails found');
                return;
            }
            
            const emailList = unsubscribedEmails.join('\n');
            const win = window.open('', '_blank');
            win.document.write(`<pre>${emailList}</pre>`);
        }

        function showSuccessMessage(message, isSuccess = true) {
            const successMessage = document.getElementById('successMessage');
            successMessage.textContent = message;
            successMessage.style.color = isSuccess ? 'var(--accent-color)' : 'var(--danger-color)';
            successMessage.style.display = 'block';

            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 3000);
        }

        // Dear Professor Toggle Functions
        function toggleDearProfessor() {
            includeDearProfessor = document.getElementById('dearProfessorToggle').checked;
            localStorage.setItem('includeDearProfessor', includeDearProfessor);
            updateToggleLabel();
            processText();
        }

        function updateToggleLabel() {
            const label = document.getElementById('dearProfessorLabel');
            label.innerText = includeDearProfessor ? '✔ "Dear Professor"' : '✘ "Dear Professor"';
        }

        // Login/Logout Functions
        function login() {
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            if (username && password) {
                currentUser = `${username}_${password}`;
                document.getElementById('loginSection').style.display = 'none';
                document.getElementById('appContent').style.display = 'block';
                document.getElementById('userControls').style.display = 'flex';
                document.getElementById('loggedInUser').textContent = username;
                
                // Load saved preferences
                const savedDearProfessor = localStorage.getItem('includeDearProfessor');
                if (savedDearProfessor !== null) {
                    includeDearProfessor = savedDearProfessor === 'true';
                    document.getElementById('dearProfessorToggle').checked = includeDearProfessor;
                    updateToggleLabel();
                }
                
                loadText();
                initializeCountryToggles();
            } else {
                alert('Please enter both username and password.');
            }
        }

        function logout() {
            currentUser = null;
            document.getElementById('loginSection').style.display = 'block';
            document.getElementById('appContent').style.display = 'none';
            document.getElementById('userControls').style.display = 'none';
            document.getElementById('username').value = '';
            document.getElementById('password').value = '';
        }

        // Text Processing Functions
        function processText() {
            if (isProcessing) return;

            isProcessing = true;
            document.getElementById('loadingIndicator').style.display = 'inline';

            const inputText = document.getElementById('inputText').value;
            const paragraphs = inputText.split(/\n\s*\n/);
            totalParagraphs = paragraphs.length;
            const outputContainer = document.getElementById('output');
            const incompleteContainer = document.getElementById('incompleteText');
            outputContainer.innerHTML = '<p id="cursorStart">Place your cursor here</p>';
            incompleteContainer.value = '';

            let index = 0;
            const nonRussiaEntries = [];
            const russiaEntries = [];

            const gapOption = document.getElementById('gapOption').value;

            function processChunk() {
                const chunkSize = 10;
                const end = Math.min(index + chunkSize, paragraphs.length);
                for (; index < end; index++) {
                    let paragraph = paragraphs[index].trim();
                    if (paragraph !== '') {
                        const lines = paragraph.split('\n');
                        let firstLine = lines[0].trim();

                        // Ensure the first line starts with "Professor"
                        if (!firstLine.startsWith('Professor')) {
                            firstLine = `Professor ${firstLine}`;
                            lines[0] = firstLine;
                        }

                        let lastName = firstLine.split(' ').pop();

                        if (includeDearProfessor) {
                            const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
                            const emailLineIndex = lines.findIndex(line => emailRegex.test(line));
                            if (emailLineIndex !== -1) {
                                const greeting = `Dear Professor ${lastName},`;
                                if (gapOption === 'nil') {
                                    lines.splice(emailLineIndex + 1, 0, greeting);
                                } else {
                                    lines.splice(emailLineIndex + 1, 0, '', greeting);
                                }
                            }
                        }

                        let processedParagraph = lines.join('\n');
                        const highlightedText = highlightErrors(processedParagraph.replace(/\n/g, '<br>'));
                        const hasError = highlightedText.includes('error');

                        if (hasError) {
                            incompleteContainer.value += `${highlightedText.replace(/<br>/g, '\n').replace(/<[^>]+>/g, '')}\n\n`;
                        } else {
                            // Check if the paragraph's country is enabled
                            let countryFound = null;
                            countryList.forEach(country => {
                                if (paragraph.includes(country) && (countryToggleStates[country] !== false)) {
                                    countryFound = country;
                                }
                            });
                            
                            if (countryFound) {
                                const p = document.createElement('p');
                                p.innerHTML = highlightedText;

                                if (paragraph.includes('Russia')) {
                                    russiaEntries.push(p);
                                } else {
                                    nonRussiaEntries.push(p);
                                }
                            } else {
                                // Add to incomplete if country is disabled
                                incompleteContainer.value += `[Country disabled] ${highlightedText.replace(/<br>/g, '\n').replace(/<[^>]+>/g, '')}\n\n`;
                            }
                        }
                    }
                }
                if (index < paragraphs.length) {
                    requestAnimationFrame(processChunk);
                } else {
                    nonRussiaEntries.forEach(entry => outputContainer.appendChild(entry));
                    russiaEntries.forEach(entry => outputContainer.appendChild(entry));

                    updateCounts();
                    saveText();
                    document.getElementById('lockButton').style.display = 'inline-block';
                    document.getElementById('loadingIndicator').style.display = 'none';

                    // Automatically delete unsubscribed entries
                    const unsubscribedEmails = JSON.parse(localStorage.getItem('permanentUnsubscribedEmails')) || [];
                    if (unsubscribedEmails.length > 0) {
                        const deletedCount = deleteUnsubscribedEntries();
                        if (deletedCount > 0) {
                            showSuccessMessage(`Automatically deleted ${deletedCount} unsubscribed entries`);
                        }
                    }

                    isProcessing = false;
                }
            }
            requestAnimationFrame(processChunk);
        }

        function countOccurrences(text, word) {
            const regex = new RegExp(`\\b${word}\\b`, 'gi');
            return (text.match(regex) || []).length;
        }

        function countCountryOccurrences(text) {
            const lines = text.split('\n');
            const countryCounts = {};

            for (let i = 0; i < lines.length - 1; i++) {
                const line = lines[i].trim();
                const nextLine = lines[i + 1].trim();

                if (nextLine.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/)) {
                    countryList.forEach(country => {
                        if (line.includes(country)) {
                            countryCounts[country] = (countryCounts[country] || 0) + 1;
                        }
                    });
                }
            }
            return countryCounts;
        }

        function highlightErrors(text) {
            let modifiedText = text.replace(/\?/g, '<span class="error">?</span>');
            if (!text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/)) {
                modifiedText += ' <span class="error">Missing email</span>';
            }
            if (!countryList.some(country => text.includes(country))) {
                modifiedText += ' <span class="error">Missing country</span>';
            }
            return modifiedText;
        }

        function updateCounts() {
            const outputContainer = document.getElementById('output');
            const paragraphs = outputContainer.querySelectorAll('p');
            let adCount = 0;

            paragraphs.forEach(paragraph => {
                const firstLine = paragraph.innerText.split('\n')[0];
                if (firstLine.startsWith('To') || firstLine.startsWith('Professor')) {
                    adCount += 1;
                }
            });

            document.getElementById('totalAds').textContent = adCount;
            document.getElementById('dailyAdCount').textContent = dailyAdCount;

            const text = outputContainer.innerText;
            const countryCounts = countCountryOccurrences(text);
            const sortedCountries = Object.entries(countryCounts).sort((a, b) => b[1] - a[1]);
            
            updateProgressBar(dailyAdCount);
            updateRemainingTime(dailyAdCount);
        }

        function updateProgressBar(dailyAdCount) {
            const progressBar = document.getElementById('progressBar');
            const maxCount = 5000;

            const percentage = Math.min(dailyAdCount / maxCount, 1) * 100;
            progressBar.style.width = `${percentage}%`;

            const red = Math.max(255 - Math.floor((dailyAdCount / maxCount) * 255), 0);
            const green = Math.min(Math.floor((dailyAdCount / maxCount) * 255), 255);
            progressBar.style.backgroundColor = `rgb(${red},${green},0)`;
        }

        function updateRemainingTime(dailyAdCount) {
            const remainingEntries = totalParagraphs - dailyAdCount;
            const remainingTimeInMinutes = remainingEntries / 25;
            const remainingTimeInSeconds = remainingTimeInMinutes * 60;
            const hours = Math.floor(remainingTimeInSeconds / 3600);
            const minutes = Math.floor((remainingTimeInSeconds % 3600) / 60);

            const percentageCompleted = Math.min((dailyAdCount / totalParagraphs) * 100, 100).toFixed(2);

            document.getElementById('remainingTimeText').textContent = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
            document.getElementById('completionPercentage').textContent = `${percentageCompleted}%`;
        }

        function saveText() {
            const inputText = document.getElementById('inputText').value;
            const roughText = document.getElementById('roughText').value;
            const outputText = document.getElementById('output').innerHTML;
            const incompleteText = document.getElementById('incompleteText').value;
            if (currentUser) {
                localStorage.setItem(`savedInput_${currentUser}`, inputText);
                localStorage.setItem(`savedRough_${currentUser}`, roughText);
                localStorage.setItem(`savedOutput_${currentUser}`, outputText);
                localStorage.setItem(`savedIncomplete_${currentUser}`, incompleteText);
                localStorage.setItem(`dailyAdCount_${currentUser}`, dailyAdCount);
                localStorage.setItem(`lastCutTime_${currentUser}`, Date.now());
                localStorage.setItem(`totalParagraphs_${currentUser}`, totalParagraphs);
                saveEffectPreferences();
                saveOperationPreferences();
                saveFontPreferences();
                saveGapPreferences();
            }
        }

        function loadText() {
            if (currentUser) {
                const savedInput = localStorage.getItem(`savedInput_${currentUser}`);
                const savedRough = localStorage.getItem(`savedRough_${currentUser}`);
                const savedOutput = localStorage.getItem(`savedOutput_${currentUser}`);
                const savedIncomplete = localStorage.getItem(`savedIncomplete_${currentUser}`);
                const savedDailyAdCount = localStorage.getItem(`dailyAdCount_${currentUser}`);
                const lastCutTime = localStorage.getItem(`lastCutTime_${currentUser}`);
                const savedTotalParagraphs = localStorage.getItem(`totalParagraphs_${currentUser}`);
                const savedFontStyle = localStorage.getItem(`fontStyle_${currentUser}`);
                const savedFontSize = localStorage.getItem(`fontSize_${currentUser}`);
                const savedGapOption = localStorage.getItem(`gapOption_${currentUser}`);

                if (savedInput) document.getElementById('inputText').value = savedInput;
                if (savedRough) document.getElementById('roughText').value = savedRough;
                if (savedOutput) document.getElementById('output').innerHTML = savedOutput;
                if (savedIncomplete) document.getElementById('incompleteText').value = savedIncomplete;
                
                if (savedDailyAdCount && lastCutTime) {
                    const lastCutDate = new Date(parseInt(lastCutTime, 10));
                    const currentDate = new Date();
                    if (lastCutDate.toDateString() === currentDate.toDateString()) {
                        dailyAdCount = parseInt(savedDailyAdCount, 10);
                    }
                }
                
                if (savedTotalParagraphs) totalParagraphs = parseInt(savedTotalParagraphs, 10);
                if (savedFontStyle) document.getElementById('fontStyle').value = savedFontStyle;
                if (savedFontSize) document.getElementById('fontSize').value = savedFontSize;
                if (savedGapOption) document.getElementById('gapOption').value = savedGapOption;
                
                loadEffectPreferences();
                loadOperationPreferences();
                updateCounts();
                updateFont();
            }
        }

        function saveFontPreferences() {
            const fontStyle = document.getElementById('fontStyle').value;
            const fontSize = document.getElementById('fontSize').value;
            if (currentUser) {
                localStorage.setItem(`fontStyle_${currentUser}`, fontStyle);
                localStorage.setItem(`fontSize_${currentUser}`, fontSize);
            }
        }

        function updateFont() {
            const fontStyle = document.getElementById('fontStyle').value;
            const fontSize = document.getElementById('fontSize').value;
            document.getElementById('output').style.fontFamily = fontStyle;
            document.getElementById('output').style.fontSize = `${fontSize}px`;
            saveFontPreferences();
        }

        function saveGapPreferences() {
            const gapOption = document.getElementById('gapOption').value;
            if (currentUser) {
                localStorage.setItem(`gapOption_${currentUser}`, gapOption);
            }
        }

        function saveEffectPreferences() {
            const effectsEnabled = document.getElementById('effectsToggle').checked;
            const effectType = document.getElementById('effectType').value;
            if (currentUser) {
                localStorage.setItem(`effectsEnabled_${currentUser}`, effectsEnabled);
                localStorage.setItem(`effectType_${currentUser}`, effectType);
            }
        }

        function loadEffectPreferences() {
            const savedEffectsEnabled = localStorage.getItem(`effectsEnabled_${currentUser}`);
            const savedEffectType = localStorage.getItem(`effectType_${currentUser}`);
            if (savedEffectsEnabled) {
                document.getElementById('effectsToggle').checked = savedEffectsEnabled === 'true';
            }
            if (savedEffectType) {
                document.getElementById('effectType').value = savedEffectType;
            }
        }

        function saveOperationPreferences() {
            const selectedOption = document.querySelector('input[name="cutOption"]:checked').value;
            if (currentUser) {
                localStorage.setItem(`operationMode_${currentUser}`, selectedOption);
            }
        }

        function loadOperationPreferences() {
            const savedOperationMode = localStorage.getItem(`operationMode_${currentUser}`);
            if (savedOperationMode) {
                document.querySelector(`input[name="cutOption"][value="${savedOperationMode}"]`).checked = true;
            }
        }

        function clearMemory() {
            const password = prompt('Please enter the password to clear memory:');
            if (password === 'cleanall0') {
                localStorage.clear();
                alert('Memory cleared!');
                location.reload();
            } else {
                alert('Incorrect password. Memory not cleared.');
            }
        }

        function copyIncompleteEntries() {
            const incompleteText = document.getElementById('incompleteText').value;
            navigator.clipboard.writeText(incompleteText)
                .then(() => showSuccessMessage('Incomplete entries copied to clipboard!'))
                .catch(() => showSuccessMessage('Failed to copy text', false));
        }

        function displayDeletedAddressesPopup(deletedEmails) {
            let currentIndex = 0;

            const popup = document.createElement('div');
            popup.style.cssText = `
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background-color: #2c3e50;
                color: white;
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
                z-index: 1000;
                text-align: center;
                max-width: 80%;
                max-height: 80%;
                overflow: auto;
            `;

            const message = document.createElement('div');
            message.style.fontSize = '18px';
            message.style.marginBottom = '15px';
            message.textContent = `Deleted Address ${currentIndex + 1} of ${deletedEmails.length}: ${deletedEmails[currentIndex]}`;

            const navigation = document.createElement('div');
            navigation.style.margin = '10px 0';
            navigation.style.display = 'flex';
            navigation.style.gap = '10px';

            const prevButton = document.createElement('button');
            prevButton.textContent = 'Previous';
            prevButton.disabled = currentIndex === 0;
            prevButton.style.padding = '5px 10px';

            const nextButton = document.createElement('button');
            nextButton.textContent = 'Next';
            nextButton.disabled = currentIndex === deletedEmails.length - 1;
            nextButton.style.padding = '5px 10px';

            navigation.appendChild(prevButton);
            navigation.appendChild(nextButton);

            const okButton = document.createElement('button');
            okButton.textContent = 'OK';
            okButton.style.marginTop = '10px';
            okButton.style.padding = '8px 20px';
            okButton.style.backgroundColor = '#28a745';
            okButton.style.color = 'white';
            okButton.style.border = 'none';
            okButton.style.borderRadius = '5px';
            okButton.style.cursor = 'pointer';

            okButton.addEventListener('click', () => {
                popup.remove();
            });

            prevButton.addEventListener('click', () => {
                if (currentIndex > 0) {
                    currentIndex--;
                    message.textContent = `Deleted Address ${currentIndex + 1} of ${deletedEmails.length}: ${deletedEmails[currentIndex]}`;
                    nextButton.disabled = currentIndex === deletedEmails.length - 1;
                    prevButton.disabled = currentIndex === 0;
                }
            });

            nextButton.addEventListener('click', () => {
                if (currentIndex < deletedEmails.length - 1) {
                    currentIndex++;
                    message.textContent = `Deleted Address ${currentIndex + 1} of ${deletedEmails.length}: ${deletedEmails[currentIndex]}`;
                    prevButton.disabled = currentIndex === 0;
                    nextButton.disabled = currentIndex === deletedEmails.length - 1;
                }
            });

            popup.appendChild(message);
            popup.appendChild(navigation);
            popup.appendChild(okButton);
            document.body.appendChild(popup);
        }
    </script>
</body>
</html>
