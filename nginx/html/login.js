const location = window.location.hostname;
login = async () => {
    username = document.getElementById("username").value
    password = document.getElementById("password").value
    const settings = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    };
    try {
        const fetchResponse = await fetch(`http://${location}/api/login?username=${username}&password=${password}`, settings);
        const data = await fetchResponse.json();
        return data;
    } catch (e) {
        return e;
    }    

}

function checkCredentials(e) {
  e.preventDefault();
  resultElement = document.getElementById("result");
  username = document.getElementById("username").value
  if (username == "Guest") {
    window.location.href = `http://${location}/home?user=${username}`;
  }

  loginResult = await login();

  if (loginResult.message == "success") {
    window.location.href = `http://${location}/home?user=${username}`;
  } else {  
    console.log("Incorrect");
    resultElement.style.color = "red";
    resultElement.textContent = "Username or password incorrect";
  }
  return false;
}
