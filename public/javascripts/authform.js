function changeAuthForm(){
    let authform = document.getElementById("auth");
    let button = document.getElementById('auth-switch');

    let loginForm = `<form action="/login" method="POST" id="auth-login">
    <div class="mb-2">
      <label class="form-label" for="email">Email: </label>
      <input class="form-control" type="email" id="email" placeholder="name@example.com" name="email" required="required"/>
    </div>
    <div class="mb-2">
      <label class="form-label" for="password">Password: </label>
      <input class="form-control" type="password" id="password" name="password" required="required"/>
    </div>
    <div class="btn-group w-100" role="group">
      <input class="btn btn-secondary border-end" type="submit" value="Login"/>
      <button class="btn btn-secondary mx-auto" onclick="changeAuthForm()" id="auth-switch">Register</button>
    </div>
  </form>`

    let registerForm = `
    <form action="/register" method="POST" id="auth-register">
    <div class="mb-2">
      <label class="form-label" for="firstname">First Name:</label>
      <input class="form-control" type="text" id="firstname" placeholder="John" name="firstname" required="required"/>
    </div>
    <div class="mb-2">
      <label class="form-label" for="lastname">Last Name:</label>
      <input class="form-control" type="text" id="lastname" placeholder="Doe" name="lastname" required="required"/>
    </div>
    <div class="mb-2">
      <label class="form-label" for="email">Email: </label>
      <input class="form-control" type="email" id="email" placeholder="name@example.com" name="email" required="required"/>
    </div>
    <div class="mb-2">
      <label class="form-label" for="password">Password: </label>
      <input class="form-control" type="password" id="password" name="password" required="required"/>
    </div>
    <div class="btn-group w-100" role="group">  
    <input class="btn btn-secondary border-end" type="submit" value="Register"/>
    <button class="btn btn-secondary mx-auto" onclick="changeAuthForm()" id="auth-switch">Login</button>
    </div>
  </form>`
    if(authform.children[0].id === "auth-login"){
        authform.innerHTML = registerForm;
        button.innerHTML = 'Login';
    } else {
        authform.innerHTML = loginForm
        button.innerHTML = 'Register';
    }
}