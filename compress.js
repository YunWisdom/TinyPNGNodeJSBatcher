var tinify = require("tinify");
var fs = require("fs");
var events = require("events");
var path = require('path');
var SqliteDB = require('./sqlite.js').SqliteDB;
//var db = require('better-sqlite3')('database.db', options);


var file = "database.db";
var sqliteDB = new SqliteDB(file);

var counter = 0;
var successcounter = 0;
var failedcounter = 0;
var createTableFlag = true;
var originSize = 0;

global.execflag = true;
global.varA = 0;
global.recomputingkey = false;
global.eventCompress = new events.EventEmitter();

function tinifyCompress(srcfile, desfile) {

    if (!global.execflag) {

        return;

    } else {

        //压缩前文件大小
        let imageSize = fs.statSync(srcfile).size;
        //计算原文件合集大小
        originSize = originSize + imageSize;

        //只压缩0KB以上的图片，且未压缩过的图片
        if (imageSize >= 0) {

            //如果图片没有被压缩过，则执行压缩操作
            picIsCompress(srcfile, desfile, function(flag) {
                if (!flag) {
                    tinifyExec(srcfile, desfile, imageSize);
                } else {
                    console.log(' comressed failed:' + (counter + 1) + '/' + global.varA + '(' + desfile + ') caused by original image is already compressed ');
                    tinifyCounter(1);
                }
            })

        } else {
            console.log(' comressed failed:' + (counter + 1) + '/' + global.varA + '(' + desfile + ') caused by original image is too small ');
            tinifyCounter(1);
        }

        return;
    }

}

/**
 * @function 执行压缩操作
 * @param srcfile 原文件路径
 * @param desfile 目标文件路径
 * @param imageSize 图片大小
 */
function tinifyExec(srcfile, desfile, imageSize) {

    let basename = path.basename(srcfile);
    let extname = path.extname(srcfile);
    let filename = basename.replace(extname, '');

    fs.readFile(srcfile, function(err, sourceData) {

        if (err) throw err;

        console.log(' compress started.' + srcfile);

        tinify.fromBuffer(sourceData).toBuffer(function(err, resultData) {
            // if (err) throw err;
            // fs.writeFileSync(desfile, resultData);

            if (err instanceof tinify.ConnectionError ||
                err instanceof tinify.ServerError) {
                console.log(' compress failed.' + srcfile + ', recompress.');
                tinifyCompress(srcfile, desfile);
                return;
            } else if (err instanceof tinify.ClientError || err instanceof tinify.AccountError) {

                if (err.message.indexOf(' Your monthly limit has been exceeded') >= 0) {
                    //该账户数目超过，换下一个key重试
                    //查看是否还有可用的账户
                    if (global.recomputingkey === false) {
                        //尚未在本次换过key
                        global.recomputingkey = true;
                        global.keyindex++;
                        if (global.keyindex < global.key.length) {
                            console.log(' use no' + global.keyindex + ' account key.');
                            tinify.key = global.key[global.keyindex];
                            tinifyCompress(srcfile, desfile);
                        } else {
                            console.log(' no valide account.');
                            process.exit();
                        }
                    } else {
                        //已经在本次换过key
                        tinifyCompress(srcfile, desfile);
                    }
                    return;
                }

                console.log(' comressed failed:' + (counter + 1) + '/' + global.varA + '(' + desfile + ')');
                tinifyCounter(1);
                return;
            }

            fs.writeFileSync(desfile, resultData);
            let compressedSize = fs.statSync(desfile).size
            console.log(' comressed:' + (counter + 1) + '/' + global.varA + '(' + desfile + ')' + " origin size : " + imageSize + " compressed size : " + compressedSize);
            tinifyCounter(0);

            //压缩成功，先数据库中写入压缩记录
            insertTableCompressLog(basename, filename, desfile, compressedSize, imageSize);

        });
    });
}

/**
 * @function 压缩统计函数
 * @param type 类型 0 压缩成功 1 压缩失败
 */
function tinifyCounter(type) {
    switch (type) {
        case 0:
            successcounter++;
            break;
        case 1:
            failedcounter++;
            break;
        default:
            break;
    }

    counter++;
    global.eventCompress.emit('compressFinish');
    if (counter >= global.varA) {
        global.execflag = false;
        global.eventCompress.emit('FinishAll');
        var result = "result  {success:" + successcounter + "/" + counter + ",failed:" + failedcounter + "/" + counter + "}";
        console.log(result);
    }
}

/**
 * @function 判断图片是否被压缩
 * @param filename 图片名称
 * @param dstFile 图片压缩目的地
 */
function picIsCompress(filename, dstFile, callback) {
    return selectTableCompressLog(filename, dstFile, callback);
}

/**
 * @function 创建表单函数
 */
function createTableCompressLog() {

    //全局变量 创建表单标识
    if (createTableFlag) {
        try {
            //建表语句
            create_tb_cmd = "create table if not exists compresslog_node (id varchar(64) primary key , name varchar(64) UNIQUE , path varchar(1024) UNIQUE , size integer , org_size integer , status integer)";
            //执行建表语句
            sqliteDB.createTable(create_tb_cmd);
            createTableFlag = false;
        } catch (except) {
            console.log(" table compresslog_node maybe exist , create table compresslog_node fail ");
            createTableFlag = false;
        }
    }
}

/**
 * @function 插入表单函数
 */
function insertTableCompressLog(basename, filename, dstFile, dsize, osize) {

    //进行建表语句
    createTableCompressLog();

    try {
        //没有数据则插入数据
        selectTableCompressLog(basename, dstFile, function(flag) {
            if (!flag) {
                //插入数据
                sqliteDB.insertData("insert into compresslog_node values(?,?,?,?,?,0)", [
                    [basename, filename, dstFile, dsize, osize]
                ]);
            }
        });

    } catch (error) {

    }
}

/**
 * @function 查询表单函数
 */
function selectTableCompressLog(basename, dstFile, callback) {

    //查询结果集
    var rows;
    //进行建表语句
    createTableCompressLog();

    try {
        sqliteDB.getData(' select * from compresslog_node where path = ?  ', [dstFile], function(data) {
            rows = data;
            if (typeof(rows) != 'undefined') {
                //console.log(" images is already compressed which named " + basename);
                callback(true);
                return true;
            } else {
                //console.log(" images is not compressed which named " + basename);
                callback(false);
                return false;
            }
        })

    } catch (error) {

    }

}

exports.tinifyCompress = tinifyCompress;