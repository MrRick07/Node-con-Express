import { Application } from 'express';
import productsRouter from '../products/products.router';

const routerApi = (app: Application) => {
    app.use('/api/products', productsRouter);
}

export default routerApi;