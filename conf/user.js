var db = require('../common/basicConnection')
var $sqlCommands = require('../common/sqlCommand')

/**
 * 增加用户Action
 */
function addUserAction(req, res, next){
    // 获取前台页面传过来的参数
    var param = req.query || req.params;
    // 执行Query
    db.queryArgs($sqlCommands.user.insertOne,
        [param.username,param.password],
        function(err, result) {
            if(!err){
                result = {
                    code: 200,
                    msg:'success'
                };
            }
            // 以json形式，把操作结果返回给前台页面
            db.doReturn(res, result);
        }
    );
}
function loginAction(req, res, next){
    var param =req.body || req.query || req.params;
    // 执行Query
    db.queryArgs($sqlCommands.user.findOne,
        [param.username,param.password],
        function(err, result) {
            if(!err){
                if(result[0].num != 0){
                    result = {
                        code: 200,
                        msg:'success'
                    };
                    req.session.name= param.username;
                    req.session.sign = true;
                }else{
                    result = {
                        code: 202,
                        msg:'账户或密码不对'
                    };
                }
            }
            // 以json形式，把操作结果返回给前台页面
            db.doReturn(res, result);
        }
    );
}


// exports
module.exports = {
    addUserAction: addUserAction,
    loginAction:loginAction
};