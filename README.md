<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Text Processing Tool</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      display: flex;
      justify-content: flex-start; /* Align left */
      padding: 20px;
      width: 100%; /* Full width */
      box-sizing: border-box; /* Include padding in width calculation */
    }

    .container {
      display: flex;
      width: 100%;
    }

    .left-section {
      width: 60%; /* Larger left section */
      padding: 20px;
      border: 1px solid #ccc;
      border-radius: 5px;
      margin-right: 20px; /* Space between sections */
    }

    .right-section {
      width: 35%; /* Smaller right section */
      padding: 20px;
      border: 1px solid #ccc;
      border-radius: 5px;
    }

    textarea {
      width: 100%;
      height: 150px;
      margin-bottom: 10px;
    }

    .bubble {
      display: inline-block;
      padding: 3px 8px;
      margin: 5px;
      border-radius: 15px;
      font-size: 12px;
      cursor: pointer;
      color: white;
    }

    /* Bubbles with different colors */
    .bubble.N { background-color: #3498db; }  /* Blue */
    .bubble.D { background-color: #2ecc71; }  /* Green */
    .bubble.I { background-color: #e74c3c; }  /* Red */
    .bubble.U { background-color: #f39c12; }  /* Orange */
    .bubble.O { background-color: #9b59b6; }  /* Purple */
    .bubble.E { background-color: #1abc9c; }  /* Teal */

    .bubble:hover {
      opacity: 0.8;
    }

    .sentence-container {
      margin-bottom: 10px;
      position: relative;
      white-space: pre-wrap; /* Preserve whitespace and line breaks */
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
    }

    button:hover {
      background-color: #0056b3;
    }

    .save-button {
      margin-top: 10px;
      background-color: #28a745; /* Green for Save */
    }

    .save-button:hover {
      background-color: #218838;
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
        <!-- Sentences with bubbles will appear here -->
      </div>
    </div>

    <!-- Right Section -->
    <div class="right-section">
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

      <label>Email</label>
      <input type="text" id="emailField">

      <button class="save-button" onclick="saveEntries()">Save Entry</button>
      <button onclick="extractEntries()">Extract File</button>
    </div>
  </div>

  <script>
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

    let savedEntries = []; // Array to hold saved entries

    // Function to process the text and split it into sentences
    function processText() {
      const inputText = document.getElementById('inputText').value;

      // Split the text but preserve country names
      const sentences = splitIntoSentences(inputText);
      const processedTextDiv = document.getElementById('processedText');
      processedTextDiv.innerHTML = '';  // Clear previous sentences

      sentences.forEach(sentence => {
        const sentenceDiv = document.createElement('div');
        sentenceDiv.classList.add('sentence-container');
        sentenceDiv.innerHTML = `${sentence} <span class="bubble N" onclick="addToField('nameField', this)">N</span>
                                  <span class="bubble D" onclick="addToField('deptField', this)">D</span>
                                  <span class="bubble I" onclick="addToField('instField', this)">I</span>
                                  <span class="bubble U" onclick="addToField('uniField', this)">U</span>
                                  <span class="bubble O" onclick="addToField('othersField', this)">O</span>
                                  <span class="bubble E" onclick="addToField('emailField', this)">E</span>`;
        processedTextDiv.appendChild(sentenceDiv);
      });
    }

    // Function to split the text into sentences
    function splitIntoSentences(text) {
      const regex = new RegExp(`([\\s\\S]*?(${countries.join('|')})[\\s\\S]*?)(?=\\n|$)`, 'g');
      return text.split(regex).filter(Boolean).map(s => s.trim());
    }

    // Function to add text to the appropriate field
    function addToField(fieldId, bubble) {
      const field = document.getElementById(fieldId);
      const text = bubble.parentNode.childNodes[0].nodeValue.trim();
      const existingText = field.value.trim();

      if (existingText.length > 0) {
        field.value += `, ${text}`; // Add comma when appending
      } else {
        field.value += text; // No comma for the first entry
      }
    }

    // Function to save entries into memory
    function saveEntries() {
      const name = document.getElementById('nameField').value.trim();
      const dept = document.getElementById('deptField').value.trim();
      const inst = document.getElementById('instField').value.trim();
      const uni = document.getElementById('uniField').value.trim();
      const others = document.getElementById('othersField').value.trim();
      const email = document.getElementById('emailField').value.trim();

      // Construct the entry
      let entry = '';
      if (name) entry += name + '\n';
      if (dept) entry += dept + '\n';
      if (inst) entry += inst + '\n';
      if (uni) entry += uni + '\n';
      if (others) entry += others + '\n';
      if (email) entry += email;

      // Save the entry to the array and clear fields
      savedEntries.push(entry.trim());
      clearFields();
      alert('Entry saved successfully!');
    }

    // Function to clear the input fields
    function clearFields() {
      document.getElementById('nameField').value = '';
      document.getElementById('deptField').value = '';
      document.getElementById('instField').value = '';
      document.getElementById('uniField').value = '';
      document.getElementById('othersField').value = '';
      document.getElementById('emailField').value = '';
    }

    // Function to extract saved entries
    function extractEntries() {
      const allEntries = savedEntries.join('\n\n'); // Join with double line breaks for separation
      alert(allEntries || 'No entries saved.');
    }
  </script>
</body>
</html>
