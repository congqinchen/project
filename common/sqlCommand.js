//user_status单一的user_status表SQL-Command
var user = {
    findOne: 'SELECT count(*) as num FROM user a where a.username= ? and a.password= ?'
};

var kjDate = {
    findJKDate : 'SELECT t.* FROM tb_kj_date t  ORDER BY  t.kj_date ASC'
}

var toupiao = {
    findBranch : 'SELECT * FROM tb_tp_info ORDER BY votes DESC',
    findImgs:'SELECT id, imgurl FROM tb_tp_img  WHERE tp_info_id = ?',
    updateVotes: 'UPDATE tb_tp_info set votes = ? WHERE id = ?',
    findVotes:'SELECT votes FROM tb_tp_info WHERE id=?'
}

var customer = {
    findCustomer : "SELECT id,name,phone,create_date as date FROM customer WHERE del_flag= 1 AND create_date < ? AND create_date > ? ORDER BY create_date ASC",
    DeleteCustomer:'UPDATE customer SET del_flag = 0',
}

var kjResult = {
    findkjResult : "select id,name,REPLACE(phone,SUBSTR(phone,4,4), '****') as phone ,type from kj_result  WHERE create_date = ?  ORDER BY type",
    addKJResult:'INSERT INTO kj_result (type,name,customer_id,phone,create_date) VALUES (?,?,?,?,?)'
}


//exports
module.exports = {
    user: user,
    kjDate:kjDate,
    toupiao:toupiao,
    customer:customer,
    kjResult:kjResult
};

