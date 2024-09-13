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
            white-space: pre-wrap; /* Keep white spaces and newlines */
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
        let totalEntries = 0;
        let todaysEntries = 0;

        // Function to clean and process the text input
        function advancedFixText() {
            let inputText = document.getElementById("textInput").value;
            let entries = inputText.split(/\n\s*\n/);
            let output = '';

            entries.forEach(entry => {
                entry = entry.replace(/View the author's ORCID record/gi, '')
                             .replace(/Corresponding author/gi, '')
                             .replace(/https?:\/\/\S+/g, '')
                             .replace(/(?<=\s)[.,](?=\s)/g, '') // Remove isolated punctuation
                             .replace(/(?<=^|\n)[.,](?=\s|$)/g, '') // Remove isolated punctuation at beginning
                             .trim();

                let namePattern = /^([A-Z][a-z]+\s[A-Z][a-z]+)/;
                let emailPattern = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}\b/gi;

                let nameMatch = entry.match(namePattern);
                let emailMatch = entry.match(emailPattern);
                let formattedEntry = '';

                if (nameMatch) formattedEntry += nameMatch[0] + '\n';
                formattedEntry += entry.replace(nameMatch ? nameMatch[0] : '', '')
                                       .replace(emailMatch ? emailMatch[0] : '', '')
                                       .trim() + '\n';
                if (emailMatch) {
                    formattedEntry += emailMatch[0] + '\n';
                    totalEntries++; // Increment total entries
                }

                output += formattedEntry + '\n';
            });

            document.getElementById("outputContainer").textContent = output.trim();
        }

        function cleanText() {
            document.getElementById("loading").style.display = "inline";
            setTimeout(() => {
                let inputText = document.getElementById("textInput").value;

                inputText = inputText.replace(/View the author's ORCID record/gi, '')
                                     .replace(/Corresponding author/gi, '')
                                     .replace(/https?:\/\/\S+/g, '')
                                     .replace(/(?<=\s)[.,](?=\s)/g, '') // Remove isolated punctuation
                                     .replace(/(?<=^|\n)[.,](?=\s|$)/g, '') // Remove isolated punctuation at beginning
                                     .trim();

                document.getElementById("outputContainer").textContent = inputText;

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
            const outputText = outputContainer.textContent.replace(new RegExp(textToRemove, 'gi'), '');
            outputContainer.textContent = outputText;
        }
    </script>
</body>
</html>
