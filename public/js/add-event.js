async function newFormHandler(event) {
    event.preventDefault();
  
    const title = document.querySelector('input[name="event-title"]').value;
    const description = document.querySelector('input[name="event-desc"]').value;
    const date = document.querySelector('input[name="event-date"]').value;
    const location = document.querySelector('input[name="event-loc"]').value;
  
    const response = await fetch(`/api/events`, {
      method: 'post',
      body: JSON.stringify({
        title,
        description,
        date,
        location
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector('.new-event-form').addEventListener('submit', newFormHandler);