import { html } from "./lit-html.js";
import { loader } from "./loader.js";

const editTemp = (onEdit, order, expectedDate) => html `
        <div class="wrapper">
            <h2>Промяна на поръчка</h2>
            <form @submit=${onEdit} class="form">
                <div class="mb-3">
                    <label for="clientNumber" class="form-label">Клиентски номер</label>
                    <input type="text" name="clientNumber" class="form-control"  value="${order.clientNumber}">
                </div>
                <div class="mb-3">
                    <label for="clientName" class="form-label">Клиент</label>
                    <input type="text" name="clientName" class="form-control"  value="${order.clientName}">
                </div>
                <div class="mb-3">
                    <label for="articleNumber" class="form-label">Артикул</label>
                    <input type="text" name="articleNumber" class="form-control"  value="${order.articleNumber}">
                </div>
                <div class="mb-3">
                    <label for="quantity" class="form-label">Количество</label>
                    <input type="number" name="quantity" class="form-control"  value="${order.quantity}">
                </div>
                <div class="mb-3">
                    <label for="orderedFrom" class="form-label">Поръчан през</label>
                    <select class="form-select" name="orderedFrom" aria-label="Default select example">
                    ${order.orderedFrom == "Marketplace" ? 
                    html`<option selected>Marketplace</option>
                         <option>JIRA ticketing service</option>`
                    :html`<option >Marketplace</option>
                         <option selected>JIRA ticketing service</option>`
                        }
                    </select>                
                </div>
                <div class="mb-3">
                    <label for="orderNumber" class="form-label">Номер поръчка/тикет</label>
                    <input type="text" name="orderNumber" class="form-control"  value="${order.orderNumber}">
                </div>
                <div class="mb-3">
                    <label for="orderDate" class="form-label">Поръчан на</label>
                    <input type="text" name="orderDate" class="form-control"  value="${order.orderDate}" disabled="true">
                </div>
                <div class="mb-3">
                    <label for="expected" class="form-label">Очакван на</label>
                    <input type="date" name="expected" class="form-control" value="${expectedDate}">
                </div>
                <button type="submit" class="btn btn-add">Промени поръчка</button>
            </form>
        </div>

`

let context = null;
export async function editView(ctx){
    loader();
    context = ctx;
    let id = ctx.params.id;
    let order = await ctx.api.get(`/parse/classes/Order/${id}`);
    let year = new Date(order.expected).getFullYear();
    let month = new Date(order.expected).getMonth() + 1;
    let date = new Date(order.expected).getUTCDate();
    if (month < 10) {
        month = "0" + month;
    }
    let expectedDate = `${year}-${month}-${date}`;

    ctx.render(editTemp(onEdit,order,expectedDate))
}

async function onEdit(e) {
    e.preventDefault();

    let {
        clientNumber,
        clientName,
        articleNumber,
        quantity,
        orderedFrom,
        orderNumber,
        orderDate,
        expected
    } = Object.fromEntries(new FormData(e.target));

    if (!clientNumber || !clientName || !articleNumber || !quantity || quantity < 1 || !orderedFrom || !orderNumber || !expected) {
        alert('Всички полета трябва да са попълнени!');
        return;
    }
    const user = context.userData.getData();
    const creator = user.username;
    clientNumber = clientNumber.toUpperCase();
    clientName = clientName.toUpperCase();
    articleNumber = articleNumber.toUpperCase();
    orderNumber = orderNumber.toUpperCase();
    expected = new Date(expected).toString();



    let editedOrder = {clientNumber,clientName,articleNumber,quantity,orderedFrom,orderNumber,orderDate,expected,creator}

    try {
        let response = await context.api.put(`/parse/classes/Order/${context.params.id}`,editedOrder);
    } catch (error) {
        alert(`Нещо се обърка - прати грешката на Владо --> ${error.message}`);
    }

    context.redirect('/orders');


}