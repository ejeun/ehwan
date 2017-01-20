const db = require('./db')
require('./models')
// console.log(db)

const seedPets = () => db.Promise.map([
  {name: 'Holly', kind: 'cat', points: 10},
  {name: 'Isaac', kind: 'succulent', points: 75}
], pet => db.model('pets').create(pet))

const seedMail = () => db.Promise.map([
  {
    petId: 2,
    url: 'http://a9.vietbao.vn/images/vn901/the-gioi/11173656-3.jpg',
    tags: [ 'tropical', 'water', 'travel', 'exotic', 'idyllic', 'summer', 'relaxation']
  },
  {
    petId: 2,
    url: 'http://rowhousenest.com/wp-content/uploads/2015/10/let-love-grow-with-succulents.jpg',
    tags: [ 'flower', 'flora', 'leaf', 'pot', 'nature', 'decoration', 'desktop']
  },
  {
    petId: 1,
    url: 'https://s-media-cache-ak0.pinimg.com/736x/32/3f/a0/323fa07a09bb272ac9dbeb135778ed3f.jpg',
    tags: ['food', 'domestic', 'people', 'one', 'table', 'dish', 'mammal']
  }
], mail => db.model('mails').create(mail))

db.sync({ force: true })
  .then(seedPets)
  .then(pets => console.log(`Seeded ${pets.length} pets OK`))
  .then(seedMail)
  .then(mails => console.log(`Seeded ${mails.length} mails OK`))
  .catch(error => console.error(error))
  .finally(() => db.close())
