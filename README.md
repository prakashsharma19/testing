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
        let locked = false;
        const countryList = [
            "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Argentina", "Armenia", "Australia", "Austria",
            "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Benin", "Bhutan", "Bolivia",
            "Brazil", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Chile", "China",
            "Colombia", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominican Republic",
            "Ecuador", "Egypt", "El Salvador", "Estonia", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Georgia", "Germany",
            "Greece", "Guatemala", "Honduras", "Hungary", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica",
            "Japan", "Jordan", "Kazakhstan", "Kenya", "Kuwait", "Latvia", "Lebanon", "Malaysia", "Maldives", "Mexico", "Morocco",
            "Nepal", "Netherlands", "New Zealand", "Nigeria", "North Korea", "Norway", "Pakistan", "Panama", "Peru", "Philippines",
            "Poland", "Portugal", "Qatar", "Russia", "Saudi Arabia", "Serbia", "Singapore", "South Africa", "South Korea", "Spain",
            "Sri Lanka", "Sweden", "Switzerland", "Thailand", "Turkey", "Ukraine", "United Arab Emirates", "United Kingdom",
            "United States", "Uruguay", "Uzbekistan", "Vietnam", "Zimbabwe", "UK", "USA", "Korea", "UAE", "Hong Kong", "Ivory Coast"
        ];

        function advancedFixText() {
            let inputText = document.getElementById("textInput").value;
            let entries = inputText.split(/\n\s*\n/);
            let output = '';

            entries.forEach(entry => {
                let namePattern = /^([A-Z][a-z]+\s[A-Z][a-z]+)/;
                let emailPattern = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}\b/gi;
                let addressPattern = /(.*?(Laboratory|Department|Services|University|Institute|College)[^,]*.*?\d{3,6}.*?,.*?(?:,\s*.*)?(?:P\.?\s*R\.?\s*China)?)/;
                
                let nameMatch = entry.match(namePattern);
                let emailMatch = entry.match(emailPattern);
                let addressMatch = entry.match(addressPattern) || countryList.find(country => entry.includes(country));

                let formattedEntry = '';
                if (nameMatch) formattedEntry += nameMatch[0] + '\n';
                if (addressMatch) formattedEntry += addressMatch[0] + '\n';
                if (emailMatch) formattedEntry += '<a href="mailto:' + emailMatch[0] + '">' + emailMatch[0] + '</a>\n';

                output += formattedEntry + '<hr>\n';
            });

            document.getElementById("outputContainer").innerHTML = output;
        }

        function cleanText() {
            document.getElementById("loading").style.display = "inline";
            setTimeout(() => {
                let inputText = document.getElementById("textInput").value;
                inputText = inputText.replace(/Corresponding author|View the author's ORCID record/gi, '');
                inputText = inputText.replace(/https?:\/\/\S+/g, '');
                inputText = inputText.replace(/\.\s*\./g, '.');

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
            locked = !locked;
            document.querySelectorAll('button, textarea, #fontOptions').forEach(el => {
                el.disabled = locked;
            });
            document.getElementById("outputContainer").contentEditable = !locked;
            document.querySelector('.lock').classList.toggle('locked', locked);
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
