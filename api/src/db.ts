import { execSync } from 'child_process';

export const escape = (str: string): string => {
  return str.replace(/'/g, "''");
};

export const query = <T>(sql: string): T[] => {
  try {
    const output = execSync(`team-db "${sql.replace(/"/g, '\\"')}"`).toString();
    return JSON.parse(output);
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
};

export const execute = (sql: string): void => {
  try {
    execSync(`team-db "${sql.replace(/"/g, '\\"')}"`);
  } catch (error) {
    console.error('Database execution error:', error);
    throw error;
  }
};
