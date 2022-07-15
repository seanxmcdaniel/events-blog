async function newFormHandler(event) {
    event.preventDefault();
  
    const title = document.querySelector('input[name="event-title"]').value;
    const description = document.querySelector('input[name="event-desc"]').value;
    const date = document.querySelector('input[name="event-date"]').value;
    const vendorName = document.querySelector('input[name="vendor-name"]').value;
    const location = document.querySelector('input[name="event-loc"]').value;
  
    const response = await fetch(`/api/events`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        description,
        date,
        vendorName,
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