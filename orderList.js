import { html } from "./lit-html.js";
import { onArrive } from "./onArrive.js";

const allOrdersTemp = (list, currentDate,onArrive,username,buttonTemp) => html`
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
                <th scope="col">Очакван на</th>
                <th scope="col">Създаден от</th>
                <th scope="col"></th>
            </tr>
            </thead>
            <tbody>
                ${list.map((order)=> temp(order,currentDate,onArrive,username,buttonTemp))}
            </tbody>
        </table>
`
const temp = (order, currentDate,onArrive,username) => html`
${Date.parse(order.expected) > Date.parse(currentDate)? orderTemp(order,onArrive,username,buttonTemp)
: Date.parse(order.expected) < Date.parse(currentDate) ? rowDanger(order,onArrive,username,buttonTemp)
: rowWarning(order,onArrive,username,buttonTemp)}
`

const orderTemp = (order,onArrive,username,buttonTemp) => html`
                <tr id=${order.objectId}>
                    <td>${order.clientNumber}</td>
                    <td>${order.clientName}</td>
                    <td>${order.articleNumber}</td>
                    <td>${order.quantity}</td>
                    <td>${order.orderedFrom}</td>
                    <td>${order.orderNumber}</td>
                    <td>${order.orderDate.slice(3,15)}</td>
                    <td>${order.expected.slice(3,15)}</td>
                    <td>${order.creator}</td>
                    ${order.creator == username ? html`<td>${buttonTemp(onArrive)}</td>`: html`<td></td>`}
                </tr>

`
const rowWarning = (order,onArrive,username,buttonTemp) => html`
    <tr class="table-warning" id=${order.objectId}>
        <td>${order.clientNumber}</td>
        <td>${order.clientName}</td>
        <td>${order.articleNumber}</td>
        <td>${order.quantity}</td>
        <td>${order.orderedFrom}</td>
        <td>${order.orderNumber}</td>
        <td>${order.orderDate.slice(3,15)}</td>
        <td>${order.expected.slice(3,15)}</td>
        <td>${order.creator}</td>
        ${order.creator == username ? html`<td>${buttonTemp(onArrive)}</td>`: html`<td></td>`}
    </tr>
`

const rowDanger = (order,onArrive,username,buttonTemp) => html`
    <tr class="table-danger" id=${order.objectId}>
        <td>${order.clientNumber}</td>
        <td>${order.clientName}</td>
        <td>${order.articleNumber}</td>
        <td>${order.quantity}</td>
        <td>${order.orderedFrom}</td>
        <td>${order.orderNumber}</td>
        <td>${order.orderDate.slice(3,15)}</td>
        <td>${order.expected.slice(3,15)}</td>
        <td>${order.creator}</td>
        ${order.creator == username ? html`<td>${buttonTemp(onArrive)}</td>`: html`<td></td>`}
    </tr>

`
const buttonTemp = (onArrive) => html`
    <button @click=${onArrive} type="button" class="btn btn-secondary">Завърши</button>
`

const noOrders = () => html`
    <h1>Все още няма поръчки!</h1>
`
const notLogged = () => html`
    <h1>Само вписани потребители могат да виждат поръчките</h1>
`

export async function ordersView(ctx) {
    ctx.loader();
    let list = await ctx.api.get('/parse/classes/Order');
    let user = ctx.userData.getData();
    let username = user.username;
    if(!user){
        ctx.render(notLogged());
        return;
    }
    if (list.results.length == 0){
        ctx.render(noOrders());
        return;
    }
    let currentDate = new Date();
    ctx.render(allOrdersTemp(list.results,currentDate,onArrive,username,buttonTemp));

}

