const S1 = require('s1db')
const db = new S1(process.env.S1_TOKEN)
export default async function handler(req, res) {
  let running = await db.get('running')
  let zoom
  if (running == true) {
    zoom = await db.get('zoom')
  } else {
    zoom = ''
  }
  res.send({zoom})
}
