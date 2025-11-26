export type Auth = {
  sub: string;
  email: string;
  type: 'ACCESS' | 'REFRESH';
};

export type SignInOptions = {
  expiresIn: number;
  secret: string;
};
