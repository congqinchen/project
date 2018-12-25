var db = require('../common/basicConnection')
var $sqlCommands = require('../common/sqlCommand')

function findBrandch(req, res,next) {
    // 执行Query
    db.query($sqlCommands.toupiao.findBranch,
        function(err, result) {
            if(!err){
                result = {
                    code: 200,
                    msg:'success',
                    result:result
                };
            }
            // 以json形式，把操作结果返回给前台页面
            db.doReturn(res, result);
        }
    );
}



function findImgs(req, res,next) {
    var param =req.body || req.query || req.params;
    // 执行Query
    db.queryArgs($sqlCommands.toupiao.findImgs,[param.id],
        function(err, result) {
            if(!err){
                result = {
                    code: 200,
                    msg:'success',
                    result:result
                };
            }
            // 以json形式，把操作结果返回给前台页面
            db.doReturn(res, result);
        }
    );
}


function updateVotes(req, res, next) {
    var param =req.body || req.query || req.params;
    db.queryArgs($sqlCommands.toupiao.updateVotes,[param.votes,param.id],
        function(err, result) {
            if(!err){
                result = {
                    code: 200,
                    msg:'success',
                    result:result
                };
            }
            // 以json形式，把操作结果返回给前台页面
            db.doReturn(res, result);
        }
    );
}

function findVotes(req,res,next) {
    var param =req.body || req.query || req.params;
    db.queryArgs($sqlCommands.toupiao.findVotes,[param.id],
        function(err, result) {
            if(!err){
                result = {
                    code: 200,
                    msg:'success',
                    result:result
                };
            }
            // 以json形式，把操作结果返回给前台页面
            db.doReturn(res, result);
        }
    );
}

// exports
module.exports = {
    findBrandch: findBrandch,
    findImgs:findImgs,
    updateVotes:updateVotes,
    findVotes:findVotes
};