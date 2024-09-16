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

    <div id="customRemoveSection">
        <label for="removeText">Enter text to remove:</label>
        <input type="text" id="removeText" placeholder="Enter text to remove">
        <button onclick="removeCustomText()">Delete</button>
    </div>

    <script>
        const TOTAL_ENTRIES_KEY = 'totalEntries';
        const TODAYS_ENTRIES_KEY = 'todaysEntries';
        const LAST_UPDATED_DATE_KEY = 'lastUpdatedDate';
        const OUTPUT_CONTAINER_KEY = 'outputContainerContent';

        let totalEntries = parseInt(localStorage.getItem(TOTAL_ENTRIES_KEY)) || 0;
        let todaysEntries = parseInt(localStorage.getItem(TODAYS_ENTRIES_KEY)) || 0;
        let lastUpdatedDate = localStorage.getItem(LAST_UPDATED_DATE_KEY) || new Date().toDateString();

        function resetTodaysEntryIfNewDay() {
            const currentDate = new Date().toDateString();
            if (currentDate !== lastUpdatedDate) {
                todaysEntries = 0;
                lastUpdatedDate = currentDate;
                localStorage.setItem(LAST_UPDATED_DATE_KEY, currentDate);
                localStorage.setItem(TODAYS_ENTRIES_KEY, todaysEntries);
            }
        }

        function updateEntryDisplay() {
            document.getElementById("entryCount").textContent = `Total Entries: ${totalEntries}`;
            document.getElementById("todaysEntry").textContent = `Today's Entries: ${todaysEntries}`;
        }

        resetTodaysEntryIfNewDay();
        updateEntryDisplay();

        const savedContent = localStorage.getItem(OUTPUT_CONTAINER_KEY);
        if (savedContent) {
            document.getElementById('outputContainer').innerHTML = savedContent;
        }

        function removeDiacritics(str) {
            return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        }

        function advancedFixText() {
            let inputText = document.getElementById("textInput").value;
            let entries = inputText.split(/\n\s*\n/);
            let output = '';

            entries.forEach(entry => {
                entry = entry.replace(/View the author's ORCID record/gi, '')
                             .replace(/Corresponding author/gi, '')
                             .replace(/https?:\/\/\S+/g, '')
                             .replace(/(?<=\s)[.,](?=\s)/g, '')
                             .replace(/(?<=^|\n)[.,](?=\s|$)/g, '')
                             .trim();

                entry = removeDiacritics(entry);

                let namePattern = /^([A-Z][a-z]+\s[A-Z][a-z]+)/;
                let emailPattern = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}\b/gi;

                let nameMatch = entry.match(namePattern);
                let emailMatch = entry.match(emailPattern);
                let formattedEntry = '';

                if (nameMatch) formattedEntry += nameMatch[0] + '<br>';
                formattedEntry += entry.replace(nameMatch ? nameMatch[0] : '', '')
                                       .replace(emailMatch ? emailMatch[0] : '', '')
                                       .trim() + '<br>';
                if (emailMatch) {
                    formattedEntry += '<a href="mailto:' + emailMatch[0] + '">' + emailMatch[0] + '</a><br>';
                    totalEntries++;
                }

                output += formattedEntry + '<br>';
            });

            document.getElementById("outputContainer").innerHTML = output;
            localStorage.setItem(TOTAL_ENTRIES_KEY, totalEntries);
            updateEntryDisplay();
            saveSession();
        }

        function cleanText() {
            document.getElementById("loading").style.display = "inline";
            setTimeout(() => {
                let inputText = document.getElementById("textInput").value;

                inputText = inputText.replace(/View the author's ORCID record/gi, '')
                                     .replace(/Corresponding author/gi, '')
                                     .replace(/https?:\/\/\S+/g, '')
                                     .replace(/(?<=\s)[.,](?=\s)/g, '')
                                     .replace(/(?<=^|\n)[.,](?=\s|$)/g, '')
                                     .trim();

                inputText = removeDiacritics(inputText);

                document.getElementById("outputContainer").innerText = inputText;
                saveSession();
                document.getElementById("loading").style.display = "none";
            }, 1000);
        }

        function copyText() {
            const outputContainer = document.getElementById("outputContainer");
            const selection = window.getSelection();
            const range = document.createRange();
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
            saveSession();
        }

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

            saveSession();
        }

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

        // New feature: Modify text selection to allow extending beyond punctuation to next line
        document.getElementById('outputContainer').addEventListener('keydown', function(event) {
            const outputContainer = document.getElementById('outputContainer');
            const selection = window.getSelection();
            const range = selection.getRangeAt(0);
            const text = range.startContainer.textContent;

            if (event.ctrlKey && event.key === 'q') {
                event.preventDefault();
                jumpToNextEmail();
            } else if (event.key === 'p' && event.altKey) {
                event.preventDefault();
                insertProfessorAtCaret();
            } else if (event.ctrlKey && event.shiftKey && (event.key === 'ArrowLeft' || event.key === 'ArrowRight')) {
                event.preventDefault();
                handlePunctuationSelection(event.key === 'ArrowRight');
            }
        });

        function handlePunctuationSelection(isRightArrow) {
            const selection = window.getSelection();
            const range = selection.getRangeAt(0);
            let node = range.startContainer;
            let cursorPosition = range.startOffset;

            if (isRightArrow) {
                // Traverse forward to find next punctuation or line break
                while (node) {
                    let text = node.textContent;
                    let nextPunctuation = text.slice(cursorPosition).search(/[.,]/);
                    let nextLineBreak = text.slice(cursorPosition).search(/\n/);

                    if (nextPunctuation !== -1 && nextLineBreak !== -1) {
                        nextPunctuation = Math.min(nextPunctuation, nextLineBreak);
                    } else if (nextLineBreak !== -1) {
                        nextPunctuation = nextLineBreak;
                    }

                    if (nextPunctuation !== -1) {
                        cursorPosition += nextPunctuation;
                        range.setEnd(node, cursorPosition);
                        break;
                    } else {
                        cursorPosition = 0;
                        node = node.nextSibling;
                    }
                }
            } else {
                // Traverse backward to find previous punctuation or line break
                while (node) {
                    let text = node.textContent;
                    let prevPunctuation = text.slice(0, cursorPosition).lastIndexOf(/[.,]/);
                    let prevLineBreak = text.slice(0, cursorPosition).lastIndexOf(/\n/);

                    if (prevPunctuation !== -1 && prevLineBreak !== -1) {
                        prevPunctuation = Math.max(prevPunctuation, prevLineBreak);
                    } else if (prevLineBreak !== -1) {
                        prevPunctuation = prevLineBreak;
                    }

                    if (prevPunctuation !== -1) {
                        cursorPosition = prevPunctuation + 1;
                        range.setStart(node, cursorPosition);
                        break;
                    } else {
                        cursorPosition = node.length;
                        node = node.previousSibling;
                    }
                }
            }

            selection.removeAllRanges();
            selection.addRange(range);
        }

        function saveSession() {
            const outputContent = document.getElementById('outputContainer').innerHTML;
            localStorage.setItem(OUTPUT_CONTAINER_KEY, outputContent);
        }

        document.getElementById('outputContainer').addEventListener('input', saveSession);
    </script>
</body>
</html>
