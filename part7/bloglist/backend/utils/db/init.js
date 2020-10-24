const helper = require("./helper");

(async () => {
  try {
    await helper.db.connect();
    await helper.db.clear();
    await helper.model.saveUsers();
    await helper.model.loginAndGetTokens();
    await helper.model.saveBlogs();
    await helper.db.disconnect();
    helper.model.dumpData("log.json");
    console.log("done");
  } catch (error) {
    console.error(error.message);
    console.log(
      "Note that the local backend server should start to provide API endpoints"
    );
  }
})();
