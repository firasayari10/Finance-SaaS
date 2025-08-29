import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { migrate } from 'drizzle-orm/neon-http/migrator';

const main = async () => {
  try {
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL environment variable is not set');
    }

    console.log('Connecting to database...');
    const sql = neon(process.env.DATABASE_URL);
    const db = drizzle(sql);
    
    console.log('Running migrations...');
    await migrate(db, { 
      migrationsFolder: './drizzle',
    });
    
    console.log('successful migration');
    process.exit(0);
  } catch (error) {
    console.error('failed to migrate ', error);
    process.exit(1);
  }
};

main();