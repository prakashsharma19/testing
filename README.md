<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Entry Workspace with Custom Selection</title>
    <style>
        body {
            font-family: 'Times New Roman', serif;
            margin: 20px;
            background-color: #f4f4f9;
            overflow: auto;
        }
        #outputContainer {
            width: 100%;
            height: 500px;
            padding: 10px;
            border-radius: 5px;
            border: 1px solid #ccc;
            background-color: #fff;
            overflow-y: auto;
            color: black;
            font-size: 18px;
            font-family: 'Times New Roman', serif;
            white-space: pre-wrap;
        }
        .highlight {
            background-color: yellow;
        }
    </style>
</head>
<body>
    <h2>Entry Workspace</h2>
    <div id="outputContainer" contenteditable="true">
        This is a test line, with punctuation.
        Here is another sentence without punctuation
        And another one.
        Let's test it properly, now.
    </div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/rangy/1.3.0/rangy-core.min.js"></script>

    <script>
        rangy.init(); // Initialize Rangy

        const punctuationRegex = /[.,!?]/;

        document.getElementById('outputContainer').addEventListener('keydown', handleKeyPress);

        function handleKeyPress(event) {
            const selection = rangy.getSelection();
            if (selection.rangeCount === 0) return;

            const range = selection.getRangeAt(0);
            const textNode = range.startContainer;
            const text = textNode.textContent;
            let start = range.startOffset;
            let end = range.endOffset;

            // Check if Ctrl + Shift + Arrow key is pressed
            if (event.ctrlKey && event.shiftKey && (event.key === 'ArrowRight' || event.key === 'ArrowLeft')) {
                event.preventDefault();
                
                if (event.key === 'ArrowRight') {
                    // Move to the right and select text up to punctuation or extend to the next line
                    handleSelectionRight(selection, range, textNode, text, start, end);
                } else if (event.key === 'ArrowLeft') {
                    // Move to the left and adjust the selection to stop before punctuation or start of line
                    handleSelectionLeft(selection, range, textNode, text, start);
                }
            }
        }

        function handleSelectionRight(selection, range, textNode, text, start, end) {
            // Find the next punctuation or the end of the line
            let remainingText = text.slice(end);
            let nextPunctuation = remainingText.search(punctuationRegex);

            // If no punctuation in current line, check for next line
            if (nextPunctuation === -1) {
                // Check if there's more text after the current text node
                let nextSibling = textNode.nextSibling;

                while (nextSibling && nextSibling.textContent.trim() === "") {
                    nextSibling = nextSibling.nextSibling; // Skip empty text nodes (whitespace)
                }

                if (nextSibling) {
                    // Check next line for punctuation and update the range accordingly
                    const nextLineText = nextSibling.textContent;
                    const nextLinePunctuation = nextLineText.search(punctuationRegex);

                    if (nextLinePunctuation !== -1) {
                        // If punctuation found in next line, extend selection up to it
                        range.setEnd(nextSibling, nextLinePunctuation);
                    } else {
                        // If no punctuation, extend selection to the end of the next line
                        range.setEnd(nextSibling, nextLineText.length);
                    }
                } else {
                    // If no more lines, just select to the end of the current text
                    range.setEnd(textNode, text.length);
                }
            } else {
                // If punctuation found in the current line, select up to that punctuation
                range.setEnd(textNode, end + nextPunctuation);
            }

            // Update the selection with the new range
            selection.setSingleRange(range);
        }

        function handleSelectionLeft(selection, range, textNode, text, start) {
            // Find the previous punctuation or start of the line
            const previousText = text.slice(0, start);
            const prevPunctuation = previousText.lastIndexOf(punctuationRegex);

            if (prevPunctuation !== -1) {
                // If punctuation is found, select up to that punctuation
                range.setStart(textNode, prevPunctuation + 1);
            } else {
                // If no punctuation, select to the start of the line
                range.setStart(textNode, 0);
            }

            // Update the selection with the new range
            selection.setSingleRange(range);
        }
    </script>
</body>
</html>
