module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        htmlmin: { // Task
            dist: { // Target
                options: { // Target options
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: { // Dictionary of files
                    './resources/views/dist/home.blade.php': './resources/views/dev/home.blade.php',
                    './resources/views/dist/welcome.blade.php': './resources/views/dev/welcome.blade.php',
                    './resources/views/dist/layouts/app.blade.php': './resources/views/dev/layouts/app.blade.php',
                    './resources/views/dist/layouts/dashboard.blade.php': './resources/views/dev/layouts/dashboard.blade.php',
                    './resources/views/dist/auth/login.blade.php': './resources/views/dev/auth/login.blade.php',
                    './resources/views/dist/auth/register.blade.php': './resources/views/dev/auth/register.blade.php',
                    './resources/views/dist/auth/passwords/email.blade.php': './resources/views/dev/auth/passwords/email.blade.php',
                    './resources/views/dist/auth/passwords/reset.blade.php': './resources/views/dev/auth/passwords/reset.blade.php',
                    './resources/views/dist/create_show.blade.php': './resources/views/dev/create_show.blade.php',
                    './resources/views/dist/list_shows.blade.php': './resources/views/dev/list_shows.blade.php'

                }
            }
        },
        sass: {
            dist: {
                files: {
                    './public/css/common.css': './public/css/common.scss'
                }
            }
        },
        concat: {
            css: {
                files: {
                    './public/css/packed/style.css': [
                        './public/css/bootstrap.css',
                        './public/css/common.css',
                        './public/css/main.css'

                    ]
                }
            }
        },

        uglify: {
            my_target: {
                options: {
                    sourceMap: true,
                    sourceMapName: 'sourceMap.map'
                },
                build: {
                    //                    src: 'src/<%= pkg.name %>.js',
                    dest: 'build/<%= pkg.name %>.min.js'
                },
                files: {
                    './public/js/packed/app.min.js': [

                        './public/js/jquery.js',
                        './public/js/popper.min.js',
                        './public/js/bootstrap.js',
                        './public/js/jquery.validate.min.js',
                        './public/js/custom/login.js',
                        './public/js/custom/shows.js'

                    ]
                }
            }
        },
        cssmin: {
            css: {
                src: './public/css/packed/style.css',
                dest: './public/css/packed/style.min.css'
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');


    // Default task(s).
    grunt.registerTask('default', ['sass', 'concat', 'uglify', 'cssmin', 'htmlmin']);

};