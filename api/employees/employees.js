import mongoose, { Schema } from 'mongoose';

export const EmployeesSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    position: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    },
    status: {
        type: String,
        require: true
    }
})

/** 
 * ? If this mongoose model exist then export this 
 * ? Otherwise create the model
 * */ 
export default mongoose.models.employees || mongoose.model('employees', EmployeesSchema);