import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url'; // Node.js 13.2.0 or later

export const fileRemover = (filename) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  fs.unlink(path.join(__dirname, '../uploads', filename), function (err) {
    if (err && err.code == 'ENOENT') {
      console.log("file doesn't exist");
    } else if (err) {
      console.log("error on file remove");
    } else {
      console.log("removed");
    }
  });
};
