import { html } from "../../node_modules/lit-html/lit-html.js";


const compTemp = (list) => html`
        <table class="table table-dark table-striped">
            <thead>
                <tr>
                <th scope="col">Client Number</th>
                <th scope="col">Client Name</th>
                <th scope="col">Article number</th>
                <th scope="col">Quantity</th>
                <th scope="col">Ordered from</th>
                <th scope="col">Ordered/Ticket number</th>
                <th scope="col">Order placed on</th>
                <th scope="col">Arrived on</th>
                <th scope="col">Created by</th>
            </tr>
            </thead>
            <tbody>
                ${list.map((order)=> orderTemp(order))}
            </tbody>
        </table>
`
const orderTemp = (order) => html`
                <tr>
                    <td>${order.clientNumber}</td>
                    <td>${order.clientName}</td>
                    <td>${order.articleNumber}</td>
                    <td>${order.quantity}</td>
                    <td>${order.orderedFrom}</td>
                    <td>${order.orderNumber}</td>
                    <td>${order.orderDate}</td>
                    <td>${order.arrivedOn}</td>
                    <td>${order.creator}</td>
                </tr>
`
export async function completedView(ctx) {
    let list = await ctx.api.get('/parse/classes/completed');
    ctx.render(compTemp(list.results))
}