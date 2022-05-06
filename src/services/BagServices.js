import { Api } from 'helpers/Api';

const parseResponse = (response) => response.json();

export const BagServices = {
  getList: () => fetch(Api.getBag(), { method: 'GET' }).then(parseResponse),
  createBag: (bag) =>
    fetch(Api.createBag(), {
      method: 'POST',
      body: JSON.stringify(bag),
      headers: { 'Content-Type': 'application/json' },
    }).then(parseResponse),
  purchase: (id) =>
    fetch(Api.purchase(id), { method: 'DELETE' }).then(parseResponse),
};
