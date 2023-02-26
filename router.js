const route = event => {
    event = event || window.event;
    event.preventDefault();
    window.history.pushState({}, "", event.target.href)
    handleLocation()
}

// Define our routes 
const routes = {
    404: "/pages/404.html",
    "/": "/pages/home.html",
    "/about": "/pages/about.html",
    "/contact": "/pages/contact.html",
}

// This function will handle navigation to pages
const handleLocation = async () => {
    console.log("window location pathname",window.location.pathname)
    const path = window.location.pathname;
    const route = routes[path] || routes[404]
    console.log(routes[path])
    const html = await fetch(route).then((data) => data.text())
    document.getElementById("main-page").innerHTML = html

}

window.onpopstate = handleLocation;
window.route = route;

handleLocation();