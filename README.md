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
            font-weight: bold;
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

    <!-- Section for removing custom phrases -->
    <div id="customRemoveSection">
        <label for="removeText">Enter text to remove:</label>
        <input type="text" id="removeText" placeholder="Enter text to remove">
        <button onclick="removeCustomText()">Delete</button>
    </div>

    <script>
        // Define special characters and their replacements
        const specialChars = {
            'À': 'A', 'á': 'a', 'â': 'a', 'ç': 'c', 'ê': 'e', 
            'É': 'E', 'È': 'E', 'Ì': 'I', 'î': 'i', 'í': 'i', 
            'Ò': 'O', 'ô': 'o', 'ó': 'o', 'Ù': 'U'
        };

        function highlightReplacements(text) {
            return text.replace(/[ÀáâçêÉÈÌîíÒôóÙ]/g, match => {
                const replacement = specialChars[match] || match;
                return `<span class="highlight">${replacement}</span>`;
            });
        }

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

                // Highlight special characters and replace with regular text
                entry = highlightReplacements(entry);

                let namePattern = /^([A-Z][a-z]+\s[A-Z][a-z]+)/;
                let emailPattern = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}\b/gi;

                let nameMatch = entry.match(namePattern);
                let emailMatch = entry.match(emailPattern);
                let formattedEntry = '';

                if (nameMatch) formattedEntry += nameMatch[0] + '<br>';
                formattedEntry += entry.replace(nameMatch ? nameMatch[0] : '', '')
                                       .replace(emailMatch ? emailMatch[0] : '', '')
                                       .trim() + '<br>';
                if (emailMatch) formattedEntry += '<a href="mailto:' + emailMatch[0] + '">' + emailMatch[0] + '</a><br>';

                output += formattedEntry + '<br>'; // Removed horizontal line
            });

            document.getElementById("outputContainer").innerHTML = output;
            localStorage.setItem('outputContent', output);
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

                inputText = highlightReplacements(inputText);

                inputText = inputText.replace(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}\b/gi, function(email) {
                    return '<a href="mailto:' + email + '">' + email + '</a>';
                });

                document.getElementById("outputContainer").innerHTML = inputText;
                localStorage.setItem('outputContent', inputText);
                document.getElementById("loading").style.display = "none";
            }, 1000);
        }

        function toggleFullScreen() {
            const outputContainer = document.getElementById('outputContainer');
            const isFullScreen = outputContainer.style.position === 'fixed';

            if (isFullScreen) {
                // Restore original size
                outputContainer.style.position = 'relative';
                outputContainer.style.height = '500px';
                outputContainer.style.width = '100%';
                outputContainer.style.top = 'initial';
                outputContainer.style.left = 'initial';
                outputContainer.style.zIndex = 'initial';
                document.body.style.overflow = 'auto'; // Allow scrolling again
            } else {
                // Fullscreen mode
                outputContainer.style.position = 'fixed';
                outputContainer.style.height = '100vh';
                outputContainer.style.width = '100vw';
                outputContainer.style.top = '0';
                outputContainer.style.left = '0';
                outputContainer.style.zIndex = '1000'; // Bring to front
                document.body.style.overflow = 'hidden'; // Disable body scrolling
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

        function removeCustomText() {
            const textToRemove = document.getElementById("removeText").value;
            const outputContainer = document.getElementById("outputContainer");
            outputContainer.innerHTML = outputContainer.innerHTML.replace(new RegExp(textToRemove, 'gi'), '');
            localStorage.setItem('outputContent', outputContainer.innerHTML);
            document.getElementById("removeText").value = '';
        }

        // Ctrl+Q to jump to next email
        document.addEventListener('keydown', function(event) {
            if (event.ctrlKey && event.key === 'q') {
                let emails = document.querySelectorAll('#outputContainer a[href^="mailto:"]');
                let currentSelection = window.getSelection().anchorNode;
                let nextEmail = null;

                for (let i = 0; i < emails.length; i++) {
                    if (currentSelection && emails[i].contains(currentSelection)) {
                        nextEmail = emails[i + 1] || emails[0];
                        break;
                    }
                }

                if (!nextEmail) nextEmail = emails[0];

                if (nextEmail) {
                    let range = document.createRange();
                    range.selectNode(nextEmail);
                    window.getSelection().removeAllRanges();
                    window.getSelection().addRange(range);
                    nextEmail.scrollIntoView({ behavior: 'smooth', block: 'center' }); // Smooth scroll to the next email
                }
                event.preventDefault();
            }
        });

        // Modify text selection to select until a comma, full stop, or end of line
        document.addEventListener('keydown', function(event) {
            if (event.ctrlKey && event.shiftKey && (event.key === 'ArrowRight' || event.key === 'ArrowLeft')) {
                event.preventDefault();
                let selection = window.getSelection();
                let range = selection.getRangeAt(0);
                let content = range.endContainer.textContent;

                let punctuationRegex = /[.,]/g;
                let match;

                if (event.key === 'ArrowRight') {
                    let stopPosition = content.length;
                    punctuationRegex.lastIndex = range.endOffset;
                    match = punctuationRegex.exec(content);

                    if (match) {
                        stopPosition = match.index;
                    }

                    range.setEnd(range.endContainer, stopPosition);
                    selection.removeAllRanges();
                    selection.addRange(range);

                } else if (event.key === 'ArrowLeft') {
                    let startPosition = 0;
                    match = punctuationRegex.exec(content.slice(0, range.startOffset));

                    if (match) {
                        startPosition = match.index + 1;
                    }

                    range.setStart(range.startContainer, startPosition);
                    selection.removeAllRanges();
                    selection.addRange(range);
                }
            }
        });
    </script>
</body>
</html>
