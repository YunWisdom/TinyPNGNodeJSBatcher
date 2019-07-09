#coding:utf-8
import Image  
import os
import logging
import sqlite3
from PIL import ImageFile

ImageFile.LOAD_TRUNCATED_IMAGES = True

#全局变量 数据库链接
global cx 

#全局变量 数据库链接游标
global cu

#全局变量 创建表单标识
global createTableFlag 

##########################################
# @function 判断是否为图片
# @param srcFile 待压缩图片
##########################################
def picIsCorrect(fileSuffix):
    if fileSuffix == ".png" or fileSuffix == ".jpg" or fileSuffix == ".jpeg":
        return True
    else:
        return False

##########################################
# @function 判断图片大小是否需要压缩
# @param srcFile 待压缩图片
##########################################
def picIsBig(srcFile):
    size = os.path.getsize(srcFile)/1024
    if size > 0 :
        return True
    else:
        return False

##########################################
# @function 判断图片大小是否被压缩过
# @description 如果图片信息存在于数据库中，则表明图片被压缩过，不需要再次压缩
# @param basename 待压缩图片名称
##########################################
def picIsCompressed(basename , dstFile):
    if selectTableCompressLog(basename , dstFile):
        #print(" images is already compressed which named " + basename + ' or path equals ' + dstFile)
        return True
    else:
        return False            

##########################################
# @function 创建记录压缩信息的表单
# @description 如果图片信息存在于数据库中，则表明图片被压缩过，不需要再次压缩
##########################################
def createTableCompressLog():
    #全局变量 创建表单标识
    global createTableFlag 
    if createTableFlag :
        try:
            create_tb_cmd='''
            create table compresslog (id varchar(64) primary key , name varchar(64) UNIQUE , path varchar(1024) UNIQUE , size integer , org_size integer , status integer)
            '''
            #主要就是上面的语句
            cu.execute(create_tb_cmd) 
            createTableFlag = False
        except:
            logging.info(" table compresslog maybe exist , create table compresslog fail ")
            createTableFlag = False

##########################################
# @function 查询表单中图片信息是否存在
# @description 如果图片信息存在于数据库中，则表明图片被压缩过，不需要再次压缩
##########################################
def selectTableCompressLog(basename , dstFile):
    #进行建表语句
    createTableCompressLog()
    #打开游标
    cu.execute("select * from compresslog where id = '" + basename + "'" + " or path = '" + dstFile + "'")
    #执行查询操作
    rows = cu.fetchall()
    if len(rows) > 0:
        print(" images is already compressed which named " + basename + ' or path equals ' + dstFile)
        return True
    else:
        print(" images is not compressed which named " + basename + ' or path equals ' + dstFile)
        return False    

##########################################
# @function 向压缩信息表单插入记录
# @description 如果图片信息存在于数据库中，则表明图片被压缩过，不需要再次压缩
##########################################
def insertTableCompressLog(basename , filename , dstFile , dsize , osize):
    #进行建表语句
    createTableCompressLog()
    #没有数据则插入数据
    if not selectTableCompressLog(basename , dstFile):
        #插入数据:
        cu.execute("insert into compresslog values('" + basename + "', '" + filename + "' , '" + dstFile + "' , " + str(dsize) + " , " + str(osize) + " , 0)")         
        #提交数据
        cu.commit()        


##########################################
# @function 图片压缩操作
# @param srcFile 待压缩图片
##########################################
def compressImage(srcPath,dstPath):  
    for filename in os.listdir(srcPath):  

        #如果不存在目的目录则创建一个，保持层级结构
        if not os.path.exists(dstPath):
            os.makedirs(dstPath)        

        #拼接完整的文件或文件夹路径
        srcFile=os.path.join(srcPath,filename)
        dstFile=os.path.join(dstPath,filename)
       
        srcFiledirName = os.path.dirname(srcFile)
        basename = os.path.basename(srcFile)  #获得文件全称 例如  migo.png
        filename, fileSuffix = os.path.splitext(basename)  #获得文件名称和后缀名  例如 migo 和 png 

        #如果是文件就处理
        if os.path.isfile(srcFile) and picIsCorrect(fileSuffix) and picIsBig(srcFile) and (not picIsCompressed(basename , dstFile)):     
            
            #打开原图片缩小后保存，可以用if srcFile.endswith(".jpg")或者split，splitext等函数等针对特定文件压缩
            sImg=Image.open(srcFile).convert('RGB')     
            #获取原图片长宽
            w,h=sImg.size  

            #获取压缩前图片大小，单位KB
            osize = os.path.getsize(srcFile)/1024

            if osize > 4096 :
                width = w/(compressRatio + 0.25)
                height = h/(compressRatio + 0.25)
                dImg=sImg.resize((int(width),int(height)),Image.ANTIALIAS)
            elif osize > 2048 :
                width = w/(compressRatio + 0.2)
                height = h/(compressRatio + 0.2)
                dImg=sImg.resize((int(width),int(height)),Image.ANTIALIAS)
            elif osize > 1024 :
                width = w/(compressRatio + 0.1)
                height = h/(compressRatio + 0.1)
                dImg=sImg.resize((int(width),int(height)),Image.ANTIALIAS)
            else:
                width = w/(compressRatio + 0.05)
                height = h/(compressRatio + 0.05)
                dImg=sImg.resize((int(w/width),int(h/height)),Image.ANTIALIAS)                                                                                                           

            #保存压缩后文件，单位KB        
            dImg.save(dstFile)           
            #获取压缩后文件大小
            dsize = os.path.getsize(dstFile)/1024

            #如果压缩后，压缩图片大于原图片，则在用原图片覆盖被压缩的图片
            if(dsize > osize):
                sImg.save(dstFile)
                dsize = os.path.getsize(dstFile)/1024

            #插入数据,被压缩的图片信息记录到数据库中，下次不再压缩
            insertTableCompressLog(basename , filename , dstFile , dsize , osize)
           
            logging.info("srcFile: " + srcFile + " dstFile: " + dstFile)
            logging.info("filename: " + filename + " fileSuffix: " + fileSuffix)
            logging.info("originally size:" + str(osize))
            logging.info("compressed size:" + str(dsize) + "  " + dstFile + " compressed succeeded" )
            print("srcFile: " + srcFile + " dstFile: " + dstFile + "filename: " + filename + " fileSuffix: " + fileSuffix + "originally size:" + str(osize) + "compressed size:" + str(dsize) + "  " + dstFile + " compressed succeeded" )
           

        #如果是文件夹就递归
        if os.path.isdir(srcFile):
            compressImage(srcFile,dstFile)

##########################################
# @function 主函数执行区域
# @description 快速压缩图片
##########################################
if __name__=='__main__':  
    #压缩比率
    compressRatio = 1.1
    #是否建表标识
    createTableFlag = True
    #Create Connection to INSERT COMPRESS IMAGES INFO TO DATABASE
    cx = sqlite3.connect("./database.db")
    #获取游标
    cu = cx.cursor() 
    #设置打印日志格式
    logging.basicConfig(filename='compress.log', level=logging.INFO)
    #进行递归压缩
    compressImage('C:/Workspace/Images', 'C:/Workspace/Images')

