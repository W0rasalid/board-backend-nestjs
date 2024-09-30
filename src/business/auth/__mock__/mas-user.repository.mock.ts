export const mockMasUsersRepository = {
  findOneByUserName: jest.fn().mockResolvedValue({
    userName: 'admin',
    password: '$2a$10$UTXmIxCuImcCLshdW1wYJ.22Eo/0ZLMNgLjmianpV2gMd3g.23VXS', // Mock hashed password
  }),

  findOneById: jest.fn().mockResolvedValue({
    id: 1,
    firstName: 'Admin',
    lastName: 'System',
    email: 'admin@system.com',
    role: 'admin',
  }),
};
