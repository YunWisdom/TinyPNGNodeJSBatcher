/**
 * File: sqlite.js.
 * Author: W A P.
 * Email: 610585613@qq.com.
 * Datetime: 2018/07/24.
 */
 
var fs = require('fs');
var sqlite3 = require('sqlite3').verbose(); 

var DB = DB || {}; 

/**
 * @function 创建数据库函数
 */
DB.SqliteDB = function(file) {  
    DB.db = new sqlite3.Database(file);   
    DB.exist = fs.existsSync(file);  
    if (!DB.exist) {    
        console.log("Creating db file!");    
        fs.openSync(file, 'w');  
    };
}; 

/**
 * @function 打印错误信息函数
 */
DB.printErrorInfo = function(err) {  
    console.log("Error Message:" + err.message + " ErrorNumber:" + errno);
}; 

/**
 * @function 数据库建表函数
 */
DB.SqliteDB.prototype.createTable = function(sql) {  
    //tilesData format; [[level, column, row, content], [level, column, row, content]]
    DB.db.serialize(function() {    
        DB.db.run(sql, function(err) {      
            if (null != err) {        
                DB.printErrorInfo(err);        
                return;      
            }    
        });  
    });
}; 

/**
 * @function 插入函数
 */
DB.SqliteDB.prototype.insertData = function(sql, objects) {  
    DB.db.serialize(function() {    
        var stmt = DB.db.prepare(sql);    
        for (var i = 0; i < objects.length; ++i) {      
            stmt.run(objects[i]);    
        }       
        stmt.finalize();  
    });
}; 

/**
 * @function 查询函数
 */
DB.SqliteDB.prototype.queryData = function(sql, param, callback) {  
    DB.db.all(sql, param, function(err, rows) {    
        if (null != err) {      
            DB.printErrorInfo(err);      
            return;    
        }     
        //Deal query data.
        if (callback) {      
            callback(rows);    
        }  
    });
}; 

/**
 * @function 查询函数
 */
DB.SqliteDB.prototype.getData = function(sql, param, callback) {
    DB.db.get(sql, param, (err, rows) => {
        if (null != err) {      
            DB.printErrorInfo(err);      
            return;    
        }     
        //Deal query data.
        if (callback) {      
            callback(rows);    
        }  
    });
}

/**
 * @function 执行SQL函数 
 */
DB.SqliteDB.prototype.executeSql = function(sql) {  
    DB.db.run(sql, function(err) {    
        if (null != err) {      
            DB.printErrorInfo(err);    
        }  
    });
}; 

/**
 * @function 关闭数据库连接函数
 */
DB.SqliteDB.prototype.close = function() {  
    DB.db.close();
}; 

//Export SqliteDB.
exports.SqliteDB = DB.SqliteDB;