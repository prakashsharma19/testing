<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Line-Based Text Selection</title>
    <style>
        #selectableText {
            font-size: 16px;
            padding: 20px;
            border: 1px solid #ccc;
            white-space: pre-wrap; /* Keeps line breaks */
        }
    </style>
</head>
<body>
    <div id="selectableText" contenteditable="true">
        This is a sample text. You can select it line by line. This is another line.
        This is a phrase with punctuation. This is another phrase with punctuation.
        This is a longer phrase that spans multiple lines.
    </div>

    <script>
        document.addEventListener("DOMContentLoaded", function () {
            const selectableText = document.getElementById("selectableText");

            selectableText.addEventListener("keydown", function (event) {
                if (event.ctrlKey && event.shiftKey && event.key === "ArrowRight") {
                    const selection = window.getSelection();
                    const range = selection.getRangeAt(0);
                    const endContainer = range.endContainer;
                    const endOffset = range.endOffset;

                    if (endContainer.nodeType === Node.TEXT_NODE) {
                        const textContent = endContainer.textContent;

                        // Find next space or end of line
                        const nextSpace = textContent.indexOf(' ', endOffset);
                        const nextLineBreak = textContent.indexOf('\n', endOffset);
                        let selectionEnd = nextSpace;

                        if (nextLineBreak !== -1 && (nextSpace === -1 || nextLineBreak < nextSpace)) {
                            selectionEnd = nextLineBreak;
                        } else if (nextSpace === -1) {
                            selectionEnd = textContent.length; // Select until end of line if no space
                        }

                        if (selectionEnd > endOffset) {
                            range.setEnd(endContainer, selectionEnd);
                            selection.removeAllRanges();
                            selection.addRange(range);
                        }
                        event.preventDefault();
                    }
                }
            });
        });
    </script>
</body>
</html>
