/*
 * grunt-combine-js
 * https://github.com/grumpydev22/grunt-combine-js
 *
 * Copyright (c) 2016 Andy Blackledge
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

    grunt.registerMultiTask('combine_js', 'combine js modules into one file', function() {
        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
            punctuation: '.',
            separator: ', '
        });

        var jsonSrc = this.data[0].src;
        jsonSrc = grunt.file.readJSON(jsonSrc);

        jsonSrc.forEach(function(item) {
            var src = item.modules;
            var destFolder = item.dest_path;
            var destName = item.dest_name;

            var paths = src.map(function (path) {
                var src = grunt.file.read(path);
                src = grunt.template.process(src, options.process);
                return src;
            }).join('');

            grunt.file.write(destFolder + destName, paths);
        });
    });
};
