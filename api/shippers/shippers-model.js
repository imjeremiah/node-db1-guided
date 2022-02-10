const db = require('../../data/db-config');

module.exports = {
  get,
  getById,
  create,
  update,
  remove,
}

function get() {
  // SELECT * FROM shippers;
  return db('shippers');
}

function getById(id) {
  // without .first() we ALWAYS get an array with could be empty
  return db('shippers').where('id', id).first()
}

async function create({ title, contents }) {
  const [id] = await db('shippers').insert({ title, contents })
  const newShipper = await getById(id)
  return newShipper
}

function update(id, { title, contents }) {
  return db('shippers').where('id', id).update({ title, contents })
    .then(() => {
      return getById(id)
    })
}

async function remove(id) {
  return db('shippers').where('id', id).del()
}
