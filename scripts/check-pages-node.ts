(async function(){
  const base = 'http://localhost:3000';
  async function get(path){
    const res = await fetch(base+path);
    if(!res.ok) throw new Error(path+' status '+res.status);
    return await res.text();
  }
  try{
    const d = await get('/dashboard');
    console.log('/dashboard contains Produits?', d.includes('Produits'));
    console.log('/dashboard contains 3?', />\s*3\s*</.test(d));

    const u = await get('/dashboard/users');
    console.log('/dashboard/users contains test@example.com?', u.includes('test@example.com'));
    console.log('/dashboard/users contains 1 commande?', /1\s*commande/i.test(u));

    const o = await get('/dashboard/orders');
    console.log('/dashboard/orders contains MacBook Pro 16"?', o.includes('MacBook Pro 16"'));
    console.log('/dashboard/orders contains 2999?', o.includes('2999'));
  }catch(e){
    console.error('check failed', e.message);
    process.exit(1);
  }
})();
