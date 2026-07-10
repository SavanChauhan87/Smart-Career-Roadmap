// ═══════════════════════════════════════════════════════════
// Smart Career Roadmap — API Service Layer
// Centralized HTTP client for all backend communication
// ═══════════════════════════════════════════════════════════

const API_BASE = 'http://localhost:5000/api';

// ── Token Management ──────────────────────────────────────
let authToken = localStorage.getItem('scr_token');
let currentUserId = localStorage.getItem('scr_userId');

export function setAuth(token, userId) {
  authToken = token;
  currentUserId = userId;
  localStorage.setItem('scr_token', token);
  localStorage.setItem('scr_userId', userId);
}

export function clearAuth() {
  authToken = null;
  currentUserId = null;
  localStorage.removeItem('scr_token');
  localStorage.removeItem('scr_userId');
}

export function getStoredUserId() {
  return currentUserId || localStorage.getItem('scr_userId');
}

export function getStoredToken() {
  return authToken || localStorage.getItem('scr_token');
}

// ── HTTP Helpers ──────────────────────────────────────────
async function request(endpoint, options = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...(authToken ? { 'Authorization': `Bearer ${authToken}` } : {}),
    ...options.headers,
  };

  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}));
    throw new Error(errorBody.message || `API Error ${res.status}`);
  }

  // Handle empty responses (204 No Content)
  if (res.status === 204) return null;

  return res.json();
}

// ── Auth Endpoints ────────────────────────────────────────
export async function login(email, password) {
  const data = await request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  setAuth(data.token, data.user.id);
  return data;
}

export async function register(name, email, password) {
  const data = await request('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ name, email, password }),
  });
  setAuth(data.token, data.user.id);
  return data;
}

// ── User Endpoints ────────────────────────────────────────
export async function getUser(userId) {
  return request(`/users/${userId}`);
}

export async function updateUser(userId, userData) {
  return request(`/users/${userId}`, {
    method: 'PUT',
    body: JSON.stringify(userData),
  });
}

// ── Skills Endpoints ──────────────────────────────────────
export async function getUserSkills(userId) {
  return request(`/users/${userId}/skills`);
}

export async function updateSkillLevel(userId, skillId, level) {
  return request(`/users/${userId}/skills/${skillId}`, {
    method: 'PUT',
    body: JSON.stringify({ level }),
  });
}

// ── Careers Endpoints ─────────────────────────────────────
export async function getCareers() {
  return request('/careers');
}

export async function getCareer(careerId) {
  return request(`/careers/${careerId}`);
}

// ── Quest Endpoints ───────────────────────────────────────
export async function getActiveQuest(userId) {
  return request(`/users/${userId}/quest`);
}

export async function setActiveQuest(userId, roleId) {
  return request(`/users/${userId}/quest`, {
    method: 'POST',
    body: JSON.stringify({ roleId }),
  });
}

export async function updateQuestProgress(userId, questData) {
  return request(`/users/${userId}/quest`, {
    method: 'PUT',
    body: JSON.stringify(questData),
  });
}

// ── Resources Endpoints ───────────────────────────────────
export async function getResources(skillName) {
  const query = skillName ? `?skill=${encodeURIComponent(skillName)}` : '';
  return request(`/resources${query}`);
}

// ── Achievements Endpoints ────────────────────────────────
export async function getAchievements(userId) {
  return request(`/users/${userId}/achievements`);
}

export async function unlockAchievement(userId, achievementKey) {
  return request(`/users/${userId}/achievements`, {
    method: 'POST',
    body: JSON.stringify({ achievementKey }),
  });
}
