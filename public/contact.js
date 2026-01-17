document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('contact-form');
    const result = document.getElementById('result');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = new FormData(form);
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);
        result.innerHTML = "Sending, please wait (this may take up to 30 seconds)...";

        // Perform the POST request to send the message to web3forms
        fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: json
            })
            .then(async (response) => {
                let json = await response.json();

                if (response.status == 200) {
                    result.innerHTML = "Message sent successfully!";
                    form.reset();
                } else {
                    console.log(response);
                    result.innerHTML = json.message;
                }
            })
            .catch(error => {
                console.log(error);
                result.innerHTML = "Something went wrong! Please try contacting me via another method such as <a style=\"color: #4aa8d9;\" href=\"https://uk.linkedin.com/in/sebastian-crookes\">LinkedIn</a>.";
            })
            .then(() => {
                form.reset();
                setTimeout(() => {
                    result.innerHTML = "";
                }, 9000);
            });
    });
});
