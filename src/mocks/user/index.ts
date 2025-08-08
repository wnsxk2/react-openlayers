import { http, HttpResponse } from 'msw';

export const userHandlers = [
  // GET /api/users 예제
  http.get('/api/users', () => {
    return HttpResponse.json({
      users: [
        { id: 1, name: 'John Doe', email: 'john@example.com' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
      ],
    });
  }),

  // GET /api/users/:id 예제
  http.get('/api/users/:id', ({ params }) => {
    const { id } = params;
    return HttpResponse.json({
      id: Number(id),
      name: `User ${id}`,
      email: `user${id}@example.com`,
    });
  }),

  // POST /api/users 예제
  http.post('/api/users', async ({ request }) => {
    const newUser = (await request.json()) as any;
    return HttpResponse.json(
      {
        id: Date.now(),
        ...newUser,
        createdAt: new Date().toISOString(),
      },
      { status: 201 }
    );
  }),

  // PUT /api/users/:id 예제
  http.put('/api/users/:id', async ({ params, request }) => {
    const { id } = params;
    const updatedUser = (await request.json()) as any;
    return HttpResponse.json({
      id: Number(id),
      ...updatedUser,
      updatedAt: new Date().toISOString(),
    });
  }),

  // DELETE /api/users/:id 예제
  http.delete('/api/users/:id', ({ params }) => {
    const { id } = params;
    return HttpResponse.json(
      { message: `User ${id} deleted successfully` },
      { status: 200 }
    );
  }),

  // 에러 응답 예제
  http.get('/api/error', () => {
    return HttpResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }),
];
