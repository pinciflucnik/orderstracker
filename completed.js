import { html } from "./lit-html.js";


const compTemp = (list) => html`
        <table class="table table-dark table-striped">
            <thead>
                <tr>
                <th scope="col">Клиентски номер</th>
                <th scope="col">Клиент</th>
                <th scope="col">Артикул</th>
                <th scope="col">Количество</th>
                <th scope="col">Поръчан през</th>
                <th scope="col">Номер поръчка/тикет</th>
                <th scope="col">Поръчан на</th>
                <th scope="col">Пристигнал на</th>
                <th scope="col">Създаден от</th>
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
    ctx.loader();
    let list = await ctx.api.get('/parse/classes/completed');
    ctx.render(compTemp(list.results))
}
