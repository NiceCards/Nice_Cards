import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const serverRoot = path.resolve(__dirname, '..');

// Load environment variables from server/.env
dotenv.config({ path: path.resolve(serverRoot, '.env') });

const config = {
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT, 10) || 5000,
  mongoUri: process.env.MONGO_URI || 'mongodb+srv://sanu12entertainment_db_user:QWBE6AwNjXW9oAG7@cluster21.lkphksg.mongodb.net/?appName=Cluster21',
  jwtSecret: process.env.JWT_SECRET || 'nicecards_dev_secret',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  adminPassword: process.env.ADMIN_PASSWORD || 'Admin12345',
  adminEmail: process.env.ADMIN_EMAIL || 'Kumardk776483@gmail.com',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  uploadsDir: process.env.UPLOADS_DIR || 'uploads',
  serverRoot,
};

export default config;

