import { Test, TestingModule } from '@nestjs/testing';
import { OurBlogController } from './our-blog.controller';
import { OurBlogService } from './our-blog.service';

describe('OurBlogController', () => {
  let controller: OurBlogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OurBlogController],
      providers: [OurBlogService],
    }).compile();

    controller = module.get<OurBlogController>(OurBlogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
