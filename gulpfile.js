'use strict'

// 引入gulp
var gulp = require('gulp');
// 加载gulp-load-plugins插件，并马上运行它 它会帮我们自动加载 package.json 文件里的gulp插件
var plugins = require('gulp-load-plugins')();


// less文件编译成css文件
gulp.task('lessToCss', function () {
  gulp.src('./css/*.less') // 需要编译的文件
  .pipe(plugins.less()) // 执行编译命令
  .pipe(plugins.minifyCss()) // 压缩css文件
  .pipe(plugins.rename({suffix: '.min'})) // 改名为xxx.min.css
  .pipe(gulp.dest('./css')) // 放在这个文件夹下面
  .pipe(plugins.livereload()); // 实时监听这个任务
})


// js文件的压缩
gulp.task('minify', function () {
  gulp.src('./js/index.js') // 选择文件
  .pipe(plugins.browserify())
  .pipe(plugins.uglify()) // 执行压缩命令
  .pipe(plugins.rename('bundle.js')) // 将文件名改成bundle.js
  .pipe(gulp.dest('./')) // 把bundle.js放在根目录下
  .pipe(plugins.livereload()); // 实时监听这个任务
})


// 启动服务
gulp.task('webserver', function(){
  gulp.src('./')
      .pipe(plugins.webserver({
          port: 8080,// 端口
          livereload: true,// 实时刷新代码。不用f5刷新
          open: true, // 运行时打开浏览器
          fallback: './html/index.html', // 打开的文件
      }))
});


// 监听刷新
gulp.task('watch', function () {
  plugins.livereload.listen(); // 在这里要调用listen()方法
  gulp.watch('./css/*.less', ['lessToCss']); // 监听css文件夹下的less文件 有变动就执行less命令
  gulp.watch('./js/*.js',['minify']); // 监听js文件夹下的js文件 有变动久执行uglify
})
