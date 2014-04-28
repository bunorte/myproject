module.exports = function (grunt) {
    var pkg = grunt.file.readJSON('package.json');
    var cfg = {
        src: './',
        serverHost: 'localhost',
        serverPort: 16888,
        livereload: 35729
    };  

    // Project configuration.
    grunt.initConfig({
        // 读取项目配置
        cfg: cfg,
        // 通过connect任务，创建一个静态服务器
        connect: {
          options: {
            port: cfg.serverPort,
            hostname: cfg.serverHost,
            middleware: function(connect, options) {
              return [
                require('connect-livereload')({
                  port: cfg.livereload
                }),
                // Serve static files.
                connect.static(options.base),
                // Make empty directories browsable.
                // connect.directory(options.base),
              ];
            }
          },
          server: {
            options: {
              // keepalive: true,
              base: cfg.src,
            }
          }
        },
        //打开浏览器
        open: {
          server: {
            url: 'http://localhost:' + cfg.serverPort
          }
        },
        //监控文件变化
        watch: {
          options: {
            livereload: cfg.livereload,
          },
          server: {
             files: ['*.html', 'js/*', 'images/*', 'less/*'],
             tasks: ['less'],
          },
        },


        less: {
            compile: {
                options: {
                    // 是否压缩css
                    compress: false,
                    // 是否启用 source map
                    sourceMap: true,
                    sourceMapRootpath: "../"
                },
                files:[{
                    // 不一一指定目标文件
                    expand: true,
                    // 源目录
                    cwd: 'less/',
                    // 源文件后缀
                    src: '*.less',
                    // 目标路径
                    dest: 'css/',
                    // 目标后缀
                    ext: '.css'
                }]
            }
        },

        

        // 复制文件
        copy: {
            main:{
                files:[
                    {expand: true, src: ['css/*.css'], dest: 'build/'},
                    {expand: true, src: ['js/*.js'], dest: 'build/'},
                    {expand: true, src: ['images/*.png','images/*.jpg','images/*.gif'], dest: 'build/'},
                    {expand: true, src: ['*.html'], dest: 'build/'}
                ]
            }
        },

        // 压缩build里的css
        cssmin: {
            options: {
                // 去掉注释
                keepSpecialComments: 0
            },
            minify: {
                // 不一一指定目标文件
                expand: true,
                // 源目录
                cwd: 'build/css/',
                // 源文件后缀
                src: '*.css',
                // 目标路径
                dest: 'build/css/',
                // 目标后缀
                ext: '.min.css'
            }
        }
    });

    // 加载插件
    grunt.loadNpmTasks('yhd-grunt-less');
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['less','cssmin','connect','open','watch']);

    grunt.registerTask('publish', ['less','copy', 'cssmin', 'connect','open','watch']);
};
