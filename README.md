<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Author Formatter</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
        }
        textarea {
            width: 100%;
            height: 150px;
        }
        button {
            margin: 20px 0;
            padding: 10px 20px;
            font-size: 16px;
        }
        pre {
            background: #f4f4f4;
            padding: 10px;
            white-space: pre-wrap;
        }
    </style>
</head>
<body>
    <h1>Author Formatter</h1>
    <textarea id="inputText" placeholder="Paste author details here..."></textarea>
    <br>
    <button onclick="formatText()">Format and Sort</button>
    <h2>Formatted Author Details:</h2>
    <pre id="outputText"></pre>

    <script>
        function formatText() {
            let inputText = document.getElementById("inputText").value.trim();

            // Remove URLs
            let cleanedText = inputText.replace(/https?:\/\/\S+/g, '');

            // Extract lines and remove empty lines
            let lines = cleanedText.split('\n').map(line => line.trim()).filter(line => line.length > 0);

            // Initialize variables
            let name = '';
            let affiliations = [];
            let email = '';

            // Process lines
            lines.forEach(line => {
                if (line.includes('Corresponding author at:')) {
                    affiliations.push(line.replace('Corresponding author at:', '').trim());
                } else if (line.includes('@')) {
                    email = line;
                } else if (!name) {
                    name = line;
                } else {
                    affiliations.push(line);
                }
            });

            // Format the result
            let formattedText = `${name}\n`;
            formattedText += affiliations.join('\n') + '\n';
            formattedText += email;

            // Display the result
            document.getElementById("outputText").innerText = formattedText;
        }
    </script>
</body>
</html>
