import page from "./page.mjs";
import * as api from "./api.js";
import { html, render } from "./lit-html.js";
import { loginView } from "./login.js";
import { ordersView } from "./orderList.js";
import { registerView } from "./register.js";
import { userData } from "./userData.js"
import { homeView } from "./home.js";
import { addView } from "./addOrder.js";
import { userService } from "./userService.js";
import { completedView } from "./completed.js";

let root = document.getElementById('container');
let navRoot = document.querySelector('body nav');
page(ctxDecoration);
page(navUpdate);
page('/', homeView)
page('/login', loginView);
page('/register', registerView);
page('/orders', ordersView);
page('/logout', logout);
page('/addOrder', addView);
page('/completed', completedView);
page.start()


function ctxDecoration(ctx, next){
    ctx.render = myRender;
    ctx.redirect = page.redirect;
    ctx.api = api;
    ctx.userData = userData;

    next();
}
function myRender(template){
    render(template,root)
}

function navUpdate(ctx, next){
    const navTemp = () => html`
            <div class="container-fluid">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                ${user? userTemp(): guestTemp()}
            </div>
        </div>
    `
    const guestTemp = () => html`
            <div class="navbar-nav">
                <a class="nav-link" href="/login">Влез</a>
                <a class="nav-link" href="/register">Регистрация</a>
            </div>

    `
    const userTemp = () => html`
            <div class="navbar-nav">
                <a class="nav-link" href="/orders">Списък с незавършени поръчки</a>
                <a class="nav-link" href="/addOrder">Нова поръчка</a>
                <a class="nav-link" href="/completed">Списък със завършени поръчки</a>
                <a class="nav-link" href="/logout">Излез</a>
            </div>

    `
    let user = localStorage.getItem('user');

    render(navTemp(user,userTemp, guestTemp),navRoot);


    next();
}

async function logout(ctx) {
    let isconfirmed = confirm ('Are you sure you want to logout?');
    if (!isconfirmed){
        return;
    }
    await userService.logout();
    ctx.redirect('/');
}

// window.addEventListener('beforeunload', onClose);

// async function onClose(e) {
//     e.preventDefault()
//     await userService.logout();
//     localStorage.clear();
//     return '';
// }
