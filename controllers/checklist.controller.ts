import { Router, Request, Response } from 'express';
import Checklist from '../models/checklist.model';

export class ChecklistController {
  private router: Router;

  constructor() {
    this.router = Router();
    this.router.post('/create', this.create).bind(this);
    this.router.get('/all', this.all.bind(this));
    this.router.get('/one', this.retrieve.bind(this));
    this.router.put('/update', this.update.bind(this));
    this.router.delete('/delete', this.delete.bind(this));
  }

  public getRouter(): Router {
    return this.router;
  }

  public async create(req: Request, res: Response) {
    const newChecklist = req.body;

    if (!newChecklist)
      res.status(400).send('Missing checklist');

    const checklist = new Checklist(newChecklist);

    await checklist.save().then(() => {
      res.json(checklist);
    });
  }

  public async all(req: Request, res: Response) {
    await Checklist.findAll({
      limit: 100,
    }).then((checklists) => {
      res.json(checklists);
    });
  }

  public async retrieve(req: Request, res: Response) {
    const id = req.query['checklist_id'];

    if (!id)
      res.status(400).send('Missing checklist id');

    await Checklist.findOne({ where: { checklist_id: id } }).then((checklist) => {
      res.json(checklist);
    });
  }

  public async update(req: Request, res: Response) {
    const id = req.body['checklist_id'];
    const checklistToUpdate = req.body;

    if (!id)
      res.status(400).send('Missing checklist id');

    if (!checklistToUpdate)
      res.status(400).send('Missing checklist');

    await Checklist.findOne({ where: { checklist_id: id } }).then((checklist) => {
      if (!checklist) {
        res.status(400).send('Checklist not found');
      } else {
        checklist.update(checklistToUpdate).then(() => {
          res.json(checklist);
        });
      }
    });
  }

  public async delete(req: Request, res: Response) {
    const id = req.query['checklist_id'];

    if (!id)
      res.status(400).send('Missing checklist_id');

    await Checklist.destroy({ where: { checklist_id: id } }).then(() => {
      res.json({ message: 'Checklist deleted' });
    });
  }
}
