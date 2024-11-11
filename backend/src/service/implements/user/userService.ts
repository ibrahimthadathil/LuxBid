import { Service } from "typedi";
import { userRepository } from "../../../repositories/implimentation/userRepository";
import { AuthRequest } from "../../../types/api";
import { Response } from "express";
import { Iuser } from "../../../models/userModel";

@Service()
export class userService {
  constructor(private userRepo: userRepository) {}

  
}
