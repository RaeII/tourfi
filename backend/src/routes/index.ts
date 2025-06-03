import { Router } from "express";

import wallet from './wallet.routes'
import user from './user.routes'
import booking from './booking.routes'
import contract from './contract.routes'
import transaction from './transaction.routes'

const apiRouter = Router();

apiRouter.use("/booking", booking);
apiRouter.use("/wallet", wallet);
apiRouter.use("/user", user);
apiRouter.use("/contract", contract);
apiRouter.use("/transaction", transaction);
export default apiRouter;