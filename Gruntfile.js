module.exports = function ( grunt ) {
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  var taskConfig = {
    jshint: {
      src: ['client/js/*', '!client/js/socket.io.min.js'],
      gruntfile: ['Gruntfile.js'],
      options: {
        curly:  true,
        immed:  true,
        newcap: true,
        noarg:  true,
        sub:    true,
        boss:   true,
        eqnull: true,
        node:   true,
        undef:  true,
        globals: {
          _:       false,
          jQuery:  false,
          angular: false,
          moment:  false,
          console: false,
          $:       false,
          io:      false,
          document:false,
        }
     }
   },
   concat: {
    bar: {
      src: ['client/js/*', '!client/js/socket.io.min.js'],
      dest: 'client/js/concat.js',
    },
   },
   uglify: {
    bar: {
      src: ['client/js/concat.js'],
      dest: 'client/js/ugly.js',
    }
   }
 };
 grunt.initConfig(taskConfig);
};