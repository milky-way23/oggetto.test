

/* 

Даны два массива — orders и statuses. В orders хранятся данные по заказам, в statuses возможные статусы заказа (от создания до доставки):

Создать функцию changeStatus, которая принимает как параметр id заказа и меняет статус на следующий по цепочке из массива
statuses и statusChangeTime на текущее. Фукнция должна возвращать объект следующего вида:

{
    status: 'success' / 'error',
    message: 'Статус заказа <id заказа> изменен на "<новый статус заказа>"' / <Текст ошибки в свободной форме>,
}

*/

(() => {
    'use strict'
    
    const orders = [
        {
            id: '24003874339',
            status: 'Передано в SAP',
            statusChangeTime: 'Sun Oct 24 2021 10:24:00 GMT+0300 (Москва, стандартное время)',
        },
        {
            id: '010001247991',
            status: 'Доставлен',
            statusChangeTime: 'Mon May 24 2021 11:59:00 GMT+0300 (Москва, стандартное время)',
        },
        {
            id: '13030778733',
            status: 'Ожидает оплаты',
            statusChangeTime: 'Mon Oct 25 2021 15:45:00 GMT+0300 (Москва, стандартное время)',
        },
        {
            id: '010001247987',
            status: 'Аннулирован',
            statusChangeTime: 'Thu Dec 12 2019 19:52:00 GMT+0300 (Москва, стандартное время)',
        },
        {
            id: 'DB000006008',
            status: 'Новый',
            statusChangeTime: 'Mon Oct 25 2021 16:50:00 GMT+0300 (Москва, стандартное время)',
        }
    ];
    
    const statuses = ['Новый', 'Ожидает оплаты', 'Передано в SAP', 'Доставлен'];
    
    function getNewOrderStatus(oldStatus){
        const nonChangebleStatuses = ['Доставлен','Аннулирован']
        const statusIndex = statuses.indexOf(oldStatus)
        const newStatus = !nonChangebleStatuses.includes(statuses[statusIndex]) && statusIndex !== -1
                        ? statuses[statusIndex + 1] 
                        : null
        return {
            status: newStatus,
            errors: newStatus ? false : true
        }
    }
    
    function changeStatus(id){
        
        const messageObj = {
            status: '',
            message: '',
        }
    
        if (!id) {
            messageObj.status = 'error';
            messageObj.message = 'Ошибка! отсутствет ID заказа';
            return messageObj
        } 
    
    
        const order = orders.filter( el => el.id === id)[0]
        const newStatus = getNewOrderStatus(order.status)	
        const changeDateTime = new Date();
        
        if(!newStatus.errors) {
            order.status = newStatus.status;
            order.statusChangeTime = changeDateTime.toString();
            messageObj.status = 'success';
            messageObj.message = `Статус заказа ${id} изменен на "${newStatus.status}"`
        } else {
            messageObj.status = 'error';
            messageObj.message = `Невозможно обновить статус заказа, свяжитесь с администратором. Текущий статус заказа ${order.status}`
        }
    
        return messageObj
    
    }
    
    window.changeStatus = changeStatus
    
    })()
    
    