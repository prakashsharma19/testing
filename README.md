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
            height: 400px;
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
    </style>
</head>
<body>
    <h2>Entry Workspace</h2>
    <textarea id="textInput" placeholder="Paste your text here..."></textarea>
    <br>
    <button class="green" onclick="cleanText()">Fix Text</button>
    <button class="blue" onclick="advancedFixText()">Advanced Fix</button>
    <br><br>
    <div id="outputContainer"></div>

    <script>
        function advancedFixText() {
            let inputText = document.getElementById("textInput").value;

            // Split the input by two newlines to treat each entry separately
            let entries = inputText.split(/\n\s*\n/);

            let output = '';

            // Process each entry
            entries.forEach(entry => {
                // Remove irrelevant lines (e.g., "View the author's ORCID record", "Corresponding author.")
                entry = entry.replace(/View the author's ORCID record|Corresponding author\./gi, '').trim();

                // Extract key components using regex
                const namePattern = /^([A-Z][a-z]+\s[A-Z][a-z]+)/;  // Simple name pattern
                const emailPattern = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}\b/gi;
                const departmentPattern = /(.*?(Laboratory|Department|Services)[^,]*)/;
                const universityPattern = /(.*?(University|Institute|College)[^,]*)/;
                const addressPattern = /((?:[A-Z][a-z]+,\s*)?[A-Z][a-z]+(?:\s*\d{3,6})?.*?(?:,\s*.*?)*(?:P\.?\s*R\.?\s*China)?)/;

                // Match the patterns
                const nameMatch = entry.match(namePattern);
                const emailMatch = entry.match(emailPattern);
                const departmentMatch = entry.match(departmentPattern);
                const universityMatch = entry.match(universityPattern);
                const addressMatch = entry.match(addressPattern);

                // Build the output for this entry
                let formattedEntry = '';
                if (nameMatch) formattedEntry += nameMatch[0] + '\n';
                if (departmentMatch) formattedEntry += departmentMatch[0] + '\n';
                if (universityMatch) formattedEntry += universityMatch[0] + '\n';
                if (addressMatch) formattedEntry += addressMatch[0] + '\n';
                if (emailMatch) {
                    formattedEntry += '<a href="mailto:' + emailMatch[0] + '">' + emailMatch[0] + '</a>\n';
                }

                // Add this formatted entry to the output
                output += formattedEntry + '\n';
            });

            // Display the result in the output container
            document.getElementById("outputContainer").innerHTML = output;
        }

        function cleanText() {
            document.getElementById("loading").style.display = "inline";
            setTimeout(() => {
                let inputText = document.getElementById("textInput").value;

                // Clean the text from special characters, links, and unwanted info
                inputText = inputText.replace(/Corresponding author|View the author's ORCID record/gi, '');
                inputText = inputText.replace(/https?:\/\/\S+/g, '');
                inputText = inputText.replace(/\.\s*\./g, '.');

                // Replace email addresses with mailto links
                inputText = inputText.replace(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}\b/gi, function(email) {
                    return '<a href="mailto:' + email + '">' + email + '</a>';
                });

                document.getElementById("outputContainer").innerHTML = inputText;
                document.getElementById("loading").style.display = "none";
            }, 1000);
        }
    </script>
</body>
</html>
