import { express } from "../dependencies.js";
import { postUserData, postNoLeadInteraction, getUsers } from '../controllers/userControllers.js'

const router = express.Router();

router.post('/', postUserData);
router.post('/no-lead', postNoLeadInteraction);
router.get('/', getUsers);

export default router;