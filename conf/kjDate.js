var db = require('../common/basicConnection')
var $sqlCommands = require('../common/sqlCommand')

function findKjDate(req, callback) {
    var param = req.query || req.params;
    // 执行Query
    db.query($sqlCommands.kjDate.findJKDate,
        function(err, result) {
            callback(err,result);
        }
    );

}

function findAllCustomer(req, callback) {
    var param = req
    db.queryArgs($sqlCommands.customer.findCustomer,[param.endTime,param.startTime],
        function(err, result) {
            randowCJ(result);
        }
    );
}



function randowCJ(res){
    var length = res.length;
    for(var i =0;i<5;i++){

    }
    var res = GetRandomNum(0,length-1);
}

function GetRandomNum(Min,Max)
{
    var Range = Max - Min;
    var Rand = Math.random();
    return (Min + Math.round(Rand * Range));
}


// exports
module.exports = {
    findKjDate: findKjDate,
    findAllCustomer:findAllCustomer
};