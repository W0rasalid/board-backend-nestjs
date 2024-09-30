import { Test, TestingModule } from '@nestjs/testing';
import { OurBlogService } from './our-blog.service';

describe('OurBlogService', () => {
  let service: OurBlogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OurBlogService],
    }).compile();

    service = module.get<OurBlogService>(OurBlogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
