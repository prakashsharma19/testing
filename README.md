<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Text Processing Tool</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      padding: 20px;
      margin: 0;
      height: 100vh;
    }

    .container {
      display: flex;
      width: 100%;
      height: 100%;
    }

    .left-section {
      width: 75%;  /* Make the left section wider */
      padding: 20px;
      border: 1px solid #ccc;
      border-radius: 5px;
      margin-right: 20px;
      height: 100%;
      overflow-y: auto;
    }

    .right-section {
      width: 23%;  /* Make the right section narrower */
      padding: 20px;
      border: 1px solid #ccc;
      border-radius: 5px;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    textarea {
      width: 100%;
      height: 150px;
      margin-bottom: 10px;
    }

    /* Highlight only specific keywords */
    .highlight-keyword {
      background-color: #2ecc71;  /* Green for Keywords */
      cursor: pointer;
    }

    .highlight-email {
      color: blue;
      text-decoration: underline;
      cursor: pointer;
    }

    .right-section input {
      display: block;
      width: 100%;
      padding: 8px;
      margin-bottom: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
    }

    button {
      padding: 10px 20px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      margin-top: 10px;
    }

    button:hover {
      background-color: #0056b3;
    }

    #savedEntries {
      white-space: pre-wrap;
      margin-top: 20px;
    }

    /* Context menu for right-click options */
    .context-menu {
      position: absolute;
      background-color: white;
      border: 1px solid #ccc;
      display: none;
      z-index: 1000;
      box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
    }

    .context-menu-item {
      padding: 10px;
      cursor: pointer;
    }

    .context-menu-item:hover {
      background-color: #f0f0f0;
    }

    /* Hover suggestion for unrecognized text */
    .suggestion {
      background-color: #f39c12;
      cursor: pointer;
      position: relative;
    }

    .suggestion:hover::after {
      content: attr(data-suggestion);
      position: absolute;
      background-color: #333;
      color: #fff;
      padding: 5px;
      border-radius: 3px;
      top: 100%;
      left: 0;
      z-index: 1000;
      white-space: nowrap;
    }

  </style>
</head>
<body>
  <div class="container">
    <!-- Left Section -->
    <div class="left-section">
      <h3>Paste Text</h3>
      <textarea id="inputText" placeholder="Paste text here..."></textarea>
      <button onclick="processText()">Process</button>

      <div id="processedText">
        <!-- Sentences with highlights will appear here -->
      </div>
    </div>

    <!-- Right Section -->
    <div class="right-section">
      <div>
        <h3>Extracted Information</h3>
        <label>Name</label>
        <input type="text" id="nameField">

        <label>Department</label>
        <input type="text" id="deptField">

        <label>Others (Address)</label>
        <input type="text" id="othersField">

        <label>Country</label>
        <input type="text" id="countryField">

        <label>Email</label>
        <input type="text" id="emailField">
      </div>

      <!-- Buttons -->
      <div>
        <button onclick="saveEntry()">Save Entry</button>
        <button onclick="extractFile()">Extract File</button>
      </div>
    </div>
  </div>

  <!-- Context Menu for Right Click -->
  <div id="contextMenu" class="context-menu">
    <div class="context-menu-item" onclick="assignTextToFieldFromContext('Name')">Name</div>
    <div class="context-menu-item" onclick="assignTextToFieldFromContext('Department')">Department</div>
    <div class="context-menu-item" onclick="assignTextToFieldFromContext('University')">University</div>
    <div class="context-menu-item" onclick="assignTextToFieldFromContext('Others')">Others (Address)</div>
  </div>

  <!-- Section for displaying saved entries -->
  <div id="savedEntries"></div>

  <script>
    let savedEntries = [];  // Array to store saved entries
    let contextTarget = null;  // Keep track of the element for right-click context menu

    const countries = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria",
      "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan",
      "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia",
      "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica",
      "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt",
      "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon",
      "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana",
      "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel",
      "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos",
      "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi",
      "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova",
      "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands",
      "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau",
      "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania",
      "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal",
      "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea",
      "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan",
      "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu",
      "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela",
      "Vietnam", "Yemen", "Zambia", "Zimbabwe", "UK", "USA", "U.S.A.", "U. S. A.", "Korea", "UAE", "Hong Kong", "Ivory Coast", "Cote d'Ivoire", "Macau", "Macao", "Macedonia"];

    // Function to process the text, split by commas and create selectable parts
    function processText() {
      let inputText = document.getElementById('inputText').value;

      // Remove unnecessary texts like "View the author's ORCID record" and "Corresponding author."
      inputText = inputText.replace(/View in Scopus/gi, '').replace(/Corresponding author\./gi, '');

      const parts = inputText.split(','); // Split by commas
      const processedTextDiv = document.getElementById('processedText');
      processedTextDiv.innerHTML = '';  // Clear previous sentences

      parts.forEach(part => {
        const trimmedPart = part.trim();
        const sentenceContainer = document.createElement('span');
        sentenceContainer.classList.add('sentence-container');
        
        // Highlight email or country-specific parts
        if (trimmedPart.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/)) {
          sentenceContainer.classList.add('highlight-email');
          sentenceContainer.textContent = trimmedPart;
          sentenceContainer.onclick = () => assignFullLineToField(sentenceContainer, 'E');
        } else if (countries.some(country => trimmedPart.includes(country))) {
          sentenceContainer.classList.add('highlight-keyword');
          sentenceContainer.textContent = trimmedPart;
          sentenceContainer.onclick = () => assignFullLineToField(sentenceContainer, 'C');
        } else {
          // Handle non-email and non-country parts with right-click options
          sentenceContainer.textContent = trimmedPart;
          sentenceContainer.classList.add('suggestion');
          sentenceContainer.setAttribute('data-suggestion', 'Right-click to assign as Name, Department, University, or Others');
          sentenceContainer.oncontextmenu = (event) => {
            event.preventDefault();
            showContextMenu(event, sentenceContainer);
          };
        }

        processedTextDiv.appendChild(sentenceContainer);
        processedTextDiv.appendChild(document.createElement('br')); // Add line break for readability
      });
    }

    // Function to assign the entire line to the correct field
    function assignFullLineToField(textElement, fieldType) {
      const text = textElement.textContent.trim();  // Get the entire line
      let field;

      switch (fieldType) {
        case 'C':
          field = document.getElementById('countryField');
          field.value = text;  // Directly assign the country
          break;
        case 'E':
          field = document.getElementById('emailField');
          field.value = text;  // Directly assign the email
          break;
        default:
          return; // No need for further action on 'C' and 'E'
      }
    }

    // Function to show context menu on right-click
    function showContextMenu(event, targetElement) {
      const contextMenu = document.getElementById('contextMenu');
      contextMenu.style.display = 'block';
      contextMenu.style.top = `${event.clientY}px`;
      contextMenu.style.left = `${event.clientX}px`;
      contextTarget = targetElement;
    }

    // Function to hide context menu
    function hideContextMenu() {
      const contextMenu = document.getElementById('contextMenu');
      contextMenu.style.display = 'none';
    }

    // Function to append or assign text from context menu selection
    function assignTextToFieldFromContext(choice) {
      if (contextTarget) {
        const text = contextTarget.textContent.trim();
        let field;

        switch (choice) {
          case 'Name':
            field = document.getElementById('nameField');
            break;
          case 'Department':
            field = document.getElementById('deptField');
            break;
          case 'University':
            field = document.getElementById('deptField');
            break;
          case 'Others':
            field = document.getElementById('othersField');
            break;
        }

        if (field.value) {
          field.value += ', ' + text;  // Append the text with a comma
        } else {
          field.value = text;  // Assign the text
        }

        contextTarget = null;  // Reset the target
      }

      hideContextMenu();  // Hide the context menu after assigning
    }

    // Close context menu on click elsewhere
    document.addEventListener('click', function () {
      hideContextMenu();
    });

    // Function to save the current entry
    function saveEntry() {
      const name = document.getElementById('nameField').value;
      const dept = document.getElementById('deptField').value;
      const others = document.getElementById('othersField').value;
      const country = document.getElementById('countryField').value;
      const email = document.getElementById('emailField').value;

      // Build the saved entry as formatted text
      let entry = '';
      if (name) entry += name + '\n';
      if (dept) entry += dept + '\n';
      if (others) entry += others + '\n';
      if (country) entry += country + '\n';
      if (email) entry += email + '\n';

      savedEntries.push(entry.trim());  // Save the entry
      alert('Entry saved!');

      // Clear the fields after saving
      document.getElementById('nameField').value = '';
      document.getElementById('deptField').value = '';
      document.getElementById('othersField').value = '';
      document.getElementById('countryField').value = '';
      document.getElementById('emailField').value = '';
    }

    // Function to extract the saved entries and download as a text file
    function extractFile() {
      const savedEntriesDiv = document.getElementById('savedEntries');
      savedEntriesDiv.innerHTML = '';  // Clear previous entries

      const content = savedEntries.join('\n\n');
      savedEntriesDiv.textContent = content;

      // Create a downloadable text file
      const blob = new Blob([content], { type: 'text/plain' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'saved_entries.txt';
      link.click();
    }
  </script>
</body>
</html>
