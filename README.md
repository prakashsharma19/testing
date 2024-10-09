<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Text Processing Tool</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      display: flex;
      justify-content: space-between;
      padding: 20px;
    }

    .container {
      display: flex;
      width: 100%;
    }

    .left-section, .right-section {
      width: 45%;
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
    }

    .bubble-container {
      margin-bottom: 5px;
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

    // Function to process the text and split it into sentences
    function processText() {
      const inputText = document.getElementById('inputText').value;

      // Split the text but preserve country names
      const sentences = splitIntoSentences(inputText);
      const processedTextDiv = document.getElementById('processedText');
      processedTextDiv.innerHTML = '';  // Clear previous sentences

      sentences.forEach(sentence => {
        const sentenceContainer = document.createElement('div');
        sentenceContainer.classList.add('sentence-container');

        const sentenceText = document.createElement('span');
        sentenceText.textContent = sentence.trim();

        const bubbleContainer = document.createElement('div');
        bubbleContainer.classList.add('bubble-container');

        // Create the bubbles for N, D, I, U, O, E
        const bubbleTypes = ['N', 'D', 'I', 'U', 'O', 'E'];
        bubbleTypes.forEach(type => {
          const bubble = document.createElement('span');
          bubble.classList.add('bubble', type);
          bubble.textContent = type;

          // When a bubble is clicked, move the sentence to the appropriate field
          bubble.onclick = () => assignTextToField(sentenceText, type, sentenceContainer);
          bubbleContainer.appendChild(bubble);
        });

        sentenceContainer.appendChild(bubbleContainer);
        sentenceContainer.appendChild(sentenceText);
        processedTextDiv.appendChild(sentenceContainer);
      });
    }

    // Function to split text into sentences but preserve country names
    function splitIntoSentences(text) {
      const words = text.split(/\s+/); // Split by whitespace
      const sentences = [];
      let buffer = "";

      words.forEach(word => {
        const possibleCountry = buffer + (buffer ? " " : "") + word;
        if (countries.includes(possibleCountry)) {
          buffer = possibleCountry; // Country match, continue to build buffer
        } else if (word.match(/[.,\n]$/)) {  // End of a sentence
          buffer += (buffer ? " " : "") + word;  // Add word to buffer
          sentences.push(buffer);  // Push the full sentence
          buffer = "";  // Clear buffer
        } else {
          buffer += (buffer ? " " : "") + word;  // Continue sentence
        }
      });

      if (buffer) sentences.push(buffer);  // Add remaining buffer if not empty
      return sentences;
    }

    // Function to assign text to the correct field and remove it from the processed area
    function assignTextToField(textElement, fieldType, sentenceContainer) {
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
        case 'E':
          field = document.getElementById('emailField');
          break;
      }

      if (field.value) {
        field.value += ', ' + text;
      } else {
        field.value = text;
      }

      // Remove the sentence from the processed area
      sentenceContainer.remove();
    }
  </script>
</body>
</html>
