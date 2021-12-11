import sendRequest from "./httpRequest";

export async function getAllForms(){
    return sendRequest({
        path: '/form/',
        method: 'get',
        data: null,
        showNotificationSuccess: false,
        showNotificationFailue: true
    })
}

export async function getFormById(id){
    return sendRequest({
        path: '/form/' + id,
        method: 'get',
        data: null,
        showNotificationSuccess: false,
        showNotificationFailue: true
    })
}

export async function createForm(form){
    return sendRequest({
        path: '/form/',
        method: 'post',
        data: form,
        showNotificationSuccess: true,
        showNotificationFailue: true
    })
}

export async function updateForm(form){
    return sendRequest({
        path: '/form/',
        method: 'put',
        data: form,
        showNotificationSuccess: true,
        showNotificationFailue: true
    })
}

export async function deleteForm(id){
    return sendRequest({
        path: '/form/'+id,
        method: 'delete',
        data: null,
        showNotificationSuccess: true,
        showNotificationFailue: true
    })
}