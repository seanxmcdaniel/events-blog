async function goingClickHandler(event) {
    event.preventDefault();
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1];

    const going = function incrementValue() {
        const count = going_count
        var value = parseInt(going_count, 10);
        value = isNaN(value) ? 0 : value;
        value++;
        going_count = value;
    }
    const response = await fetch(`/api/events/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            going_count: going
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.reload();
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.going-btn').addEventListener('click', goingClickHandler);