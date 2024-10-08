<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Management Tool</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
        }
        form {
            margin-bottom: 20px;
        }
        label {
            display: block;
            margin: 10px 0 5px;
        }
        input[type="text"], input[type="email"] {
            width: 100%;
            padding: 10px;
            margin-bottom: 10px;
        }
        button {
            padding: 10px 15px;
            background-color: #4CAF50;
            color: white;
            border: none;
            cursor: pointer;
        }
        button:hover {
            background-color: #45a049;
        }
        .error {
            color: red;
        }
    </style>
</head>
<body>

    <h1>Contact Management Tool</h1>
    <form id="contactForm">
        <label for="name">Name:</label>
        <input type="text" id="name" required>

        <label for="department">Department:</label>
        <input type="text" id="department">

        <label for="institute">Institute:</label>
        <input type="text" id="institute">

        <label for="country">Country:</label>
        <input type="text" id="country">

        <label for="email">Email:</label>
        <input type="email" id="email" required>

        <button type="submit">Submit</button>
        <div id="error" class="error"></div>
    </form>

    <script>
        const contactForm = document.getElementById('contactForm');
        const errorDiv = document.getElementById('error');

        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // Prevent form submission

            const name = document.getElementById('name').value;
            const department = document.getElementById('department').value;
            const institute = document.getElementById('institute').value;
            const country = document.getElementById('country').value;
            const email = document.getElementById('email').value;

            // Clear previous error message
            errorDiv.textContent = '';

            // Check for duplicate email
            const duplicateCheckResponse = await fetch(`http://localhost:3000/api/contacts?email=${email}`);
            const duplicateCheck = await duplicateCheckResponse.json();

            if (duplicateCheck.exists) {
                errorDiv.textContent = 'Error: Duplicate email entry found!';
                return;
            }

            // If no duplicate, proceed to add contact
            const response = await fetch('http://localhost:3000/api/contacts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, department, institute, country, email }),
            });

            if (response.ok) {
                alert('Contact added successfully!');
                contactForm.reset();
            } else {
                errorDiv.textContent = 'Error: Unable to add contact.';
            }
        });
    </script>

</body>
</html>
