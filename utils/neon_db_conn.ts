import { neon } from "@neondatabase/serverless";
import { NeonConfig } from "./neon_utils";

const config = NeonConfig.apiKey
// Create an instance of Neon's TS/JS driver
const sql = neon(config);

export default sql