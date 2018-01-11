function GetRequest() {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for(var i = 0; i < strs.length; i ++) {
            theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}
var chaid=GetRequest().id
console.log(chaid);
var arrs = []
var num = 0

ww.onclick=function () {
    if(jianil.style.display=="block"){
        jianil.style.display="none"
    }else{
        jianil.style.display="block"
        qu.style.display="none"
    }

}
quan.onclick=function () {
    if(qu.style.display=="block"){
        qu.style.display="none"
    }else{
        qu.style.display="block"
        jianil.style.display="none"
    }

}

ajax1({
    url:'http://localhost:8000/user/chaimg',
    type:'post',
    data:{uid:chaid},
    success:function(da){
        var aru=eval('('+da+')')
   for(i in aru){
       console.log(aru[i].imgurl)
       touimg.innerHTML='<img src="'+aru[i].imgurl+'">'
       yy.innerHTML=aru[i].name
   }



    },
    error:function(){

    }
})

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
        ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded")
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