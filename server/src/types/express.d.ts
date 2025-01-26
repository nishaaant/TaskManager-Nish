declare namespace Express {
    export interface Request {
      user?: string; // userId from JWT
    }
    export interface Response {
        user: string;
    }
  }