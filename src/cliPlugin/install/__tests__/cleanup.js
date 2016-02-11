import expect from 'expect.js';
import sinon from 'sinon';
import fs from 'fs';
import rimraf from 'rimraf';

import { cleanPrevious } from '../cleanup';
import Logger from '../../lib/logger';

describe('kibana cli', function () {

  describe('plugin installer', function () {

    describe('pluginCleaner', function () {
      const settings = {
        workingPath: 'dummy'
      };

      describe('cleanPrevious', function () {
        let cleaner;
        let errorStub;
        let logger;
        let progress;
        let request;

        beforeEach(function () {
          errorStub = sinon.stub();
          logger = new Logger(settings);
          sinon.stub(logger, 'log');
          sinon.stub(logger, 'error');
          request = {
            abort: sinon.stub(),
            emit: sinon.stub()
          };
        });

        afterEach(function () {
          logger.log.restore();
          logger.error.restore();
          fs.statSync.restore();
          rimraf.sync.restore();
        });

        it('should resolve if the working path does not exist', function () {
          sinon.stub(rimraf, 'sync');
          sinon.stub(fs, 'statSync', function () {
            const error = new Error('ENOENT');
            error.code = 'ENOENT';
            throw error;
          });

          return cleanPrevious(settings, logger)
          .catch(errorStub)
          .then(function (data) {
            expect(errorStub.called).to.be(false);
          });
        });

      });

    });

  });

});
