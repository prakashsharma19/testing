<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Grammar Checker</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.4.2/mammoth.browser.min.js"></script>
    <style>
        body { font-family: Arial, sans-serif; text-align: center; padding: 20px; }
        textarea { width: 100%; height: 200px; }
    </style>
</head>
<body>
    <h2>Upload PDF or DOCX</h2>
    <input type="file" id="fileInput" accept=".pdf,.docx">
    <button onclick="processFile()">Check</button>
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
            let text = '';

            if (file.name.endsWith('.pdf')) {
                text = await extractTextFromPDF(file);
            } else if (file.name.endsWith('.docx')) {
                text = await extractTextFromDocx(file);
            } else {
                alert("Unsupported file type. Please upload a PDF or DOCX.");
                return;
            }

            if (text) {
                checkGrammar(text);
            }
        }

        async function extractTextFromPDF(file) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = async function(event) {
                    const typedArray = new Uint8Array(event.target.result);
                    const pdf = await pdfjsLib.getDocument(typedArray).promise;
                    let text = '';
                    
                    for (let i = 1; i <= pdf.numPages; i++) {
                        const page = await pdf.getPage(i);
                        const content = await page.getTextContent();
                        text += content.items.map(item => item.str).join(' ') + '\n';
                    }
                    
                    resolve(text);
                };
                reader.onerror = reject;
                reader.readAsArrayBuffer(file);
            });
        }

        async function extractTextFromDocx(file) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = function(event) {
                    mammoth.extractRawText({ arrayBuffer: event.target.result })
                        .then(result => resolve(result.value))
                        .catch(reject);
                };
                reader.onerror = reject;
                reader.readAsArrayBuffer(file);
            });
        }

        async function checkGrammar(text) {
            const apiKey = "your-api-key"; // Replace with your actual key
            const response = await fetch("https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateText?key=" + apiKey, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    prompt: "Proofread this text: " + text,
                    temperature: 0.7,
                    max_tokens: 300
                })
            });

            const data = await response.json();
            document.getElementById("output").value = data?.candidates?.[0]?.output || "Error: No response received";
        }
    </script>
</body>
</html>
