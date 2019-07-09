<<<<<<< HEAD
//加载tinify图片压缩模块
=======

>>>>>>> f3971ebed019eaf29fb574bf48118fc017561d6c
var tinify = require("./tinify");

/** 
 * @function 在global.key数组中输入任意N个key, TinyPNG每个月每个免费的KEY都可以压缩500张图片
 * @description	申请key请到：https://tinypng.com/developers/subscription注册获取，将以下数组内容替换成你申请到的key
 * @description	compressAllFiles函数使用你的key的时候，会自动切换，如果你输入3个key，那么第一个key本月
 * @description	压缩数量用完后，会自动切换到第个key，以此类推。
 */
global.key = [
<<<<<<< HEAD
    "yKkuvUVjMvrkNDpbXFZGJueVQqcN5v4W",
    "QzMvROVPA9oHaWNnikFAyzHaDFhFRMPC",
    "JQ172FqwZZXL01uK0A8YhE55SLVEEOND",
    "0KsEUTD02jGbzQVoSqgI3ZlzRTlgcZdo",
    "8avxBxQrVvEuoCZE4PnmAsNeFsjwqHqU",
    "asXYjeCybyd4KolJwLbUWm8kaz6Afczk",
    "w8DkoU0jWo69D8wuhIEaZT1BYDsZzomX",
    "2yc3X7zUiHmCMorXanoBG8ShI5MoPX0y",
    "pNEtdDVEH6Dv4Cuk08ptOV3PzzlOsQYF",
    "meupuAOzUEIEC7mnBAreYnLo8kqSFUcs",
    "qGCUfLaRLTqGga3yfNHm9ds5mJA2jM0J",
    "tMaEahf5V3miIxCJ8vbGNWqWWaxCZ0O5",
    "UEsOMZzyMFY8qGxNDy35taz66jGjMOPa",
    "H9gNqUY6s4cv4mcUzZVKgZcOwhsUyIiu",
    "IC2tc50yT08HGDdMUU9VMPKTC3kJf2zR",
    "mikSOvXmssAYyt5XrDUHNPuzCjYOyeks",
    "DLVQrfNzVq8f8Rpm7my4NQHYl1OTTbMF",
    "C2HlCEVL7pscT6A0SX6c7EFrYKzW4l55",
    "_53YkYKYVHhKZihlAckkBWciYpRtit1P",
    "2qlmEQxVaDkxzG0h0wkmiPCxnyeVxBi3",
    "EyKfH9Uz3PRAQxM7RauuThiea1c7zjBM",
    "FICr6CS65mvNlH8Bq8It1kkeCNnKdBmm",
    "fKT3ZJrB7RQAed5wcnLYFKd0BpCSJAJ7",
    "KA8LP7qQzSF1LMrG2MsWLpV6Ogh48hpK",
    "pDfMS38cI1dWjWlLGK8O4xHIl4ZgcdUD",
    "5uzjn6PKRFR6d8otPqz6EaiXHdoNiZhS",
    "EpLizlLQHO0HaqpRa2hcmAvyAWDk3GDN",
    "nhAcGt3X7QXTTvUc46c1fmd7626mKhPT",
    "PoJ1b6i0YZ6r9neTn2XVgmNwLnMWZNhK",
    "kW3PRUnR05ZdZapIOIoaKGXK0nencWki",
    "X4GeQNYTUemFbdLTW3kTgiLO2cfA6qvZ",
    "CkCxsEjLYgLWVgnSXoxtvghcrj0jSThk",
    "wds65ntfWJR2rTRLiJDNqcEEwDDy5VYO",
    "mPizZvXIuWWa2i66S7Me40M5Oza6jr7M",
    "2eGis4Ijl74gpbWanpZt9LPCRcdgn6MX",
    "qHow6ANjfRYVIu59OnjzXxMcW78TpMcw",
    "nz5btLb0z2PtpgWZRfSFJVIvKsRRbx7g",
    "ZwsfXDdZlYEkJMS3HI7IRGl4IQ15aY64",
    "Oc4U6QyH3Y2L8hajde5gw1jf5IuhJxnz",
    "IP3WQc1r7ickfZWSDxKPEAKwPjKp0Lvz",
    "PU0LYmcImgkDtX1givmlTHI6YuZTAWJo",
    "nmOwxoOoQbyMiZ0BEPIe5tTX9UfclfWP",
    "UVB48eKou8vf2xld2vGOeoHyXUvEPrki",
    "0x4pVzcVPUTzZOishvFKTrGOGxSUpBJV",
    "dMHlVhv641Ccxf2G5ee0QT2Cq8Tg0rn1",
    "UZHGt7TRbi2NK1cYvY0XDmWzHh5sOd4k",
    "jFN9jwuiK7ts6Onm5mGsc28eBQN3r6C6",
    "yKRcFhYjwhpa1obxKjWyKhM5vecYT4cq",
    "oUnWboS5Z0TtFrSbxLf54TvkHNGdrnp6",
    "g13z9h4A9DN8M9o50vZaMedHSxS0IR4g",
    "xXEqU9eyJYycYzHcp2gdbqC0SF6LNMHk",
    "t9iay4vrGqmxlhnPCsExqNuZx1gE4NR6",
    "tWBLvCEXXspgPy8jx6QiCA2Jz89jvE3k",
    "hVPlGIjrLKcTzgxJge3jCKTfHtWqu8qC",
    "nw1BmLbOUPSdEax6mLyWSCjvGwUvEl2x",
    "V2IWSypD6bSyjm0kRQMEGaKmpacEbzhr",
    "qpp4WsL9j1GYodC8n6CUosxfpEZkVVzI",
    "73FKDEmaiKTsYqzjz3KWp2YTYOOebtri",
    "3JXSukiw63rWgp7nn6HyBIhmp99clWGE",
    "a5GQZVCNTj5neQwJl4Uw2UJ8DO0Cc5ma",
    "MhxdHzJnODEn4mRfhbU1TyEdLCLBOolQ",
    "b6E1mwXTrA8eaVPrPS9Ott1jsq0osEj5",
    "h7CB2rQosJHEZiMjrA1yei1hKL298jYR",
    "1aX6Ilv7vrpp5ktXV4ABGMNXxwyFuPo0",
    "V11dVZ0eKg9dUbfChCQyEYpI3OoSDeBM",
    "cQsLBuS3amOY2257ZPty5gZTYDpB3jEG",
    "Dt0NlgosQOmKrQtgpt5AXP5UCTdvgXsE",
    "zRKqUdlUE6QoBpsMhkByHTSiLiBzbLIS",
    "YemwbXEwBXono9hiGUXGvBKNazbFv1lr",
    "O9o8qsEcpTrDc07Zxovbv5xLldO7f7fA"
=======
	"yKkuvUVjMvrkNDpbXFZGJueVQqcN5v4W",
	"QzMvROVPA9oHaWNnikFAyzHaDFhFRMPC",
	"JQ172FqwZZXL01uK0A8YhE55SLVEEOND",
	"0KsEUTD02jGbzQVoSqgI3ZlzRTlgcZdo",
	"8avxBxQrVvEuoCZE4PnmAsNeFsjwqHqU",
	"asXYjeCybyd4KolJwLbUWm8kaz6Afczk",
	"w8DkoU0jWo69D8wuhIEaZT1BYDsZzomX",
	"2yc3X7zUiHmCMorXanoBG8ShI5MoPX0y",
	"pNEtdDVEH6Dv4Cuk08ptOV3PzzlOsQYF",
	"meupuAOzUEIEC7mnBAreYnLo8kqSFUcs",
	"qGCUfLaRLTqGga3yfNHm9ds5mJA2jM0J",
	"tMaEahf5V3miIxCJ8vbGNWqWWaxCZ0O5",
	"UEsOMZzyMFY8qGxNDy35taz66jGjMOPa",
	"H9gNqUY6s4cv4mcUzZVKgZcOwhsUyIiu",
	"IC2tc50yT08HGDdMUU9VMPKTC3kJf2zR",
	"mikSOvXmssAYyt5XrDUHNPuzCjYOyeks"
>>>>>>> f3971ebed019eaf29fb574bf48118fc017561d6c
];

//初始化
global.keyindex = 0;

//压缩所有指定目录文件到另一个指定目录
<<<<<<< HEAD
tinify.compressAllFiles('C:/Workspace/Images/', 'C:/Workspace/Images/', ['build'], ['.no.png']);
=======
tinify.compressAllFiles(
	'srcfolder:待压缩文件所在文件夹',
	'dstfolder:压缩完成后文件所在文件夹', ['blockfoldername：不参与压缩文件夹名称'], ['blockkeyword：不参与压缩文件后缀']);
//例如：tinify.compressAllFiles('/Users/alex_xq/Desktop/youku WORK/laifeng', '/Users/alex_xq/Desktop/out/', ['build'], ['.9.png']);


//工具方法：查找所有可以压缩的文件 
// tinify.tools_checkImages(
// 	'srcfolder:待压缩文件所在文件夹',
// 	'dstfolder:压缩完成后文件所在文件夹', ['blockfoldername：不参与压缩文件夹名称'], ['blockkeyword：不参与压缩文件后缀']);
//例如：tinify.tools_checkImages('/Users/alex_xq/Desktop/youku WORK/laifeng', '/Users/alex_xq/Desktop/out/', ['build'], ['.9.png']);

//工具方法：查找并拷贝所有可压缩文件 
// tinify.tools_findImageFiles(
// 	'srcfolder:待压缩文件所在文件夹',
// 	'dstfolder:压缩完成后文件所在文件夹', ['blockfoldername：不参与压缩文件夹名称'], ['blockkeyword：不参与压缩文件后缀']);
//例如：tinify.tools_findImageFiles('/Users/alex_xq/Desktop/youku WORK/laifeng', '/Users/alex_xq/Desktop/out/', ['build'], ['.9.png']);

//工具方法：反向将压缩后的文件覆盖原来对等目录结构的文件 
// tinify.tools_overWriteFiles(
// 	'srcfolder:待压缩文件所在文件夹',
// 	'dstfolder:压缩完成后文件所在文件夹', ['blockfoldername：不参与压缩文件夹名称'], ['blockkeyword：不参与压缩文件后缀']);
//例如：tinify.tools_overWriteFiles('/Users/alex_xq/Desktop/out', '/Users/alex_xq/Desktop/youku WORK/laifeng/', ['build'], ['.9.png']);
>>>>>>> f3971ebed019eaf29fb574bf48118fc017561d6c
