async function upvoteClickHandler(event) {
    event.preventDefault();
  
    const going = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
    const response = await fetch('/api/events/going', {
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
  
  document.querySelector('.going-btn').addEventListener('click', upvoteClickHandler);