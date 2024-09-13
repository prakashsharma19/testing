<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Entry Workspace</title>
    <style>
        /* Basic styling for a professional look */
        body {
            font-family: 'Arial', sans-serif;
            margin: 20px;
            background-color: #f4f4f9;
        }

        h2 {
            color: #333;
        }

        /* Fullscreen mode for processed text */
        #outputContainer.fullscreen {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            z-index: 999;
            background-color: #fff;
        }

        /* Styling for the login modal */
        #loginModal {
            display: none;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            padding: 20px;
            background-color: white;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
            z-index: 1000;
        }

        /* Page Full-Screen Button */
        #toggleFullScreen {
            background-color: #1E90FF;
            color: white;
            padding: 5px 10px;
            cursor: pointer;
            border-radius: 5px;
        }

        /* Add more button and font styles */
        button {
            background-color: #1E90FF;
            color: white;
            border: none;
            padding: 10px 15px;
            cursor: pointer;
            margin-right: 5px;
        }

        button:hover {
            opacity: 0.9;
        }

        /* Button to toggle processed box fullscreen */
        #outputFullScreenBtn {
            position: fixed;
            top: 10px;
            right: 50px;
            z-index: 1001;
        }

        /* Username display */
        #usernameDisplay {
            position: fixed;
            top: 10px;
            right: 20px;
            font-size: 18px;
            color: #333;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <h2>Entry Workspace</h2>

    <!-- Login Modal -->
    <div id="loginModal">
        <h3>Login</h3>
        <label for="usernameInput">Enter your username:</label>
        <input type="text" id="usernameInput">
        <button onclick="login()">Submit</button>
    </div>

    <!-- Text input and processing buttons -->
    <textarea id="textInput" placeholder="Paste your text here..."></textarea>
    <br>
    <button class="green" onclick="cleanText()">Fix Text</button>
    <button class="blue" onclick="advancedFixText()">Advanced Fix</button>
    <button id="copyButton" onclick="copyText()">Copy</button>
    <button class="lock" onclick="toggleLock()">Lock</button>
    <button id="toggleFullScreen" onclick="toggleFullScreen()">Full Screen</button>
    <button id="outputFullScreenBtn" onclick="toggleOutputFullScreen()">Processed Box Full Screen</button>

    <div id="entryCount">Total Entries: 0</div>
    <div id="todaysEntry">Today's Entries: 0</div>

    <div id="outputContainer" contenteditable="true"></div>
    <div id="usernameDisplay"></div>

    <!-- Font options and text customization -->
    <div id="fontOptions">
        <label for="fontSelect">Font:</label>
        <select id="fontSelect" onchange="changeFont()">
            <option value="Arial, sans-serif">Arial</option>
            <option value="Courier New, monospace">Courier New</option>
            <option value="'Georgia', serif">Georgia</option>
            <!-- Add more fonts here -->
        </select>

        <label for="fontSize">Size:</label>
        <input type="number" id="fontSize" value="18" min="10" max="40" onchange="changeFontSize()">
    </div>

    <script>
        let username = localStorage.getItem('username');
        let totalEntries = parseInt(localStorage.getItem('totalEntries')) || 0;
        let todaysEntries = parseInt(localStorage.getItem('todaysEntries')) || 0;

        // Show the login modal if username is not set
        if (!username) {
            document.getElementById('loginModal').style.display = 'block';
        } else {
            document.getElementById('usernameDisplay').textContent = `Welcome, ${username}`;
        }

        // Handle login and save username
        function login() {
            const usernameInput = document.getElementById('usernameInput').value;
            if (usernameInput) {
                localStorage.setItem('username', usernameInput);
                document.getElementById('usernameDisplay').textContent = `Welcome, ${usernameInput}`;
                document.getElementById('loginModal').style.display = 'none';
            }
        }

        // Toggle full-screen mode for the page
        function toggleFullScreen() {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen();
            } else {
                document.exitFullscreen();
            }
        }

        // Toggle full-screen mode for processed text box
        function toggleOutputFullScreen() {
            const outputContainer = document.getElementById('outputContainer');
            outputContainer.classList.toggle('fullscreen');
        }

        // Insert "Professor" when "qq" is typed
        document.getElementById('outputContainer').addEventListener('keydown', function(event) {
            const text = event.target.innerText;
            if (event.key === 'q' && text.endsWith('q')) {
                event.preventDefault();
                document.execCommand('insertText', false, 'Professor');
            }
        });

        // Detect cut and increase "Today's Entries"
        document.getElementById('outputContainer').addEventListener('cut', function(event) {
            const selection = window.getSelection().toString();
            if (selection.match(/\S+@\S+\.\S+/)) {
                todaysEntries++;
                localStorage.setItem('todaysEntries', todaysEntries);
                document.getElementById('todaysEntry').textContent = `Today's Entries: ${todaysEntries}`;
            }
        });

        // Handle font changes
        function changeFont() {
            const font = document.getElementById("fontSelect").value;
            document.getElementById("outputContainer").style.fontFamily = font;
        }

        // Handle font size changes
        function changeFontSize() {
            const fontSize = document.getElementById("fontSize").value;
            document.getElementById("outputContainer").style.fontSize = fontSize + "px";
        }
    </script>
</body>
</html>
