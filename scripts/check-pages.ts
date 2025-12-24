import fetch from 'node-fetch';

async function check(url: string, pattern: RegExp){
  const res = await fetch(url, { method: 'GET' });
  if(!res.ok) return { ok: false, status: res.status };
  const text = await res.text();
  const match = pattern.test(text);
  return { ok: match, status: res.status, snippet: text.slice(0, 2000) };
}

async function main(){
  const base = 'http://localhost:3000';

  const d = await check(`${base}/dashboard`, /<p class="text-slate-600 text-sm">Produits[\s\S]*?<p class="text-3xl font-bold mt-2">\s*3\s*<\//i);
  console.log('/dashboard =>', d.ok, 'status', d.status);

  const u = await check(`${base}/dashboard/users`, /test@example\.com[\s\S]*?1\s*commande/i);
  console.log('/dashboard/users =>', u.ok, 'status', u.status);

  const o = await check(`${base}/dashboard/orders`, /MacBook Pro 16"[\s\S]*?2999/i);
  console.log('/dashboard/orders =>', o.ok, 'status', o.status);
}

main().catch(e=>{ console.error(e); process.exit(1); });
