const request = require('supertest');
const app = require('../src/app');

describe('Server works:', () => {

  it('default path returns message', async () => {
    const res = await request(app)
      .get('/');

    expect(res.ok).toBe(true);
    expect(res.headers['content-type']).toEqual(expect.stringContaining('text'));
    expect(res.text).toEqual(expect.stringContaining('Use'));
  })

})

describe('Authors & posts:', () => {

  describe('GET ', () => {
    it('/authors', async () => {
      const res = await request(app)
        .get('/authors');

      expect(res.ok).toBe(true);
      expect(res.headers['content-type']).toEqual(expect.stringContaining('json'));
      expect(res.body).toBeInstanceOf(Array);
      expect(res.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            name: 'Kyrylo'
          })
        ])
      )
    })

    it('/authors/1/posts', async () => {
      const res = await request(app)
        .get('/authors/1/posts');

      expect(res.ok).toBe(true);
      expect(res.headers['content-type']).toEqual(expect.stringContaining('json'));
      expect(res.body).toBeInstanceOf(Array);
      expect(res.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            text: 'Hello World!'
          })
        ])
      )
    })

    it('/authors/5/posts (no such author)', async () => {
      const res = await request(app)
        .get('/authors/5/posts');

      expect(res.statusCode).toBe(500);
      expect(res.body).toHaveProperty('err');
    })

    it('/authors/1/posts/1', async () => {
      const res = await request(app)
        .get('/authors/1/posts/1');

      expect(res.ok).toBe(true);
      expect(res.body).toHaveProperty('text');
    })
  })

  describe('POST', () => {
    it('/authors without name', async () => {
      const res = await request(app)
        .post('/authors')

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('err');
    })

    it('/authors with name', async () => {
      const res = await request(app)
        .post('/authors')
        .send({name: 'Vasyl'})

      expect(res.ok).toBe(true);
      expect(res.headers['content-type']).toEqual(expect.stringContaining('text'));
      expect(res.text).toEqual(expect.stringContaining('added'));

      const after = await request(app)
        .get('/authors')

      expect(after.body.length).toBe(4);
    })
  })

  describe('DELETE', () => {
    it('/authors/5 (no such author)', async () => {
      const res = await request(app)
        .delete('/authors/5')

      expect(res.statusCode).toBe(500);
      expect(res.body).toHaveProperty('err');
    })

    it('/authors/1', async () => {
      const res = await request(app)
        .delete('/authors/1');

      expect(res.statusCode).toBe(200);
      expect(res.text).toEqual(expect.stringContaining('deleted'))

      const after = await request(app)
        .get('/authors');

      expect(after.body.length).toBe(3);
    })
  })

  describe('PUT', () => {
    it('/authors/5 (no such user)', async () => {
      const res = await request(app)
        .put('/authors/5');

      expect(res.statusCode).toBe(500);
      expect(res.body).toHaveProperty('err');
    })

    it('/authors/2', async () => {
      const res = await request(app)
        .put('/authors/2')
        .send({newName: 'John'});

      expect(res.ok).toBe(true);
      expect(res.text).toEqual(expect.stringContaining('is now'));

      const after = await request(app)
        .get('/authors');

      expect(after.body).toEqual(expect.arrayContaining([
        expect.objectContaining({name: 'John'})
      ]));
    })
  })
})