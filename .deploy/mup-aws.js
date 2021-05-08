module.exports = {
    app: {
        // Tells mup that the AWS Beanstalk plugin will manage the app
        type: 'aws-beanstalk',
        name: 'brightpsy-aws',
        version: "0.0.1",
        path: '../',
        env: {
            ROOT_URL: 'https://brightpsy.com',
            MONGO_URL: "mongodb://mongodb/brightpsy",
        },
        auth: {
            id: 'AKIAZB7TYEGY32JAX6XZ',
            secret: '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'
        },
        minInstances: 1,
        // All options are optional.
        buildOptions: {
            // Set to true to skip building mobile apps
            // but still build the web.cordova architecture. (recommended)
            serverOnly: true,

            // Set to true to disable minification and bundling,
            // and include debugOnly packages
            debug: false,

            // your app url for mobile app access
            server: 'https://brightpsy.ovh',

            // When true, adds --allow-incompatible-updates arg to build command
            allowIncompatibleUpdates: false,

            // Executable used to build the meteor project
            // You can set to a local repo path if needed
            executable: 'meteor'
        },
    },
    plugins: ['mup-aws-beanstalk']
};