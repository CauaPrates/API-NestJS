import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { authRegisterDTO } from '../src/testing/auth-register-dto.mock';
import { Role } from '../src/enums/role.enum';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let accessToken: string;
  // let userId: number;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(() => {
    app.close();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('Registrar novo user', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send(authRegisterDTO);
    expect(response.statusCode).toEqual(201);
    expect(typeof response.body.accessToken).toBe('string');
  });

  it('Tentar fazer login com novo user', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: authRegisterDTO.email,
        senha: authRegisterDTO.senha,
      });
    expect(response.statusCode).toEqual(201);
    expect(typeof response.body.accessToken).toEqual('string');

    accessToken = response.body.accessToken;
  });

  it('Obter os dados do user logado', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/me')
      .set('Authorization', `bearer ${accessToken}`)
      .send();
    expect(response.statusCode).toEqual(201);
    expect(typeof response.body.id).toEqual('number');
    expect(response.body.role).toEqual(Role.User);
  });

  it('Registrar novo user como adm', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        ...authRegisterDTO,
        role: Role.Admin,
        email: 'caualucas@gmial.com',
      });
    expect(response.statusCode).toEqual(201);
    expect(typeof response.body.accessToken).toEqual('string');

    accessToken = response.body.accessToken;
  });

  it('Validar a função do novo user', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/me')
      .set('Authorization', `bearer ${accessToken}`)
      .send();
    expect(response.statusCode).toEqual(201);
    expect(typeof response.body.id).toEqual('number');
    expect(response.body.role).toEqual(Role.User);

    // userId = response.body.id;
  });

  it('Tentar ver a lista de todos users', async () => {
    const response = await request(app.getHttpServer())
      .get('/users')
      .set('Authorization', `bearer ${accessToken}`)
      .send();

    expect(response.statusCode).toEqual(403);
    expect(response.body.error).toEqual('Forbidden');
  });

  // it('Alterando manualmente o user para a função adm', async () => {
  //     const ds = await dataSource.initialize();

  //    const queryRunner =  ds.createQueryRunner();

  //    queryRunner.query(`
  //    UPDATE users SET role = ${Role.Admin} WHERE id = ${userId}
  //    `)

  //    queryRunner.query(`
  //    SELECT * FROM users WHERE id = ${userId}
  //    `);

  //    expect(rows.length).toEqual(1);

  // });
});
