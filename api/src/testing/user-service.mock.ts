import { UserService } from '../user/user.service';
import { userEntityList } from './user-entity-list.mock';

export const userServiceMock = {
  provide: UserService,
  useValue: {
    showOne: jest.fn().mockResolvedValueOnce(userEntityList[0]),
    create: jest.fn().mockResolvedValueOnce(userEntityList[0]),
    list: jest.fn().mockResolvedValueOnce(userEntityList),
    update: jest.fn().mockResolvedValueOnce(userEntityList[0]),
    updatePartial: jest.fn().mockResolvedValueOnce(userEntityList[0]),
    delete: jest.fn().mockResolvedValueOnce(true),
    exists: jest.fn().mockResolvedValueOnce(true),
  },
};
