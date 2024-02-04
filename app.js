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
import { loader } from "./loader.js";
import { editView } from "./editView.js";

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
page('/edit/:id', editView);
page.start()


function ctxDecoration(ctx, next){
    ctx.render = myRender;
    ctx.redirect = page.redirect;
    ctx.api = api;
    ctx.userData = userData;
    ctx.loader = loader;

    next();
}
function myRender(template){
    render(template,root)
}

function navUpdate(ctx, next){
    const navTemp = () => html`
            <div class="container-fluid">
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                ${user? userTemp(): guestTemp()}
            </div>
        </div>
    `
    const guestTemp = () => html`
            <div class="navbar-nav">
                <div class="btn"><a class="nav-link" href="/login">Влез</a></div>
                <!-- <a class="nav-link" href="/register">Регистрация</a> -->
            </div>

    `
    const userTemp = () => html`
            <div class="navbar-nav">
               <div class="btn"><a class="nav-link" href="/addOrder">Нова поръчка</a></div>
                <div class="btn"><a class="nav-link" href="/orders">Незавършени поръчки</a></div>
                <div class="btn"><a class="nav-link" href="/completed">Завършени поръчки</a></div>
                <div class="btn"><a class="nav-link" href="/logout">Излез</a>
            </div>

    `
    let user = sessionStorage.getItem('user');

    render(navTemp(user,userTemp, guestTemp),navRoot);


    next();
}

async function logout(ctx) {
    let isconfirmed = confirm ('Сигурен ли си?');
    if (!isconfirmed){
        return;
    }
    ctx.loader();
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
