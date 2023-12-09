import { html } from "./lit-html.js";


const homeTemp = () => html`
            <div>
                <h1>Orders Tracker</h1>
                <p class="intro">Добре дошли в Orders Tracker направен, за да подпомага следенето на поръчки на клон B49</p>
            </div>

`
export function homeView(ctx) {
    ctx.render(homeTemp());
}
