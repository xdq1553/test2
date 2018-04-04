var gulp = require("gulp");

//拷贝html文件

gulp.task("copy-index",function(){
    return gulp.src("index.html").pipe(gulp.dest("dist")).pipe(connect.reload());
})
//拷贝文件夹
gulp.task("copy-html",function(){
    return gulp.src("html/*.html").pipe(gulp.dest("dist/html")).pipe(connect.reload());
})

//拷贝数据
gulp.task("data",function(){
    return gulp.src(["*.json","data/*.json"]).pipe(gulp.dest("dist/data")).pipe(connect.reload());
})

//拷贝图片以及压缩图片
var imagemin = require("gulp-imagemin");
gulp.task("images",function(){
    return gulp.src("images/**/*").pipe(imagemin()).pipe(gulp.dest("dist/images")).pipe(connect.reload());
})
//创建多个任务
gulp.task("build",["copy-html","copy-index","data","images","scss","scripts","server","watch"],function(){
    console.log("编译成功");
})
//合并文件夹
var concat = require("gulp-concat");


//拷贝scss文件，编译scss
var scss = require("gulp-sass-china");
var minifyCSS = require("gulp-minify-css");
var rename = require("gulp-rename");
gulp.task("scss",function(){
    return gulp.src("stylesheet/*.scss").pipe(scss()).pipe(gulp.dest("dist/css")).pipe(minifyCSS()).pipe(rename("index.min.css")).pipe(gulp.dest("dist/css")).pipe(connect.reload());

})

//拷贝js
gulp.task("scripts",function(){
    return gulp.src(["jquery/*.js","js/*.js"]).pipe(gulp.dest("dist/js")).pipe(connect.reload());
})

/*
    监听
*/

gulp.task("watch", function(){
    gulp.watch("index.html", ["copy-index"]);
    gulp.watch("html/*.html",["copy-html"])
    gulp.watch("*.json", ["data"]);
    gulp.watch("images/**/*", ["images"]);
    gulp.watch("stylesheet/*.scss", ["scss"]);
    gulp.watch(["jquery/*.js", "js/*.js"], ["scripts"]);
})

/*
    启动服务
    gulp-connect
*/
var connect = require("gulp-connect");
gulp.task("server", function(){
    connect.server({
        root: "dist",
        // ip:"10.30.152.1",
        port: 8080,
        livereload: true
    })
})


gulp.task("default", ["watch", "server"]);