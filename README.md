<!DOCTYPE html>
<html>
<head>
  <title>Author Detail Formatter</title>
  <style>
    #output-div {
      border: 1px solid #ccc;
      padding: 10px;
    }
  </style>
</head>
<body>
  <textarea id="input-textarea" rows="10" cols="50"></textarea>
  <button onclick="formatAuthorDetails()">Format</button>
  <div id="output-div"></div>
  <script>
    function formatAuthorDetails() {
      const inputTextarea = document.getElementById('input-textarea');
      const outputDiv = document.getElementById('output-div');

      const inputText = inputTextarea.value;

      // Regular expressions to extract fields
      const nameRegex = /^(.*?)\s/;
      const scopusIdRegex = /https:\/\/www.scopus\.com\/authid\/detail\.uri\?authorId=(\d+)/;
      const affiliationRegex = /(?:Energy School|Key Laboratory of Western Mines and Hazards Prevention).*?\bXi'an\b.*?(\d{6})/;
      const emailRegex = /\b\S+@\S+\.\S+\b/;

      // Parse the input and extract fields
      const nameMatch = inputText.match(nameRegex);
      const scopusIdMatch = inputText.match(scopusIdRegex);
      const affiliationMatches = inputText.matchAll(affiliationRegex);
      const emailMatch = inputText.match(emailRegex);

      // Create a formatted output string
      let output = "<table>\n";
      output += "<tr><th>Field</th><th>Value</th></tr>\n";
      output += `<tr><td>Name</td><td>${nameMatch ? nameMatch[1] : 'N/A'}</td></tr>\n`;
      output += `<tr><td>Scopus ID URL</td><td>${scopusIdMatch ? `<a href="${scopusIdMatch[0]}">${scopusIdMatch[0]}</a>` : 'N/A'}</td></tr>\n`;
      for (const affiliationMatch of affiliationMatches) {
        output += `<tr><td>Affiliation</td><td>${affiliationMatch[0]}</td></tr>\n`;
      }
      output += `<tr><td>Email</td><td>${emailMatch ? emailMatch[0] : 'N/A'}</td></tr>\n`;
      output += "</table>";

      // Update the output div
      outputDiv.innerHTML = output;
    }
  </script>
</body>
</html>
