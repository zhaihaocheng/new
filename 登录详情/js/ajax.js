var imgurl = ''
files.onchange = function(){
    var img = this.files[0]
    var images = new FormData()
    images.append('img',img)
    ajax({
        url:'http://localhost:8000/user/img',
        type:'post',
        data:images,
        success:function(da){
            console.log(da)
            var img = document.getElementById('img')
            imgurl= da
            img.innerHTML = '<img src="'+da+'">'
        },
        error:function(){

        }
    })
}
  button.onclick=function () {

      ajax1({
          url:'http://localhost:8000/user/login',
          type:'post',
          data:{
              login_name:login_name.value,
              login_password:login_password.value,

          },
          success:function(da){
              alert(da)
              if(da=="密码或账户不对"){
                    alert("密码或账户不对")
              }else {
                  window.open(da)
              }

          },
          error:function(){

          }
      })
  }
    submit.onclick = function(){
    ajax1({
        url:'http://localhost:8000/user/lee',
        type:'post',
        data:{
            imgurls:imgurl,
            name:user_name.value,
            sex:user_n.value,
            ip:ip.value,
            email:user_email.value,
            qq:qq.value,
            tel:phone.value,
            user_password:password.value,
            userid:1
        },
        success:function(da){
            alert(da)
        },
        error:function(){

        }
    })
}

function ajax(req){
//	console.log(req.data)
    if(window.XMLHttpRequest){
        var ajax = new XMLHttpRequest()
    }else{
        var ajax = new ActiveXObject( "Microsoft.XMLHTTP" );
    }
    if(req.type == 'get'){
        ajax.open('get',req.url+'?'+strdata(req.data),true)
        ajax.send()
    }else{
        ajax.open('post',req.url,true)
        ajax.send(req.data)
    }
    ajax.onreadystatechange = function(){
        if(ajax.readyState == 4){
            if(ajax.status>=200 && ajax.status<300 || ajax.status == 304){
                req.success(ajax.responseText)
//					console.log(ajax.responseText)
            }else{
                req.error(ajax.status)
            }

        }
    }

}


function ajax1(req){
//	console.log(req.data)
    if(window.XMLHttpRequest){
        var ajax = new XMLHttpRequest()
    }else{
        var ajax = new ActiveXObject( "Microsoft.XMLHTTP" );
    }
    if(req.type == 'get'){
        ajax.open('get',req.url+'?'+strdata(req.data),true)
        ajax.send()
    }else{
        ajax.open('post',req.url,true)
        ajax.setRequestHeader("Coation/x-wwwntent-Type","applic-form-urlencoded")
        ajax.send(strdata(req.data))
    }
    ajax.onreadystatechange = function(){
        if(ajax.readyState == 4){
            if(ajax.status>=200 && ajax.status<300 || ajax.status == 304){
                req.success(ajax.responseText)
//					console.log(ajax.responseText)
            }else{
                req.error(ajax.status)
            }

        }
    }

    function strdata(da){
        var arr = []
        for(var i in da){
            arr.push(i+'='+da[i])
        }
        var strurl = arr.join('&')
        return strurl
    }
}
