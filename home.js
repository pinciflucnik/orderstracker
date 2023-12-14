import { html } from "./lit-html.js";


const homeTemp = () => html`
            <div>
                <p class="intro">Поръчки могат да виждат само вписани потребители</p>
            </div>

`
export function homeView(ctx) {
    ctx.loader();
    ctx.render(homeTemp());
}
