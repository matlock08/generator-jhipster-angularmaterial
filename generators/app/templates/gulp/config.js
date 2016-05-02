module.exports = {
    app: '<%= MAIN_SRC_DIR %>',
    dist: '<%= DIST_DIR %>',
    test: '<%= TEST_SRC_DIR %>',
    bower: '<%= MAIN_SRC_DIR %>bower_components/',
    tmp: '<%= BUILD_DIR %>tmp',
    revManifest: '<%= BUILD_DIR %>tmp/rev-manifest.json',
    port: 9000,
    apiPort: <%= serverPort %>,
    liveReloadPort: 35729,
    uri: 'http://localhost:'
};
