import express from 'express';
import sequelize from './database.js';
import { configDotenv } from 'dotenv';
import app from './app.js';
import fs from 'fs';

const PORT = 5087;

  try {
    await sequelize.authenticate();
    console.log('✅ Connected to MySQL');

    await sequelize.sync({ force: false });
    console.log('✅ Database synced');

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ Failed to connect or sync DB:', err);
    process.exit(1);
  }

