// In-browser fake backend for the static demo build (DEMO_MODE=true).
//
// Installed as the axios adapter in ../axios.config.js, so every API call made
// by the app is answered here instead of going over the network. The routes and
// response shapes follow the real Express API in backend/src/.
//
// State lives in localStorage because several flows do full page reloads
// (bank linking redirect, card payment redirect, reload after a donation).

import * as seed from './data';
import { STORAGE_KEY } from './storage';
const LATENCY_MS = 250;

let memoryState = null;

function freshState() {
  return {
    sessionUserId: null,
    users: [seed.createDemoUser()],
    associations: seed.associations,
    projects: seed.projects,
  };
}

function load() {
  if (memoryState) return memoryState;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    memoryState = raw ? JSON.parse(raw) : freshState();
  } catch (e) {
    memoryState = freshState();
  }
  return memoryState;
}

function save() {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(memoryState));
  } catch (e) {
    // private mode / quota (e.g. a large profile picture): keep it in memory only
  }
}

export function resetDemo() {
  memoryState = freshState();
  save();
}

// ---------- helpers ----------

class HttpError extends Error {
  constructor(status, message, code) {
    super(message);
    this.status = status;
    this.body = { message, code };
  }
}

const notLoggedIn = () => new HttpError(401, 'user must be logged in', 'not-logged-in');
const clone = (v) => JSON.parse(JSON.stringify(v));
const newId = (prefix) => `${prefix}-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
const now = () => new Date().toISOString();

const withPercentage = (p) => ({ ...p, raisedPercentage: Math.round(((p.raisedCurrently / 100) / p.goal) * 100) });
const byNewest = (a, b) => new Date(b.createdAt) - new Date(a.createdAt);

function currentUser(state) {
  const user = state.users.find((u) => u.id === state.sessionUserId);
  if (!user) throw notLoggedIn();
  return user;
}

// Shape of GET /users/me (backend userSelection): no password, relations expanded.
function publicUser(state, user) {
  const { password, followedProjectIds, followedAssociationIds, ...rest } = user;
  return {
    ...rest,
    // The navbar reads the balance from the PiggyBank relation (user.pg.amount).
    pg: { id: `pg-${user.id}`, amount: user.piggyBank, userId: user.id, createdAt: user.createdAt, updatedAt: user.updatedAt },
    FollowedProjects: state.projects.filter((p) => followedProjectIds.includes(p.id)).map(withPercentage),
    FollowedAssociation: state.associations.filter((a) => followedAssociationIds.includes(a.id)),
    _count: {
      Transactions: user.Transactions.length,
      Donations: user.Donations.length,
      bankAccounts: user.bankAccounts.length,
    },
  };
}

function filterByQuery(items, query) {
  const tag = query.get('tag') || query.get('Tag');
  const q = query.get('q');
  return items
    .filter((item) => !tag || item.tags.includes(tag))
    .filter((item) => !q || item.name.toLowerCase().includes(q.toLowerCase()));
}

function findOr404(list, id, what) {
  const item = list.find((i) => i.id === id);
  if (!item) throw new HttpError(404, `${what} not found`, `${what}-not-found`);
  return item;
}

function donate(state, target, kind, amountEuros, type) {
  const user = currentUser(state);
  const cents = Math.round(amountEuros * 100);
  if (!(cents > 0)) throw new HttpError(400, 'invalid amount', 'invalid-form-data');
  if (type === 'piggy-bank') {
    if (user.piggyBank < cents) throw new HttpError(400, 'not enough in piggy bank', 'too-low-piggy-bank');
    user.piggyBank -= cents;
  }
  const donation = {
    id: newId('don'),
    amount: cents,
    type,
    userId: user.id,
    projectId: kind === 'project' ? target.id : null,
    associationId: kind === 'association' ? target.id : null,
    createdAt: now(),
  };
  user.Donations.unshift(donation);
  target.Donations.push(donation);
  target.raisedCurrently += cents;
  return target;
}

// ---------- routes ----------
// [method, pattern, handler(ctx)] ; ctx = { state, params, query, body }

const routes = [
  // auth
  ['post', 'auth/signin', ({ state, body }) => {
    const user = state.users.find((u) => u.email.toLowerCase() === String(body.email || '').toLowerCase().trim());
    if (!user || user.password !== body.password) throw new HttpError(401, 'invalid credentials', 'invalid-credentials');
    state.sessionUserId = user.id;
    return publicUser(state, user);
  }],
  ['post', 'auth/signup', ({ state, body }) => {
    const email = String(body.email || '').toLowerCase().trim();
    if (!email || !body.password) throw new HttpError(400, 'invalid form data', 'invalid-form-data');
    if (state.users.some((u) => u.email === email)) throw new HttpError(409, 'email already used', 'email-already-used');
    const base = seed.createDemoUser();
    const user = {
      ...base,
      id: newId('user'),
      email,
      password: body.password,
      firstname: body.firstname || '',
      lastname: body.lastname || '',
      piggyBank: 1000,
      createdAt: now(),
      updatedAt: now(),
      bankAccounts: [],
      Transactions: [],
      Donations: [],
      followedProjectIds: [],
      followedAssociationIds: [],
    };
    state.users.push(user);
    return publicUser(state, user);
  }],
  ['delete', 'auth/signout', ({ state }) => { state.sessionUserId = null; return ''; }],
  ['post', 'auth/forgot-password', () => ({})],
  ['post', 'auth/reset-password', () => ({})],

  // current user
  ['get', 'users/me', ({ state }) => publicUser(state, currentUser(state))],
  ['patch', 'users/me', ({ state, body }) => {
    const user = currentUser(state);
    ['email', 'firstname', 'lastname', 'lang', 'roundedTo', 'profilePicture'].forEach((key) => {
      if (body[key] !== undefined && body[key] !== null) user[key] = body[key];
    });
    if (body.password) user.password = body.password;
    user.updatedAt = now();
    return publicUser(state, user);
  }],
  ['patch', 'users/me/profile-picture', ({ state, body }) => {
    const user = currentUser(state);
    user.profilePicture = body.picture || '';
    return publicUser(state, user);
  }],
  ['get', 'users/me/transactions', ({ state }) => currentUser(state).Transactions],
  ['get', 'users/me/donations', ({ state }) => currentUser(state).Donations],
  ['get', 'users/me/piggybank', ({ state }) => ({ amount: currentUser(state).piggyBank })],
  ['get', 'users/me/linked-accounts', ({ state }) => currentUser(state).bankAccounts],
  ['put', 'users/me/linked-accounts/:id/active', ({ state, params }) => {
    const account = findOr404(currentUser(state).bankAccounts, params.id, 'account');
    account.status = 'ACTIVE';
    return account;
  }],
  ['put', 'users/me/linked-accounts/:id/disable', ({ state, params }) => {
    const account = findOr404(currentUser(state).bankAccounts, params.id, 'account');
    account.status = 'DISABLED';
    return account;
  }],
  ['delete', 'users/me/linked-accounts/:id', ({ state, params }) => {
    const user = currentUser(state);
    user.bankAccounts = user.bankAccounts.filter((a) => a.id !== params.id);
    return '';
  }],

  // follows
  ['post', 'users/me/follow-project/:id', ({ state, params }) => {
    const user = currentUser(state);
    findOr404(state.projects, params.id, 'project');
    if (!user.followedProjectIds.includes(params.id)) user.followedProjectIds.push(params.id);
    return publicUser(state, user);
  }],
  ['delete', 'users/me/unfollow-project/:id', ({ state, params }) => {
    const user = currentUser(state);
    user.followedProjectIds = user.followedProjectIds.filter((id) => id !== params.id);
    return publicUser(state, user);
  }],
  ['post', 'users/me/follow-association/:id', ({ state, params }) => {
    const user = currentUser(state);
    findOr404(state.associations, params.id, 'association');
    if (!user.followedAssociationIds.includes(params.id)) user.followedAssociationIds.push(params.id);
    return publicUser(state, user);
  }],
  ['delete', 'users/me/unfollow-association/:id', ({ state, params }) => {
    const user = currentUser(state);
    user.followedAssociationIds = user.followedAssociationIds.filter((id) => id !== params.id);
    return publicUser(state, user);
  }],

  // donations: piggy bank
  ['post', 'users/me/donate/projects/:id', ({ state, params, body }) =>
    withPercentage(donate(state, findOr404(state.projects, params.id, 'project'), 'project', body.amount, 'piggy-bank'))],
  ['post', 'users/me/donate/associations/:id', ({ state, params, body }) =>
    donate(state, findOr404(state.associations, params.id, 'association'), 'association', body.amount, 'piggy-bank')],
  // donations: card. The real API returns a Stripe Checkout URL; the demo records
  // the donation and sends the visitor straight to the success URL.
  ['post', 'users/me/donate/payment-link/projects/:id', ({ state, params, body }) => {
    donate(state, findOr404(state.projects, params.id, 'project'), 'project', body.amount, 'card');
    return { url: body.successUrl };
  }],
  ['post', 'users/me/donate/payment-link/associations/:id', ({ state, params, body }) => {
    donate(state, findOr404(state.associations, params.id, 'association'), 'association', body.amount, 'card');
    return { url: body.successUrl };
  }],

  // catalogue
  ['get', 'associations/trending', ({ state }) => ({
    weeklyAssociations: [...state.associations].sort(byNewest).slice(0, 5),
    trendingDonations: [],
  })],
  ['get', 'associations', ({ state, query }) => filterByQuery(state.associations, query)],
  ['get', 'associations/:id', ({ state, params }) => ({ ...findOr404(state.associations, params.id, 'association'), Owner: null })],
  ['get', 'projects/trending', ({ state }) => ({
    weeklyProjects: [...state.projects].sort(byNewest).slice(0, 5).map(withPercentage),
    trendingDonations: [],
  })],
  ['get', 'projects', ({ state, query }) => filterByQuery(state.projects, query).map(withPercentage)],
  ['get', 'projects/:id', ({ state, params }) => ({ ...withPercentage(findOr404(state.projects, params.id, 'project')), Owner: null })],

  // bank linking (Nordigen). The real flow redirects to the bank, which redirects
  // back to /EditProfil?ref=...; the demo skips the bank and goes straight back.
  ['get', 'nordigen/banks', ({ state }) => { currentUser(state); return seed.banks; }],
  ['get', 'nordigen/institution-link', ({ state, query }) => {
    currentUser(state);
    return `/EditProfil?ref=${encodeURIComponent(query.get('institutionId') || '')}`;
  }],
  ['post', 'nordigen/institution-validation', ({ state, query }) => {
    const user = currentUser(state);
    const bank = seed.banks.find((b) => b.id === query.get('ref'));
    const account = {
      id: newId('acc'),
      accountId: newId('ext'),
      requisitionId: newId('req'),
      userId: user.id,
      status: 'ACTIVE',
      iban: 'FR76 3000 6000 0198 7654 3210 187',
      institution: bank ? bank.name : 'Demo Bank',
      numberOfTransactions: 0,
      createdAt: now(),
      updatedAt: now(),
    };
    user.bankAccounts.push(account);
    return account;
  }],
];

const compiled = routes.map(([method, pattern, handler]) => {
  const keys = [];
  const regex = new RegExp(`^${pattern.replace(/:(\w+)/g, (_, key) => { keys.push(key); return '([^/]+)'; })}$`);
  return { method, regex, keys, handler };
});

// ---------- axios adapter ----------

function parseRequest(config) {
  const base = config.baseURL || '';
  let url = config.url || '';
  if (base && url.startsWith(base)) url = url.slice(base.length);
  const parsed = new URL(url.replace(/^\/+/, ''), 'http://demo.local/');
  Object.entries(config.params || {}).forEach(([k, v]) => parsed.searchParams.set(k, v));
  let body = config.data;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch (e) { body = {}; }
  }
  return {
    method: (config.method || 'get').toLowerCase(),
    path: parsed.pathname.replace(/^\/+|\/+$/g, ''),
    query: parsed.searchParams,
    body: body || {},
  };
}

function respond(config, status, data) {
  return {
    data,
    status,
    statusText: status < 400 ? 'OK' : 'Error',
    headers: { 'content-type': 'application/json', 'x-fundy-demo': 'true' },
    config,
    request: {},
  };
}

export default function mockAdapter(config) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const { method, path, query, body } = parseRequest(config);
      const state = load();
      let response;
      try {
        const route = compiled.find((r) => r.method === method && r.regex.test(path));
        if (!route) throw new HttpError(404, `no demo route for ${method.toUpperCase()} /${path}`, 'not-found');
        const match = path.match(route.regex);
        const params = {};
        route.keys.forEach((key, i) => { params[key] = decodeURIComponent(match[i + 1]); });
        const data = route.handler({ state, params, query, body });
        save();
        response = respond(config, data === '' ? 204 : 200, clone(data));
      } catch (err) {
        if (!(err instanceof HttpError)) {
          console.error('[demo api]', err); // eslint-disable-line no-console
          err = new HttpError(500, 'internal demo error', 'internal');
        }
        response = respond(config, err.status, err.body);
      }

      if (response.status < 400) return resolve(response);
      const error = new Error(`Request failed with status code ${response.status}`);
      error.config = config;
      error.response = response;
      error.isAxiosError = true;
      error.toJSON = () => ({ message: error.message, status: response.status });
      return reject(error);
    }, LATENCY_MS);
  });
}
