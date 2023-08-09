const Url = "http://localhost:5678/api/";
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const submit = document.querySelector("form");
const errorSign = document.querySelector("#demo");

let emailTest = "sophie.bluel@test.tld"
let passwordTest = "S0phie"
// CREDENTIALS
submit.addEventListener('submit', e => {
    e.preventDefault();
    
    AuthData();
    autoRedirect();

    if (email.value == "" || password.value == "") {
        errorSign.innerHTML = `email or password is empty`
      } else {
        console.log(
          `This form has a username of ${email.value} and password of ${password.value}`
        );
      }
});

function AuthData() {
    let credentials = btoa(`${email.value}:${password.value}`);
    // (B) FETCH WITH HTTP AUTH
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
    // // (C) SERVER RESPONSE
    .then(res => {
      if (res.status != 200) { throw new Error("Bad Server Response"); }
      console.log(res.token);
      return res.json();
    })
    .then(res => localStorage.setItem('token', res.token))
   
    // (D) HANDLE ERRORS (OPTIONAL)
    .catch(err => console.error(err));
}

async function isLoggedIn () {
    const token = localStorage.getItem('token')
    if (!token) return false
  }
async function autoRedirect () {
    const validLogin = await isLoggedIn()
    if (!validLogin) window.location = 'index.html';
    else window.location.href = 'index.html';
  }