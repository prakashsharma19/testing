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
        #status { font-weight: bold; color: blue; margin-top: 10px; }
    </style>
</head>
<body>
    <h2>Upload PDF or DOCX</h2>
    <input type="file" id="fileInput" accept=".pdf,.docx">
    <button onclick="processFile()">Check</button>
    <h3>Corrected Text:</h3>
    <p id="status"></p> <!-- Status message -->
    <textarea id="output" readonly></textarea>

    <script>
        async function processFile() {
            const fileInput = document.getElementById('fileInput');
            const status = document.getElementById('status');
            status.textContent = "Processing file..."; // Show processing message

            if (!fileInput.files.length) {
                alert("Please select a file.");
                status.textContent = "";
                return;
            }

            const file = fileInput.files[0];
            let text = '';

            try {
                if (file.name.endsWith('.pdf')) {
                    text = await extractTextFromPDF(file);
                } else if (file.name.endsWith('.docx')) {
                    text = await extractTextFromDocx(file);
                } else {
                    alert("Unsupported file type. Please upload a PDF or DOCX.");
                    status.textContent = "";
                    return;
                }

                if (text.trim()) {
                    status.textContent = "Checking grammar...";
                    checkGrammar(text);
                } else {
                    alert("No text extracted. The file may be empty or unsupported.");
                    status.textContent = "";
                }
            } catch (error) {
                console.error("Error processing file:", error);
                alert("Error processing the file. Please try again.");
                status.textContent = "";
            }
        }

        async function extractTextFromPDF(file) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = async function(event) {
                    try {
                        const typedArray = new Uint8Array(event.target.result);
                        const pdf = await pdfjsLib.getDocument({ data: typedArray }).promise;
                        let text = '';
                        
                        for (let i = 1; i <= pdf.numPages; i++) {
                            const page = await pdf.getPage(i);
                            const content = await page.getTextContent();
                            text += content.items.map(item => item.str).join(' ') + '\n';
                        }

                        resolve(text);
                    } catch (error) {
                        reject(error);
                    }
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
            try {
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
                console.log("API Response:", data);

                const correctedText = data?.candidates?.[0]?.output || "Error: No response received";
                document.getElementById("output").value = correctedText;
                document.getElementById("status").textContent = "Grammar check completed!";
            } catch (error) {
                console.error("Error checking grammar:", error);
                alert("Error checking grammar. Please try again.");
                document.getElementById("status").textContent = "";
            }
        }
    </script>
</body>
</html>
