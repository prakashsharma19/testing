<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Entry Workspace with Rangy</title>
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

        document.getElementById('outputContainer').addEventListener('mouseup', handleSelection);
        document.getElementById('outputContainer').addEventListener('keydown', handleKeyPress);

        function handleSelection() {
            const selection = rangy.getSelection();
            if (selection.rangeCount > 0) {
                const range = selection.getRangeAt(0);
                const text = range.startContainer.textContent;

                // Get the current selection start and end
                let start = range.startOffset;
                let end = range.endOffset;

                // Find punctuation in the selected text and adjust the selection
                const punctuationIndexBeforeEnd = text.slice(start, end).search(punctuationRegex);

                // Stop before the punctuation
                if (punctuationIndexBeforeEnd !== -1) {
                    range.setEnd(range.endContainer, start + punctuationIndexBeforeEnd);
                    selection.setSingleRange(range);
                }
            }
        }

        function handleKeyPress(event) {
            const selection = rangy.getSelection();
            if (selection.rangeCount === 0) return;

            const range = selection.getRangeAt(0);
            const text = range.startContainer.textContent;
            let start = range.startOffset;
            let end = range.endOffset;

            if (event.shiftKey && event.key === 'ArrowRight') {
                // Extend selection to include punctuation and next line
                handleSelectionExpansionRight(selection, range, text, start, end);
            } else if (event.shiftKey && event.key === 'ArrowLeft') {
                // Handle selection contraction towards left
                handleSelectionExpansionLeft(selection, range, text, start);
            }
        }

        function handleSelectionExpansionRight(selection, range, text, start, end) {
            // Find next punctuation or the next line's start
            const remainingText = text.slice(end);
            const nextPunctuation = remainingText.search(punctuationRegex);

            if (nextPunctuation !== -1) {
                // If punctuation is found, include it in the selection
                range.setEnd(range.endContainer, end + nextPunctuation + 1); // Include the punctuation
            } else {
                // If no punctuation, go to the end of the line
                range.setEnd(range.endContainer, text.length);
            }

            selection.setSingleRange(range);
        }

        function handleSelectionExpansionLeft(selection, range, text, start) {
            // Find previous punctuation or start of the line
            const previousText = text.slice(0, start);
            const prevPunctuation = previousText.lastIndexOf(punctuationRegex);

            if (prevPunctuation !== -1) {
                // If punctuation is found, reduce selection before punctuation
                range.setStart(range.startContainer, prevPunctuation + 1); // Move just after punctuation
            } else {
                // If no punctuation, move to the start of the line
                range.setStart(range.startContainer, 0);
            }

            selection.setSingleRange(range);
        }
    </script>
</body>
</html>
