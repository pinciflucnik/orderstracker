import { html, render } from "./lit-html.js";

const loaderTemp = () => html`
    <div class="loader"></div>
`

let root = document.getElementById('container');
export function loader() {
    render(loaderTemp(),root);
}