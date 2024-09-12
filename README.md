<script>
    window.onload = function () {
        const savedText = localStorage.getItem('outputContent');
        if (savedText) {
            document.getElementById('outputContainer').innerHTML = savedText;
        }
    };

    function advancedFixText() {
        let inputText = document.getElementById("textInput").value;
        let entries = inputText.split(/\n\s*\n/);
        let output = '';

        entries.forEach(entry => {
            entry = entry.replace(/View the author's ORCID record/gi, '')
                         .replace(/Corresponding author/gi, '')
                         .replace(/https?:\/\/\S+/g, '')
                         .replace(/(?<=\s)[.,](?=\s)/g, '') // Remove isolated punctuation
                         .trim();

            let namePattern = /^([A-Z][a-z]+\s[A-Z][a-z]+)/;
            let emailPattern = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}\b/gi;

            let nameMatch = entry.match(namePattern);
            let emailMatch = entry.match(emailPattern);
            let formattedEntry = '';

            if (nameMatch) formattedEntry += nameMatch[0] + '\n';
            formattedEntry += entry.replace(nameMatch ? nameMatch[0] : '', '')
                                   .replace(emailMatch ? emailMatch[0] : '', '')
                                   .trim() + '\n';
            if (emailMatch) formattedEntry += '<a href="mailto:' + emailMatch[0] + '">' + emailMatch[0] + '</a>\n';

            output += formattedEntry + '\n'; // Removed horizontal line
        });

        document.getElementById("outputContainer").innerHTML = output;
        localStorage.setItem('outputContent', output);
    }

    function cleanText() {
        document.getElementById("loading").style.display = "inline";
        setTimeout(() => {
            let inputText = document.getElementById("textInput").value;

            inputText = inputText.replace(/View the author's ORCID record/gi, '')
                                 .replace(/Corresponding author/gi, '')
                                 .replace(/https?:\/\/\S+/g, '')
                                 .replace(/(?<=\s)[.,](?=\s)/g, '') // Remove isolated punctuation
                                 .trim();

            inputText = inputText.replace(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}\b/gi, function(email) {
                return '<a href="mailto:' + email + '">' + email + '</a>';
            });

            document.getElementById("outputContainer").innerHTML = inputText;
            localStorage.setItem('outputContent', inputText);
            document.getElementById("loading").style.display = "none";
        }, 1000);
    }

    function toggleFullScreen() {
        const outputContainer = document.getElementById('outputContainer');
        if (outputContainer.style.height === '100vh') {
            outputContainer.style.height = '500px';
            document.body.style.overflow = 'auto';
        } else {
            outputContainer.style.height = '100vh';
            document.body.style.overflow = 'hidden';
        }
    }

    function toggleLock() {
        const outputContainer = document.getElementById("outputContainer");
        outputContainer.contentEditable = outputContainer.contentEditable === "true" ? "false" : "true";
        document.querySelector('.lock').classList.toggle('locked');
    }

    function changeFont() {
        const font = document.getElementById("fontSelect").value;
        document.getElementById("outputContainer").style.fontFamily = font;
    }

    function changeFontSize() {
        const size = document.getElementById("fontSize").value;
        document.getElementById("outputContainer").style.fontSize = size + 'px';
    }

    function copyText() {
        const outputText = document.getElementById("outputContainer").innerText;
        navigator.clipboard.writeText(outputText).then(() => {
            alert('Text copied to clipboard');
        });
    }

    function removeCustomText() {
        const textToRemove = document.getElementById("removeText").value;
        const outputContainer = document.getElementById("outputContainer");
        outputContainer.innerHTML = outputContainer.innerHTML.replace(new RegExp(textToRemove, 'gi'), '');
        localStorage.setItem('outputContent', outputContainer.innerHTML);
        document.getElementById("removeText").value = '';
    }

    // Jump to next email with Ctrl+Q
    document.addEventListener('keydown', function(event) {
        if (event.ctrlKey && event.key === 'q') {
            event.preventDefault();
            let emails = Array.from(document.querySelectorAll('#outputContainer a[href^="mailto:"]'));
            let currentSelection = window.getSelection().focusNode;
            let nextEmail = null;

            for (let i = 0; i < emails.length; i++) {
                if (currentSelection && emails[i].contains(currentSelection)) {
                    nextEmail = emails[i + 1] || emails[0];
                    break;
                }
            }

            if (!nextEmail) nextEmail = emails[0];
            
            if (nextEmail) {
                let range = document.createRange();
                range.selectNodeContents(nextEmail);
                window.getSelection().removeAllRanges();
                window.getSelection().addRange(range);
                nextEmail.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });

    // Modify text selection to select until a comma, full stop, or end of line
    document.addEventListener('keydown', function(event) {
        if (event.ctrlKey && event.shiftKey && (event.key === 'ArrowRight' || event.key === 'ArrowLeft')) {
            event.preventDefault();
            let selection = window.getSelection();
            let range = selection.getRangeAt(0);
            let content = range.endContainer.textContent;

            if (event.key === 'ArrowRight') {
                let nextStop = content.indexOf('.', range.endOffset);
                let nextComma = content.indexOf(',', range.endOffset);
                let nextLineBreak = content.indexOf('\n', range.endOffset);
                let stopPosition = Math.min(
                    nextStop === -1 ? Infinity : nextStop,
                    nextComma === -1 ? Infinity : nextComma,
                    nextLineBreak === -1 ? Infinity : nextLineBreak
                );

                if (stopPosition !== Infinity) {
                    range.setEnd(range.endContainer, stopPosition + 1); // Include the punctuation
                    selection.removeAllRanges();
                    selection.addRange(range);
                }
            } else if (event.key === 'ArrowLeft') {
                let prevStop = content.lastIndexOf('.', range.startOffset - 1);
                let prevComma = content.lastIndexOf(',', range.startOffset - 1);
                let prevLineBreak = content.lastIndexOf('\n', range.startOffset - 1);
                let stopPosition = Math.max(
                    prevStop === -1 ? -Infinity : prevStop,
                    prevComma === -1 ? -Infinity : prevComma,
                    prevLineBreak === -1 ? -Infinity : prevLineBreak
                );

                if (stopPosition !== -Infinity) {
                    range.setStart(range.startContainer, stopPosition + 1); // Include the punctuation
                    selection.removeAllRanges();
                    selection.addRange(range);
                }
            }
        }
    });
</script>
