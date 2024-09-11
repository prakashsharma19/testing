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
        #copyButton {
            background-color: #ffa500;
            color: white;
        }
        hr {
            border: none;
            border-top: 1px solid #ccc; /* Thin horizontal line */
            margin: 10px 0;
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
    <button id="fullPage" onclick="toggleFullScreen()">Full Page</button>
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

    <script>
        function advancedFixText() {
            let inputText = document.getElementById("textInput").value;
            let entries = inputText.split(/\n\s*\n/); // Split by paragraphs
            let output = '';

            entries.forEach(entry => {
                // Remove "View the author's ORCID record" and any URLs
                entry = entry.replace(/View the author's ORCID record/gi, '').replace(/https?:\/\/\S+/g, '').trim();

                // Keep all other content intact, just re-arrange by name, address, and email
                let namePattern = /^([A-Z][a-z]+\s[A-Z][a-z]+)/;
                let emailPattern = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}\b/gi;

                let nameMatch = entry.match(namePattern);
                let emailMatch = entry.match(emailPattern);
                let formattedEntry = '';

                if (nameMatch) formattedEntry += nameMatch[0] + '\n';  // Name
                formattedEntry += entry.replace(nameMatch ? nameMatch[0] : '', '').replace(emailMatch ? emailMatch[0] : '', '').trim() + '\n';  // Address
                if (emailMatch) formattedEntry += '<a href="mailto:' + emailMatch[0] + '">' + emailMatch[0] + '</a>\n';  // Email

                // Output with a thin horizontal line
                output += formattedEntry + '<hr>\n';
            });

            document.getElementById("outputContainer").innerHTML = output;
        }

        function cleanText() {
            document.getElementById("loading").style.display = "inline";
            setTimeout(() => {
                let inputText = document.getElementById("textInput").value;

                // Clean the text from unwanted info
                inputText = inputText.replace(/View the author's ORCID record/gi, '').replace(/https?:\/\/\S+/g, '').trim();
                inputText = inputText.replace(/\.\s*\./g, '.');

                // Replace email addresses with mailto links
                inputText = inputText.replace(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}\b/gi, function(email) {
                    return '<a href="mailto:' + email + '">' + email + '</a>';
                });

                document.getElementById("outputContainer").innerHTML = inputText;
                document.getElementById("loading").style.display = "none";
            }, 1000);
        }

        function toggleFullScreen() {
            const outputContainer = document.getElementById('outputContainer');
            if (outputContainer.style.height === '100vh') {
                outputContainer.style.height = '500px';
                document.body.style.overflow = 'auto';
            } else {
                outputContainer.style.height = '100vh';
                document.body.style.overflow = 'hidden';
            }
        }

        function toggleLock() {
            const outputContainer = document.getElementById("outputContainer");
            outputContainer.contentEditable = outputContainer.contentEditable === "true" ? "false" : "true";
            document.querySelector('.lock').classList.toggle('locked');
        }

        function changeFont() {
            const font = document.getElementById("fontSelect").value;
            document.getElementById("outputContainer").style.fontFamily = font;
        }

        function changeFontSize() {
            const size = document.getElementById("fontSize").value;
            document.getElementById("outputContainer").style.fontSize = size + 'px';
        }

        function copyText() {
            const outputText = document.getElementById("outputContainer").innerText;
            navigator.clipboard.writeText(outputText).then(() => {
                alert('Text copied to clipboard');
            });
        }
    </script>
</body>
</html>
