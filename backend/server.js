const expressApp = require("./app.js");
const PORT = process.env.PORT || 8080;

expressApp.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});