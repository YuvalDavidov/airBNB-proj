import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'stayDB'

export const stayService = {
  query,
  getById,
  save,
  remove,
  getEmptyStay,
  addStayMsg,
  getFilterFromSearchParams,
  getDefaultFilter,
  getStaysForWishlist
  // getDefaultHeaderFilter,
  // getDefaultLabelsFilter,
  // getDefaultModalFilter
}
// window.cs = stayService

_createStays()

async function query(filterBy) {
  let stays = await storageService.query(STORAGE_KEY)


  if (filterBy?.hostId) {
    console.log(filterBy.hostId);
    stays = stays.filter(stay => stay.host._id === filterBy.hostId)
  }

  if (filterBy?.locationCity) stays = stays.filter(stay => stay.loc.city === filterBy.locationCity)
  if (filterBy?.locationCountry) stays = stays.filter(stay => stay.loc.country === filterBy.locationCountry)
  if (filterBy?.guests) stays = stays.filter(stay => stay.stayDetails.guests >= filterBy.guests)
  if (filterBy?.label) stays = stays.filter(stay => stay.labels.includes(filterBy.label))


  return stays
}

function getById(stayId) {
  return storageService.get(STORAGE_KEY, stayId)
}

async function remove(stayId) {
  // throw new Error('Nope')
  await storageService.remove(STORAGE_KEY, stayId)
}

async function save(stay) {
  let savedStay
  console.log(stay);
  if (stay._id) {
    savedStay = await storageService.put(STORAGE_KEY, stay)
  } else {
    // Later, owner is set by the backend
    stay.host = userService.getLoggedinUser()
    savedStay = await storageService.post(STORAGE_KEY, stay)
  }
  return savedStay
}

async function getStaysForWishlist(staysIds) {
  const stays = await query()
  const filteredStays = stays.filter(stay => staysIds.includes(stay._id))
  return filteredStays
}

async function addStayMsg(stayId, txt) {
  // Later, this is all done by the backend
  const stay = await getById(stayId)
  if (!stay.msgs) stay.msgs = []

  const msg = {
    id: utilService.makeId(),
    by: userService.getLoggedinUser(),
    txt,
  }
  stay.msgs.push(msg)
  await storageService.put(STORAGE_KEY, stay)

  return msg
}

function getEmptyStay() {
  return {
    name: '',
    type: '',
    imgUrls: [],
    price: 0,
    summary: '',
    stayDetails: {
      guests: 0,
      bedrooms: 0,
      beds: 0,
      sharedBath: 0,
      allowPets: false,
    },
    amenities: [],
    labels: [],
    host: {},
    loc: {
      country: '',
      countryCode: '',
      city: '',
      address: '',
      lat: 0,
      lng: 0,
    },
    reviews: [],
  }
}

function _createStays() {
  let stays = JSON.parse(localStorage.getItem(STORAGE_KEY))
  if (!stays || !stays.length) {
    stays = [
      {
        _id: '10006546',
        name: 'Luxury suite overlooking the Wadden Sea, Harlingen',
        type: 'House',
        imgUrls: [
          'https://a0.muscache.com/im/pictures/be42241a-5346-4745-a2ef-8cf7576f88b8.jpg',
          'https://a0.muscache.com/im/pictures/d0fa428d-b0f7-4e4a-93d9-f2e702133e48.jpg',
          'https://a0.muscache.com/im/pictures/4119dad5-30be-4e72-844e-a7343046070c.jpg',
          'https://a0.muscache.com/im/pictures/87ff9bf9-5dfb-4d80-90cd-6cc61a08773e.jpg',
          'https://a0.muscache.com/im/pictures/b6b95b9b-5281-454d-adaa-af75044cacca.jpg',
        ],
        price: 1205,
        summary:
          'The luxurious spacious suite is furnished with a cozy seating area, flat-screen TV, minibar, double box spring, double sink, jacuzzi, hairdryer, bathroom with spacious rain shower and toilet. A luxury breakfast is served every morning.',
        stayDetails: {
          guests: 8,
          bedrooms: 3,
          beds: 3,
          sharedBath: 1,
          allowPets: false,
        },
        amenities: [
          'Beach access – Beachfront',
          'Wifi',
          'Kitchen',
          'Smoking allowed',
          'Pets allowed',
          'Cooking basics',
        ],
        labels: ['Top of the world', 'Trending', 'Play', 'Tropical'],
        host: {
          _id: 'u101',
          fullname: 'Davit Pok',
          imgUrl:
            'https://res.cloudinary.com/dp32ucj0y/image/upload/v1673813926/lglgsenxgbub2dwtangi.jpg',
        },
        loc: {
          country: 'Portugal',
          countryCode: 'PT',
          city: 'Porto',
          address: '17 Kombo st',
          lat: 41.1413,
          lng: -8.61308,
        },
        reviews: [
          {
            id: 'madeId1',
            txt: 'This location had breathtaking views. I cant say enough about the staff Mary and Tim. They were very accommodating throughout the entire trip They delivered breakfast every morning in a crate and it was a perfect way to start our day.The location was perfect and the views of the caldera were amazing. Will definitely book here again',
            rate: 4,
            moreRate: {
              cleanliness: 4,
              accuracy: 4,
              communication: 5,
              location: 5,
              checkIn: 5,
              value: 4
            },
            createdAt: new Date(),
            by: {
              _id: 'u102',
              fullname: 'yuval davidov',
              imgUrl:
                'https://res.cloudinary.com/dp32ucj0y/image/upload/v1673813926/lglgsenxgbub2dwtangi.jpg',
            },
          },
          {
            id: 'madeId2',
            txt: 'This location had breathtaking views. I cant say enough about the staff Mary and Tim. They were very accommodating throughout the entire trip They delivered breakfast every morning in a crate and it was a perfect way to start our day.The location was perfect and the views of the caldera were amazing. Will definitely book here again',
            rate: 4,
            moreRate: {
              cleanliness: 4,
              accuracy: 4,
              communication: 5,
              location: 5,
              checkIn: 5,
              value: 4
            },
            createdAt: new Date(),
            by: {
              _id: 'u102',
              fullname: 'yuval davidov',
              imgUrl:
                'https://res.cloudinary.com/dp32ucj0y/image/upload/v1673813926/lglgsenxgbub2dwtangi.jpg',
            },
          },
          {
            id: 'madeId3',
            txt: 'didnt like the place',
            rate: 2,
            moreRate: {
              cleanliness: 2,
              accuracy: 5,
              communication: 3,
              location: 3,
              checkIn: 1,
              value: 2
            },
            createdAt: new Date(),
            by: {
              _id: 'u102',
              fullname: 'yuval davidov',
              imgUrl:
                'https://res.cloudinary.com/dp32ucj0y/image/upload/v1673813926/lglgsenxgbub2dwtangi.jpg',
            },
          },
          {
            id: 'madeId4',
            txt: 'We had a great time at Marble Sun. The view from the plunge pool and balcony are absolutely breathtaking. The location is quite convenient in Oia and there are plenty of good restaurants around. We also appreciated the assistance in booking activities around the island. The breakfasts delivered every morning were fantastic',
            rate: 4,
            moreRate: {
              cleanliness: 5,
              accuracy: 5,
              communication: 2,
              location: 4,
              checkIn: 3,
              value: 2
            },
            createdAt: new Date(),
            by: {
              _id: 'u102',
              fullname: 'yuval davidov',
              imgUrl:
                'https://res.cloudinary.com/dp32ucj0y/image/upload/v1673813926/lglgsenxgbub2dwtangi.jpg',
            },
          },
        ],
        likedByUsers: ['mini-user'],
      },
      {
        _id: '10006547',
        name: 'Unique nature lodge with amazing views',
        type: 'House',
        imgUrls: [
          'https://a0.muscache.com/im/pictures/prohost-api/Hosting-656456202599059844/original/4dd9802c-0f7b-4eae-b535-e28c7904f332.jpeg',
          'https://a0.muscache.com/im/pictures/prohost-api/Hosting-656456202599059844/original/f44a2a6b-954a-46e7-89d8-ccc47c4bff20.jpeg',
          'https://a0.muscache.com/im/pictures/prohost-api/Hosting-656456202599059844/original/45cd1cb6-b036-42bc-93b1-b8f7488b6075.jpeg',
          'https://a0.muscache.com/im/pictures/prohost-api/Hosting-656456202599059844/original/901c6d30-92bb-4731-80ec-e8f5b637c98a.jpeg',
          'https://a0.muscache.com/im/pictures/prohost-api/Hosting-656456202599059844/original/d87ff1f5-a3e5-4717-b923-3c20d8208e49.jpeg',
        ],
        price: 247,
        summary:
          'Nature lodge Tureluur is located in a unique place in the middle of the nature of Drenthe and is suitable for 2 people. Ideal for a nice time with your partner or family/friends. The accommodation is located on Pieterpad and can also be booked for 1 night. After a delicious breakfast (to be booked on site) you continue your walk on this beautiful walking route.',
        stayDetails: {
          guests: 8,
          bedrooms: 3,
          beds: 3,
          sharedBath: 1,
          allowPets: false,
        },
        amenities: [
          'Kitchen',
          'Dedicated workspace',
          'Pets allowed',
          'Smoking allowed',
          'Pets allowed',
          'Cooking basics',
        ],
        labels: ['Cabins', 'Trending', 'Play', 'Tiny homes'],
        host: {
          _id: 'u102',
          fullname: 'Charles Manson',
          imgUrl:
            'https://res.cloudinary.com/dp32ucj0y/image/upload/v1673813926/lglgsenxgbub2dwtangi.jpg',
        },
        loc: {
          country: 'Portugal',
          countryCode: 'PT',
          city: 'Porto',
          address: '17 Kombo st',
          lat: 41.1413,
          lng: -8.61308,
        },
        reviews: [
          {
            id: 'madeId1',
            txt: 'This location had breathtaking views. I cant say enough about the staff Mary and Tim. They were very accommodating throughout the entire trip They delivered breakfast every morning in a crate and it was a perfect way to start our day.The location was perfect and the views of the caldera were amazing. Will definitely book here again',
            rate: 4,
            moreRate: {
              cleanliness: 4,
              accuracy: 4,
              communication: 5,
              location: 5,
              checkIn: 5,
              value: 4
            },
            createdAt: new Date(),
            by: {
              _id: 'u102',
              fullname: 'yuval davidov',
              imgUrl:
                'https://res.cloudinary.com/dp32ucj0y/image/upload/v1673813926/lglgsenxgbub2dwtangi.jpg',
            },
          },
          {
            id: 'madeId2',
            txt: 'This location had breathtaking views. I cant say enough about the staff Mary and Tim. They were very accommodating throughout the entire trip They delivered breakfast every morning in a crate and it was a perfect way to start our day.The location was perfect and the views of the caldera were amazing. Will definitely book here again',
            rate: 4,
            moreRate: {
              cleanliness: 4,
              accuracy: 4,
              communication: 5,
              location: 5,
              checkIn: 5,
              value: 4
            },
            createdAt: new Date(),
            by: {
              _id: 'u102',
              fullname: 'yuval davidov',
              imgUrl:
                'https://res.cloudinary.com/dp32ucj0y/image/upload/v1673813926/lglgsenxgbub2dwtangi.jpg',
            },
          },
          {
            id: 'madeId3',
            txt: 'didnt like the place',
            rate: 2,
            moreRate: {
              cleanliness: 2,
              accuracy: 5,
              communication: 3,
              location: 3,
              checkIn: 1,
              value: 2
            },
            createdAt: new Date(),
            by: {
              _id: 'u102',
              fullname: 'yuval davidov',
              imgUrl:
                'https://res.cloudinary.com/dp32ucj0y/image/upload/v1673813926/lglgsenxgbub2dwtangi.jpg',
            },
          },
          {
            id: 'madeId4',
            txt: 'We had a great time at Marble Sun. The view from the plunge pool and balcony are absolutely breathtaking. The location is quite convenient in Oia and there are plenty of good restaurants around. We also appreciated the assistance in booking activities around the island. The breakfasts delivered every morning were fantastic',
            rate: 4,
            moreRate: {
              cleanliness: 5,
              accuracy: 5,
              communication: 2,
              location: 4,
              checkIn: 3,
              value: 2
            },
            createdAt: new Date(),
            by: {
              _id: 'u102',
              fullname: 'yuval davidov',
              imgUrl:
                'https://res.cloudinary.com/dp32ucj0y/image/upload/v1673813926/lglgsenxgbub2dwtangi.jpg',
            },
          },
        ],
        likedByUsers: ['mini-user'],
      },
      {
        _id: '10006548',
        name: 'Unique nature lodge with amazing views',
        type: 'House',
        imgUrls: [
          'https://a0.muscache.com/im/pictures/prohost-api/Hosting-755137040389728919/original/f0e6a6ed-4acb-4efa-bd29-9de320df368e.jpeg',
          'https://a0.muscache.com/im/pictures/prohost-api/Hosting-755137040389728919/original/0f81b3b1-1b24-4303-8f82-be2f03f2418a.jpeg',
          'https://a0.muscache.com/im/pictures/prohost-api/Hosting-755137040389728919/original/2d7658df-98fd-49f6-9d06-c9320bd8e7d4.jpeg',
          'https://a0.muscache.com/im/pictures/prohost-api/Hosting-755137040389728919/original/9bcfc1d9-8b2f-46ba-a540-79b1c1bf1a9a.jpeg',
          'https://a0.muscache.com/im/pictures/prohost-api/Hosting-755137040389728919/original/38dd3ce4-5dfb-414a-ac6a-5fc299ecae74.jpeg',
        ],
        price: 10590,
        summary:
          'Welcome to Invisible House. Re-launched in November 2022 as a joint venture with Fieldtrip Hospitality.',
        stayDetails: {
          guests: 8,
          bedrooms: 3,
          beds: 3,
          sharedBath: 1,
          allowPets: false,
        },
        amenities: [
          'Pets allowed',
          'Mountain view',
          'Pets allowed',
          'Smoking allowed',
          'Pets allowed',
          'Wifi',
        ],
        labels: ['Cabins', 'Trending', 'Play', 'Invisible'],
        host: {
          _id: 'u103',
          fullname: 'Jeffrey Dahmer',
          imgUrl:
            'https://res.cloudinary.com/dp32ucj0y/image/upload/v1673813926/lglgsenxgbub2dwtangi.jpg',
        },
        loc: {
          country: 'Portugal',
          countryCode: 'PT',
          city: 'Porto',
          address: '17 Kombo st',
          lat: 41.1413,
          lng: -8.61308,
        },
        reviews: [
          {
            id: 'madeId1',
            txt: 'This location had breathtaking views. I cant say enough about the staff Mary and Tim. They were very accommodating throughout the entire trip They delivered breakfast every morning in a crate and it was a perfect way to start our day.The location was perfect and the views of the caldera were amazing. Will definitely book here again',
            rate: 4,
            moreRate: {
              cleanliness: 4,
              accuracy: 4,
              communication: 5,
              location: 5,
              checkIn: 5,
              value: 4
            },
            createdAt: new Date(),
            by: {
              _id: 'u102',
              fullname: 'yuval davidov',
              imgUrl:
                'https://res.cloudinary.com/dp32ucj0y/image/upload/v1673813926/lglgsenxgbub2dwtangi.jpg',
            },
          },
          {
            id: 'madeId2',
            txt: 'This location had breathtaking views. I cant say enough about the staff Mary and Tim. They were very accommodating throughout the entire trip They delivered breakfast every morning in a crate and it was a perfect way to start our day.The location was perfect and the views of the caldera were amazing. Will definitely book here again',
            rate: 4,
            moreRate: {
              cleanliness: 4,
              accuracy: 4,
              communication: 5,
              location: 5,
              checkIn: 5,
              value: 4
            },
            createdAt: new Date(),
            by: {
              _id: 'u102',
              fullname: 'yuval davidov',
              imgUrl:
                'https://res.cloudinary.com/dp32ucj0y/image/upload/v1673813926/lglgsenxgbub2dwtangi.jpg',
            },
          },
          {
            id: 'madeId3',
            txt: 'didnt like the place',
            rate: 2,
            moreRate: {
              cleanliness: 2,
              accuracy: 5,
              communication: 3,
              location: 3,
              checkIn: 1,
              value: 2
            },
            createdAt: new Date(),
            by: {
              _id: 'u102',
              fullname: 'yuval davidov',
              imgUrl:
                'https://res.cloudinary.com/dp32ucj0y/image/upload/v1673813926/lglgsenxgbub2dwtangi.jpg',
            },
          },
          {
            id: 'madeId4',
            txt: 'We had a great time at Marble Sun. The view from the plunge pool and balcony are absolutely breathtaking. The location is quite convenient in Oia and there are plenty of good restaurants around. We also appreciated the assistance in booking activities around the island. The breakfasts delivered every morning were fantastic',
            rate: 4,
            moreRate: {
              cleanliness: 5,
              accuracy: 5,
              communication: 2,
              location: 4,
              checkIn: 3,
              value: 2
            },
            createdAt: new Date(),
            by: {
              _id: 'u102',
              fullname: 'yuval davidov',
              imgUrl:
                'https://res.cloudinary.com/dp32ucj0y/image/upload/v1673813926/lglgsenxgbub2dwtangi.jpg',
            },
          },
        ],
        likedByUsers: ['mini-user'],
      },
      {
        _id: '10006549',
        name: 'Modern x Muskoka: Contemporary Waterfront Oasis',
        type: 'House',
        imgUrls: [
          'https://a0.muscache.com/im/pictures/miso/Hosting-723333875796658011/original/bb571af3-8cd5-4c26-825c-b8a37a56c786.jpeg',
          'https://a0.muscache.com/im/pictures/miso/Hosting-723333875796658011/original/2dd17b6f-9317-4a8c-afdb-d2b16e54f552.jpeg',
          'https://a0.muscache.com/im/pictures/miso/Hosting-723333875796658011/original/27c4ee8f-776d-49d6-9b4a-acdb6d2e16db.jpeg',
          'https://a0.muscache.com/im/pictures/miso/Hosting-723333875796658011/original/06529c2a-ae65-4888-a177-1efb387a9adb.jpeg',
          'https://a0.muscache.com/im/pictures/miso/Hosting-723333875796658011/original/52019795-8487-4143-8973-bc0e3f4b53a7.jpeg',
        ],
        price: 1237,
        summary:
          'Relax in this beautiful natural setting that Muskoka has to offer, while at the same time enjoying all comforts and conveniences in this unique and contemporary home.',
        stayDetails: {
          guests: 8,
          bedrooms: 3,
          beds: 3,
          sharedBath: 1,
          allowPets: false,
        },
        amenities: [
          'River view',
          'Waterfront',
          'Pets allowed',
          'Private sauna',
          'Dedicated workspace',
          'Wifi',
        ],
        labels: ['Cabins', 'Trending', 'Play', 'Invisible'],
        host: {
          _id: 'u103',
          fullname: 'Jeffrey Dahmer',
          imgUrl:
            'https://res.cloudinary.com/dp32ucj0y/image/upload/v1673813926/lglgsenxgbub2dwtangi.jpg',
        },
        loc: {
          country: 'Portugal',
          countryCode: 'PT',
          city: 'Porto',
          address: '17 Kombo st',
          lat: 41.1413,
          lng: -8.61308,
        },
        reviews: [
          {
            id: 'madeId1',
            txt: 'This location had breathtaking views. I cant say enough about the staff Mary and Tim. They were very accommodating throughout the entire trip They delivered breakfast every morning in a crate and it was a perfect way to start our day.The location was perfect and the views of the caldera were amazing. Will definitely book here again',
            rate: 4,
            moreRate: {
              cleanliness: 4,
              accuracy: 4,
              communication: 5,
              location: 5,
              checkIn: 5,
              value: 4
            },
            createdAt: new Date(),
            by: {
              _id: 'u102',
              fullname: 'yuval davidov',
              imgUrl:
                'https://res.cloudinary.com/dp32ucj0y/image/upload/v1673813926/lglgsenxgbub2dwtangi.jpg',
            },
          },
          {
            id: 'madeId2',
            txt: 'This location had breathtaking views. I cant say enough about the staff Mary and Tim. They were very accommodating throughout the entire trip They delivered breakfast every morning in a crate and it was a perfect way to start our day.The location was perfect and the views of the caldera were amazing. Will definitely book here again',
            rate: 4,
            moreRate: {
              cleanliness: 4,
              accuracy: 4,
              communication: 5,
              location: 5,
              checkIn: 5,
              value: 4
            },
            createdAt: new Date(),
            by: {
              _id: 'u102',
              fullname: 'yuval davidov',
              imgUrl:
                'https://res.cloudinary.com/dp32ucj0y/image/upload/v1673813926/lglgsenxgbub2dwtangi.jpg',
            },
          },
          {
            id: 'madeId3',
            txt: 'didnt like the place',
            rate: 2,
            moreRate: {
              cleanliness: 2,
              accuracy: 5,
              communication: 3,
              location: 3,
              checkIn: 1,
              value: 2
            },
            createdAt: new Date(),
            by: {
              _id: 'u102',
              fullname: 'yuval davidov',
              imgUrl:
                'https://res.cloudinary.com/dp32ucj0y/image/upload/v1673813926/lglgsenxgbub2dwtangi.jpg',
            },
          },
          {
            id: 'madeId4',
            txt: 'We had a great time at Marble Sun. The view from the plunge pool and balcony are absolutely breathtaking. The location is quite convenient in Oia and there are plenty of good restaurants around. We also appreciated the assistance in booking activities around the island. The breakfasts delivered every morning were fantastic',
            rate: 4,
            moreRate: {
              cleanliness: 5,
              accuracy: 5,
              communication: 2,
              location: 4,
              checkIn: 3,
              value: 2
            },
            createdAt: new Date(),
            by: {
              _id: 'u102',
              fullname: 'yuval davidov',
              imgUrl:
                'https://res.cloudinary.com/dp32ucj0y/image/upload/v1673813926/lglgsenxgbub2dwtangi.jpg',
            },
          },
        ],
        likedByUsers: ['mini-user'],
      },
      {
        _id: '10006550',
        name: 'Exclusive & Private Island Resort: Floral Island',
        type: 'House',
        imgUrls: [
          'https://a0.muscache.com/im/pictures/444a8225-e657-4d62-97db-42f7423ae890.jpg',
          'https://a0.muscache.com/im/pictures/78fb8268-b999-4389-b072-e2a66910e41b.jpg',
          'https://a0.muscache.com/im/pictures/1b922648-4f72-4648-95d4-1568f7ed04f0.jpg',
          'https://a0.muscache.com/im/pictures/45f20fc7-9a56-4ef0-b482-79abfb2ddf7e.jpg',
          'https://a0.muscache.com/im/pictures/582ec202-2d72-4742-bdfe-38b56e50e0f6.jpg',
        ],
        price: 2626,
        summary:
          'We can accommodate up to 24+ Persons. Accepts Weddings and Events',
        stayDetails: {
          guests: 8,
          bedrooms: 3,
          beds: 3,
          sharedBath: 1,
          allowPets: false,
        },
        amenities: [
          'Bay view',
          'Garden view',
          'Pets allowed',
          'Private sauna',
          'Dedicated workspace',
          'Wifi',
        ],
        labels: ['Cabins', 'Trending', 'Play', 'Island'],
        host: {
          _id: 'u104',
          fullname: 'Ted Bundy',
          imgUrl:
            'https://res.cloudinary.com/dp32ucj0y/image/upload/v1673813926/lglgsenxgbub2dwtangi.jpg',
        },
        loc: {
          country: 'Portugal',
          countryCode: 'PT',
          city: 'Porto',
          address: '17 Kombo st',
          lat: 41.1413,
          lng: -8.61308,
        },
        reviews: [
          {
            id: 'madeId1',
            txt: 'This location had breathtaking views. I cant say enough about the staff Mary and Tim. They were very accommodating throughout the entire trip They delivered breakfast every morning in a crate and it was a perfect way to start our day.The location was perfect and the views of the caldera were amazing. Will definitely book here again',
            rate: 4,
            moreRate: {
              cleanliness: 4,
              accuracy: 4,
              communication: 5,
              location: 5,
              checkIn: 5,
              value: 4
            },
            createdAt: new Date(),
            by: {
              _id: 'u102',
              fullname: 'yuval davidov',
              imgUrl:
                'https://res.cloudinary.com/dp32ucj0y/image/upload/v1673813926/lglgsenxgbub2dwtangi.jpg',
            },
          },
          {
            id: 'madeId2',
            txt: 'This location had breathtaking views. I cant say enough about the staff Mary and Tim. They were very accommodating throughout the entire trip They delivered breakfast every morning in a crate and it was a perfect way to start our day.The location was perfect and the views of the caldera were amazing. Will definitely book here again',
            rate: 4,
            moreRate: {
              cleanliness: 4,
              accuracy: 4,
              communication: 5,
              location: 5,
              checkIn: 5,
              value: 4
            },
            createdAt: new Date(),
            by: {
              _id: 'u102',
              fullname: 'yuval davidov',
              imgUrl:
                'https://res.cloudinary.com/dp32ucj0y/image/upload/v1673813926/lglgsenxgbub2dwtangi.jpg',
            },
          },
          {
            id: 'madeId3',
            txt: 'didnt like the place',
            rate: 2,
            moreRate: {
              cleanliness: 2,
              accuracy: 5,
              communication: 3,
              location: 3,
              checkIn: 1,
              value: 2
            },
            createdAt: new Date(),
            by: {
              _id: 'u102',
              fullname: 'yuval davidov',
              imgUrl:
                'https://res.cloudinary.com/dp32ucj0y/image/upload/v1673813926/lglgsenxgbub2dwtangi.jpg',
            },
          },
          {
            id: 'madeId4',
            txt: 'We had a great time at Marble Sun. The view from the plunge pool and balcony are absolutely breathtaking. The location is quite convenient in Oia and there are plenty of good restaurants around. We also appreciated the assistance in booking activities around the island. The breakfasts delivered every morning were fantastic',
            rate: 4,
            moreRate: {
              cleanliness: 5,
              accuracy: 5,
              communication: 2,
              location: 4,
              checkIn: 3,
              value: 2
            },
            createdAt: new Date(),
            by: {
              _id: 'u102',
              fullname: 'yuval davidov',
              imgUrl:
                'https://res.cloudinary.com/dp32ucj0y/image/upload/v1673813926/lglgsenxgbub2dwtangi.jpg',
            },
          },
        ],
        likedByUsers: ['mini-user'],
      },
      {
        _id: '10006551',
        name: 'Relax in private exclusive Estate,3km Uffizi,13bdr',
        type: 'Mansion',
        imgUrls: [
          'https://a0.muscache.com/im/pictures/5e14c015-abe6-4305-87d5-95511fe1a6fe.jpg',
          'https://a0.muscache.com/im/pictures/d16eab6d-262f-4844-b6e1-e667f24d79f8.jpg',
          'https://a0.muscache.com/im/pictures/miso/Hosting-27270359/original/f60c06f0-7ae4-4e09-a6c6-a5c5b3a8f8dd.jpeg',
          'https://a0.muscache.com/im/pictures/miso/Hosting-27270359/original/820b7b76-2578-46ce-8b27-c6475ea39afd.jpeg',
          'https://a0.muscache.com/im/pictures/7c2b0d1c-01b6-4334-a03e-a61cf46adacb.jpg',
        ],
        price: 8985,
        summary:
          'Exclusive living in a Private historical Tuscan Estate (family owned/managed) 3 km from Ponte Vecchio, private swimmingpool, wifi, parking. Outdoor kitchen area with barbecue and pizza oven.',
        stayDetails: {
          guests: 8,
          bedrooms: 3,
          beds: 3,
          sharedBath: 1,
          allowPets: false,
        },
        amenities: [
          'Private outdoor pool - available seasonally, open 24 hours, rooftop',
          'Garden view',
          'Pets allowed',
          'Private sauna',
          'Dedicated workspace',
          'Wifi',
        ],
        labels: ['Cabins', 'Trending', 'Play', 'Mansion'],
        host: {
          _id: 'u104',
          fullname: 'Ted Bundy',
          imgUrl:
            'https://res.cloudinary.com/dp32ucj0y/image/upload/v1673813926/lglgsenxgbub2dwtangi.jpg',
        },
        loc: {
          country: 'Portugal',
          countryCode: 'PT',
          city: 'Porto',
          address: '17 Kombo st',
          lat: 41.1413,
          lng: -8.61308,
        },
        reviews: [
          {
            id: 'madeId1',
            txt: 'This location had breathtaking views. I cant say enough about the staff Mary and Tim. They were very accommodating throughout the entire trip They delivered breakfast every morning in a crate and it was a perfect way to start our day.The location was perfect and the views of the caldera were amazing. Will definitely book here again',
            rate: 4,
            moreRate: {
              cleanliness: 4,
              accuracy: 4,
              communication: 5,
              location: 5,
              checkIn: 5,
              value: 4
            },
            createdAt: new Date(),
            by: {
              _id: 'u102',
              fullname: 'yuval davidov',
              imgUrl:
                'https://res.cloudinary.com/dp32ucj0y/image/upload/v1673813926/lglgsenxgbub2dwtangi.jpg',
            },
          },
          {
            id: 'madeId2',
            txt: 'This location had breathtaking views. I cant say enough about the staff Mary and Tim. They were very accommodating throughout the entire trip They delivered breakfast every morning in a crate and it was a perfect way to start our day.The location was perfect and the views of the caldera were amazing. Will definitely book here again',
            rate: 4,
            moreRate: {
              cleanliness: 4,
              accuracy: 4,
              communication: 5,
              location: 5,
              checkIn: 5,
              value: 4
            },
            createdAt: new Date(),
            by: {
              _id: 'u102',
              fullname: 'yuval davidov',
              imgUrl:
                'https://res.cloudinary.com/dp32ucj0y/image/upload/v1673813926/lglgsenxgbub2dwtangi.jpg',
            },
          },
          {
            id: 'madeId3',
            txt: 'didnt like the place',
            rate: 2,
            moreRate: {
              cleanliness: 2,
              accuracy: 5,
              communication: 3,
              location: 3,
              checkIn: 1,
              value: 2
            },
            createdAt: new Date(),
            by: {
              _id: 'u102',
              fullname: 'yuval davidov',
              imgUrl:
                'https://res.cloudinary.com/dp32ucj0y/image/upload/v1673813926/lglgsenxgbub2dwtangi.jpg',
            },
          },
          {
            id: 'madeId4',
            txt: 'We had a great time at Marble Sun. The view from the plunge pool and balcony are absolutely breathtaking. The location is quite convenient in Oia and there are plenty of good restaurants around. We also appreciated the assistance in booking activities around the island. The breakfasts delivered every morning were fantastic',
            rate: 4,
            moreRate: {
              cleanliness: 5,
              accuracy: 5,
              communication: 2,
              location: 4,
              checkIn: 3,
              value: 2
            },
            createdAt: new Date(),
            by: {
              _id: 'u102',
              fullname: 'yuval davidov',
              imgUrl:
                'https://res.cloudinary.com/dp32ucj0y/image/upload/v1673813926/lglgsenxgbub2dwtangi.jpg',
            },
          },
        ],
        likedByUsers: ['mini-user'],
      },
      {
        _id: '10006552',
        name: 'Settle Poli - Cottage 4',
        type: 'Cabin',
        imgUrls: [
          'https://a0.muscache.com/im/pictures/miso/Hosting-51762485/original/a65fcdac-4dc8-409a-a2a5-794d3327eb16.jpeg',
          'https://a0.muscache.com/im/pictures/miso/Hosting-51814051/original/82e5d74c-8c06-492c-945e-ebb34274e6d4.jpeg',
          'https://a0.muscache.com/im/pictures/miso/Hosting-51814051/original/8fcab95d-1b0e-4303-bcfb-d7b458550cc2.jpeg',
          'https://a0.muscache.com/im/pictures/miso/Hosting-27270359/original/820b7b76-2578-46ce-8b27-c6475ea39afd.jpeg',
          'https://a0.muscache.com/im/pictures/miso/Hosting-51814051/original/c0327a96-b8cf-4c88-b2f1-89704c485d09.jpeg',
        ],
        price: 786,
        summary:
          'The village has 5 Icelandic cottages. Each cottage comes with a patio with a seating set and barbecue. Cottages are fully equipped, including separate access to wifi, making it easy to connect with remote work.',
        stayDetails: {
          guests: 8,
          bedrooms: 3,
          beds: 3,
          sharedBath: 1,
          allowPets: false,
        },
        amenities: [
          'Kitchen',
          'TV',
          'Hair dryer',
          'Wifi',
          'Hot tub',
          'Fire pit',
        ],
        labels: ['Cabins', 'Trending', 'Play', 'Cottage'],
        host: {
          _id: 'u105',
          fullname: 'Samuel Little',
          imgUrl:
            'https://res.cloudinary.com/dp32ucj0y/image/upload/v1673813926/lglgsenxgbub2dwtangi.jpg',
        },
        loc: {
          country: 'Portugal',
          countryCode: 'PT',
          city: 'Porto',
          address: '17 Kombo st',
          lat: 41.1413,
          lng: -8.61308,
        },
        reviews: [
          {
            id: 'madeId1',
            txt: 'This location had breathtaking views. I cant say enough about the staff Mary and Tim. They were very accommodating throughout the entire trip They delivered breakfast every morning in a crate and it was a perfect way to start our day.The location was perfect and the views of the caldera were amazing. Will definitely book here again',
            rate: 4,
            moreRate: {
              cleanliness: 4,
              accuracy: 4,
              communication: 5,
              location: 5,
              checkIn: 5,
              value: 4
            },
            createdAt: new Date(),
            by: {
              _id: 'u102',
              fullname: 'yuval davidov',
              imgUrl:
                'https://res.cloudinary.com/dp32ucj0y/image/upload/v1673813926/lglgsenxgbub2dwtangi.jpg',
            },
          },
          {
            id: 'madeId2',
            txt: 'This location had breathtaking views. I cant say enough about the staff Mary and Tim. They were very accommodating throughout the entire trip They delivered breakfast every morning in a crate and it was a perfect way to start our day.The location was perfect and the views of the caldera were amazing. Will definitely book here again',
            rate: 4,
            moreRate: {
              cleanliness: 4,
              accuracy: 4,
              communication: 5,
              location: 5,
              checkIn: 5,
              value: 4
            },
            createdAt: new Date(),
            by: {
              _id: 'u102',
              fullname: 'yuval davidov',
              imgUrl:
                'https://res.cloudinary.com/dp32ucj0y/image/upload/v1673813926/lglgsenxgbub2dwtangi.jpg',
            },
          },
          {
            id: 'madeId3',
            txt: 'didnt like the place',
            rate: 2,
            moreRate: {
              cleanliness: 2,
              accuracy: 5,
              communication: 3,
              location: 3,
              checkIn: 1,
              value: 2
            },
            createdAt: new Date(),
            by: {
              _id: 'u102',
              fullname: 'yuval davidov',
              imgUrl:
                'https://res.cloudinary.com/dp32ucj0y/image/upload/v1673813926/lglgsenxgbub2dwtangi.jpg',
            },
          },
          {
            id: 'madeId4',
            txt: 'We had a great time at Marble Sun. The view from the plunge pool and balcony are absolutely breathtaking. The location is quite convenient in Oia and there are plenty of good restaurants around. We also appreciated the assistance in booking activities around the island. The breakfasts delivered every morning were fantastic',
            rate: 4,
            moreRate: {
              cleanliness: 5,
              accuracy: 5,
              communication: 2,
              location: 4,
              checkIn: 3,
              value: 2
            },
            createdAt: new Date(),
            by: {
              _id: 'u102',
              fullname: 'yuval davidov',
              imgUrl:
                'https://res.cloudinary.com/dp32ucj0y/image/upload/v1673813926/lglgsenxgbub2dwtangi.jpg',
            },
          },
        ],
        likedByUsers: ['mini-user'],
      },
    ]

    localStorage.setItem(STORAGE_KEY, JSON.stringify(stays))
  }
}

function getDefaultFilter() {
  return {
    locationCountry: '',
    locationCity: '',
    guests: 0,
    label: '',
    type: '',
    minPrice: 0,
    maxPrice: Infinity,
    amenities: '',
    startDate: Date.now(),
    endDate: Date.now()
  }
}

function getFilterFromSearchParams(searchParams) {
  const emptyFilter = getDefaultFilter()
  const filterBy = {}
  for (const field in emptyFilter) {
    filterBy[field] = searchParams.get(field) || ''
  }
  return filterBy
}

