import { html } from "./lit-html.js";
import { userService } from "./userService.js";


const loginTemp = (onLogin) => html`
        <div class="wrapper">
            <h3>Login</h3>
            <form @submit=${onLogin} class="form">
                <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">Username</label>
                    <input type="text" name="username" class="form-control">
                </div>
                <div class="mb-3">
                    <label for="exampleFormControlTextarea1" class="form-label">Password</label>
                    <input type="password" name="password" class="form-control">
                </div>
                <button type="submit" class="btn">Влез</button>
            </form>
        </div>
`
let context = null;
export function loginView(ctx){
    context = ctx;
    ctx.render(loginTemp(onLogin))
}

async function onLogin(e){
    e.preventDefault();
    context.loader();
    let {username, password} = Object.fromEntries(new FormData(e.target));

    if (!username || !password){
        alert ('Трябва да попълниш всички полета');
        return
    }

    try {
        let user = await userService.login(username, password);
        context.userData.setData(user);
        context.redirect('/orders')
    } catch (error) {
        alert (`Нещо се обърка. Владо не знае какво прави. Прати му грешката, моля -> ${error.message}`)
}

}
