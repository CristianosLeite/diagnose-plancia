import { Express } from 'express';

export function handleActivities(server: Express) {
  server.post('/activities/create', (req, res) => {
    res.json({ message: 'Activity created!' });
  });

  server.get('/activities', (req, res) => {
    res.json({ message: 'Activities retrieved!' });
  });

  server.get('/activities/:id', (req, res) => {
    res.json({ message: 'Activity retrieved!' });
  });

  server.put('/activities/:id', (req, res) => {
    res.json({ message: 'Activity updated!' });
  });

  server.delete('/activities/:id', (req, res) => {
    res.json({ message: 'Activity deleted!' });
  });
}
