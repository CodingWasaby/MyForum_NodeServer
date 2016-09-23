function login(){
    $.ajax({
        url:'/LoginSubmit',
        type:'POST',
        data:{
            userName:$('#userName').val(),
            password:$('#password').val()
         },
         traditional: true,
         success:function(result){
             if(result){
                 window.location.href='/Index';
             }
             else{
                 alert('false');
             }
         }
    })
}