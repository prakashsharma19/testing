<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Entry Workspace</title>
    <style>
        /* (Existing styles here) */
    </style>
</head>
<body>
    <h2>Entry Workspace</h2>
    <textarea id="textInput" placeholder="Paste your text here..."></textarea>
    <br>
    <button class="green" onclick="cleanText()">Fix Text</button>
    <button class="blue" onclick="advancedFixText()">Advanced Fix</button>
    <button id="copyButton" onclick="copyText()">Copy</button>
    <button class="lock" onclick="toggleLock()">Lock</button>
    <button id="fullPage" onclick="toggleFullScreen()">Full Screen</button>
    <button id="exitFullScreen" onclick="exitFullScreen()">Exit Full Screen</button>
    <div id="entryCount">Total Entries: 0</div>
    <div id="todaysEntry">Today's Entries: 0</div>
    <br><br>
    <div id="outputContainer" contenteditable="true"></div>

    <div id="fontOptions">
        <label for="fontSelect">Font:</label>
        <select id="fontSelect" onchange="changeFont()">
            <option value="'Times New Roman', serif">Times New Roman</option>
            <option value="Arial, sans-serif">Arial</option>
            <option value="Courier New, monospace">Courier New</option>
        </select>

        <label for="fontSize">Size:</label>
        <input type="number" id="fontSize" value="18" min="10" max="40" onchange="changeFontSize()">
    </div>

    <div id="customRemoveSection">
        <label for="removeText">Enter text to remove:</label>
        <input type="text" id="removeText" placeholder="Enter text to remove">
        <button onclick="removeCustomText()">Delete</button>
    </div>

    <script>
        // (Existing code)

        // Add handling for custom selection based on punctuation
        document.addEventListener('keydown', function(event) {
            if (event.ctrlKey && event.shiftKey && (event.key === "ArrowLeft" || event.key === "ArrowRight")) {
                handlePunctuationSelection(event.key);
            }
        });

        function handlePunctuationSelection(direction) {
            const outputContainer = document.getElementById('outputContainer');
            const selection = window.getSelection();
            const range = selection.getRangeAt(0);
            const textContent = outputContainer.textContent;

            let cursorPos = range.startOffset;
            if (direction === "ArrowLeft") {
                // Select text until a punctuation or space is found
                while (cursorPos > 0 && !isPunctuation(textContent[cursorPos - 1])) {
                    cursorPos--;
                }
            } else if (direction === "ArrowRight") {
                // Select text until the next punctuation or space is found
                while (cursorPos < textContent.length && !isPunctuation(textContent[cursorPos])) {
                    cursorPos++;
                }
            }

            range.setStart(outputContainer.firstChild, cursorPos);
            selection.removeAllRanges();
            selection.addRange(range);
        }

        function isPunctuation(char) {
            const punctuation = /[.,!?;:]/;
            return punctuation.test(char);
        }

        // Email navigation using Ctrl + Q
        document.addEventListener('keydown', function(event) {
            if (event.ctrlKey && event.key === 'q') {
                event.preventDefault(); // Prevent the default action for Ctrl+Q
                navigateToNextEmail();
            }
        });

        let lastEmailIndex = 0; // Keep track of the last selected email

        function navigateToNextEmail() {
            const outputContainer = document.getElementById('outputContainer');
            const emails = outputContainer.innerHTML.match(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}\b/gi);
            
            if (emails && emails.length > 0) {
                lastEmailIndex = (lastEmailIndex + 1) % emails.length; // Loop over the emails

                const email = emails[lastEmailIndex];
                highlightEmail(email);
            }
        }

        function highlightEmail(email) {
            const outputContainer = document.getElementById('outputContainer');
            const highlightedContent = outputContainer.innerHTML.replace(/<span class="highlight">([^<]*)<\/span>/gi, '$1'); // Remove previous highlights
            outputContainer.innerHTML = highlightedContent.replace(email, `<span class="highlight">${email}</span>`); // Highlight the current email
        }

        // Track email deletions and update today's entries
        document.addEventListener('keydown', function(event) {
            if ((event.ctrlKey && event.key === 'x') || (event.key === 'Delete')) {
                const emailElement = document.querySelector('.highlight');
                if (emailElement) {
                    emailElement.remove(); // Remove highlighted email
                    incrementTodaysEntries(); // Update today's entries count
                }
            }
        });

        function incrementTodaysEntries() {
            todaysEntries += 1;
            localStorage.setItem(TODAYS_ENTRIES_KEY, todaysEntries);
            updateEntryDisplay(); // Update the display count
        }

    </script>
</body>
</html>
