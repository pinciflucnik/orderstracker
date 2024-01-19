import { html, render } from "./lit-html.js";

const loaderTemp = () => html`
        <div class="container">
            <img src="pinci-modified-resized.png" class="loader" alt="pinci-logo">
        </div>
`

let root = document.getElementById('container');
export function loader() {
    render(loaderTemp(),root);
}