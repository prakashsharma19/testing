<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Grammar Checker</title>
    <style>
        body { font-family: Arial, sans-serif; text-align: center; padding: 20px; }
        textarea { width: 100%; height: 200px; }
    </style>
</head>
<body>
    <h2>Upload PDF</h2>
    <input type="file" id="fileInput" accept=".pdf,.doc,.docx">
    <button onclick="processFile()">Check </button>
    <h3>Corrected Text:</h3>
    <textarea id="output" readonly></textarea>
    
    <script>
        async function processFile() {
            const fileInput = document.getElementById('fileInput');
            if (!fileInput.files.length) {
                alert("Please select a file.");
                return;
            }
            
            const file = fileInput.files[0];
            const text = await extractText(file);
            if (text) {
                checkGrammar(text);
            }
        }
        
        async function extractText(file) {
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.onload = function(event) {
                    resolve(event.target.result);
                };
                reader.readAsText(file);
            });
        }
        
        async function checkGrammar(text) {
            const apiKey = "AIzaSyBIXgqTphaQq8u3W5A4HRHVhwBp_fbnfsg"; // Replace with your actual key
            const response = await fetch("https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateText?key=" + apiKey, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt: { text: "Proofread this text: " + text } })
            });
            
            const data = await response.json();
            document.getElementById("output").value = data.candidates[0].output || "Error: No response received";
        }
    </script>
</body>
</html>
