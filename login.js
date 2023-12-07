import { html } from "../../node_modules/lit-html/lit-html.js";
import { userService } from "../service/userService.js";



const loginTemp = (onLogin) => html`
        <div class="wrapper">
            <h2>Login</h2>
            <form @submit=${onLogin} class="form">
                <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">Username</label>
                    <input type="text" name="username" class="form-control"  placeholder="username">
                </div>
                <div class="mb-3">
                    <label for="exampleFormControlTextarea1" class="form-label">Password</label>
                    <input type="password" name="password" class="form-control"  placeholder="password">
                </div>
                <button type="submit" class="btn btn-dark">Login</button>
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
    let {username, password} = Object.fromEntries(new FormData(e.target));

    if (!username || !password){
        alert ('Трябва да попълниш всички полета');
        return
    }

    // try {
    //     let response = await Parse.User.logIn(username, password);
    //     let user = {
    //         'token': response.getSessionToken(),
    //         'userID': response.id,
    //         'username': response.getUsername()
    //     };
    //     localStorage.setItem('user', JSON.stringify(user));
    //     context.redirect('/orders')
    // } catch (error) {
    //     alert (`Нещо се обърка. Владо не знае какво прави. Прати му грешката, моля -> ${error.message}`)
    // }
    try {
        let user = await userService.login(username, password);
        context.userData.setData(user);
        context.redirect('/orders')
    } catch (error) {
        alert (`Нещо се обърка. Владо не знае какво прави. Прати му грешката, моля -> ${error.message}`)
}

}