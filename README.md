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
      padding: 5px 10px;
      margin: 5px;
      background-color: #f0f0f0;
      border: 1px solid #ccc;
      border-radius: 10px;
      cursor: pointer;
    }

    .bubble:hover {
      background-color: #d3d3d3;
    }

    .sentence-container {
      margin-bottom: 10px;
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
    // Function to process the text and split it into sentences
    function processText() {
      const inputText = document.getElementById('inputText').value;
      const sentences = inputText.split(/[,.\n]+/).filter(Boolean);  // Split by commas, periods, or newlines
      const processedTextDiv = document.getElementById('processedText');
      processedTextDiv.innerHTML = '';  // Clear previous sentences

      // For each sentence, create a sentence container with clickable bubbles
      sentences.forEach(sentence => {
        const sentenceContainer = document.createElement('div');
        sentenceContainer.classList.add('sentence-container');
        sentenceContainer.textContent = sentence.trim();

        // Create the bubbles for N, D, I, U, O, E
        const bubbleTypes = ['N', 'D', 'I', 'U', 'O', 'E'];
        bubbleTypes.forEach(type => {
          const bubble = document.createElement('span');
          bubble.classList.add('bubble');
          bubble.textContent = type;

          // When a bubble is clicked, move the sentence to the appropriate field
          bubble.onclick = () => assignTextToField(sentence.trim(), type);
          sentenceContainer.appendChild(bubble);
        });

        // Add the sentence container to the processedText div
        processedTextDiv.appendChild(sentenceContainer);
      });
    }

    // Function to assign text to the correct field based on the bubble clicked
    function assignTextToField(text, fieldType) {
      switch (fieldType) {
        case 'N':
          document.getElementById('nameField').value = text;
          break;
        case 'D':
          document.getElementById('deptField').value = text;
          break;
        case 'I':
          document.getElementById('instField').value = text;
          break;
        case 'U':
          document.getElementById('uniField').value = text;
          break;
        case 'O':
          document.getElementById('othersField').value = text;
          break;
        case 'E':
          document.getElementById('emailField').value = text;
          break;
      }
    }
  </script>
</body>
</html>
