import { html } from "./lit-html.js";
import { userService } from "./userService.js";


const registerTemp = (onRegister) => html`
        <div class="wrapper">
            <h2>Register</h2>
            <form @submit=${onRegister} class="form">
                <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">Username</label>
                    <input type="text" name="username" class="form-control"  placeholder="username">
                </div>
                <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">Email address</label>
                    <input type="email" name="email" class="form-control"  placeholder="email">
                </div>
                <div class="mb-3">
                    <label for="exampleFormControlTextarea1" class="form-label">Password</label>
                    <input type="password" name="password" class="form-control"  placeholder="password">
                </div>
                <div class="mb-3">
                    <label for="exampleFormControlTextarea1" class="form-label">Password</label>
                    <input type="password" name="rePass" class="form-control"  placeholder="password">
                </div>
                <button type="submit" class="btn btn-dark">Register</button>
            </form>
        </div>

`
let context = null
export function registerView(ctx){
    context = ctx;
    ctx.render(registerTemp(onRegister))
}

async function onRegister(e){
    e.preventDefault();
    let {username, email, password, rePass} = Object.fromEntries(new FormData(e.target));
    if (!username || !email || !password){
        alert ('Трябва да попълниш всички полета');
        return;
    }

    if (password != rePass){
        alert ('Паролите не съвпадат');
        return;
    }
    // let user = new Parse.User();
    // user.set('username', username);
    // user.set('email', email);
    // user.set('password', password);

    try {
        await userService.register(username, email, password)
        // await user.signUp();
        alert ('Регистриран сте успешно!')
        context.redirect('/login')
    } catch (error) {
        alert (`Възникна грешка - кажи на Владо (${error.message})`)
        return;
    }
}
