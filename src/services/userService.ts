/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import User from '../Models/userModel';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';



export default abstract class UserService {
  static register = async (req: Request, res: Response) => {

    const { name, email, password } = req.body

    if (!name) {
      return res.status(400).json({ error: 'Name is required!' })
    }
    if (!password) {
      return res.status(400).json({ error: 'Password is required!' })
    }
    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must have at minimum 6 characters!' })
    }
    if (!email) {
      return res.status(400).json({ error: 'Email is required!' })
    }
    const existUser = await User.findOne({ email })
    if (existUser) {
      return res.status(400).json({ error: 'Email already registred!' })
    }

    const salts = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salts)


    try {
      const user = new User({
        name,
        email,
        password: hashPassword
      })
      await user.save()
      res.status(201).json({ user })
    } catch (error) {
      res.status(500).json({ error })
    }

  }

  static login = async (req: Request, res: Response) => {

    const { email, password } = req.body

    if (!email) {
      return res.status(400).json({ error: 'Email is required!' })
    }

    if (!password) {
      return res.status(400).json({ error: 'Password is required!' })
    }

    try {
      const existUser = await User.findOne({ email })

      if (!existUser) {
        return res.status(400).json({ error: 'User not found!' })
      }

      const isMatch = await bcrypt.compare(password, existUser.password)
      if (!isMatch) {
        return res.status(400).json({ error: 'Password is wrong!' })

      }

      const accessToken = jwt.sign({ name: existUser.name, email: existUser.email }, process.env.JWT_SECRET!)
      res.status(200).json({ accessToken })

    } catch (error) {
      res.status(500).json({ error })

    }

  }




}
