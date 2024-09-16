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
            font-size: 18px;
            border-radius: 5px;
            border: 1px solid #ccc;
            margin-bottom: 20px;
            resize: vertical;
        }
        div#outputContainer {
            width: 100%;
            height: 500px;
            padding: 10px;
            border-radius: 5px;
            border: 1px solid #ccc;
            background-color: #fff;
            overflow-y: auto;
            color: black;
            font-size: 18px;
            font-family: 'Times New Roman', serif;
            white-space: pre-wrap;
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
            background-color: #32CD32;
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
            background-color: red;
        }
        button:hover {
            opacity: 0.8;
        }
        #loading {
            display: none;
            color: red;
        }
        #fontOptions {
            margin-top: 10px;
        }
        #fullPage {
            position: absolute;
            top: 10px;
            left: 20px;
        }
        #exitFullScreen {
            display: none;
            position: fixed;
            bottom: 10px;
            right: 20px;
            z-index: 1001;
        }
        #copyButton {
            background-color: #ffa500;
            color: white;
        }
        #entryCount, #todaysEntry {
            position: fixed;
            top: 10px;
            right: 20px;
            font-size: 18px;
            font-weight: bold;
            color: #333;
        }
        #todaysEntry {
            top: 40px;
        }
        hr {
            border: none;
            border-top: 1px solid #ccc;
            margin: 10px 0;
        }
        #customRemoveSection {
            margin-top: 20px;
        }
        #customRemoveSection input {
            padding: 5px;
            width: 200px;
            font-size: 14px;
        }
        .highlight {
            background-color: yellow;
        }
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
    <button id="exitFullScreen" onclick="exitFullScreen()">Exit Full Screen"></button>
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
        // Helper function to remove diacritics (for advanced cleaning)
        function removeDiacritics(str) {
            return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        }

        function advancedFixText() {
            let inputText = document.getElementById("textInput").value;
            let entries = inputText.split(/\n\s*\n/); // Split into entries by double newlines
            let output = '';

            entries.forEach(entry => {
                // Basic cleaning: remove URLs, isolated punctuation, etc.
                entry = entry.replace(/View the author's ORCID record/gi, '')
                             .replace(/Corresponding author/gi, '')
                             .replace(/https?:\/\/\S+/g, '')
                             .replace(/(?<=\s)[.,](?=\s)/g, '') 
                             .replace(/(?<=^|\n)[.,](?=\s|$)/g, '')
                             .trim();

                // Remove diacritics
                entry = removeDiacritics(entry);

                // Find names and emails
                let namePattern = /^([A-Z][a-z]+\s[A-Z][a-z]+)/;
                let emailPattern = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}\b/gi;

                let nameMatch = entry.match(namePattern);
                let emailMatch = entry.match(emailPattern);
                let formattedEntry = '';

                // Display name if present
                if (nameMatch) formattedEntry += nameMatch[0] + '<br>';

                // Remove the name and email from the entry text and display the rest
                formattedEntry += entry.replace(nameMatch ? nameMatch[0] : '', '')
                                       .replace(emailMatch ? emailMatch[0] : '', '')
                                       .trim() + '<br>';

                // Display email as a mailto link if present
                if (emailMatch) {
                    formattedEntry += '<a href="mailto:' + emailMatch[0] + '">' + emailMatch[0] + '</a><br>';
                }

                output += formattedEntry + '<br>';
            });

            // Update the output container with the processed text
            document.getElementById("outputContainer").innerHTML = output;
        }

        function cleanText() {
            // Simple cleaning function can go here
        }

        function copyText() {
            const outputContainer = document.getElementById("outputContainer");
            const range = document.createRange();
            const selection = window.getSelection();

            range.selectNodeContents(outputContainer);
            selection.removeAllRanges();
            selection.addRange(range);

            document.execCommand("copy");
            alert("Text copied to clipboard");
        }

        function toggleLock() {
            const outputContainer = document.getElementById("outputContainer");
            const lockButton = document.querySelector('.lock');
            if (outputContainer.contentEditable === "true") {
                outputContainer.contentEditable = "false";
                lockButton.classList.add("locked");
                lockButton.textContent = "Unlock";
            } else {
                outputContainer.contentEditable = "true";
                lockButton.classList.remove("locked");
                lockButton.textContent = "Lock";
            }
        }

        function toggleFullScreen() {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen();
                document.getElementById("exitFullScreen").style.display = "block";
            }
        }

        function exitFullScreen() {
            if (document.fullscreenElement) {
                document.exitFullscreen();
                document.getElementById("exitFullScreen").style.display = "none";
            }
        }

        function changeFont() {
            const font = document.getElementById("fontSelect").value;
            document.getElementById("outputContainer").style.fontFamily = font;
        }

        function changeFontSize() {
            const fontSize = document.getElementById("fontSize").value;
            document.getElementById("outputContainer").style.fontSize = fontSize + "px";
        }

        function removeCustomText() {
            const textToRemove = document.getElementById("removeText").value;
            const outputContainer = document.getElementById("outputContainer");
            const outputText = outputContainer.innerHTML.replace(new RegExp(textToRemove, 'gi'), '');
            outputContainer.innerHTML = outputText;
        }

        // Key handling logic
        function findNextPunctuation(text, startPos) {
            const match = text.slice(startPos).match(/[,.]/);
            return match ? startPos + match.index : text.length;
        }

        function modifySelection() {
            const selection = window.getSelection();
            const range = selection.getRangeAt(0);
            const text = range.startContainer.textContent;

            const lineStart = text.lastIndexOf('\n', range.startOffset) + 1;
            const lineEnd = text.indexOf('\n', range.startOffset) === -1 ? text.length : text.indexOf('\n', range.startOffset);
            let punctuationEnd = findNextPunctuation(text, range.startOffset);

            if (punctuationEnd < lineEnd) {
                lineEnd = punctuationEnd;
            }

            range.setStart(range.startContainer, lineStart);
            range.setEnd(range.endContainer, lineEnd);
            selection.removeAllRanges();
            selection.addRange(range);
        }

        function handleSelectionKeys(event) {
            if (event.ctrlKey && event.shiftKey && (event.key === 'ArrowRight' || event.key === 'ArrowLeft')) {
                event.preventDefault();
                modifySelection();
            }
        }

        document.getElementById('outputContainer').addEventListener('keydown', handleSelectionKeys);

        let lastKeyPressed = null;

        function jumpToNextEmail() {
            const outputContainer = document.getElementById('outputContainer');
            const selection = window.getSelection();
            const range = selection.getRangeAt(0);
            const text = outputContainer.textContent;

            let emailPattern = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}\b/gi;
            emailPattern.lastIndex = range.endOffset;
            let result = emailPattern.exec(text);

            if (result) {
                let emailStart = result.index;
                let emailEnd = emailStart + result[0].length;

                range.setStart(outputContainer.firstChild, emailStart);
                range.setEnd(outputContainer.firstChild, emailEnd);
                selection.removeAllRanges();
                selection.addRange(range);
            }
        }

        function handleEmailShortcut(event) {
            if (event.key === 'q') {
                if (lastKeyPressed === 'q') {
                    event.preventDefault();
                    jumpToNextEmail();
                }
                lastKeyPressed = 'q';
            } else {
                lastKeyPressed = null;
            }
        }

        document.getElementById('outputContainer').addEventListener('keydown', handleEmailShortcut);

        function insertProfessorAtCaret() {
            const outputContainer = document.getElementById('outputContainer');
            const selection = window.getSelection();
            const range = selection.getRangeAt(0);

            const textNode = document.createTextNode('Professor ');
            range.insertNode(textNode);
            range.setStartAfter(textNode);
            range.setEndAfter(textNode);
            selection.removeAllRanges();
            selection.addRange(range);
        }

        function handleAutocomplete(event) {
            if (lastKeyPressed === 'p' && event.key === 'r') {
                event.preventDefault();
                insertProfessorAtCaret();
            }
            lastKeyPressed = event.key;
        }

        document.getElementById('outputContainer').addEventListener('keydown', handleAutocomplete);
    </script>
</body>
</html>
