let tipe = $(".jstoast").attr('id');
let message = $(".jstoast").attr('val');
if(tipe){
    if(tipe == "message"){
        iziToast.info({
            title: tipe,
            message: message,
            position: 'topRight'
        });
    }else if(tipe == "info"){
        iziToast.info({
            title: tipe,
            message: message,
            position: 'topRight'
        });
    }else if(tipe == "success"){
        iziToast.success({
            title: tipe,
            message: message,
            position: 'topRight'
        });
    }else if(tipe == "warning"){
        iziToast.warning({
            title: tipe,
            message: message,
            position: 'topRight'
        });
    }else if(tipe == "error"){
        iziToast.error({
            title: tipe,
            message: message,
            position: 'topRight'
        });
    }else if(tipe == "show"){
        iziToast.show({
            title: tipe,
            message: message,
            position: 'topRight'
        });
    }           
}


