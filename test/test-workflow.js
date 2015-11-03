'use strict';

var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;

describe('Moxie WP workflow file generation', function () {
  var workflow;

  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'tmp', 'workflow'), function (err) {
      if (err) {
        done(err);
      }
      workflow = helpers.createGenerator(
        'moxie-wp:workflow',
        [
          '../../../workflow'
        ],
        false
      );
      helpers.mockPrompt(workflow, { behaviour: 'y' });
      done();
    });
  });

  describe('create workflow file', function () {
    it('should create a workflow file', function(done){
      workflow.run({}, function(e) {
        assert.file( [ 'workflow.md' ]);
      })
      .on('end', done);
    });
  });
});

