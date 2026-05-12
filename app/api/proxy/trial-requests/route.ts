/**
 * Server-side proxy untuk form trial.
 *
 * Mengapa proxy ini diperlukan:
 *   Landing page di-deploy ke Vercel (HTTPS). Browser tidak bisa
 *   fetch langsung ke http://IP-VPS karena Mixed Content Policy.
 *   Proxy ini berjalan di server Vercel sehingga bebas memanggil
 *   dashboard via HTTP+IP tanpa ada batasan browser.
 *
 * Alur: Browser → POST /api/proxy/trial-requests (HTTPS, Vercel)
 *              → POST http://IP-VPS/api/trial-requests (server-to-server)
 */
import { NextRequest, NextResponse } from 'next/server';

const DASHBOARD_URL    = process.env.DASHBOARD_INTERNAL_URL ?? '';
const LANDING_API_KEY  = process.env.LANDING_API_KEY_SECRET ?? '';

export async function POST(req: NextRequest) {
  if (!DASHBOARD_URL) {
    console.error('[proxy/trial-requests] DASHBOARD_INTERNAL_URL tidak di-set');
    return NextResponse.json({ error: 'Konfigurasi server tidak lengkap.' }, { status: 500 });
  }

  try {
    const body = await req.json();

    const upstream = await fetch(`${DASHBOARD_URL}/api/trial-requests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Landing-Key': LANDING_API_KEY,
      },
      body: JSON.stringify(body),
    });

    const data = await upstream.json().catch(() => ({}));
    return NextResponse.json(data, { status: upstream.status });
  } catch (err) {
    console.error('[proxy/trial-requests]', err);
    return NextResponse.json({ error: 'Gagal menghubungi server.' }, { status: 502 });
  }
}
