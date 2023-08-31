const Url = "http://localhost:5678/api/";
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const submit = document.querySelector("form");
const errorSign = document.querySelector("#demo");


function login () {
  // CREDENTIALS
  let credentials = btoa(`${email.value}:${password.value}`);
  // FETCH WITH HTTP AUTH
  fetch (Url + "users/login", {
    method: 'POST',
    headers: new Headers({ 
      "Authorization": `Basic ${credentials}`,
      'Content-Type': 'application/json'
  }),
  body: JSON.stringify({
      "email": email.value,
      "password": password.value
    })
  })
  // SERVER RESPONSE
  .then(res => {
    if (res.ok) { return res.json(); }
    else { return Promise.reject(res.status);}
  })
  .then(res => {
    localStorage.setItem('token', res.token);
    window.location.href = 'index.html';
})
  //  HANDLE ERRORS (OPTIONAL)
  .catch(err => {
    console.error(err)
    errorSign.innerHTML = `email or password is incorrect`
  });
};

submit.addEventListener("submit", (e) => {
  e.preventDefault();
  login();
});