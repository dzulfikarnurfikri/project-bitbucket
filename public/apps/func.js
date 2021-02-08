function getnotif() {
    APIcall('/NotifController/show', 'GET', null, function(result){
        let datas = result.data;
        $('.dropdown-list-content').empty();
        $( "#notifbeep" ).removeClass( "beep" );
        let beep = 0;
        $.map(datas, function(i, val){
            let t = "<a href='"+i.uri+"' class='dropdown-item dropdown-item-unread notifdrop' id='"+i.id+"' uri='"+i.uri+"'>";
            t += "<div class='dropdown-item-icon bg-primary text-white'>";
            t += "<i class='fas fa-code'></i>";
            t += "</div>";
            t += "<div class='dropdown-item-desc'>";
            t += "<p><strong>"+i.key+"</strong></p>";
            t += "<p><strong>"+i.notif+"</strong></p>";
            t += "<div class='time text-primary'>"+ timeAgo(i.created_at) +" By "+i.from+"</div>";
            t += "</div>";
            t += "</a>";
            $('.dropdown-list-content').append(t);
            if(i.deleted_at == null){
                beep++
            }
        })
        if(beep != 0){
            $( "#notifbeep" ).addClass( "beep" );
        }
    });
}


function timeAgo(dateParam) {
    if (!dateParam) {
      return null;
    }
  
    const date = typeof dateParam === 'object' ? dateParam : new Date(dateParam);
    const DAY_IN_MS = 86400000; // 24 * 60 * 60 * 1000
    const today = new Date();
    const yesterday = new Date(today - DAY_IN_MS);
    const seconds = Math.round((today - date) / 1000);
    const minutes = Math.round(seconds / 60);
    const isToday = today.toDateString() === date.toDateString();
    const isYesterday = yesterday.toDateString() === date.toDateString();
    const isThisYear = today.getFullYear() === date.getFullYear();
  
  
    if (seconds < 5) {
      return 'now';
    } else if (seconds < 60) {
      return `${ seconds } seconds ago`;
    } else if (seconds < 90) {
      return 'about a minute ago';
    } else if (minutes < 60) {
      return `${ minutes } minutes ago`;
    } else if (isToday) {
      return (date, 'Today'); // Today at 10:20
    } else if (isYesterday) {
      return getFormattedDate(date, 'Yesterday'); // Yesterday at 10:20
    } else if (isThisYear) {
      return getFormattedDate(date, false, true); // 10. January at 10:20
    }
  
    return getFormattedDate(date); // 10. January 2017. at 10:20
}

const MONTH_NAMES = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

function getFormattedDate(date, prefomattedDate = false, hideYear = false) {
    const day = date.getDate();
    const month = MONTH_NAMES[date.getMonth()];
    const year = date.getFullYear();
    const hours = date.getHours();
    let minutes = date.getMinutes();
  
    if (minutes < 10) {
      // Adding leading zero to minutes
      minutes = `0${ minutes }`;
    }
  
    if (prefomattedDate) {
      // Today at 10:20
      // Yesterday at 10:20
      return `${ prefomattedDate } at ${ hours }:${ minutes }`;
    }
  
    if (hideYear) {
      // 10. January at 10:20
      return `${ day }. ${ month } at ${ hours }:${ minutes }`;
    }
  
    // 10. January 2017. at 10:20
    return `${ day }. ${ month } ${ year }. at ${ hours }:${ minutes }`;
}

    $(document).on('click',".notifdrop", function(){
        let id = $(this).attr("id");
        let uri = $(this).attr("uri");
        APIcall('/NotifController/getNotif/'+id, 'GET', null, function(result){
            // let datas = result.data;
            location.href= uri;
        });
    });       
       
       function alertNumber(number) {
            return number;
        }

        function ToastAlert(tipe, title, msg){
            if(tipe == "message"){
                iziToast.info({
                    title: title,
                    message: message,
                    position: 'topRight'
                });
            }else if(tipe == "info"){
                iziToast.info({
                    title: title,
                    message: message,
                    position: 'topRight'
                });
            }else if(tipe == "success"){
                iziToast.success({
                    title: title,
                    message: message,
                    position: 'topRight'
                });
            }else if(tipe == "warning"){
                iziToast.warning({
                    title: title,
                    message: message,
                    position: 'topRight'
                });
            }else if(tipe == "error"){
                iziToast.error({
                    title: title,
                    message: message,
                    position: 'topRight'
                });
            }else if(tipe == "show"){
                iziToast.show({
                    title: title,
                    message: message,
                    position: 'topRight'
                });
            }else{
                iziToast.danger({
                    title: title,
                    message: msg,
                    position: 'topRight'
                });
            } 
        }

        function ConfirmAlert(titles, texts, result){
            swal({
                title: titles,
                text: texts,
                icon: 'warning',
                buttons: true,
                dangerMode: true,
            }).then((willDelete) => {
                result(willDelete);
            });
        }

        

        function rdtext(length) {
            var result           = '';
            var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var charactersLength = characters.length;
            for ( var i = 0; i < length; i++ ) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
        }

        function shorter(text, limit){
            if (text.length > limit)
            {
                return text.substr(0, limit)+'...';
            }else{
                return text;
            }
        }

        (function ($) {
            $.fn.serializeFormJSON = function () {
        
                var o = {};
                var a = this.serializeArray();
                $.each(a, function () {
                    if (o[this.name]) {
                        if (!o[this.name].push) {
                            o[this.name] = [o[this.name]];
                        }
                        o[this.name].push(this.value || '');
                    } else {
                        o[this.name] = this.value || '';
                    }
                });
                return o;
            };
          })(jQuery);