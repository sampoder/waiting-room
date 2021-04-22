const S1 = require('s1db')
const db = new S1(process.env.S1_TOKEN)

export default async function handler(req, res) {
  await db.set('zoom', req.query.zoom)
  await db.set('running', true)
  res.send('Done')
}