const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.deleteAccount = functions.https.onCall((data, context) => {
  console.log(context);
  return admin
    .auth()
    .deleteUser(data)
    .then(function() {
      console.log("Successfully deleted user");
    })
    .catch(function(error) {
      console.log("Error deleting user:", error);
    });
});
