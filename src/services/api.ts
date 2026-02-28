// This is FRONTEND ONLY.
// Replace BASE_URL when backend is ready.

const BASE_URL = "https://your-backend-api.com/api";

// ---------------- AUTH ----------------

export async function loginUser(email: string, password: string) {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  return response.json();
}

export async function registerTenant(data: {
  fullName: string;
  email: string;
  password: string;
}) {
  const response = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response.json();
}

// ---------------- CHATS ----------------

export async function getTenantChats() {
  const response = await fetch(`${BASE_URL}/chats`);
  return response.json();
}

// ---------------- HISTORY ----------------

export async function getBookingHistory() {
  const response = await fetch(`${BASE_URL}/bookings`);
  return response.json();
}

// ---------------- PROFILE ----------------

export async function getProfile() {
  const response = await fetch(`${BASE_URL}/profile`);
  return response.json();
}

export async function updateProfile(data: any) {
  const response = await fetch(`${BASE_URL}/profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response.json();
}