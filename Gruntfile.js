module.exports = function ( grunt ) {
 grunt.loadNpmTasks('grunt-contrib-jshint');
 var taskConfig = {
   jshint: {
     src: ['scripts/app.js', 'scripts/loginController.js', 'scripts/roomsController.js', 'scripts/roomController.js'],
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
          $:       false
        }
     }
   }
 };
 grunt.initConfig(taskConfig);
};