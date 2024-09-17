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

        let stopAtLineEnd = true; // Track when to stop at the line's end first, then continue

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
                    handleSelectionRight(selection, range, textNode, start, end);
                } else if (event.key === 'ArrowLeft') {
                    handleSelectionLeft(selection, range, textNode, start);
                }
            }
        }

        function handleSelectionRight(selection, range, textNode, start, end) {
            let currentNode = textNode;
            let currentText = currentNode.textContent;
            let currentEnd = end;

            // First time, stop at punctuation or end of current line
            if (stopAtLineEnd) {
                const remainingText = currentText.slice(currentEnd);
                const nextPunctuation = remainingText.search(punctuationRegex);

                if (nextPunctuation !== -1) {
                    // If punctuation found in the same line, stop at punctuation
                    range.setEnd(currentNode, currentEnd + nextPunctuation + 1);
                } else {
                    // Otherwise, stop at the end of the line
                    range.setEnd(currentNode, currentText.length);
                }

                stopAtLineEnd = false; // Next time, expand to next line
                selection.setSingleRange(range);
                return;
            }

            // If the user presses ArrowRight again, move to the next line
            stopAtLineEnd = true; // Reset for the next selection

            while (currentNode && currentEnd === currentText.length) {
                const nextNode = getNextTextNode(currentNode);
                if (!nextNode) break; // No more lines to expand to

                currentNode = nextNode;
                currentText = currentNode.textContent;
                currentEnd = 0; // Start at the beginning of the next line
            }

            if (currentNode) {
                const nextPunctuation = currentText.search(punctuationRegex);
                if (nextPunctuation !== -1) {
                    range.setEnd(currentNode, nextPunctuation + 1);
                } else {
                    range.setEnd(currentNode, currentText.length);
                }

                selection.setSingleRange(range);
            }
        }

        function handleSelectionLeft(selection, range, textNode, start) {
            let currentNode = textNode;
            let currentText = currentNode.textContent;
            let currentStart = start;

            // Traverse backward and stop at punctuation or start of line
            while (currentNode && currentStart === 0) {
                const prevNode = getPreviousTextNode(currentNode);
                if (!prevNode) break;  // Stop if no more lines

                currentNode = prevNode;
                currentText = currentNode.textContent;
                currentStart = currentText.length;  // Move to end of the previous line
            }

            // Find the previous punctuation in the current line
            const previousText = currentText.slice(0, currentStart);
            const prevPunctuation = previousText.search(punctuationRegex);

            if (prevPunctuation !== -1) {
                range.setStart(currentNode, prevPunctuation + 1);
            } else {
                range.setStart(currentNode, 0);
            }

            selection.setSingleRange(range);
        }

        function getNextTextNode(node) {
            while (node && node.nextSibling) {
                node = node.nextSibling;
                if (node.nodeType === Node.TEXT_NODE) return node;
            }
            return null;
        }

        function getPreviousTextNode(node) {
            while (node && node.previousSibling) {
                node = node.previousSibling;
                if (node.nodeType === Node.TEXT_NODE) return node;
            }
            return null;
        }
    </script>
</body>
</html>
