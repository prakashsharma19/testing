<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Advertisements-PPH</title>
    <style>
        body {
            font-family: 'Helvetica Neue', Arial, sans-serif;
            background-color: #f4f4f4;
            padding: 20px;
            margin: 0;
            color: #333;
            position: relative;
        }

        h1 {
            color: #1171ba;
            text-align: center;
            margin-bottom: 30px;
            font-size: 28px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        h1 img {
            margin-right: 10px;
            height: 28px;
        }

        .font-controls,
        .login-container {
            background-color: #ffffff;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            margin-bottom: 20px;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            width: 100%;
        }

        .font-controls .control-group {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            gap: 10px;
        }

        .font-controls label {
            margin-right: 10px;
            font-weight: bold;
            color: #2c3e50;
        }

        .font-controls select,
        .font-controls input {
            border-radius: 5px;
            padding: 5px;
            border: 1px solid #e0e0e0;
            font-size: 14px;
        }

        .font-controls input[type="number"] {
            width: 50px;
        }

        .fullscreen-button {
            background-color: #1171ba;
            border: none;
            color: white;
            padding: 10px 15px;
            font-size: 16px;
            cursor: pointer;
            border-radius: 5px;
            margin-top: 10px;
            width: 100%;
        }

        .fullscreen-button:hover {
            background-color: #0e619f;
        }

        .clear-memory-button {
            background-color: red;
            color: white;
            padding: 10px 15px;
            font-size: 16px;
            cursor: pointer;
            border-radius: 5px;
            border: none;
            position: absolute;
            top: 20px;
            left: 20px;
        }

        .clear-memory-button:hover {
            background-color: darkred;
        }

        .text-container {
            background-color: #ffffff;
            padding: 15px;
            border: 1px solid #e0e0e0;
            border-radius: 8px;
            white-space: pre-wrap;
            position: relative;
            margin-top: 20px;
            z-index: 2;
        }

        .text-container p {
            margin: 0 0 10px;
            border-bottom: 1px solid #e0e0e0;
            line-height: 1.5;
        }

        /* Toggle Switch Style */
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
            transition: 0.4s;
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
            transition: 0.4s;
            border-radius: 50%;
        }

        input:checked + .slider {
            background-color: #1171ba;
        }

        input:checked + .slider:before {
            transform: translateX(26px);
        }

        .toggle-container {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 10px;
        }

        #dearProfessorLabel {
            font-size: 14px;
            color: #333;
        }

        #undoButton,
        #lockButton {
            border: none;
            color: white;
            padding: 10px 15px;
            font-size: 16px;
            cursor: pointer;
            border-radius: 5px;
            transition: background-color 0.3s, transform 0.1s ease;
            margin-top: 10px;
            width: 100%;
        }

        #loginButton {
            background-color: #007bff;
            margin-top: 10px;
            font-size: 16px;
            border: none;
            color: white;
            padding: 10px 15px;
            cursor: pointer;
            border-radius: 5px;
            transition: background-color 0.3s ease;
        }

        #loginButton:hover {
            background-color: #0056b3;
        }

        #loginButton:active {
            transform: scale(0.95);
        }

        #lockButton {
            background-color: #1171ba;
        }

        #lockButton.locked {
            background-color: #d9534f;
        }

        #lockButton:hover {
            background-color: #0e619f;
        }

        #undoButton {
            background-color: #1171ba;
        }

        .input-container {
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;
            flex-direction: column;
            align-items: center;
        }

        .input-container textarea {
            width: 100%;
            border-radius: 5px;
            padding: 10px;
            font-size: 16px;
            border: 1px solid #e0e0e0;
            margin-top: 10px;
        }

        .input-container .container-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            cursor: pointer;
            background-color: #1171ba;
            color: white;
            padding: 10px;
            border-radius: 5px;
        }

        .rough-container {
            width: 30%;
            margin-left: 0%;
        }

        .input-boxes {
            display: none;
        }

        #okButton {
            align-self: flex-end;
            background-color: #28a745;
            border: none;
            color: white;
            padding: 10px 20px;
            font-size: 14px;
            cursor: pointer;
            border-radius: 5px;
            margin-top: 10px;
        }

        #okButton:hover {
            background-color: #218838;
        }

        #adCount,
        #dailyAdCount,
        #remainingTime,
        #countryCount {
            margin-top: 15px;
            font-size: 18px;
            font-weight: bold;
            color: #2c3e50;
        }

        #loadingIndicator {
            color: red;
            margin-left: 10px;
            font-size: 16px;
            font-weight: bold;
            display: none;
        }

        #remainingTime .hourglass {
            vertical-align: middle;
        }

        #countryCount {
            position: absolute;
            left: 20px;
            top: 250px;
            font-size: 16px;
            font-weight: bold;
            line-height: 1.5;
            color: #34495e;
            max-height: 400px;
            overflow-y: auto;
            width: 250px;
            background: white;
            padding: 10px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        #userControls {
            position: absolute;
            top: 20px;
            right: 20px;
            font-size: 16px;
            color: #34495e;
            display: flex;
            align-items: center;
        }

        #userControls img {
            margin-right: 10px;
            height: 28px;
        }

        #userControls span {
            margin-right: 10px;
            font-weight: bold;
        }

        #logoutButton {
            background-color: #e74c3c;
            border: none;
            color: white;
            padding: 5px 10px;
            font-size: 14px;
            cursor: pointer;
            border-radius: 5px;
        }

        #logoutButton:hover {
            background-color: #c0392b;
        }

        .error {
            color: #e74c3c;
            font-weight: bold;
            font-style: italic;
        }

        .highlight-added {
            background-color: #f4e542;
        }

        .login-container input {
            width: 100%;
            margin: 5px 0;
            padding: 10px;
            font-size: 16px;
            border: 1px solid #e0e0e0;
            border-radius: 5px;
        }

        .hourglass {
            width: 24px;
            height: 24px;
            background-image: url('https://upload.wikimedia.org/wikipedia/commons/4/4e/Simpleicons_Interface_hourglass.svg');
            background-size: cover;
            display: inline-block;
            margin-left: 10px;
        }

        .top-controls {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            gap: 10px;
            flex-wrap: wrap;
        }

        .right-content {
            position: absolute;
            top: 250px;
            right: 20px;
            width: 150px;
        }

        #currentTime {
            font-size: 16px;
            font-weight: bold;
            color: #2c3e50;
            margin-bottom: 10px;
            text-align: right;
        }

        #remainingTimeText {
            font-size: 18px;
            font-weight: bold;
            color: #2c3e50;
            margin-bottom: 10px;
            text-align: right;
        }

        .reminder-heading {
            font-size: 16px;
            font-weight: bold;
            color: #2c3e50;
            margin-bottom: 10px;
            text-align: right;
        }

        .reminder-slots {
            list-style-type: none;
            padding: 0;
            margin: 0;
            text-align: right;
        }

        .reminder-slots li {
            background-color: #d3eaf7;
            color: #333;
            padding: 5px;
            border-radius: 5px;
            margin-bottom: 5px;
            cursor: pointer;
            font-size: 12px;
            transition: background-color 0.3s;
        }

        .reminder-slots li:hover,
        .reminder-slots li.selected {
            background-color: #1171ba;
            color: white;
        }

        .popup {
            display: none;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            padding: 30px;
            background-color: #2c3e50;
            color: white;
            border: 2px solid #e74c3c;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
            z-index: 1000;
            text-align: center;
            font-size: 24px;
            font-weight: bold;
        }

        .popup button {
            background-color: #e74c3c;
            border: none;
            color: white;
            padding: 15px 30px;
            font-size: 18px;
            cursor: pointer;
            border-radius: 5px;
            transition: background-color 0.3s, transform 0.1s ease;
            margin-top: 20px;
        }

        .popup button:hover {
            background-color: #c0392b;
        }

        .popup button:active {
            transform: scale(0.95);
        }

        .popup img {
            width: 50px;
            height: 50px;
            margin-bottom: 20px;
        }

        .problem-heading {
            color: #e74c3c;
            font-style: italic;
            margin-top: 10px;
            font-size: 16px;
            font-weight: bold;
        }

        .reminder-note {
            font-style: italic;
            font-size: 12px;
            text-align: right;
            margin-top: 5px;
            color: #333;
        }

        /* Progress bar */
        .progress-bar-container {
            width: 100%;
            height: 5px;
            background-color: #e0e0e0;
            border-radius: 5px;
            margin-top: 20px;
            overflow: hidden;
        }

        .progress-bar {
            height: 100%;
            width: 0;
            background-color: #f00;
            transition: width 0.5s ease-in-out, background-color 0.5s ease-in-out;
        }

        .scroll-locked {
            overflow: hidden;
        }

        .scroll-lock-notice {
            position: fixed;
            bottom: 10px;
            left: 10px;
            background-color: #e74c3c;
            color: white;
            padding: 10px;
            border-radius: 5px;
            z-index: 10000;
            font-size: 14px;
            display: none;
        }

        /* Animations */
        @keyframes fadeOut {
            0% {
                opacity: 1;
            }

            100% {
                opacity: 0;
            }
        }

        @keyframes vanish {
            0% {
                transform: scale(1);
                opacity: 1;
            }

            100% {
                transform: scale(0);
                opacity: 0;
            }
        }

        @keyframes explode {
            0% {
                transform: scale(1);
                opacity: 1;
            }

            100% {
                transform: scale(3);
                opacity: 0;
            }
        }

        .fadeOut {
            animation: fadeOut 0.3s forwards;
        }

        .vanish {
            animation: vanish 0.3s forwards;
        }

        .explode {
            animation: explode 0.3s forwards;
        }

        .highlight-added {
            background-color: #f4e542;
        }

        /* Credit Section */
        #credit {
            position: fixed;
            bottom: 10px;
            right: 10px;
            font-size: 12px;
            color: #34495e;
        }

        #credit a {
            color: #1171ba;
            text-decoration: none;
        }

        #credit a:hover {
            text-decoration: underline;
        }

        /* Right Sidebar for Buttons */
        #rightSidebar {
            margin-top: 20px;
            display: flex;
            flex-direction: column;
            gap: 10px;
            align-items: flex-end;
            z-index: 999;
        }

        /* Options in the font control pane */
        .gap-control {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            margin-top: 10px;
        }

        /* Country Toggle Styles */
        .country-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 5px;
            padding: 5px;
            border-bottom: 1px solid #eee;
        }
        
        .country-name {
            flex-grow: 1;
        }
        
        .country-count {
            font-weight: bold;
            margin: 0 10px;
            min-width: 30px;
            text-align: right;
        }
        
        .country-toggle {
            margin-left: 10px;
        }
        
        .country-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;
            padding-bottom: 5px;
            border-bottom: 2px solid #1171ba;
        }
        
        .country-header h3 {
            margin: 0;
        }
        
        .country-header button {
            background: #1171ba;
            color: white;
            border: none;
            padding: 3px 8px;
            border-radius: 3px;
            cursor: pointer;
        }

        /* Unsubscribe Section Styles */
        .unsubscribe-section {
            background: white;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            margin-bottom: 20px;
        }
        
        .unsubscribe-controls {
            display: flex;
            gap: 10px;
            margin-top: 10px;
        }
        
        .unsubscribe-controls input {
            flex-grow: 1;
            padding: 8px;
            border: 1px solid #ddd;
            border-radius: 4px;
        }
        
        .unsubscribe-controls button {
            padding: 8px 15px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-weight: bold;
        }
        
        .save-btn {
            background: #28a745;
            color: white;
        }
        
        .delete-btn {
            background: #dc3545;
            color: white;
        }
        
        .view-btn {
            background: #17a2b8;
            color: white;
        }
        
        .sync-btn {
            background: #ffc107;
            color: #212529;
        }
        
        .success-message {
            color: #28a745;
            font-weight: bold;
            margin-top: 10px;
            display: none;
        }
        
        .sync-status {
            font-size: 12px;
            color: #6c757d;
            margin-top: 5px;
        }

        /* Highlight for unsubscribed emails */
        .highlight-unsubscribed {
            background-color: #ffcccc;
            padding: 2px;
            border-radius: 3px;
        }
    </style>
</head>

<body>
    <h1>
        <img src="https://raw.githubusercontent.com/prakashsharma19/hosted-images/main/pphlogo.png" alt="PPH Logo">
        Advertisements-PPH
    </h1>

    <!-- Clear memory button -->
    <button class="clear-memory-button" onclick="clearMemory()">Clear Memory</button>

    <!-- User Controls in upper-right corner -->
    <div id="userControls" style="display: none;">
        <img src="https://raw.githubusercontent.com/prakashsharma19/hosted-images/main/pphlogo.png" alt="PPH Logo">
        <span id="loggedInUser"></span>
        <button id="logoutButton" onclick="logout()">Logout</button>
    </div>

    <div class="login-container">
        <input type="text" id="username" placeholder="Enter your name">
        <input type="password" id="password" placeholder="Enter your password">
        <button id="loginButton" onclick="login()">Login</button>
    </div>

    <div class="font-controls" style="display:none;">
        <div class="control-group">
            <div>
                <label>
                    <input type="radio" name="cutOption" value="keyboard" checked>
                    Keyboard
                </label>
                <label>
                    <input type="radio" name="cutOption" value="mouse">
                    Mouse
                </label>
            </div>

            <div>
                <label for="effectsToggle">Effects:</label>
                <input type="checkbox" id="effectsToggle" onchange="saveEffectPreferences()">
            </div>

            <div>
                <label for="effectType">Effect:</label>
                <select id="effectType" onchange="saveEffectPreferences()">
                    <option value="none">None</option>
                    <option value="fadeOut">Fade Out</option>
                    <option value="vanish">Vanish</option>
                    <option value="explode">Explode</option>
                </select>
            </div>

            <div>
                <label for="fontStyle">Font:</label>
                <select id="fontStyle" onchange="updateFont()">
                    <option value="Arial">Arial</option>
                    <option value="Times New Roman">Times New Roman</option>
                    <option value="Courier New">Courier New</option>
                    <option value="Georgia">Georgia</option>
                    <option value="Calibri Light">Calibri Light</option>
                </select>
            </div>

            <div>
                <label for="fontSize">Size:</label>
                <input type="number" id="fontSize" value="16" onchange="updateFont()">px
            </div>

            <div class="gap-control">
                <label for="gapOption">Gap:</label>
                <select id="gapOption" onchange="saveGapPreferences()">
                    <option value="default">Default</option>
                    <option value="nil">Nil</option>
                </select>
            </div>
        </div>
    </div>

    <!-- Unsubscribe Section -->
    <div class="unsubscribe-section" style="display:none;">
        <div class="country-header">
            <h3>Unsubscribe Management</h3>
        </div>
        <div class="unsubscribe-controls">
            <input type="email" id="unsubscribedEmail" placeholder="Enter email to unsubscribe">
            <button class="save-btn" onclick="saveUnsubscribedEmail()">Save</button>
            <button class="delete-btn" onclick="deleteUnsubscribedEntries()">Delete</button>
            <button class="view-btn" onclick="viewUnsubscribedEmails()">View List</button>
            <button class="sync-btn" onclick="syncWithGoogleSheets()">Sync Now</button>
        </div>
        <div id="successMessage" class="success-message"></div>
        <div id="syncStatus" class="sync-status">Last sync: Never</div>
    </div>

    <div class="toggle-container" style="display:none;">
        <label class="switch">
            <input type="checkbox" id="dearProfessorToggle" onchange="toggleDearProfessor()">
            <span class="slider round"></span>
        </label>
        <span id="dearProfessorLabel">Include "Dear Professor"</span>
    </div>

    <div class="input-container" style="display:none;">
        <div class="container-header" onclick="toggleBox('pasteBox')">
            Paste your text here
            <span id="pasteBoxToggle">[+]</span>
        </div>
        <div id="pasteBox" class="input-boxes">
            <textarea id="inputText" rows="5" placeholder="Paste your text here..."></textarea>
            <button id="okButton" onclick="processText()">Process</button>
        </div>
    </div>

    <!-- Incomplete Entries Box -->
    <div class="input-container" style="display:none;">
        <div class="container-header" onclick="toggleBox('incompleteBox')">
            Incomplete Entries/Removed Countries
            <span id="incompleteBoxToggle">[+]</span>
        </div>
        <div id="incompleteBox" class="input-boxes">
            <textarea id="incompleteText" rows="5" placeholder="Incomplete entries will be shown here..."></textarea>
            <button onclick="copyIncompleteEntries()">Copy</button>
        </div>
    </div>

    <div class="input-container" style="display:none;">
        <div class="container-header" onclick="toggleBox('roughBox')">
            Rough Work
            <span id="roughBoxToggle">[+]</span>
        </div>
        <div id="roughBox" class="input-boxes rough-container">
            <textarea id="roughText" rows="5" placeholder="Rough Work..."></textarea>
        </div>
    </div>

    <div class="top-controls" style="display:none;">
        <div id="remainingTime">File completed by: <span id="remainingTimeText"></span> (<span id="completionPercentage">0%</span>)
            <div class="hourglass"></div>
        </div>
    </div>

    <div id="adCount" style="display:none;">
        Total Advertisements: <span id="totalAds">0</span>
        <span id="loadingIndicator">Processing, please wait...</span>
    </div>
    <div id="dailyAdCount" style="display:none;">Total Ads Sent Today: 0</div>
    <div class="progress-bar-container">
        <div class="progress-bar" id="progressBar"></div>
    </div>
    <div id="countryCount" style="display:none;">
        <div class="country-header">
            <h3>Country Processing</h3>
            <button onclick="toggleAllCountries()">Toggle All</button>
        </div>
        <div id="countryListContainer"></div>
    </div>

    <div id="output" class="text-container" style="display:none;" contenteditable="true">
        <p id="cursorStart">Place your cursor here</p>
    </div>

    <div class="right-content">
        <div id="currentTime"></div>
        <div class="reminder-heading">Ad Slots:</div>
        <ul class="reminder-slots">
            <li data-time="09:00">9:00-9:30 AM</li>
            <li data-time="10:35">10:35-10:45 AM</li>
            <li data-time="11:50">11:50-12:00 PM</li>
            <li data-time="13:05">1:05-1:10 PM</li>
            <li data-time="14:20">2:20-2:30 PM</li>
            <li data-time="15:40">3:40-3:45 PM</li>
            <li data-time="16:50">4:50-5:00 PM</li>
        </ul>
        <div class="reminder-note">(Select your slots to get reminder)</div>

        <!-- Button Container -->
        <div id="rightSidebar" style="display:none;">
            <button class="fullscreen-button" onclick="toggleFullScreen()">Full Screen</button>
            <button id="undoButton" style="display:none;" onclick="undoLastCut()">Undo Last Cut</button>
            <button id="lockButton" onclick="toggleLock()">Lock</button>
        </div>
    </div>

    <div id="reminderPopup" class="popup">
        <span style="font-size: 50px;">⏰</span>
        <p>Send Ads</p>
        <button onclick="dismissPopup()">OK</button>
    </div>

    <!-- Scroll Lock Notice -->
    <div id="scrollLockNotice" class="scroll-lock-notice">Scrolling is locked. Unlock to scroll.</div>

    <!-- Credit Section -->
    <div id="credit">
        This Web-App is Developed by <a href="https://prakashsharma19.github.io/prakash/" target="_blank">Prakash</a>
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
            updateTime();
            setInterval(updateTime, 1000);
            
            if (Notification.permission !== 'granted') {
                Notification.requestPermission();
            }
            
            // Load unsubscribed emails on startup
            loadUnsubscribedEmails();
        });

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
                        <label class="switch country-toggle">
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
            successMessage.style.color = isSuccess ? '#28a745' : '#dc3545';
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

        // Rest of your existing functions (clearMemory, processText, etc.) go here
        // ... [Previous JavaScript code remains the same until the login function]

        function login() {
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            if (username && password) {
                currentUser = `${username}_${password}`;
                document.querySelector('.login-container').style.display = 'none';
                document.querySelector('.font-controls').style.display = 'block';
                document.querySelectorAll('.input-container').forEach(container => container.style.display = 'block');
                document.querySelector('.top-controls').style.display = 'flex';
                document.getElementById('adCount').style.display = 'block';
                document.getElementById('dailyAdCount').style.display = 'block';
                document.getElementById('remainingTime').style.display = 'block';
                document.getElementById('countryCount').style.display = 'block';
                document.getElementById('output').style.display = 'block';
                document.getElementById('userControls').style.display = 'flex';
                document.querySelector('.unsubscribe-section').style.display = 'block';
                document.querySelector('.toggle-container').style.display = 'flex';
                document.getElementById('loggedInUser').innerText = username;
                
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

        // ... [Rest of your existing JavaScript functions]

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

        // ... [All other existing functions remain the same]

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

        // ... [All other existing functions remain the same]
    </script>
</body>
</html>
