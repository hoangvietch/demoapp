import fs from 'fs';
import colors from 'colors';

const getActualRequestDurationInMilliseconds = start => {
  const NS_PER_SEC = 1e9;
  const NS_TO_MS = 1e6;
  const diff = process.hrtime(start);
  return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS;
};

const logger = (req, res, next) => {
  const currentDateTime = new Date();
  const formattedDate = `${currentDateTime.getFullYear()}-${
    currentDateTime.getMonth() + 1
  }-${currentDateTime.getDate()} ${currentDateTime.getHours()}:${currentDateTime.getMinutes()}:${currentDateTime.getSeconds()}`;
  const { method } = req;
  const { url } = req;
  const status = res.statusCode;
  const start = process.hrtime();
  const durationInMilliseconds = getActualRequestDurationInMilliseconds(start);
  const log = `[${colors.green(formattedDate)}] ${colors.blue(
    method,
  )}:${url} ${status} ${colors.red(
    durationInMilliseconds.toLocaleString(),
  )} ms`;
  console.log(log);
  fs.appendFile('request_logs.txt', `${log}\n`, err => {
    if (err) {
      console.error(err);
    }
  });
  next();
};

export default logger;
