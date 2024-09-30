interface IMockJwtVerifyToken {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

export const mockjwtVerifyToken = jest.fn().mockResolvedValue({
  id: 1,
  firstName: 'Admin',
  lastName: 'System',
  email: 'admin@system.com',
  role: 'admin',
}) as jest.Mock<IMockJwtVerifyToken>;
