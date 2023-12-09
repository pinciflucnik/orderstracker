import { html } from "./lit-html.js";


const homeTemp = () => html`
            <div>
                <h1>Orders Tracker</h1>
                <p class="intro">Welcome to Orders Tracker made exclusively for personal use and training</p>
            </div>

`
export function homeView(ctx) {
    ctx.render(homeTemp());
}
