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

    /* Highlight styles for different categories */
    .highlight-dept {
      background-color: #2ecc71;  /* Green for Department */
      cursor: pointer;
    }

    .highlight-inst {
      background-color: #3498db;  /* Blue for Institute */
      cursor: pointer;
    }

    .highlight-uni {
      background-color: #f39c12;  /* Orange for University */
      cursor: pointer;
    }

    .highlight-country {
      background-color: #e67e22;  /* Dark Orange for Country */
      cursor: pointer;
    }

    .highlight-email {
      color: blue;
      text-decoration: underline;
      cursor: pointer;
    }

    .bubble {
      display: inline-block;
      padding: 3px 8px;
      margin-left: 5px;
      border-radius: 15px;
      font-size: 10px;
      cursor: pointer;
      background-color: #9b59b6;  /* Purple for Other */
      color: white;
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

    .line-break {
      display: block;
      height: 5px;
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

        <label>Institute</label>
        <input type="text" id="instField">

        <label>University</label>
        <input type="text" id="uniField">

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

  <!-- Section for displaying saved entries -->
  <div id="savedEntries"></div>

  <script>
    let savedEntries = [];  // Array to store saved entries

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

    const departmentKeywords = ['Department', 'Laboratory', 'Dept'];
    const instituteKeywords = ['Institute', 'Inst'];
    const universityKeywords = ['University', 'Uni'];

    // Function to process the text and split into smaller parts, highlighting them
    function processText() {
      const inputText = document.getElementById('inputText').value;
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

          // Highlight based on department, institute, university, country, or email
          if (departmentKeywords.some(keyword => fragmentText.includes(keyword))) {
            sentenceText.classList.add('highlight-dept');
            sentenceText.textContent = fragmentText;
            sentenceText.onclick = () => assignTextToField(sentenceText, 'D');
          } else if (instituteKeywords.some(keyword => fragmentText.includes(keyword))) {
            sentenceText.classList.add('highlight-inst');
            sentenceText.textContent = fragmentText;
            sentenceText.onclick = () => assignTextToField(sentenceText, 'I');
          } else if (universityKeywords.some(keyword => fragmentText.includes(keyword))) {
            sentenceText.classList.add('highlight-uni');
            sentenceText.textContent = fragmentText;
            sentenceText.onclick = () => assignTextToField(sentenceText, 'U');
          } else if (countries.some(country => fragmentText.includes(country))) {
            sentenceText.classList.add('highlight-country');
            sentenceText.textContent = fragmentText;
            sentenceText.onclick = () => assignTextToField(sentenceText, 'C');
          } else if (fragmentText.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/)) {
            sentenceText.classList.add('highlight-email');
            sentenceText.textContent = fragmentText;
            sentenceText.onclick = () => assignTextToField(sentenceText, 'E');
          } else {
            // If unrecognized, add a bubble for manual classification
            sentenceText.textContent = fragmentText;
            sentenceContainer.appendChild(sentenceText);

            // Add bubbles for Name (N), Others (O)
            const bubbleTypes = ['N', 'O'];
            bubbleTypes.forEach(type => {
              const bubble = document.createElement('span');
              bubble.classList.add('bubble');
              bubble.textContent = type;

              bubble.onclick = () => assignTextToField(sentenceText, type);
              sentenceContainer.appendChild(bubble);
            });
          }

          // Add the sentence text to the container
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
        case 'N':
          field = document.getElementById('nameField');
          break;
        case 'D':
          field = document.getElementById('deptField');
          break;
        case 'I':
          field = document.getElementById('instField');
          break;
        case 'U':
          field = document.getElementById('uniField');
          break;
        case 'O':
          field = document.getElementById('othersField');
          break;
        case 'C':
          field = document.getElementById('countryField');
          break;
        case 'E':
          field = document.getElementById('emailField');
          break;
      }

      if (field.value) {
        field.value += ', ' + text;
      } else {
        field.value = text;
      }

      // Remove the text from the sentence container
      textElement.remove();
    }

    // Function to save the current entry
    function saveEntry() {
      const name = document.getElementById('nameField').value;
      const dept = document.getElementById('deptField').value;
      const inst = document.getElementById('instField').value;
      const uni = document.getElementById('uniField').value;
      const others = document.getElementById('othersField').value;
      const country = document.getElementById('countryField').value;
      const email = document.getElementById('emailField').value;

      // Build the saved entry as formatted text
      let entry = '';
      if (name) entry += name + '\n';
      if (dept) entry += dept + '\n';
      if (inst) entry += inst + '\n';
      if (uni) entry += uni + '\n';
      if (others) entry += others + '\n';
      if (country) entry += country + '\n';
      if (email) entry += email + '\n';

      savedEntries.push(entry.trim());  // Save the entry
      alert('Entry saved!');
      
      // Clear the fields after saving
      document.getElementById('nameField').value = '';
      document.getElementById('deptField').value = '';
      document.getElementById('instField').value = '';
      document.getElementById('uniField').value = '';
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
