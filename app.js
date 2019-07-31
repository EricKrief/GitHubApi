
let mainDiv;
let repoDiv;
let usersObject;
let titleDiv;

async function getUsers() {
    const user = document.querySelector(".user").value;
    try {
        const p = await fetch("https://api.github.com/search/users?q=" + user);
        return (p.text());
    }
    catch (e) {
        console.log(e);
    }
}

function search() {
    getUsers().then(data => {
        mainDiv = document.querySelector(".main");
        usersObject = JSON.parse(data);
        renderUsers();
    }).catch(() => console.log("in search catch"));
}

function renderUsers() {

    titleDiv =  document.querySelector(".title");
    titleDiv.innerHTML="Github Viewer";
    titleDiv.style.display="block";

    for (let i = 0; i < usersObject.items.length; i++) {
        let userContainer = document.createElement("div");
        let userDetailsContainer = document.createElement("div");
        let userImage = getImage(i);
        let repoButton = document.createElement("button");
        let profileButton = document.createElement("button");
        userContainer.className = "userContainer";
        userContainer.appendChild(userImage);
        userDetailsContainer.innerHTML = usersObject.items[i].login;
        userDetailsContainer.className = "userDetails";
        repoButton.innerHTML = "Repositories";
        profileButton.innerHTML = "Full Profile";
        repoButton.addEventListener("click", renderRepos);
        repoButton.index = i;
        userDetailsContainer.appendChild(repoButton);
        userDetailsContainer.appendChild(profileButton);
        userContainer.appendChild(userDetailsContainer);
        mainDiv.appendChild(userContainer);
    }
}

function getImage(index) {
    let img = document.createElement("img");
    img.className = "userImage";
    img.src = usersObject.items[index].avatar_url;
    return img;
}

async function getRepos(event) {
    try {
        const r = await fetch(usersObject.items[event.target.index].repos_url);
        return (r.text());
    }
    catch (e) {
        console.log(e);
    }
}

function renderRepos(event) {
    let img=getImage(event.target.index);
    titleDiv.innerHTML="";
    img.className="repoImage";
    titleDiv.appendChild(img);
    titleDiv.innerHTML += usersObject.items[event.target.index].login+"'s repositories";
    getRepos(event).then(data => {
        repos = JSON.parse(data);
        titleDiv.innerHTML+="("+repos.length+")";
    }).catch(() => console.log("in renderRepos catch"));

    // for(let i=0; i<repos.length; i++){
    //     console.log(repos[i].name);
    // }
}

function renderRepoDiv(index){
    let image = getImage(index);
    repoDiv.appendChild(image);
}






