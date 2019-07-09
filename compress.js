var tinify = require("tinify");
var fs = require("fs");
var sqlite3 = require('sqlite3');
var SqliteDB = require('./sqlite.js').SqliteDB;

var file = "database.db";
var sqliteDB = new SqliteDB(file);

var counter = 0;
var successcounter = 0;
var failedcounter = 0;

global.varA = 0;
global.recomputingkey = false;

var events = require("events");
global.eventCompress = new events.EventEmitter();

function tinifyCompress(srcfile, desfile) {

    //压缩前文件大小
    let imageSize = fs.statSync(srcfile).size

    //只压缩300KB以上的图片
    if (imageSize >= 300000 && !picIsCompress(srcfile, desfile)) {

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
                } else if (err instanceof tinify.ClientError ||
                    err instanceof tinify.AccountError) {

                    if (err.message.indexOf(' Your monthly limit has been exceeded') >= 0) {
                        /*该账户数目超过，换下一个key重试*/
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
                console.log(" origin size : " + imageSize);
                console.log(" compressed size : " + compressedSize);
                console.log(' comressed:' + (counter + 1) + '/' + global.varA + '(' + desfile + ')');
                tinifyCounter(0);

            });
        });

    } else {
        console.log(' comressed failed:' + (counter + 1) + '/' + global.varA + '(' + desfile + ') caused by original image is too small or is already compressed ');
        tinifyCounter(1);
    }

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

    if (counter === global.varA) {
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
function picIsCompress(filename, dstFile) {
    return selectTableCompressLog(filename, dstFile);
}

/**
 * @function 创建表单函数
 */
function createTableCompressLog() {
    //全局变量 创建表单标识
    if (createTableFlag) {
        try {
            //建表语句
            create_tb_cmd = "create table compresslog_node (id varchar(64) primary key , name varchar(64) UNIQUE , path varchar(1024) UNIQUE , size integer , org_size integer , status integer)";
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
    //没有数据则插入数据
    if (!selectTableCompressLog(basename, dstFile)) {
        //插入数据
        sqliteDB.insertData("insert into compresslog_node values('" + basename + "', '" + filename + "' , '" + dstFile + "' , " + str(dsize) + " , " + str(osize) + " , 0)");
    }

}

/**
 * @function 查询表单函数
 */
function selectTableCompressLog(filename, dstFile) {
    //进行建表语句
    createTableCompressLog();
    //打开游标
    sqliteDB.queryData("select * from compresslog_node where id = '" + basename + "'" + " or path = '" + dstFile + "' ", rows);
    if (rows.length > 0) {
        console.log(" images is already compressed which named " + basename)
        return true;
    } else {
        console.log(" images is not compressed which named " + basename)
        return false;
    }
}

exports.tinifyCompress = tinifyCompress;