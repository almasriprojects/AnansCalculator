import { open } from 'sqlite';
import sqlite3 from 'sqlite3';
import path from 'path';

export async function openDB() {
  const dbPath = path.resolve(process.cwd(), 'app/db/DB_Will.sqlite3');
  return open({
    filename: dbPath,
    driver: sqlite3.Database
  });
}
