import { html, render } from "./lit-html.js";

const loaderTemp = () => html`
        <div class="container">
            <p class="special loader">pinci</p>
        </div>
`

let root = document.getElementById('container');
export function loader() {
    render(loaderTemp(),root);
}