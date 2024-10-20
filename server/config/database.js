import mongoose, { connect } from "mongoose";
mongoose.set('strictQuery',false);

const connectToDatabase = async()=>{
    const {connection} = await  mongoose.connect(`mongodb+srv://techshravand:${process.env.DATABASE_PASSWORD}@enzigma.nwky1.mongodb.net/?retryWrites=true&w=majority&appName=Enzigma`)
    if(connect){
        console.log(`Connected to Database: ${connection.host}`)
    }   
};

export default connectToDatabase;
