var express = require('express')
var multer = require('multer')
var mysql = require('mysql')
var fs = require('fs')
var path = require('path')
var bodyParser = require('body-parser')
var user = express.Router()
var app = express()
var pool = mysql.createPool({
	host:'localhost',
	user:'root',
	password:'',
	database:'taobao',

})
app.use(bodyParser.urlencoded({}))
app.use(multer({dest:'./img'}).any())
app.use('/user',user)    
user.post('/img',function(req,res){
    res.header('Access-Control-Allow-Origin','*')
	var img = req.files
	var name = req.files[0].filename
	var newName = name+path.parse(req.files[0].originalname).ext
	fs.rename('./img/'+name,'./img/'+newName,function(err){
		if(err){


			console.log(err)
			return
		}

		res.send('http://localhost:8000/img/'+newName)
	})
	console.log(newName)
	
})
user.post('/lee',function(req,res){
    res.header('Access-Control-Allow-Origin','*')
	var imgurls = req.body.imgurls
    var name = req.body.name
    var sex = req.body.sex
    var ip = req.body.ip
    var tel = req.body.tel
    var email = req.body.email
	var user_passwordq=req.body.user_password
    var qq = req.body.qq
    var userid = req.body.userid
	 console.log(tel)
	console.log(user_passwordq)
            pool.getConnection(function(err,connection){
                if(err){
                    console.log('connection::'+err)
                    return
    	}
                var sqlq = 'SELECT * FROM Characters where name=?'
                connection.query(sqlq,[name],function(err,data){
                    if(err){
                        console.log('mysql第一::'+err)
                        return
                    }
                    	if(data.name==name){
                             res.send('用户名已从存在')
                              return
						}else{
                            var sqlyy = 'insert into Characters(name,imgurl,sex,ip,tel,email,qq,userid,password) values(?,?,?,?,?,?,?,?,?)'
                            var arryy = [name,imgurls,sex,ip,tel,email,qq,userid,user_passwordq]
                            connection.query(sqlyy,arryy,function(err,data){
                                if(err){
                                    console.log('mysql::'+err)
                                    return
                                }
                                 res.send('ok')
                                   return

                            })


						}


                    connection.end()
                })

    })
})


user.post('/login',function(req,res){
    res.header('Access-Control-Allow-Origin','*')
    var login_name = req.body.login_name
    var login_password=req.body.login_password
	console.log(login_name)
    console.log(login_password)
    pool.getConnection(function(err,connection){
        if(err){
            console.log('connection::'+err)
            return
        }
        var sqlrr = 'SELECT * FROM Characters'

        connection.query(sqlrr,function(err,data) {
            if (err) {
                console.log('mysql::' + err)
                return
            }
            console.log(data);
            for (i in data) {
            }
            if (data[i].name == login_name && data[i].password == login_password) {
                console.log("成功登陆")

                res.send('http://localhost:8000/list.html?id=' + data[i].id)
                return
            } else {
                res.send("密码或账户不对")   //根本原因就是重复做出响应！！！导致//了这些错误~~~
                return
            }
      
            connection.end()

        })
    })
})
user.post('/chaimg',function(req,res){
    var nomeid=req.body.uid
    console.log(nomeid)
    res.header('Access-Control-Allow-Origin','*')
    pool.getConnection(function(err,connection){
        if(err){
            console.log('connection::'+err)
            return
        }
        var sql = 'SELECT * FROM Characters WHERE id=?'

        connection.query(sql,[nomeid],function(err,data){
            if(err){
                console.log('mysql::'+err)
                return
            }
            console.log(data);
            res.send(data)
            connection.end()

        })
    })
})

app.use(express.static('./'))
app.listen(8000,function(){
	console.log('ok')
})
