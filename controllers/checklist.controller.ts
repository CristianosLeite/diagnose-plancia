import { Router, Request, Response } from 'express';
import Checklist from '../models/checklist.model';
import Activity from '../models/activity.model';
import { Op } from 'sequelize';

export class ChecklistController {
  private router: Router;

  constructor() {
    this.router = Router();
    this.router.post('/create', this.create).bind(this);
    this.router.get('/all', this.all.bind(this));
    this.router.get('/pending', this.retrievePendingChecklist.bind(this));
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

  public async retrievePendingChecklist(req: Request, res: Response) {
    const shiftWork = req.query['shift_work'];

    if (!shiftWork)
      return res.status(400).send('Missing shift work');

    const todayChecklists = await this.getTodaysChecklists(shiftWork.toString());
    const activities = await this.getPendingActivities(todayChecklists);

    res.json(activities);
    return;
  }

  private async getTodaysChecklists(shiftWork: string) {
    return await Checklist.findAll({
      where: {
        shift_work: shiftWork,
        createdAt: {
          [Op.gte]: new Date().setHours(0, 0, 0, 0),
          [Op.lt]: new Date().setHours(23, 59, 59, 999),
        },
      },
    });
  }

  private async getPendingActivities(checklists: Checklist[]) {
    return await Activity.findAll({
      where: {
        activity_id: {
          [Op.notIn]: checklists.map((checklist) => checklist.activity_id),
        },
      },
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
