import { auth } from './firebase';

const BASE = import.meta.env.VITE_BACKEND_URL ?? 'http://localhost:5000';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Topic {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  order: number;
  createdBy: string;
  createdAt: string;
}

export interface Article {
  _id: string;
  title: string;
  slug: string;
  topicId: string | Topic;
  content: string;
  coverImage?: string;
  authorUid: string;
  authorName: string;
  status: 'draft' | 'pending' | 'approved' | 'published' | 'rejected';
  rejectionReason?: string;
  order: number;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

export interface DbUser {
  _id: string;
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  role: 'student' | 'author' | 'admin';
  createdAt: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

async function getToken(): Promise<string> {
  const user = auth.currentUser;
  if (!user) throw new Error('Not authenticated');
  return user.getIdToken();
}

async function authFetch(url: string, options: RequestInit = {}): Promise<Response> {
  const token = await getToken();
  return fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...(options.headers ?? {}),
    },
  });
}

async function json<T>(res: Response): Promise<T> {
  const data = await res.json();
  if (!res.ok) throw new Error(data.message ?? `HTTP ${res.status}`);
  return data as T;
}

// ─── Public APIs ──────────────────────────────────────────────────────────────

export const getTopics = () =>
  fetch(`${BASE}/api/topics`).then((r) => json<{ topics: Topic[] }>(r));

export const getArticlesByTopic = (slug: string) =>
  fetch(`${BASE}/api/topics/${slug}/articles`).then((r) =>
    json<{ topic: Topic; articles: Article[] }>(r)
  );

export const getArticle = (topicSlug: string, articleSlug: string) =>
  fetch(`${BASE}/api/topics/${topicSlug}/articles/${articleSlug}`).then((r) =>
    json<{ topic: Topic; article: Article }>(r)
  );

// ─── Author APIs ──────────────────────────────────────────────────────────────

export const getMyArticles = () =>
  authFetch(`${BASE}/api/articles/my`).then((r) => json<{ articles: Article[] }>(r));

export const createArticle = (body: {
  title: string;
  topicId: string;
  content: string;
  coverImage?: string;
  tags?: string[];
}) =>
  authFetch(`${BASE}/api/articles`, { method: 'POST', body: JSON.stringify(body) }).then((r) =>
    json<{ article: Article }>(r)
  );

export const updateArticle = (
  id: string,
  body: Partial<{ title: string; topicId: string; content: string; coverImage: string; tags: string[] }>
) =>
  authFetch(`${BASE}/api/articles/${id}`, { method: 'PATCH', body: JSON.stringify(body) }).then((r) =>
    json<{ article: Article }>(r)
  );

export const deleteArticle = (id: string) =>
  authFetch(`${BASE}/api/articles/${id}`, { method: 'DELETE' }).then((r) =>
    json<{ message: string }>(r)
  );

export const submitArticle = (id: string) =>
  authFetch(`${BASE}/api/articles/${id}/submit`, { method: 'PATCH' }).then((r) =>
    json<{ article: Article }>(r)
  );

export const getArticleForEdit = (id: string) =>
  authFetch(`${BASE}/api/articles/${id}`).then((r) => json<{ article: Article }>(r));

// ─── Admin APIs ───────────────────────────────────────────────────────────────

export const adminGetUsers = () =>
  authFetch(`${BASE}/api/admin/users`).then((r) => json<{ users: DbUser[] }>(r));

export const adminSetUserRole = (uid: string, role: string) =>
  authFetch(`${BASE}/api/admin/users/${uid}/role`, {
    method: 'PATCH',
    body: JSON.stringify({ role }),
  }).then((r) => json<{ user: DbUser }>(r));

export const adminGetTopics = () =>
  authFetch(`${BASE}/api/admin/topics`).then((r) => json<{ topics: Topic[] }>(r));

export const adminCreateTopic = (body: { title: string; description?: string }) =>
  authFetch(`${BASE}/api/admin/topics`, { method: 'POST', body: JSON.stringify(body) }).then((r) =>
    json<{ topic: Topic }>(r)
  );

export const adminUpdateTopic = (
  id: string,
  body: Partial<{ title: string; description: string; order: number }>
) =>
  authFetch(`${BASE}/api/admin/topics/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(body),
  }).then((r) => json<{ topic: Topic }>(r));

export const adminDeleteTopic = (id: string) =>
  authFetch(`${BASE}/api/admin/topics/${id}`, { method: 'DELETE' }).then((r) =>
    json<{ message: string }>(r)
  );

export const adminGetArticles = (params?: { status?: string; topicId?: string }) => {
  const qs = new URLSearchParams(params as any).toString();
  return authFetch(`${BASE}/api/admin/articles${qs ? `?${qs}` : ''}`).then((r) =>
    json<{ articles: Article[] }>(r)
  );
};

export const adminSetArticleStatus = (
  id: string,
  status: string,
  rejectionReason?: string
) =>
  authFetch(`${BASE}/api/admin/articles/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status, rejectionReason }),
  }).then((r) => json<{ article: Article }>(r));

export const adminSetArticleOrder = (id: string, order: number) =>
  authFetch(`${BASE}/api/admin/articles/${id}/order`, {
    method: 'PATCH',
    body: JSON.stringify({ order }),
  }).then((r) => json<{ article: Article }>(r));
