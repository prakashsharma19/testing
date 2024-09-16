<!DOCTYPE html>
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

    <!-- Section for removing custom phrases -->
    <div id="customRemoveSection">
        <label for="removeText">Enter text to remove:</label>
        <input type="text" id="removeText" placeholder="Enter text to remove">
        <button onclick="removeCustomText()">Delete</button>
    </div>

    <script>
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
            if (event.key === 'q' && window._lastKey === 'q') {
                event.preventDefault();
                jumpToNextEmail();
            }
            window._lastKey = event.key;
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
            if (window._lastKey === 'p' && event.key === 'r') {
                event.preventDefault();
                insertProfessorAtCaret();
            }
            window._lastKey = event.key;
        }

        document.getElementById('outputContainer').addEventListener('keydown', handleAutocomplete);
    </script>
</body>
</html>
