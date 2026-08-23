/**
 * Official TikTok for Developers Display API & Login Kit Client
 * Docs: https://developers.tiktok.com/doc/login-kit-web
 */

// Helper to base64url encode an ArrayBuffer for RFC 7636 PKCE
function base64UrlEncode(buffer) {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

// Generate random string
function generateRandomString(length = 64) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
  const array = new Uint8Array(length);
  window.crypto.getRandomValues(array);
  return Array.from(array, byte => chars[byte % chars.length]).join('');
}

/**
 * Generate real SHA-256 PKCE challenge
 */
export async function generatePKCE() {
  const codeVerifier = generateRandomString(64);
  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);
  const digest = await window.crypto.subtle.digest('SHA-256', data);
  const codeChallenge = base64UrlEncode(digest);

  return { codeVerifier, codeChallenge };
}

/**
 * Get stored TikTok Developer Keys from localStorage
 */
export function getTikTokDeveloperKeys() {
  try {
    const saved = localStorage.getItem('calvras_tiktok_dev_keys');
    if (saved) return JSON.parse(saved);
  } catch (e) {}
  return {
    clientKey: '',
    clientSecret: '',
    redirectUri: typeof window !== 'undefined' ? `${window.location.origin}/` : 'http://localhost:5173/'
  };
}

/**
 * Save TikTok Developer Keys
 */
export function saveTikTokDeveloperKeys(keys) {
  try {
    localStorage.setItem('calvras_tiktok_dev_keys', JSON.stringify(keys));
  } catch (e) {}
}

/**
 * Build the Official TikTok OAuth URL with real SHA-256 PKCE
 */
export async function buildOfficialTikTokAuthUrl(clientKey, redirectUri) {
  const finalRedirect = redirectUri || (typeof window !== 'undefined' ? `${window.location.origin}/` : 'http://localhost:5173/');
  const { codeVerifier, codeChallenge } = await generatePKCE();
  const csrfState = `tt_${Date.now()}_${generateRandomString(12)}`;

  try {
    sessionStorage.setItem('tiktok_code_verifier', codeVerifier);
    sessionStorage.setItem('tiktok_oauth_state', csrfState);
  } catch (e) {}

  const scopes = [
    'user.info.basic',
    'user.info.profile',
    'user.info.stats',
    'video.list'
  ].join(',');

  const params = new URLSearchParams({
    client_key: clientKey,
    scope: scopes,
    response_type: 'code',
    redirect_uri: finalRedirect,
    state: csrfState,
    code_challenge: codeChallenge,
    code_challenge_method: 'S256'
  });

  return `https://www.tiktok.com/v2/auth/authorize/?${params.toString()}`;
}

/**
 * Exchange Authorization Code for Real TikTok Access Token
 */
export async function exchangeTikTokCodeForToken({ code, clientKey, clientSecret, redirectUri }) {
  const codeVerifier = sessionStorage.getItem('tiktok_code_verifier') || '';
  const finalRedirect = redirectUri || window.location.origin + '/';

  const bodyParams = new URLSearchParams({
    client_key: clientKey,
    client_secret: clientSecret,
    code: code,
    grant_type: 'authorization_code',
    redirect_uri: finalRedirect,
    code_verifier: codeVerifier
  });

  const response = await fetch('https://open.tiktokapis.com/v2/oauth/token/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Cache-Control': 'no-cache'
    },
    body: bodyParams.toString()
  });

  const data = await response.json();
  if (data.error || !data.access_token) {
    throw new Error(data.error_description || data.error || 'Failed to retrieve TikTok Access Token');
  }

  return data;
}

/**
 * Fetch Real TikTok Profile Information from TikTok API
 */
export async function fetchRealTikTokUserInfo(accessToken) {
  const fields = 'open_id,union_id,avatar_url,display_name,username,follower_count,following_count,likes_count,is_verified';
  const response = await fetch(`https://open.tiktokapis.com/v2/user/info/?fields=${fields}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });

  const res = await response.json();
  if (res.error && res.error.code !== 'ok') {
    throw new Error(res.error.message || 'Failed to fetch user info');
  }

  return res.data?.user || res.data;
}

/**
 * Fetch Real TikTok Live Video List & Metrics from TikTok API
 */
export async function fetchRealTikTokVideos(accessToken, maxCount = 10) {
  const fields = 'id,title,video_description,duration,cover_image_url,embed_link,like_count,comment_count,share_count,view_count,create_time';
  
  const response = await fetch(`https://open.tiktokapis.com/v2/video/list/?fields=${fields}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      max_count: maxCount
    })
  });

  const res = await response.json();
  if (res.error && res.error.code !== 'ok') {
    throw new Error(res.error.message || 'Failed to fetch video list');
  }

  return res.data?.videos || [];
}
