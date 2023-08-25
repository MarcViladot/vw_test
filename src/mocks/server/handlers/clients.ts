import { rest } from 'msw';
import environment from '@/environment';
import { Client } from '@/features/clients';

const clients: Client[] = [
  {
    id: 1,
    name: 'Sarah Mikkelsen',
    age: 20,
    image: 'https://i.pravatar.cc/150?img=6',
  },
  {
    id: 2,
    name: 'John Doe',
    age: 40,
    image: 'https://i.pravatar.cc/150?img=27',
  },
  {
    id: 3,
    name: 'Jane Doe',
    age: 50,
    image: 'https://i.pravatar.cc/150?img=66',
  },
  {
    id: 4,
    name: 'Mira Levin',
    age: 60,
    image: 'https://i.pravatar.cc/150?img=69',
  },
  {
    id: 5,
    name: 'Emma Carbon',
    age: 12,
    image: 'https://i.pravatar.cc/150?img=52',
  },
];

export const clientHandlers = [
  rest.get(`${environment.baseApiUrl}/clients`, async (req, res, ctx) => {
    return await res(ctx.status(200), ctx.json(clients));
  }),
  rest.put(`${environment.baseApiUrl}/clients/:id`, async (req, res, ctx) => {
    const { id } = req.params;
    const newClientData = await req.json();
    const clientIndex = clients.findIndex((client) => client.id === Number(id));
    clients[clientIndex] = { ...clients[clientIndex], ...newClientData };
    return await res(ctx.status(200), ctx.json(newClientData));
  }),
];
/* rest.post(`${environment.baseApiUrl}/clients`, async (req, res, ctx) => {
    const body = req.body;
    return await res(ctx.status(200), ctx.json(clients));
  }), */
