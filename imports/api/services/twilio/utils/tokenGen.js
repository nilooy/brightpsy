import Twilio from "twilio";

// Access Token used for Video, IP Messaging, and Sync
const AccessToken = Twilio.jwt.AccessToken;
const ChatGrant = AccessToken.ChatGrant;
const VideoGrant = AccessToken.VideoGrant;
const SyncGrant = AccessToken.SyncGrant;

/**
 * Generate an Access Token for an application user - it generates a random
 * username for the client requesting a token or generates a token with an
 * identity if one is provided.
 *
 * @return {Object}
 *         {Object.identity} String random indentity
 *         {Object.token} String token generated
 */
export const tokenGenerator = (identity = 0) => {
  // Create an access token which we will sign and return to the client
  const token = new AccessToken(
    Meteor.settings.twilio.twilio_account_sid,
    Meteor.settings.twilio.twilio_api_key,
    Meteor.settings.twilio.twilio_api_secret
  );

  // Assign the provided identity or generate a new one
  token.identity = identity;

  // Grant the access token Twilio Video capabilities
  const videoGrant = new VideoGrant();
  token.addGrant(videoGrant);

  if (Meteor.settings.twilio.twilio_chat_service_sid) {
    // Create a "grant" which enables a client to use IPM as a given user,
    // on a given device
    const chatGrant = new ChatGrant({
      serviceSid: Meteor.settings.twilio.twilio_chat_service_sid,
    });
    token.addGrant(chatGrant);
  }

  if (Meteor.settings.twilio.twilio_sync_service_sid) {
    // Point to a particular Sync service, or use the account default to
    // interact directly with Functions.
    const syncGrant = new SyncGrant({
      serviceSid: Meteor.settings.twilio.twilio_sync_service_sid || "default",
    });
    token.addGrant(syncGrant);
  }

  // Serialize the token to a JWT string and include it in a JSON response
  return {
    identity: token.identity,
    token: token.toJwt(),
  };
};
