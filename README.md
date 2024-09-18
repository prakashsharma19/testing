<!DOCTYPE html>
<html>
<head>
    <title>Line-Based Text Selection</title>
    <style>
        #selectableText {
            font-size: 16px;
            padding: 20px;
            border: 1px solid #ccc;
        }
    </style>
</head>
<body>
    <div id="selectableText">
        This is a sample text. You can select it line by line. This is another line.
        This is a phrase with punctuation. This is another phrase with punctuation.
        This is a longer phrase that spans multiple lines.
    </div>
    <script>
        document.addEventListener("DOMContentLoaded", function() {
            const selectableText = document.getElementById("selectableText");

            selectableText.addEventListener("keydown", function(event) {
                if (event.ctrlKey && event.shiftKey && event.key === "ArrowRight") {
                    const selection = window.getSelection();
                    const range = selection.getRangeAt(0);
                    const endContainer = range.endContainer;
                    const endOffset = range.endOffset;

                    if (endContainer.nodeType === Node.TEXT_NODE) {
                        const textContent = endContainer.textContent;
                        const lines = textContent.split("\n");
                        let currentLine = lines.findIndex(line => line.startsWith(textContent.substring(0, endOffset)));

                        if (currentLine !== -1) {
                            const nextLineStart = endContainer.textContent.indexOf("\n", endOffset);
                            const nextLineEnd = nextLineStart !== -1 ? nextLineStart : textContent.length;
                            const nextLine = textContent.substring(nextLineStart, nextLineEnd);

                            // Find the end of the next phrase or the end of the line
                            const phraseEnd = nextLine.indexOf(" ") + nextLineStart;
                            const lineEnd = nextLineStart + nextLine.length;
                            const end = Math.min(phraseEnd, lineEnd);

                            range.setEnd(endContainer, end);
                            selection.removeAllRanges();
                            selection.addRange(range);
                            event.preventDefault();
                        }
                    }
                }
            });
        });
    </script>
</body>
</html>
