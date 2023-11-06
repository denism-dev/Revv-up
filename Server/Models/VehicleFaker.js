const faker = require('faker');
const Vehicle = require('./Vehicle');


//generate fake records(50 records)
async function generateAndSaveRecords() {
    for (let i = 0; i < 15; i++) {
        const vehicle = new Vehicle({
            title: faker.vehicle.vehicle(),
            price: faker.random.number({ min: 5000, max: 50000 }),
            model: faker.vehicle.model(),
            year: faker.random.number({ min: 2000, max: 2023 }),
            transmissionType: faker.random.arrayElement(['automatic', 'manual']),
            engineCapacity: faker.random.number({ min: 1.0, max: 5.0, precision: 0.1 }),
            description: faker.lorem.paragraph(),
            sellerName: faker.name.findName(),
            sellerContact: faker.phone.phoneNumber(),
        });

        await vehicle.save();
    }

    console.log('Records created and saved.');
}

module.exports = generateAndSaveRecords
