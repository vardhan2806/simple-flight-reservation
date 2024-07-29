document.getElementById('reservation-form').addEventListener('submit', function(event) {
    event.preventDefault();
    let isValid = validateForm();

    if (isValid) {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const from = document.getElementById('from').value;
        const to = document.getElementById('to').value;
        const date = document.getElementById('date').value;
        const airlineSelect = document.getElementById('airline');
        const airline = airlineSelect.options[airlineSelect.selectedIndex].value;
        const price = airlineSelect.options[airlineSelect.selectedIndex].getAttribute('data-price');

        const confirmationMessage = `
            Thank you, ${name}! Your flight from ${from} to ${to} on ${date} with ${airline} has been reserved.
            The total cost is $${price}. A confirmation email will be sent to ${email}.
        `;

        document.getElementById('confirmation-message').textContent = confirmationMessage;
        document.getElementById('confirmation').classList.remove('hidden');
        document.getElementById('reservation-form').reset();
        document.getElementById('reservation-form').classList.add('hidden');
    }
});

document.getElementById('new-reservation').addEventListener('click', function() {
    document.getElementById('confirmation').classList.add('hidden');
    document.getElementById('reservation-form').classList.remove('hidden');
});

document.getElementById('name').addEventListener('input', function() {
    validateName();
});

document.getElementById('email').addEventListener('input', function() {
    validateEmailField();
});

document.getElementById('from').addEventListener('input', function() {
    validateFrom();
});

document.getElementById('to').addEventListener('input', function() {
    validateTo();
});

document.getElementById('date').addEventListener('input', function() {
    validateDate();
});

document.getElementById('airline').addEventListener('change', function() {
    validateAirline();
});

function validateForm() {
    let isValid = true;

    if (!validateName()) isValid = false;
    if (!validateEmailField()) isValid = false;
    if (!validateFrom()) isValid = false;
    if (!validateTo()) isValid = false;
    if (!validateDate()) isValid = false;
    if (!validateAirline()) isValid = false;

    return isValid;
}

function validateName() {
    const name = document.getElementById('name').value.trim();
    const nameError = document.getElementById('name-error');

    if (name === '') {
        nameError.textContent = 'Name is required.';
        nameError.style.display = 'block';
        return false;
    } else if (!/^[A-Za-z\s]+$/.test(name)) {
        nameError.textContent = 'Name can only contain alphabets.';
        nameError.style.display = 'block';
        return false;
    } else {
        nameError.style.display = 'none';
        return true;
    }
}

function validateEmailField() {
    const email = document.getElementById('email').value.trim();
    const emailError = document.getElementById('email-error');

    if (email === '') {
        emailError.textContent = 'Email is required.';
        emailError.style.display = 'block';
        return false;
    } else if (!validateEmail(email)) {
        emailError.textContent = 'Email is not valid.';
        emailError.style.display = 'block';
        return false;
    } else {
        emailError.style.display = 'none';
        return true;
    }
}

function validateFrom() {
    const from = document.getElementById('from').value.trim();
    const fromError = document.getElementById('from-error');

    if (from === '') {
        fromError.textContent = 'Departure location is required.';
        fromError.style.display = 'block';
        return false;
    } else if (!/^[A-Za-z\s]+$/.test(from)) {
        fromError.textContent = 'Departure location can only contain alphabets.';
        fromError.style.display = 'block';
        return false;
    } else {
        fromError.style.display = 'none';
        return true;
    }
}

function validateTo() {
    const to = document.getElementById('to').value.trim();
    const toError = document.getElementById('to-error');

    if (to === '') {
        toError.textContent = 'Destination location is required.';
        toError.style.display = 'block';
        return false;
    } else if (!/^[A-Za-z\s]+$/.test(to)) {
        toError.textContent = 'Destination location can only contain alphabets.';
        toError.style.display = 'block';
        return false;
    } else {
        toError.style.display = 'none';
        return true;
    }
}

function validateDate() {
    const date = document.getElementById('date').value;
    const dateError = document.getElementById('date-error');

    if (date === '') {
        dateError.textContent = 'Date is required.';
        dateError.style.display = 'block';
        return false;
    } else if (new Date(date) < new Date()) {
        dateError.textContent = 'Date cannot be in the past.';
        dateError.style.display = 'block';
        return false;
    } else {
        dateError.style.display = 'none';
        return true;
    }
}

function validateAirline() {
    const airlineSelect = document.getElementById('airline');
    const airline = airlineSelect.options[airlineSelect.selectedIndex].value;
    const airlineError = document.getElementById('airline-error');

    if (airline === '') {
        airlineError.textContent = 'Please select an airline.';
        airlineError.style.display = 'block';
        return false;
    } else {
        airlineError.style.display = 'none';
        return true;
    }
}

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\.,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,})$/i;
    return re.test(String(email).toLowerCase());
}

function clearErrors() {
    const errorElements = document.querySelectorAll('.error');
    errorElements.forEach(errorElement => {
        errorElement.style.display = 'none';
    });
}
