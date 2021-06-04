// This section sets up some basic app metadata,
// the entire section is optional.
App.info({
    id: 'com.brightpsy.platform',
    name: 'brightpsy',
    description: 'A platform for mental health',
    author: 'Brightpsy S.r.l',
    email: 'niloy@brightpsy.com',
    website: 'https://brightpsy.com',
});

App.configurePlugin('cordova-plugin-googleplus', {
    REVERSED_CLIENT_ID: 'com.googleusercontent.apps.599926406900-v6j208q5knqd3hiplasja62leerkv8ls'
});

App.appendToConfig(`
<platform name="ios">
  <resource-file target="GoogleService-Info.plist" src="../../../cordova-build-override/GoogleService-Info.plist"/>
</platform>
`)

App.accessRule('https://*.cloudinary.com', { type: 'navigation' });
App.accessRule('https://*.googleapis.com', { type: 'navigation' });
App.accessRule('https://*.brightpsy.ovh', { type: 'navigation' });