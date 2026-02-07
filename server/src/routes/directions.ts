import { Router } from 'express';

import { getDirectionRecommendations } from '../controllers/directions';

const router = Router();

router.get('/recommend', getDirectionRecommendations);

export default router;
