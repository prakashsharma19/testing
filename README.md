<!DOCTYPE html>
<html>
<head>
  <title>Author Detail Formatter</title>
  <style>
    #output-div {
      border: 1px solid #ccc;
      padding: 10px;
      margin-top: 10px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 10px;
    }
    table, th, td {
      border: 1px solid black;
      padding: 8px;
      text-align: left;
    }
    th {
      background-color: #f2f2f2;
    }
  </style>
</head>
<body>
  <h1>Author Detail Formatter</h1>
  <textarea id="input-textarea" rows="10" cols="50" placeholder="Enter author details here..."></textarea>
  <br>
  <button onclick="formatAuthorDetails()">Format</button>
  <div id="output-div"></div>

  <script>
    function formatAuthorDetails() {
      const inputTextarea = document.getElementById('input-textarea');
      const outputDiv = document.getElementById('output-div');
    
      const inputText = inputTextarea.value.trim(); // Trim input to avoid extra spaces
    
      if (!inputText) {
        outputDiv.innerHTML = "<p style='color: red;'>Please enter some author details.</p>";
        return;
      }
    
      // Split the input text into individual author details
      const authorDetails = inputText.split(/\n\s*\n/); // Split by empty lines with optional spaces
    
      let output = "";
      for (const detail of authorDetails) {
        // Process each author detail
        try {
          const formattedDetail = processAuthorDetail(detail);
          output += formattedDetail + "<br>";
        } catch (error) {
          output += `<p style="color: red;">Error processing detail: ${error.message}</p><br>`;
        }
      }
    
      function processAuthorDetail(detail) {
        // Regular expressions to extract fields
        const nameRegex = /^(.*?)\s/;
        const scopusIdRegex = /https:\/\/www.scopus\.com\/authid\/detail\.uri\?authorId=(\d+)/;
        const affiliationRegex = /(?:Energy School|Key Laboratory of Western Mines and Hazards Prevention).*?\bXi'an\b.*?(\d{6})/;
        const emailRegex = /\b\S+@\S+\.\S+\b/;
    
        // Parse the detail and extract fields
        const nameMatch = detail.match(nameRegex);
        const scopusIdMatch = detail.match(scopusIdRegex);
        const affiliationMatches = detail.matchAll(affiliationRegex);
        const emailMatch = detail.match(emailRegex);
    
        // Check if required fields are present and handle errors
        if (!nameMatch) throw new Error("Name not found.");
        if (!scopusIdMatch) throw new Error("Scopus ID not found.");
        if (!emailMatch) throw new Error("Email not found.");
    
        // Create a formatted output string
        let formattedDetail = "<table>\n";
        formattedDetail += "<tr><th>Field</th><th>Value</th></tr>\n";
        formattedDetail += `<tr><td>Name</td><td>${nameMatch[1]}</td></tr>\n`;
        formattedDetail += `<tr><td>Scopus ID URL</td><td><a href="${scopusIdMatch[0]}">${scopusIdMatch[0]}</a></td></tr>\n`;
    
        let affiliationFound = false;
        for (const affiliationMatch of affiliationMatches) {
          formattedDetail += `<tr><td>Affiliation</td><td>${affiliationMatch[0]}</td></tr>\n`;
          affiliationFound = true;
        }
        if (!affiliationFound) {
          formattedDetail += "<tr><td>Affiliation</td><td>Affiliation not found</td></tr>\n";
        }
    
        formattedDetail += `<tr><td>Email</td><td>${emailMatch[0]}</td></tr>\n`;
        formattedDetail += "</table>";
    
        return formattedDetail;
      }
    
      // Update the output div with the result
      outputDiv.innerHTML = output;
    }
  </script>
</body>
</html>
