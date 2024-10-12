function pretifyJsonWithPlugin() {
    var jsonInput = document.getElementById('jsonInput').value;
    var tmpData = JSON.parse(jsonInput);

    // Remove any existing formatted JSON content
    var formattedObjectBlock = document.getElementById("formattedObjectBlock");
    formattedObjectBlock.innerHTML = ''; // Clear the div

    // Create a new JSONFormatter instance with collapsibility level of 2 (default)
    var formatter = new JSONFormatter(tmpData, 4);

    // Append the formatted JSON to the output div
    formattedObjectBlock.appendChild(formatter.render());
}

function pretifyJson() {
    const processButton = document.getElementById('processButton');
    processButton.innerText = 'Wait.....'; // Change button text
    processButton.disabled = true; // Disable button while processing
    var jsonInput = document.getElementById('jsonInput').value;
    var errorMessageElement = document.getElementById('errorMessage');
    const indentChoice = document.getElementById('indentation').value;
    const isMinify = document.getElementById('minify').checked;
    let indent;

    if (isMinify) {
        indent = 0; // No spaces or line breaks
    } else if (indentChoice === 'tab') {
        indent = '\t';
    } else {
        indent = parseInt(indentChoice);
    }

    document.getElementById("preText").innerHTML = '';
    setTimeout(() => {
        try {
            // Attempt to parse the input JSON
            var tmpData = JSON.parse(jsonInput);

            // If successful, clear any previous error message
            errorMessageElement.style.display = 'none';

            // Beautify the JSON with indentation
            var jsonFormatted = JSON.stringify(tmpData, null, indent);

            // Set the formatted JSON in the pre element
            document.getElementById("preText").textContent = jsonFormatted;

            pretifyJsonWithPlugin(); // Call the plugin-based beautification
        } catch (e) {
            // Display error message if JSON is invalid
            errorMessageElement.textContent = 'Invalid JSON format: ' + e.message;
            errorMessageElement.style.display = 'block';

            // Clear the previous formatted content
            document.getElementById("preText").style.display = 'none';
            document.getElementById("formattedObjectBlock").innerHTML = '';
        } finally {
            processButton.innerText = 'Process'; // Revert button text after processing
            processButton.disabled = false; // Re-enable button after processing
        }
    }, 0); // Simulate processing time for large files
}

function copyJson(selector) {
    var element = document.querySelector(selector);
    var temp = document.createElement("textarea");
    document.body.appendChild(temp);
    temp.value = element.textContent;
    temp.select();
    document.execCommand("copy");
    document.body.removeChild(temp);
}

function exportJson() {
    const currentMillis = Date.now();
    const formattedJson = document.getElementById('preText').innerText;
    if (formattedJson) {
        const blob = new Blob([formattedJson], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'json-format-'+currentMillis+'.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a); // Clean up the DOM
    } else {
        alert('Please format the JSON first!');
    }
}


function toggleDarkMode() {
    const body = document.body;
    const toggleButton = document.getElementById('darkModeToggle');
    body.classList.toggle('dark-mode'); // Toggle the dark mode class

    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark'); // Store the preference in localStorage
        toggleButton.innerText = 'Light Mode';
    } else {
        localStorage.setItem('theme', 'light'); // Store the preference in localStorage
        toggleButton.innerText = 'Dark Mode';
    }
}

// Load the saved theme preference when the page loads
window.onload = function() {
    const savedTheme = localStorage.getItem('theme');
    const body = document.body;
    const toggleButton = document.getElementById('darkModeToggle');

    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        toggleButton.innerText = 'Light Mode';
    } else {
        body.classList.remove('dark-mode');
        toggleButton.innerText = 'Dark Mode';
    }

    if (!localStorage.getItem('cookieConsent')) {
        document.getElementById('cookieConsent').style.display = 'block';
    }
    
    document.getElementById('jsonInput').addEventListener('input', function() {
        const charCount = this.value.length;
        document.getElementById('charCounter').innerText = `Characters: ${charCount}`;
    });
};

// Hide cookie consent and store user choice
function hideCookieConsent() {
    document.getElementById('cookieConsent').style.display = 'none';
    localStorage.setItem('cookieConsent', 'true');
}

// Show/Hide scroll button based on scroll position
window.onscroll = function() {
    const scrollToTopButton = document.getElementById('scrollToTop');
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        scrollToTopButton.style.display = 'block';
    } else {
        scrollToTopButton.style.display = 'none';
    }
};

// Smooth scroll to top when button is clicked
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Smooth scrolling effect
    });
}

