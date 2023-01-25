const fs = require('fs');

let stays = require('./stays.data.try.json')

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive 
}

function getRandomIntInclusive2(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.random() * (max - min + 1) + min //The maximum is inclusive and the minimum is inclusive 
}

function randomLabels() {
    let labels = ['Trending', 'New', 'Beachfront', 'Cabins', 'Parks', 'Campers', 'Castles', 'Islands',
        'Boats', 'Home', 'Tropical', 'Towers', 'Windmills', 'Farms', 'Cave', 'Ski']
    let fourLabels = [labels[getRandomIntInclusive(0, 15)], labels[getRandomIntInclusive(0, 15)], labels[getRandomIntInclusive(0, 15)], labels[getRandomIntInclusive(0, 15)]]
    return fourLabels
}

_writeCarsToFile()
// console.log(stays);
function _writeCarsToFile() {
    stays = stays.map((stay) => {
        let updateStay = {
            ...stay,
            labels: randomLabels(),
            stayDetails: {
                guests: stay.capacity,
                bedrooms: stay.bedrooms,
                beds: stay.bedrooms,
                bathrooms: stay.bathrooms
            },
            host: {
                _id: stay.host._id,
                fullname: stay.host.fullname,
                imgUrl: stay.host.pictureUrl,
                isSuperHost: Math.random() > 0.5
            },
            type: stay.roomType

        }

        updateStay.reviews = updateStay.reviews.map((review) => {
            review.moreRate = { cleanliness: getRandomIntInclusive2(3, 4), accuracy: getRandomIntInclusive2(3, 4), communication: getRandomIntInclusive2(3, 4), location: getRandomIntInclusive2(3, 4), checkIn: getRandomIntInclusive2(3, 4), value: getRandomIntInclusive2(3, 4) }
            return review
        })

        delete updateStay.capacity
        delete updateStay.bathrooms
        delete updateStay.bedrooms



        return updateStay
    })


    return new Promise((res, rej) => {
        const data = JSON.stringify(stays, null, 2)
        fs.writeFile('./newStays.json', data, (err) => {
            if (err) return rej(err)
            console.log("File written successfully\n");
            res()
        });
    })
}

// {
//     "_id": "10006546",
//     "name": "Luxury suite overlooking the Wadden Sea, Harlingen",
//     "type": "House",
//     "imgUrls": [
//         "https://a0.muscache.com/im/pictures/be42241a-5346-4745-a2ef-8cf7576f88b8.jpg",
//         "https://a0.muscache.com/im/pictures/d0fa428d-b0f7-4e4a-93d9-f2e702133e48.jpg",
//         "https://a0.muscache.com/im/pictures/4119dad5-30be-4e72-844e-a7343046070c.jpg",
//         "https://a0.muscache.com/im/pictures/87ff9bf9-5dfb-4d80-90cd-6cc61a08773e.jpg",
//         "https://a0.muscache.com/im/pictures/b6b95b9b-5281-454d-adaa-af75044cacca.jpg"
//     ],
//     "price": 1205,
//     "summary": "The luxurious spacious suite is furnished with a cozy seating area, flat-screen TV, minibar, double box spring, double sink, jacuzzi, hairdryer, bathroom with spacious rain shower and toilet. A luxury breakfast is served every morning.",
//     "stayDetails": {
//         "guests": 8,
//         "bedrooms": 3,
//         "beds": 3,
//         "sharedBath": 1,
//         "allowPets": false
//     },
//     "amenities": [
//         "Beach access – Beachfront",
//         "Wifi",
//         "Kitchen",
//         "Smoking allowed",
//         "Cooking basics"
//     ],
//     "labels": [
//         "New",
//         "Trending",
//         "Towers",
//         "Tropical"
//     ],
//     "host": {
//         "_id": "u101",
//         "fullname": "Davit Pok",
//         "imgUrl": "http://res.cloudinary.com/dp32ucj0y/image/upload/v1674657025/euxou0azal9iw7vp17vh.jpg"
//     },
//     "loc": {
//         "country": "Portugal",
//         "countryCode": "PT",
//         "city": "Porto",
//         "address": "17 Kombo st",
//         "lat": 41.1413,
//         "lng": -8.61308
//     },
//     "reviews": [
//         {
//             "id": "madeId1",
//             "txt": "This location had breathtaking views. I cant say enough about the staff Mary and Tim. They were very accommodating throughout the entire trip They delivered breakfast every morning in a crate and it was a perfect way to start our day.The location was perfect and the views of the caldera were amazing. Will definitely book here again",
//             "moreRate": {
//                 "cleanliness": 4,
//                 "accuracy": 4.1,
//                 "communication": 5.8,
//                 "location": 5,
//                 "checkIn": 5,
//                 "value": 4.9
//             },
//             "createdAt": "Sat Mar 25 2023 03:00:00 GMT+0300 (שעון ישראל (קיץ))",
//             "by": {
//                 "_id": "u102",
//                 "fullname": "Melanie",
//                 "imgUrl": "http://res.cloudinary.com/dp32ucj0y/image/upload/v1674657025/soxgedrvonz2z3q1u1mi.jpg"
//             }
//         },
//         {
//             "id": "madeId2",
//             "txt": "An amazing apartment with spectacular views. We couldnt fault anything, Marios was always available to answer any questions.We would definitely recommend this as great place to rest and relax and soak in the beautiful view",
//             "moreRate": {
//                 "cleanliness": 4.2,
//                 "accuracy": 4.1,
//                 "communication": 5,
//                 "location": 4.2,
//                 "checkIn": 5,
//                 "value": 4
//             },
//             "createdAt": "Fri Feb 25 2022 02:00:00 GMT+0200 (שעון ישראל (חורף))",
//             "by": {
//                 "_id": "u102",
//                 "fullname": "Demetri",
//                 "imgUrl": "http://res.cloudinary.com/dp32ucj0y/image/upload/v1674657025/ysrmbblcprixwxwwa62g.jpg"
//             }
//         },
//         {
//             "id": "madeId3",
//             "txt": "lovely apartment with beautiful views very clean and nicely decorated Good facilities",
//             "moreRate": {
//                 "cleanliness": 3.5,
//                 "accuracy": 5,
//                 "communication": 3.9,
//                 "location": 4.2,
//                 "checkIn": 5,
//                 "value": 4.8
//             },
//             "createdAt": "Fri Feb 25 2022 02:00:00 GMT+0200 (שעון ישראל (חורף))",
//             "by": {
//                 "_id": "u102",
//                 "fullname": "Luke",
//                 "imgUrl": "http://res.cloudinary.com/dp32ucj0y/image/upload/v1674657025/dxmbmocqyzdthqjq6tis.jpg"
//             }
//         },
//         {
//             "id": "madeId4",
//             "txt": "We had a great time at Marble Sun. The view from the plunge pool and balcony are absolutely breathtaking. The location is quite convenient in Oia and there are plenty of good restaurants around. We also appreciated the assistance in booking activities around the island. The breakfasts delivered every morning were fantastic",
//             "moreRate": {
//                 "cleanliness": 5,
//                 "accuracy": 5,
//                 "communication": 4.2,
//                 "location": 4.8,
//                 "checkIn": 4.1,
//                 "value": 5
//             },
//             "createdAt": "Sun Sep 25 2022 03:00:00 GMT+0300 (שעון ישראל (קיץ))",
//             "by": {
//                 "_id": "u102",
//                 "fullname": "Sally",
//                 "imgUrl": "http://res.cloudinary.com/dp32ucj0y/image/upload/v1674657025/geec3czlrtp18udpuuyg.jpg"
//             }
//         }
//     ],
//     "likedByUsers": [
//         "mini-user"
//     ]
// }