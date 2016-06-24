module.exports = function(grunt) {

    require("load-grunt-tasks")(grunt);

    grunt.initConfig({
        concat: {
            listing: {
                src: [
                    'javascript/Properties/build/Listing.js'
                ],
                dest: 'javascript/Properties/build/concat.js'
            },
        },
        uglify: {
            admin: {
                files: {
                    'javascript/Properties/build/script.min.js': 'javascript/Properties/build/concat.js',
                }
            },
        },

        clean: {
            contents: ['javascript/Properties/build/concat.js'],
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask("dist", ['concat', 'uglify', 'clean']);
};
