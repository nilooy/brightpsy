const { privatePath } = require("@ui/routes/privatePath");

process.env.MAIL_URL =
  "smtp://apikey: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@smtp.sendgrid.net:587";

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
