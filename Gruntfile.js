module.exports = function(grunt) {

  grunt.initConfig({
    sass: {
      dist: {
        options: {
          style: 'expanded'
        },
        files: [{
          "expand": true,
          "cwd": "src/styles/",
          "src": ["*.scss"],
          "dest": "dist/styles/",
          "ext": ".css"
        }]
      }
    }
  })

  grunt.loadNpmTasks('grunt-contrib-sass')

  grunt.registerTask('default', ['sass:dist'])
}