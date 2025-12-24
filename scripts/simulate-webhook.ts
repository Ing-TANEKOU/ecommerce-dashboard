import fetch from 'node-fetch';

async function main(){
  const res = await fetch('http://localhost:3000/api/webhooks/stripe/simulate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      metadata: { productId: '', quantity: '1' },
      amount_total: 299900
    })
  });
  const body = await res.json();
  console.log(res.status, body);
}

main().catch(console.error);
