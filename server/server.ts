import app from "./src/app.ts";
import "dotenv/config";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening server ${PORT}`);
});
