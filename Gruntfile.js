module.exports = function ( grunt ) {
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
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
 };
 grunt.initConfig(taskConfig);
};