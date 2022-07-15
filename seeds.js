const {Vendor} = require("./models")

const users = [
    {"email":"lbj@gmail.com", "password":"123456"}, {"email":"joshadams@gmail.com", "password":"123456"},
]

const seedvendors = async() => {
    for(let i = 0; i < users.length; i++) {
        await Vendor.create(users[i]);
    }
}

seedvendors();