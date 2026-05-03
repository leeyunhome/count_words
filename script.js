document.addEventListener('DOMContentLoaded', () => {
    const textInput = document.getElementById('text-input');
    const countTotal = document.getElementById('count-total');
    const countNoSpace = document.getElementById('count-no-space');
    const countBytes = document.getElementById('count-bytes');
    const countWords = document.getElementById('count-words');
    const clearBtn = document.getElementById('clear-btn');
    const copyBtn = document.getElementById('copy-btn');

    const updateStats = () => {
        const text = textInput.value;

        // 1. Total Character Count (including spaces and line breaks)
        const total = text.length;
        countTotal.textContent = total.toLocaleString();

        // 2. Character Count (excluding spaces and line breaks)
        const noSpace = text.replace(/[\s\n\r]/g, '').length;
        countNoSpace.textContent = noSpace.toLocaleString();

        // 3. Byte Count (Korean = 2 bytes, ASCII = 1 byte)
        let bytes = 0;
        for (let i = 0; i < total; i++) {
            const charCode = text.charCodeAt(i);
            // Simple rule: ASCII (0-127) is 1 byte, others (including Korean) are 2 bytes
            if (charCode <= 127) {
                bytes += 1;
            } else {
                bytes += 2;
            }
        }
        countBytes.textContent = bytes.toLocaleString();

        // 4. Word Count
        const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
        countWords.textContent = words.toLocaleString();

        // Visual Feedback for highlight card
        const byteCard = document.getElementById('card-bytes');
        if (bytes > 0) {
            byteCard.classList.add('active');
        } else {
            byteCard.classList.remove('active');
        }
    };

    // Event Listeners
    textInput.addEventListener('input', updateStats);

    // Clear Button
    clearBtn.addEventListener('click', () => {
        textInput.value = '';
        updateStats();
        textInput.focus();
    });

    // Copy Button
    copyBtn.addEventListener('click', async () => {
        if (textInput.value.trim() === '') return;
        
        try {
            await navigator.clipboard.writeText(textInput.value);
            const originalText = copyBtn.innerHTML;
            copyBtn.innerHTML = '<span>Copied!</span>';
            copyBtn.style.background = '#10b981'; // Green success color
            
            setTimeout(() => {
                copyBtn.innerHTML = originalText;
                copyBtn.style.background = '';
            }, 2000);
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    });

    // Initialize
    updateStats();
});
