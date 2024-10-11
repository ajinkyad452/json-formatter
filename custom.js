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
    var jsonInput = document.getElementById('jsonInput').value;
    var errorMessageElement = document.getElementById('errorMessage');

    try {
        // Attempt to parse the input JSON
        var tmpData = JSON.parse(jsonInput);

        // If successful, clear any previous error message
        errorMessageElement.style.display = 'none';

        // Beautify the JSON with indentation
        var jsonFormatted = JSON.stringify(tmpData, null, 4);

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
    }
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