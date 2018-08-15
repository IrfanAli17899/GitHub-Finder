if('serviceWorker' in navigator){
    navigator.serviceWorker.register('/sw.js')
    .then(()=>{
        console.log("[ServiceWorker Is Registerd]");
        
    })
}

async function search() {
    var form = new FormData(document.querySelector('#searchForm'));
    try {
        var userRes = await fetch(`https://api.github.com/users/${form.get('user')}`);
    var user = await userRes.json();
    } catch (error) {
        
    }
    
        if (!user.message) {
        createUserInfo(user);
        console.log(user);

        // var followerRes = await fetch(`https://api.github.com/users/${form.get('user')}/followers`)
        // followers = await followerRes.json();
        // console.log(followers);
    } else {
        return createErr();
    }


}
function checkUserData(user) {
    if (user.name === null || user.name === undefined) {
        user.name = 'Username Is Not Yet Specified'
    }
    if (user.bio === null || user.bio === undefined) {
        user.bio = 'Not Yet Added'
    }
    if (user.company === null || user.company === undefined) {
        user.company = 'Not Yet Employed'
    }
    if (user.avatar_url === null || user.avatar_url === undefined) {
        user.avatar_url = './images/user.png'
    }if (user.avatar_url === null || user.avatar_url === undefined) {
        user.avatar_url = './images/user.png'
    }if (user.follower === null || user.follower === undefined) {
        user.follower = 0;
    }if (user.following === null || user.following === undefined) {
        user.following = 0;
    }
    return user;
}
function createUserInfo(userData) {
    let user = checkUserData(userData)
    var div = document.createElement('div');
    div.className = 'animated fadeIn container1';
    if (document.querySelector('.container')) {
        document.querySelector('.container').classList += 'animated fadeOut'
    }
    div.innerHTML = `
    <div class="gitUser">
        <div class="userInfo">
            <div class="userImg">
                <img src="${user.avatar_url}" alt="">
            </div>
            <div class="userData">
                <h1>${user.name}</h1>
                <p class="company">"${user.company}"</p>
                <h1>BIO</h1>
                <p class="bio">"${user.bio}"</p>
                <table class="bioTable">
                    <tr>
                        <td class="btnCell">
                            <button type="button" class="btn btnLeft followers" onclick="createFollower('${user.followers_url}')">
                                <i class="fa fa-bell"></i> Followers (${user.followers})
                            </button>
                        </td>
                        <td class="btnCell">
                            <button type="button" class="btn following">
                                <i class="fa fa-user-plus"></i> Following (${user.following})
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td class="btnCell">
                            <button type="button" class="btn btnLeft repositries" onclick='location.href="${user.html_url}"'>
                                <i class="fa fa-book"></i> Repositries
                            </button>
                        </td>
                        <td class="btnCell">
                            <button type="button" class="btn git" onclick='location.href="${user.html_url}"'>
                                <i class="fa fa-github"></i> View On Github
                            </button>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
        <div class="bioFooter">
            <p>
                <i>
                    <i class="fa fa-github"></i> GitHub Resume By Irfan Ali</i>
            </p>
        </div>
 `
    setTimeout(() => {
        document.body.removeChild(document.querySelector('.container'));
        document.body.appendChild(div);
        var span = document.createElement('span');
        span.innerHTML = `
        <button type="button" onclick="location.reload()" class="fixBtn">
            <i class="fa fa-search"></i>
        </button>`

        document.body.appendChild(span)
    }, 1000);

}
function createErr() {
    if (document.querySelector('.container')) {
        document.querySelector('.container').classList += 'animated fadeOut';
    }
    document.body.innerHTML = `
        <img src="./images/404.jpg" class="errImg animated fadeIn" alt="error">
    `
    var span = document.createElement('span');
        span.innerHTML = `
        <button type="button" onclick="location.reload()" class="fixBtn">
            <i class='fa fa-search'></i> Search
        </button>`
        document.body.appendChild(span)
}
async function createFollower(link) {
    check();
    let followersRes = await fetch(link);
    let followers = await followersRes.json();
    for (let i in followers) {
        let followerRes = await fetch(followers[i].url);
        let follower = await followerRes.json();
        followHtml(follower);
    }
    var span = document.createElement('span');
    span.innerHTML = `
        <button type="button" onclick="location.reload()" class="fixBtn">
            <i class="fa fa-search"></i> Search
        </button>`

    document.body.appendChild(span)

}

function followHtml(userData) {
    let user = checkUserData(userData)
    var div = document.createElement('div');
    div.className = 'animated fadeInRight flexCon'
    div.innerHTML += `
        <div class="user">
            <div class="info">
                <div class="img">
                    <img src="${user.avatar_url}" alt="">
                </div>
                <div class="followerData">
                    <h1>${user.name}</h1>
                    <p class="company">"${user.company}"</p>
                    <h1>BIO</h1>
                    <p class="followBio">"${user.bio}"
                    </p>
                    <table class="followBioTable">
                        <tr>
                            <td class="cell">
                                <button type="button" class="btnPro btnLeft followers" onclick="createFollower('${user.followers_url}')">
                                    <i class="fa fa-bell"></i> Followers (${user.followers})
                                </button>
                            </td>
                            <td class="cell">
                                <button type="button" class="btnPro following">
                                    <i class="fa fa-user-plus"></i> Following (${user.following})
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td class="cell">
                                <button type="button" class="btnPro btnLeft repositries" onclick='location.href="${user.html_url}"'>
                                    <i class="fa fa-book"></i> Repositries ${user.public_repos}
                                </button>
                            </td>
                            <td class="cell">
                                <button type="button" class="btnPro git" onclick='location.href="${user.html_url}"'>
                                    <i class="fa fa-github"></i> View On Github 
                                </button>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
            <div class="bioFooter">
                <p>
                    <i>
                        <i class="fa fa-github"></i> GitHub Resume By Irfan Ali</i>
                </p>
            </div>
        </div>
        `
    document.body.appendChild(div)
}












function check() {
    if (document.querySelector('.container1')) {
        document.querySelector('.container1').classList += 'animated fadeOut';
    } else{
        document.body.innerHTML=``
    }
    var div = document.createElement('div');
    div.className = 'animated fadeIn container2';
    setTimeout(() => {
        if (document.querySelector('.container1')) {
            document.body.removeChild(document.querySelector('.container1'));
            document.body.appendChild(div);
        } else if (document.querySelector('.container2')) {
            document.body.removeChild(document.querySelector('.container2'));
            document.body.appendChild(div);
        }
    }, 1000);
}