const base_url = "http://localhost:3000/api/v1"

const newUserData = {
    user: {
        username: "test1",
        email: "test1@email.com",
        password: "asdfasdf"
    }
}


const registration = () => {
    fetch(`${base_url}/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify(newUserData)
    })
        .then(response => response.json())
        .then((data) => {
            // save the jwt toke to localstorage for future access
            localStorage.setItem("jwt", data.jwt)
            localStorage.setItem("userId", data.user.id)
            // save to user to state
            console.log(data)
        })
}

const login = (loginData) => {
    fetch(`${base_url}/auth`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify(loginData)
    })
        .then(response => response.json())
        .then((data) => {
            localStorage.setItem("jwt", data.jwt)
            localStorage.setItem("userId", data.user.id)
            console.log(data)
        })
}

const getUser = () => {
    console.log("getUser",localStorage.getItem("jwt"))
    fetch(`${base_url}/users/${localStorage.getItem("userId")}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`
        }
    })
        .then(response => {
            if (response.ok !== true) {
                response.json()
                .then(data => alert(data.message))

            } else {
                response.json()
                .then(data => displayUserData(data))
            }
            
        })
}

const displayUserData = data => {
    console.log(data.user.username)
    const mainPage = document.getElementById("main-page")
    mainPage.innerText = `Hello, ${data.user.username}`
}

const logOut = () => {
    console.log("logout",localStorage.getItem("jwt"))
    localStorage.removeItem("jwt")
    localStorage.removeItem("userId")
    alert("Logout successful", localStorage.getItem("jwt"))
    
  
    
}

const handleRegistration = () => {
    const registrationBtn = document.getElementById("registration")
    registrationBtn.addEventListener('click', () => registration())
}
const handleGetUser = () => {
    const registrationBtn = document.getElementById("user")
    registrationBtn.addEventListener('click', () => getUser())
}
const handleLoginUser = () => {
    const registrationBtn = document.getElementById("login-user")
    registrationBtn.addEventListener('click', () => login())
}
const handleLogoutUser = () => {
    const registrationBtn = document.getElementById("logout-user")
    registrationBtn.addEventListener('click', () => logOut())
}

// Registration 
const username = document.getElementById("name")
const email = document.getElementById("email")
const password = document.getElementById("password")
const registration_form = document.getElementById("registration-form")


// We want to listent for a submit on the form element and call handle function
    // When you grab the input element you want, you can use the .value to grabs its value
const handleFormSubmit = (e) => {
    e.preventDefault()
    const loginData = {
        user: {
            username: username.value,
            password: password.value
        }
    }

    login(loginData)

    console.log(username.value, email.value, password.value)
}

const registration_submit = document.getElementById("registration-form")
registration_submit.addEventListener("submit", handleFormSubmit)


handleLogoutUser()
handleLoginUser()
handleRegistration()
handleGetUser()