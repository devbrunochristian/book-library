import { NextFunction, Request, Response } from 'express';

/* eslint-disable @typescript-eslint/no-explicit-any */
const users = [
  { name: 'bruno', age: 26 },
  { name: 'christian', age: 27 },
];
export default abstract class UserService {
  static getUsers = (
    req: Request,
    res: Response,
    next: NextFunction
  ): Response => {
    return res.status(200).json({ users });
  };

  static createUser = (req: Request, res: Response): Response => {
    const { name, age } = req.body;
    if (!name === undefined || !age === undefined) {
      return res.status(517).json({ error: 'error' });
    }
    const newUser = { name, age };
    users.push(newUser);
    return res.status(201).json({ user: newUser });
  };
}
