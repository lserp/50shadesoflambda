/* global window document localStorage fetch alert */

// Fill in with your values
const AUTH0_CLIENT_ID = 'your-auth0-client-id-here';
const AUTH0_DOMAIN = 'your-auth0-domain-here.auth0.com';
const AUTH0_CALLBACK_URL = window.location.href; // eslint-disable-line
const PUBLIC_ENDPOINT = 'https://your-aws-endpoint-here.amazonaws.com/dev/api/public';
const PRIVATE_ENDPOINT = 'https://your-aws-endpoint-here.us-east-1.amazonaws.com/dev/api/private';

// initialize auth0 lock
const lock = new Auth0Lock(AUTH0_CLIENT_ID, AUTH0_DOMAIN); // eslint-disable-line

const jwtToken = localStorage.getItem('userToken');
if (jwtToken) {
  document.getElementById('btn-login').style.display = 'none';
  document.getElementById('btn-logout').style.display = 'inline';
  const profile = JSON.parse(localStorage.getItem('profile'));
  document.getElementById('nick').textContent = profile.nickname;
}

// Handle login
document.getElementById('btn-login').addEventListener('click', () => {
  lock.show((err, profile, token) => {
    if (err) {
      // Error callback
      console.error('Something went wrong: ', err);
      alert('Something went wrong, check the Console errors'); // eslint-disable-line no-alert
    } else {
      // Success calback
      console.log(token);

      // Save the JWT token.
      localStorage.setItem('userToken', token);

      // Save the profile
      localStorage.setItem('profile', JSON.stringify(profile));

      document.getElementById('btn-login').style.display = 'none';
      document.getElementById('btn-logout').style.display = 'flex';
      document.getElementById('nick').textContent = profile.nickname;
    }
  });
});

// Handle logout
document.getElementById('btn-logout').addEventListener('click', () => {
  localStorage.removeItem('userToken');
  localStorage.removeItem('profile');
  document.getElementById('btn-login').style.display = 'flex';
  document.getElementById('btn-logout').style.display = 'none';
  document.getElementById('nick').textContent = '';
});

// Handle public api call
document.getElementById('btn-public').addEventListener('click', () => {
  // call public API
  const getdata = fetch(PUBLIC_ENDPOINT, {
    method: 'GET',
    cache: 'no-store',
  });

  getdata.then((response) => {
    response.json().then((data) => {
      console.log('Message:', data);
      document.getElementById('message').textContent = '';
      document.getElementById('message').textContent = data.message;
    });
  });
});

// Handle private api call
document.getElementById('btn-private').addEventListener('click', () => {
  // Call private API with JWT in header
  const token = localStorage.getItem('userToken');
  if (!token) {
    document.getElementById('message').textContent = '';
    document.getElementById('message').textContent = 'You must login to call this protected endpoint!';
    return false;
  }
  const getdata = fetch(PRIVATE_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: 'GET',
    cache: 'no-store',
  });

  getdata.then((response) => {
    response.json().then((data) => {
      console.log('Token:', data);
      document.getElementById('message').textContent = '';
      document.getElementById('message').textContent = data.message;
    });
  });
  // bc linting...
  return false;
});
