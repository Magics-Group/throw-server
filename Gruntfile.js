module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);
    grunt.initConfig({
        babel: {
            options: {
                presets: ['es2015']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: ['**/*.js'],
                    dest: 'build'
                }]
            }
        },
        clean: {
            build: ['./build/']
        },
        watchChokidar: {
            options: {
                spawn: true
            },
            js: {
                files: ['src/**/*.js'],
                tasks: ['newer:babel']
            }
        },
        nodemon: {
            script: 'build/app.js'
        },
        concurrent: {
            run: {
                tasks: ['nodemon', 'watchChokidar'],
                options: {
                    logConcurrentOutput: true
                }
            }
        }
    });

    grunt.registerTask('default', ['clean:build', 'newer:babel', 'concurrent:run'])

    process.on('SIGINT', () => process.exit(1))
}