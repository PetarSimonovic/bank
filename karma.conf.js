module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        files: [
            'src/Bank.js',
            'src/Statement.js',
            'spec/BankSpec.js',
            'spec/StatemenntSpec.js'

        ],
        preprocessors: {
            'src/Bank.js': ['coverage']
            'src/Statement.js': ['coverage']
        },
        plugins: [
            'karma-jasmine',
            'karma-phantomjs-launcher',
            'karma-coverage',
            'karma-chrome-launcher',
            'karma-spec-reporter'
        ],
        reporters: ['progress', 'coverage', 'spec'],
        port: 9878,
        colors: true,
        logLevel: config.LOG_DEBUG,
        autowatch: true,
        browsers: ['Chrome'],
        singleRun: false,
        concurrency: Infinity,
        coverageReporter: {
            includeAllSources: true,
            dir: 'coverage/',
            reporters: [
                { type: "html", subdir: "html" },
                { type: 'text-summary' }
            ]
        }
    });
}
