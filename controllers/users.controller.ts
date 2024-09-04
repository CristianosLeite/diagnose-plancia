import { Router, Request, Response } from 'express';
import User from '../models/user.model';

export class UsersController {
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
    const newUser = req.body;

    if (!newUser)
      res.status(400).send('Missing user');

    const user = new User(newUser);

    await user.save().then(() => {
      res.json(user);
    });
  }

  public async all(req: Request, res: Response) {
    await User.findAll().then((users) => {
      res.json(users);
    });
  }

  public async retrieve(req: Request, res: Response) {
    const id = req.query['user_id'];

    if (!id)
      res.status(400).send('Missing user_id');

    await User.findOne({ where: { user_id: id } }).then((user) => {
      res.json(user);
    });
  }

  public async update(req: Request, res: Response) {
    const id = req.body['user_id'];
    const userToUpdate = req.body;

    if (!id)
      res.status(400).send('Missing user id');

    if (!userToUpdate)
      res.status(400).send('Missing user');

    await User.findOne({ where: { user_id: id } }).then((user) => {
      if (!user) {
        res.status(404).send('User not found');
      } else {
        user.update(userToUpdate).then(() => {
          res.json(userToUpdate);
        });
      }
    });
  }

  public async delete(req: Request, res: Response) {
    const id = req.query['user_id'];

    if (!id)
      res.status(400).send('Missing user id');

    await User.findOne({ where: { user_id: id } }).then((user) => {
      if (!user) {
        res.status(404).send('User not found');
      } else {
        user.destroy().then(() => {
          res.json(user);
        });
      }
    });
  }
}
