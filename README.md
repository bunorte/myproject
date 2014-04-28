# 前端项目工具

参考以下代码搞的自动编译less，压缩css，建立简单本地服务器，自动用浏览器打开，更改代码自动刷新。

[1号店移动端前端项目自动化工具](https://github.com/TVVT/mobile-start)

[Grunt+Livereload 搭建本地前端开发环境](http://my.oschina.net/liuyong25/blog/140110)

[Grunt插件之LiveReload 实现页面自动刷新，所见即所得编辑](http://www.bluesdream.com/blog/grunt-plugin-livereload-wysiwyg-editor.html)

## 功能
* 集成自己常用的css reset代码
* 自动编译less为css，并可以自动压缩
* 自动运行一个本地服务器，用默认浏览器打开，更改文件后自动刷新

## 使用方法
电脑上安装NodeJS,命令行进入所在目录执行`npm install`,然后执行`grunt`.
全部完成后执行`grunt publish`，会生成所有html,css到build目录。
