<!DOCTYPE html>
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

        function handleSelection() {
            const selection = rangy.getSelection();
            if (selection.rangeCount > 0) {
                const range = selection.getRangeAt(0);
                const text = range.startContainer.textContent;

                // Get the current selection start and end
                let start = range.startOffset;
                let end = range.endOffset;

                // Find the next punctuation after the start
                const punctuationIndexAfterStart = text.slice(start).search(punctuationRegex);
                const punctuationIndexBeforeEnd = text.slice(0, end).search(punctuationRegex);

                // Adjust range start (before punctuation)
                if (punctuationIndexAfterStart !== -1) {
                    end = start + punctuationIndexAfterStart; // Stop before punctuation
                }

                // If expanding selection, allow selection of punctuation and move to next line
                document.addEventListener('keydown', (event) => {
                    if (event.shiftKey && (event.key === 'ArrowRight' || event.key === 'ArrowLeft')) {
                        handleSelectionExpansion(selection, text, start, end, range, event);
                    }
                });

                // Update the selection
                range.setEnd(range.endContainer, end);
                selection.setSingleRange(range);
            }
        }

        function handleSelectionExpansion(selection, text, start, end, range, event) {
            if (event.key === 'ArrowRight') {
                // Expand the selection beyond punctuation to the next line
                const nextLineStart = text.slice(end).search(/[^\s]/); // Find the start of the next line
                const nextPunctuation = text.slice(end).search(punctuationRegex); // Find punctuation in the next line

                // If we find a punctuation in the next line, expand selection to that point
                if (nextPunctuation !== -1) {
                    end += nextPunctuation;
                } else if (nextLineStart !== -1) {
                    // If no punctuation, expand selection to the next line
                    end += nextLineStart;
                }
            } else if (event.key === 'ArrowLeft') {
                // Reduce selection if moving left
                const prevPunctuation = text.slice(0, start).lastIndexOf(punctuationRegex);

                if (prevPunctuation !== -1) {
                    start = prevPunctuation;
                } else {
                    start = 0; // If no punctuation, move to the beginning of the text
                }
            }

            // Update the selection range
            range.setStart(range.startContainer, start);
            range.setEnd(range.endContainer, end);
            selection.setSingleRange(range);
        }
    </script>
</body>
</html>
