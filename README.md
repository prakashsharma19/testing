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

        <label>Others</label>
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
    <div class="context-menu-item" onclick="assignTextToFieldFromContext('Address')">Address</div>
    <div class="context-menu-item" onclick="assignTextToFieldFromContext('Department')">Department</div>
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

    const departmentKeywords = ['Department', 'Institute', 'Laboratory', 'School'];

    // Function to process the text and split into smaller parts, highlighting them
    function processText() {
      let inputText = document.getElementById('inputText').value;

      // Remove unnecessary texts like "View the author's ORCID record" and "Corresponding author."
      inputText = inputText.replace(/View the author's ORCID record/gi, '');
      inputText = inputText.replace(/Corresponding author\./gi, '');

      const lines = inputText.split('\n'); // Split based on line breaks
      const processedTextDiv = document.getElementById('processedText');
      processedTextDiv.innerHTML = '';  // Clear previous sentences

      lines.forEach(line => {
        const sentenceContainer = document.createElement('span');
        sentenceContainer.classList.add('sentence-container');

        // Split the line further by commas for better formatting
        const fragments = line.split(',');
        fragments.forEach((fragment, index) => {
          const fragmentText = fragment.trim();
          const sentenceText = document.createElement('span');

          // Highlight based on department keywords
          let highlighted = false;
          departmentKeywords.forEach(keyword => {
            if (fragmentText.includes(keyword)) {
              const keywordIndex = fragmentText.indexOf(keyword);
              const beforeKeyword = fragmentText.substring(0, keywordIndex);
              const afterKeyword = fragmentText.substring(keywordIndex + keyword.length);

              sentenceText.innerHTML = `${beforeKeyword}<span class="highlight-keyword" onclick="assignTextToField(this, 'D')">${keyword}</span>${afterKeyword}`;
              highlighted = true;
            }
          });

          if (!highlighted) {
            sentenceText.textContent = fragmentText;
          }

          // Check if it's an email
          if (fragmentText.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/)) {
            sentenceText.classList.add('highlight-email');
            sentenceText.onclick = () => assignTextToField(sentenceText, 'E');
          } else {
            sentenceContainer.appendChild(sentenceText);

            // Add context menu trigger for unrecognized text
            sentenceText.oncontextmenu = (event) => {
              event.preventDefault();
              showContextMenu(event, sentenceText);
            };
          }

          sentenceContainer.appendChild(sentenceText);

          // Add a break if not the last fragment
          if (index < fragments.length - 1) {
            sentenceContainer.appendChild(document.createElement('br'));
          }
        });

        // Add the sentence container to the processedText div
        processedTextDiv.appendChild(sentenceContainer);
        processedTextDiv.appendChild(document.createElement('br')); // Add line break for readability
      });
    }

    // Function to assign text to the correct field and remove it from the processed area
    function assignTextToField(textElement, fieldType) {
      const text = textElement.textContent.trim();
      let field;

      switch (fieldType) {
        case 'D':
          field = document.getElementById('deptField');
          break;
        case 'C':
          field = document.getElementById('countryField');
          break;
        case 'E':
          field = document.getElementById('emailField');
          break;
        case 'Address':
          field = document.getElementById('othersField');
          break;
        case 'Department':
          field = document.getElementById('deptField');
          break;
      }

      if (field.value) {
        field.value += ', ' + text;
      } else {
        field.value = text;
      }

      // Remove the text from the sentence container
      textElement.remove();
      hideContextMenu();
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

    // Function to assign text from context menu selection
    function assignTextToFieldFromContext(choice) {
      if (contextTarget) {
        assignTextToField(contextTarget, choice);
        contextTarget = null;  // Reset the target
      }
    }

    // Close context menu on click elsewhere
    document.addEventListener('click', function (event) {
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
