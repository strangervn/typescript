    import { Schema, model } from 'mongoose';

    const employeeSchema = new Schema({
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: String, enum: ['admin', 'employee'], default: 'employee' }
    });

    export default model('Employee', employeeSchema);