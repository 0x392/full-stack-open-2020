const helper = require("./helper");

(async () => {
  try {
    await helper.db.connect();
    await helper.db.clear();
    await helper.model.saveUsers();
    await helper.model.saveBlogs();
    await helper.db.disconnect();
    console.log("done");
  } catch (error) {
    console.error(error.message);
  }
})();
