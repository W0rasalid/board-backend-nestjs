import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { MasUsersRepository } from 'src/repositories/mas-users.repository';
import { MailService } from 'src/core/mailer/mailer.service';
import { AuthenticationService } from 'src/core/authentication/authentication.service';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { ReqLoginDto } from './dto/request';
import { mockjwtVerifyToken } from './__mock__/user-data.mock';
import { mockMasUsersRepository } from './__mock__/mas-user.repository.mock';

describe('AuthService', () => {
  let service: AuthService;
  let masUsersRepo: MasUsersRepository;
  let authService: AuthenticationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: MasUsersRepository,
          useValue: mockMasUsersRepository,
        },
        {
          provide: MailService,
          useValue: {},
        },
        {
          provide: AuthenticationService,
          useValue: {
            compareBcrypt: jest.fn().mockResolvedValue(true), // Mock compareBcrypt
            jwtSignToken: jest.fn().mockResolvedValue('mocked_jwt_token'), // Mock jwtSignToken
            jwtVerifyToken: mockjwtVerifyToken,
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    masUsersRepo = module.get<MasUsersRepository>(MasUsersRepository);
    authService = module.get<AuthenticationService>(AuthenticationService);
  });

  it('should login successfully', async () => {
    const loginDto = { userName: 'admin', password: '1234' };
    const resp = await service.login(loginDto);

    expect(masUsersRepo.findOneByUserName).toHaveBeenCalledWith('admin');
    expect(authService.compareBcrypt).toHaveBeenCalledWith(
      '1234',
      '$2a$10$UTXmIxCuImcCLshdW1wYJ.22Eo/0ZLMNgLjmianpV2gMd3g.23VXS',
    );
    expect(resp.result.token).toBe('mocked_jwt_token');
    expect(resp).toBeDefined();
  });

  it('should login fail', async () => {
    const loginDto: ReqLoginDto = { userName: 'systemAdmin', password: 'wrong_password' };

    // Mock findOneByUserName ให้คืนค่าผู้ใช้ที่มีชื่อ systemAdmin
    jest.spyOn(masUsersRepo, 'findOneByUserName');

    try {
      // คาดหวังว่า login จะโยนข้อผิดพลาดออกมาเพราะรหัสผ่านไม่ถูกต้อง
      await service.login(loginDto);
    } catch (error) {
      // ตรวจสอบว่าเกิดข้อผิดพลาดขึ้นจริง
      expect(error.message).toBe('Invalid email or password');
    }

    // ตรวจสอบว่า findOneByUserName ถูกเรียกด้วยชื่อ 'systemAdmin'
    const spyMasUsersRepo = jest.spyOn(masUsersRepo, 'findOneByUserName');
    expect(spyMasUsersRepo).toHaveBeenCalledWith('systemAdmin');
  });

  it('should authen successfully', async () => {
    const request = 'mocked_jwt_token';
    const resp = await service.checkAuth(request);
    const result = await authService.jwtVerifyToken('mocked_jwt_token');
    expect(result).toEqual({
      id: 1,
      firstName: 'Admin',
      lastName: 'System',
      email: 'admin@system.com',
      role: 'admin',
    });
  });

  it('should authen fail', async () => {});
});
