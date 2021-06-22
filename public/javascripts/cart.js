function addToCart(id) {
    postData('/cart', { id: id, amount: 1, })
        .then((data) => {
            console.log(data); // JSON data parsed by `response.json()` call
        });
}

function removeItem(id) {
    deleteData('/cart', { id })
        .then(data => {
            console.log(data);
        });

    document.getElementById('item-' + id).remove();
    if (document.getElementsByClassName('col-12').length == 0)
        document.getElementById().remove('submitOrder');
}

function submitOrder() {
    postData('/order', {})
        .then(data => {
            console.log(data);

            switch (data.message) {
                case 'notLoggedIn':
                    break;
                case 'success':
                    window.location.href = '/orders';
                    break;
                default:
                    break;
            }
        });
}

async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *client
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return await response.json(); // parses JSON response into native JavaScript objects
}

async function deleteData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *client
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return await response.json(); // parses JSON response into native JavaScript objects
}
