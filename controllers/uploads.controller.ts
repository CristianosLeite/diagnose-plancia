import { Express } from 'express';
import { Multer } from 'multer';
import { existsSync, mkdirSync, rename } from 'fs';
import { join } from 'path';

export function fileUpload(server: Express, upload: Multer, browserDistFolder: string) {
  server.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: 'No files were uploaded.' });
    }

    const file = req.file;
    const dir = join(browserDistFolder, 'uploads');

    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }

    const targetPath = join(dir, file.originalname);

    rename(file.path, targetPath, (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      return res.json({
        message: 'File uploaded!',
        fileName: file.originalname,
        filePath: browserDistFolder + '/uploads/' + file.originalname
      });
    });

    return;
  });
}
