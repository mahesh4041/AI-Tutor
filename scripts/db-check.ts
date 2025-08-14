import { db } from '../src/lib/db';

async function main() {
  const count = await db.user.count();
  console.log('Users in DB:', count);
}
main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });
