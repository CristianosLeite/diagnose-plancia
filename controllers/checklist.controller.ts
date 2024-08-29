import { Express } from 'express';

export function handleChecklists(server: Express) {
  server.post('/checklists/create', (req, res) => {
    res.json({ message: 'Checklist created!' });
  });

  server.get('/checklists', (req, res) => {
    res.json({ message: 'Checklists retrieved!' });
  });

  server.get('/checklists/:id', (req, res) => {
    res.json({ message: 'Checklist retrieved!' });
  });

  server.put('/checklists/:id', (req, res) => {
    res.json({ message: 'Checklist updated!' });
  });

  server.delete('/checklists/:id', (req, res) => {
    res.json({ message: 'Checklist deleted!' });
  });
}
