var db = require('../common/basicConnection')
var $sqlCommands = require('../common/sqlCommand')
var utils =require('../utils/util')

// 查询开奖结果
function findKJres(req,res,next){
    var params = req.query
    var time =params.time;
    db.queryArgs($sqlCommands.kjResult.findkjResult,[time],
        function(err,result){
          if(!err){
              result = {
                  code: 200,
                  msg:'success',
                  result:result
              };
          }
          db.doReturn(res, result);
        })
}


function kaij(req,res,next){
    var params = req.body || req.params || req.query;
    var endTime = params.endTime || '';
    var startTime = params.startTime || "";
    db.queryArgs($sqlCommands.customer.findCustomer,[endTime,startTime],
        function(err,result){
            if(!err){
               chouj(result,endTime,res)
            }
        })
}

function chouj(result,endTime,res){
    var list = result;
    //一等奖
    if(list.length>5){
        for(var i =0;i<5;i++){
            var obj={}
            var index = sum(1,list.length)-1;
            obj=list[index];
            list.splice(index,1)
            addKJResult(obj,"一等奖",endTime);
        }
    }else{
        for(var i =0;i<list.length;i++){
            addKJResult(list[i],"一等奖",endTime);
            list.splice(i,1)
        }

    }
    var list01=[];
    if(list && list.length>0){
        list01 = list;
        //抽二等级
        if(list01.length>10){
            for(var i=0;i<10;i++){
                var obj={}
                var index = sum(1,list01.length)-1;
                obj=list01[index];
                list01.splice(index,1)
                addKJResult(obj,"二等奖",endTime);
            }
        }else{
            for(var i =0;i<list01.length;i++){
                addKJResult(list01[i],"二等奖",endTime);
                list01.splice(i,1)
            }

        }
    }
    var list02=[];
    if(list01.length>0){
       list02 = list01;
        //抽三等级
        if(list02.length>20){
            for(var i=0;i<20;i++){
                var obj={}
                var index = sum(1,list02.length)-1;
                obj=list02[index];
                list02.splice(index,1)
                addKJResult(obj,"三等奖",endTime);
            }
        }else{
            for(var i =0;i<list02.length;i++){
                addKJResult(list02[i],"三等奖",endTime);
                list02.splice(i,1);
            }

        }
    }


    var result = {
        code:200,
        msg:'success'
    }
    db.doReturn(res,result);
}

function addKJResult(obj,type,endTime) {
    db.queryArgs($sqlCommands.kjResult.addKJResult,
        [type,obj.name,obj.id,obj.phone,endTime],
        function(err,result){
            if(!err){
               console.log("成功")
            }
        })
}


function sum (m,n){
    var num = Math.floor(Math.random()*(m - n) + n);
    return num
}



module.exports = {
    findKJres:findKJres,
    kaij:kaij
};