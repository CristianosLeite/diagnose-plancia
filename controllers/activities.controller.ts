import { Router, Request, Response } from 'express';
import Activity from '../models/activity.model';

export class ActivityController {
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
    const newActivity = req.body;

    if (!newActivity)
      res.status(400).send('Missing activity');

    const activity = new Activity(newActivity);

    await activity.save().then(() => {
      res.json(activity);
    });
  }

  public async all(req: Request, res: Response) {
    await Activity.findAll().then((activities) => {
      res.json(activities);
    });
  }

  public async retrieve(req: Request, res: Response) {
    const id = req.query['activityId'];

    if (!id)
      res.status(400).send('Missing activityId');

    await Activity.findOne({ where: { activityId: id } }).then((activity) => {
      res.json(activity);
    });
  }

  public async update(req: Request, res: Response) {
    const id = req.body['activityId'];
    const activityToUpdate = req.body;

    if (!id)
      res.status(400).send('Missing activityId');

    if (!activityToUpdate)
      res.status(400).send('Missing activity');

    await Activity.findOne({ where: { activityId: id } }).then((activity) => {
      if (!activity) {
        res.status(404).send('Activity not found');
      } else {
        activity.update(activityToUpdate).then(() => {
          res.json(activity);
        });
      }
    });
  }

  public async delete(req: Request, res: Response) {
    const id = req.query['activityId'];

    if (!id)
      res.status(400).send('Missing activityId');

    await Activity.destroy({ where: { activityId: id } }).then(() => {
      res.status(200).send('Activity deleted');
    });
  }
}
