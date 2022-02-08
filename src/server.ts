import { MongoHelper } from "./frameworks-drivers/external/database/db";
import app from "./frameworks-drivers/web/app";


MongoHelper.connect(process.env.MONGODB_URI!)
  .then(async () => {
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log("Server running at " + port);
    });
  })
  .catch(console.error);
