import * as api from "./api.js";
import page from "./page.mjs";

export async function onArrive(e){

    let data = e.target.parentElement.parentElement.querySelectorAll('td');
    let id = e.target.parentElement.parentElement.getAttribute('id');

    let clientNumber = data[0].textContent;
    let clientName = data[1].textContent;
    let articleNumber = data[2].textContent;
    let quantity = data[3].textContent;
    let orderedFrom = data[4].textContent;
    let orderNumber = data[5].textContent;
    let orderDate = data[6].textContent;
    let arrivedOn = new Date().toString().slice(3,15);
    let creator = data[8].textContent;
    let completedOrder = {clientNumber,clientName,articleNumber,quantity,orderedFrom,orderNumber,orderDate,arrivedOn,creator};

    await api.post('/parse/classes/completed',completedOrder);
    await api.del(`/parse/classes/Order/${id}`);
    page.redirect('/orders');
}
