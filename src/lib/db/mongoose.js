import mongoose from "mongoose";
import dns from "node:dns";
import { env } from "../env/env.js";

dns.setServers(["1.1.1.1"]);

await mongoose.connect(env.db.DB_URI);