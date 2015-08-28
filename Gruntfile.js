module.exports = function(grunt) {
   grunt.initConfig({
     pkg: grunt.file.readJSON('package.json'),
     uglify: {
       my_target: {
         files: {
           'public/javascripts/app.min.js': 'client/javascripts/app.js'
         }
       }
     },
     copy: {
       main: {
         files: [
           {expand: true, cwd: 'client', src: 'images/*', dest: 'private/', filter: 'isFile'},
           {expand: true,cwd: 'client', src: 'stylesheets/*', dest: 'public/', filter: 'isFile'}
         ]
       }
     }
   })
   grunt.loadNpmTasks('grunt-contrib-uglify');
   grunt.loadNpmTasks('grunt-contrib-copy');
   grunt.registerTask('default', ['uglify', 'copy']);
};
