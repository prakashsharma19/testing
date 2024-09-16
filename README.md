<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Entry Workspace</title>
    <style>
        /* Add your CSS here */
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
            // Copy to clipboard functionality
        }

        function toggleLock() {
            // Toggle contentEditable lock
        }

        function toggleFullScreen() {
            // Fullscreen logic
        }

        function exitFullScreen() {
            // Exit fullscreen logic
        }

        function changeFont() {
            // Change font logic
        }

        function changeFontSize() {
            // Change font size logic
        }

        function removeCustomText() {
            // Remove custom text logic
        }
    </script>
</body>
</html>
