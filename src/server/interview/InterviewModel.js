import db from '../database';
import InterviewSchema from './InterviewSchema';

export default db.model('Interview', InterviewSchema);
