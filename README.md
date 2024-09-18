<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Entry Workspace</title>
    <style>
        body {
            font-family: 'Times New Roman', serif;
            margin: 20px;
            background-color: #f4f4f9;
            overflow: auto;
        }
        h2 {
            color: #333;
        }
        textarea#textInput {
            width: 100%;
            height: 100px;
            padding: 10px;
            font-size: 18px; /* Large text by default */
            border-radius: 5px;
            border: 1px solid #ccc;
            margin-bottom: 20px;
            resize: vertical;
        }
        div#outputContainer {
            width: 100%;
            height: 400px;
            padding: 10px;
            border-radius: 5px;
            border: 1px solid #ccc;
            background-color: #fff;
            overflow-y: auto;
            color: black;
            font-size: 18px; /* Large text by default */
            font-family: 'Times New Roman', serif;
            white-space: pre-wrap; /* Preserve spaces */
        }
        button {
            padding: 5px 10px;
            font-size: 14px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s;
            margin-right: 5px;
        }
        button.blue {
            background-color: #1E90FF;
            color: white;
        }
        button.green {
            background-color: #32CD32; /* Green color for Fix button */
            color: white;
        }
        button.red {
            background-color: #FF6347;
            color: white;
            position: absolute;
            top: 10px;
            right: 20px;
        }
        button.lock {
            background-color: #696969;
            color: white;
        }
        button.lock.locked {
            background-color: red; /* Red when locked */
        }
        button:hover {
            opacity: 0.8;
        }
        #cutTextDisplay {
            color: green;
            font-weight: bold;
            font-size: 24px;
            margin-left: 10px;
        }
        .blinking-cursor::after {
            content: '|';
            animation: blink-animation 1s steps(5, start) infinite;
            font-weight: bold;
            color: red;
        }
        @keyframes blink-animation {
            to {
                visibility: hidden;
            }
        }
        #scrollLockNotice {
            display: none;
            color: red;
            font-weight: bold;
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: white;
            padding: 10px;
            border: 1px solid red;
            border-radius: 5px;
        }
        #loading {
            display: none;
            color: red;
        }
        /* Icons for Bold, Italic, Underline */
        .toolbar button {
            font-size: 18px;
            padding: 5px;
        }
        .toolbar .icon-button {
            background: none;
            border: none;
            cursor: pointer;
            font-size: 20px;
            margin-right: 5px;
        }
        .toolbar .icon-button:hover {
            opacity: 0.8;
        }
    </style>
</head>
<body>
    <h2>Entry Workspace</h2>
    <textarea id="textInput" placeholder="Paste your text here..."></textarea>
    <br>
    <button class="green" onclick="cleanText()">Fix Text</button>
    <label for="breakLineToggle">Break Line</label>
    <input type="checkbox" id="breakLineToggle" />
    <label for="autoCutToggle">Automatic Cut</label>
    <input type="checkbox" id="autoCutToggle" />
    <span id="loading">Processing, please wait...</span>
    <span id="cutTextDisplay"></span>
    <br><br>
    <div class="toolbar">
        <button class="icon-button" onclick="execCommand('bold')" title="Bold"><b>B</b></button>
        <button class="icon-button" onclick="execCommand('italic')" title="Italic"><i>I</i></button>
        <button class="icon-button" onclick="execCommand('underline')" title="Underline"><u>U</u></button>
        <button class="lock" id="lockButton" onclick="toggleLock()">Lock</button>
    </div>
    <div id="outputContainer" contenteditable="true"></div>
    <button class="red" onclick="deleteAll()">Delete All</button>
    <br>
    <button class="blue" onclick="toggleFullScreen()">Full Screen</button>

    <div id="scrollLockNotice">Scrolling is Locked, Unlock first.</div>

    <script>
        let lockActive = false;
        let originalOverflow = '';

        // Function to clean the text
        function cleanText() {
            document.getElementById("loading").style.display = "inline"; // Show loading indicator
            setTimeout(() => {
                let inputText = document.getElementById("textInput").value;

                // Remove unwanted phrases and links
                inputText = inputText.replace(/Corresponding author/gi, '');
                inputText = inputText.replace(/View the author's ORCID record/gi, '');
                inputText = inputText.replace(/https?:\/\/\S+/g, '');

                // Preserve paragraph spacing
                inputText = inputText.replace(/\n/g, '<br>');

                // Apply break line if toggle is on
                if (document.getElementById("breakLineToggle").checked) {
                    inputText = inputText.replace(/,\s*(?!and\b)/g, ',<br>');
                }

                // Save cleaned text
                localStorage.setItem('outputText', inputText);

                // Output cleaned text in the editable div
                document.getElementById("outputContainer").innerHTML = inputText;

                document.getElementById("loading").style.display = "none"; // Hide loading indicator
            }, 1000); // Simulate processing time
        }

        // Function to handle text formatting (bold, italic, underline)
        function execCommand(command) {
            document.execCommand(command, false, null);
        }

        // Text selection based on punctuation with Ctrl + Shift + Right Arrow
        document.addEventListener('keydown', function(e) {
            if (e.ctrlKey && e.shiftKey && e.key === 'ArrowRight') {
                let selection = window.getSelection();
                let range = selection.getRangeAt(0);
                let content = range.startContainer.nodeValue;
                let startPos = range.startOffset;

                if (content) {
                    let regex = /[,\.!?;]/g; // Punctuation marks to look for
                    let remainingText = content.slice(startPos);
                    let nextPunctuationIndex = remainingText.search(regex);

                    if (nextPunctuationIndex !== -1) {
                        nextPunctuationIndex += startPos;  // Adjust relative position to absolute
                    } else {
                        nextPunctuationIndex = content.length;  // If no punctuation, select till the end
                    }

                    range.setEnd(range.startContainer, nextPunctuationIndex);
                    selection.removeAllRanges();
                    selection.addRange(range);

                    e.preventDefault();  // Prevent default behavior
                }
            }
        });

        // Lock button functionality (Locks all buttons and scrolling)
        function toggleLock() {
            let lockButton = document.getElementById('lockButton');
            lockActive = !lockActive;
            if (lockActive) {
                lockButton.classList.add('locked');
                lockButton.textContent = 'Unlock';
                document.querySelectorAll('button').forEach(btn => btn.disabled = true);
                lockButton.disabled = false; // Keep lock button enabled
                originalOverflow = document.body.style.overflow;
                document.body.style.overflow = 'hidden'; // Lock scrolling
            } else {
                lockButton.classList.remove('locked');
                lockButton.textContent = 'Lock';
                document.querySelectorAll('button').forEach(btn => btn.disabled = false);
                document.body.style.overflow = originalOverflow; // Unlock scrolling
            }
        }

        // Full screen functionality
        function toggleFullScreen() {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen();
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                }
            }
        }

        // Function to delete all text in both input and output boxes
        function deleteAll() {
            document.getElementById("textInput").value = '';
            document.getElementById("outputContainer").innerHTML = '';
            localStorage.removeItem('outputText'); // Clear from memory
        }

        // Load saved cut text and input text on page load
        window.onload = function() {
            const savedText = localStorage.getItem('outputText');
            const cutText = localStorage.getItem('cutText');
            if (savedText) {
                document.getElementById('outputContainer').innerText = savedText;
            }
            if (cutText) {
                document.getElementById('cutTextDisplay').innerText = cutText;
            }
        };
    </script>
</body>
</html>
