import express from 'express';
import { authorize, protect } from '../middleware/authMiddleware';
import {
  getClients,
  createClient,
  updateClient,
  deleteClient,
  getClientById,
} from '../controllers/clientController';

const router = express.Router();

router.use(protect, authorize('admin'));

router.get('/', getClients);
router.post('/', createClient);
router.get('/:id', getClientById);
router.put('/:id', updateClient);
router.delete('/:id', deleteClient);

export default router;
