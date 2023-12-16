import {
    html
} from "./lit-html.js";


const addTemp = (onCreate) => html `
        <div class="wrapper">
            <h2>Нова поръчка</h2>
            <form @submit=${onCreate} class="form">
                <div class="mb-3">
                    <label for="clientNumber" class="form-label">Клиентски номер</label>
                    <input type="text" name="clientNumber" class="form-control"  placeholder="B00000">
                </div>
                <div class="mb-3">
                    <label for="clientName" class="form-label">Клиент</label>
                    <input type="text" name="clientName" class="form-control"  placeholder="ф-ма Антон Гайтанов">
                </div>
                <div class="mb-3">
                    <label for="articleNumber" class="form-label">Артикул</label>
                    <input type="text" name="articleNumber" class="form-control"  placeholder="1K0803899D">
                </div>
                <div class="mb-3">
                    <label for="quantity" class="form-label">Количество</label>
                    <input type="number" name="quantity" class="form-control"  placeholder="0">
                </div>
                <div class="mb-3">
                    <label for="orderedFrom" class="form-label">Поръчан през</label>
                    <select class="form-select" name="orderedFrom" aria-label="Default select example">
                    <option>Marketplace</option>
                    <option>JIRA ticketing service</option>
                    </select>                
                </div>
                <div class="mb-3">
                    <label for="orderNumber" class="form-label">Номер поръчка/тикет</label>
                    <input type="text" name="orderNumber" class="form-control"  placeholder="HCBG-39923">
                </div>
                <div class="mb-3">
                    <label for="orderDate" class="form-label">Поръчан на</label>
                    <input type="text" name="orderDate" class="form-control"  value=${new Date()}>
                </div>
                <div class="mb-3">
                    <label for="expected" class="form-label">Очакван на</label>
                    <input type="date" name="expected" class="form-control">
                </div>
                <button type="submit" class="btn btn-dark">Добави поръчка</button>
            </form>
        </div>

`
let context = null;
export function addView(ctx) {
    context = ctx;
    ctx.render(addTemp(onCreate));
}

async function onCreate(e) {
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



    let newOrder = {clientNumber,clientName,articleNumber,quantity,orderedFrom,orderNumber,orderDate,expected,creator}

    try {
        let response = await context.api.post('/parse/classes/Order',newOrder);
    } catch (error) {
        alert(`Нещо се обърка - прати грешката на Владо --> ${error.message}`);
    }

    context.redirect('/orders');

}
