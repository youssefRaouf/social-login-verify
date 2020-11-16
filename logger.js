const fs = require('fs');

const util = require('util');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);


const logPath = './api_logs.logs';

class Logger {}

Logger.logs = [];

export async function writeLogs() {
  const logs = Logger.logs;
  let data = null;
  try {
    data = await readFile(logPath, 'UTF-8');
  } catch (e) {
    console.log(e);
  }
  try {
    let ar = [];
    if (data) {
      ar = JSON.parse(data);
    }
    ar = [...ar, ...logs];
    await writeFile(logPath, JSON.stringify(ar));
  } catch (e) {
    console.log(e);
  }
}

export function log(error) {
  Logger.logs.push(error);
}

export function getLogs() {
  return Logger.logs;
}

export function clearLogs() {
  Logger.logs = [];
}

