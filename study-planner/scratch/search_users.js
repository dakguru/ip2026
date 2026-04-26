
const mongoose = require('mongoose');

const MONGODB_URI = "mongodb+srv://admin_db_user:Dak%40639104@cluster0.jawkuep.mongodb.net/study-planner?appName=Cluster0";

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    role: String
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

async function searchUsers() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("Connected to MongoDB");

        const emails = [
            "rohan.desh101@gmail.com",
            "kumar.sharma99@gmail.com",
            "arjunmehra.vns@gmail.com",
            "ishaanmalhotra@gmail.com",
            "priyanka.nair88@gmail.com"
        ];

        for (const email of emails) {
            console.log(`Searching for user: ${email}`);
            const user = await User.findOne({ email });
            
            if (user) {
                console.log(`Found User: ${user.name} | ${user.email} | ${user._id}`);
            } else {
                console.log(`No user record for: ${email}`);
            }
        }

        process.exit(0);
    } catch (error) {
        console.error("Error:", error);
        process.exit(1);
    }
}

searchUsers();
