import db from '../database';
import UserSchema from './UserSchema';

export default db.model('User', UserSchema);
