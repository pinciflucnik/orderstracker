import page from "../node_modules/page/page.mjs";
import * as api from "./service/api.js";
import { html, render } from "../node_modules/lit-html/lit-html.js";
import { loginView } from "./views/login.js";
import { ordersView } from "./views/orderList.js";
import { registerView } from "./views/register.js";
import { userData } from "./service/userData.js"
import { homeView } from "./views/home.js";
import { addView } from "./views/addOrder.js";
import { userService } from "./service/userService.js";
import { completedView } from "./views/completed.js";

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
            <a class="navbar-brand" href="/orders">Orders</a>
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
                <a class="nav-link" href="/login">Login</a>
                <a class="nav-link" href="/register">Register</a>
            </div>

    `
    const userTemp = () => html`
            <div class="navbar-nav">
                <a class="nav-link" href="/addOrder">Add new order</a>
                <a class="nav-link" href="/completed">List of completed orders</a>
                <a class="nav-link" href="/logout">Logout</a>
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