//加载tinify图片压缩模块
var tinify = require("./tinify");

/** 
 * @function 在global.key数组中输入任意N个key, TinyPNG每个月每个免费的KEY都可以压缩500张图片
 * @description	申请key请到：https://tinypng.com/developers/subscription注册获取，将以下数组内容替换成你申请到的key
 * @description	compressAllFiles函数使用你的key的时候，会自动切换，如果你输入3个key，那么第一个key本月
 * @description	压缩数量用完后，会自动切换到第个key，以此类推。
 */
global.key = [
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
    ""
];

//初始化
global.keyindex = 0;

//压缩所有指定目录文件到另一个指定目录
tinify.compressAllFiles('C:/Workspace/Images/', 'C:/Workspace/OutImages/', ['build'], ['.no.png']);