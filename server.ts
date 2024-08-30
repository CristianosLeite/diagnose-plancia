import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { dirname, join, resolve } from 'node:path';
import { CommonEngine } from '@angular/ssr';
import { APP_BASE_HREF } from '@angular/common';
import { fileURLToPath } from 'node:url';
import { json, urlencoded } from 'body-parser';
import bootstrap from './src/main.server';
import { Server as HttpServer } from 'http';
import multer from 'multer';
import { fileUpload } from './controllers/uploads.controller';
import { UsersController } from './controllers/users.controller';
import { ActivityController } from './controllers/activities.controller';
import { ChecklistController } from './controllers/checklist.controller';
import * as db from './database/database';

// The Express app is exported so that it can be used by serverless Functions.
export function app(): {
  app: express.Express;
} {
  const server = express();
  server.use(cors());
  server.use(express.json({ limit: '50mb' }));
  server.use(express.urlencoded({ limit: '50mb', extended: true }));
  server.use(bodyParser.json());

  server.use(express.urlencoded({ extended: true }));

  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');

  const commonEngine = new CommonEngine();

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get('*.*', express.static(browserDistFolder, {
    maxAge: '1y'
  }));

  // Enable parsing of application/json and application/x-www-form-urlencoded
  server.use(json());
  server.use(urlencoded({ extended: true }));

  // Database connection
  db.connect().then(() => {
    // Create tables after successful connection
    db.createTables();
  });

  // File upload
  const upload = multer({ dest: 'uploads/' });
  fileUpload(server, upload, browserDistFolder);

  // Handle users
  const usersController = new UsersController();
  server.use('/api/users', usersController.getRouter());

  // Handle activities
  const activityController = new ActivityController();
  server.use('/api/activities', activityController.getRouter());

  // Handle checklists
  const checklistController = new ChecklistController();
  server.use('/api/checklists', checklistController.getRouter());

  // All regular routes use the Angular engine
  server.get('*', (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req;

    commonEngine
      .render({
        bootstrap,
        documentFilePath: indexHtml,
        url: `${protocol}://${headers.host}${originalUrl}`,
        publicPath: browserDistFolder,
        providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
      })
      .then((html) => res.send(html))
      .catch((err) => next(err));
  });

  return { app: server };
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  // Start up the Express server
  const { app: expressApp } = app();

  // Create a HTTP server instance with the Express app
  const server = new HttpServer(expressApp);
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();
