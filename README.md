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

        let stopAtLineEnd = true; // Flag to control stopping at end of the current line first

        function handleKeyPress(event) {
            const selection = rangy.getSelection();
            if (selection.rangeCount === 0) return;

            const range = selection.getRangeAt(0);
            const textNode = range.startContainer;
            const text = textNode.textContent;
            let start = range.startOffset;
            let end = range.endOffset;

            // Check if Ctrl + Shift + ArrowRight or ArrowLeft is pressed
            if (event.ctrlKey && event.shiftKey && (event.key === 'ArrowRight' || event.key === 'ArrowLeft')) {
                event.preventDefault();

                if (event.key === 'ArrowRight') {
                    handleSelectionRight(selection, range, textNode, end);
                }
            }
        }

        function handleSelectionRight(selection, range, textNode, end) {
            const currentNode = textNode;
            const currentText = currentNode.textContent;

            // First expansion should stop at the end of the line or first punctuation
            if (stopAtLineEnd) {
                const remainingText = currentText.slice(end);
                const nextPunctuationIndex = remainingText.search(punctuationRegex);

                if (nextPunctuationIndex !== -1) {
                    // Stop at the first punctuation
                    range.setEnd(currentNode, end + nextPunctuationIndex + 1);
                } else {
                    // Stop at the end of the current line
                    range.setEnd(currentNode, currentText.length);
                }

                stopAtLineEnd = false; // Allow further expansion next time
                selection.setSingleRange(range);
                return;
            }

            // On further expansion, move to the next line
            const nextNode = getNextTextNode(currentNode);
            if (nextNode) {
                const nextText = nextNode.textContent;
                const nextPunctuationIndex = nextText.search(punctuationRegex);

                if (nextPunctuationIndex !== -1) {
                    range.setEnd(nextNode, nextPunctuationIndex + 1);
                } else {
                    range.setEnd(nextNode, nextText.length);
                }

                selection.setSingleRange(range);
            }
        }

        function getNextTextNode(node) {
            while (node && node.nextSibling) {
                node = node.nextSibling;
                if (node.nodeType === Node.TEXT_NODE) return node;
            }
            return null;
        }

    </script>
</body>
</html>
