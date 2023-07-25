

const { privatePath } = require("@ui/routes/privatePath");

process.env.MAIL_URL =
    "";

Accounts.emailTemplates.from = "verify@email.brightpsy.com";

Accounts.emailTemplates.resetPassword.text = function ({ profile }, url) {
    return " || Clicca questa link per cambiare il password \n" + url;
};

Accounts.urls.resetPassword = function (token) {
    return Meteor.absoluteUrl("/forgot-password/" + token);
};


/* Server	smtp.sendgrid.net
Ports
25, 587	(for unencrypted/TLS connections)
465	(for SSL connections)
Username	apikey
Password	YOUR_API_KEY */