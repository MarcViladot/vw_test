import { rest } from 'msw';
import environment from '@/environment';
import { Client } from '@/features/clients';
import { faker } from '@faker-js/faker';

function generateUser(id: number): Client {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const born = faker.date.between(99).toISOString();
  const partners = Math.floor(Math.random() * 1000) + 1;
  const image = `https://i.pravatar.cc/150?img=${id}`;
  const active = Math.random() < 0.5; // 50% chance of being active

  return {
    id,
    name: firstName,
    partners,
    lastName,
    born,
    image,
    active,
  };
}

function generateClientsList(count: number): Client[] {
  const userList: Client[] = [];
  for (let i = 0; i < count; i++) {
    const user = generateUser(i);
    userList.push(user);
  }
  return userList;
}

const clients = generateClientsList(10);

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
  rest.post(`${environment.baseApiUrl}/clients`, async (req, res, ctx) => {
    const newClientData = await req.json();
    clients.push({ ...newClientData, id: clients.length + 1 });
    return await res(ctx.status(200), ctx.json(newClientData));
  }),
  rest.delete(`${environment.baseApiUrl}/clients/:id`, async (req, res, ctx) => {
    const { id } = req.params;
    const clientIndex = clients.findIndex((client) => client.id === Number(id));
    const client = clients[clientIndex];
    clients.splice(clientIndex, 1);
    return await res(ctx.status(200), ctx.json(client));
  }),
];
/* rest.post(`${environment.baseApiUrl}/clients`, async (req, res, ctx) => {
    const body = req.body;
    return await res(ctx.status(200), ctx.json(clients));
  }), */
