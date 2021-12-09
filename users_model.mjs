import mongoose from 'mongoose';

mongoose.connect(
    "mongodb://localhost:27017/users_db",
    {useNewUrlParser: true}
);

const db = mongoose.connection;

db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

mongoose.set("useCreateIndex", true);

const userSchema = mongoose.Schema({
    name: {type: String, required: true},
    age: {type: Number, required: true},
    email: {type: String, required: true},
    phoneNumber: {type: Number, required: false},
});

const User = mongoose.model("User", userSchema);

const createUser = async (name, age, email, phoneNumber)=> {
    const user = new User({name: name, age: age, email: email, phoneNumber: phoneNumber});
    return user.save();
}

const findUser = async(filter, projection, limit) => {
    const query = User.find(filter)
        .select(projection)
        .limit(limit);
    return query.exec();
}

const replaceUser = async(_id,name, age, email, phoneNumber) => {
    const user = await User.findbyId(_id)  
    if (name !== undefined)
        name = user.name
    if (age !== undefined)
        age = user.age 
    if (email !== undefined)
        email = user.email
    if (phoneNumber !== undefined)
        phoneNumber = user.phoneNumber
    const result = await User.replaceMany({_id: _id},
        {name: name, age: age, email: email, phoneNumber: phoneNumber});
    return result.nModified;
}

const deleteUser = async(filter) => {
    const result = await User.deleteMany(filter);
    return result.deleteCount;
}
export {createUser, findUser, replaceUser, deleteUser}; 