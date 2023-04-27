import express, { NextFunction, Request, Response } from 'express'
import { TProduct } from '../models/products.model'
import ProductService from '../services/product.service'

const router = express.Router()
const service = new ProductService()

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const products: TProduct[] = await service.find()
        res.json(products)
    } catch (error) {
        next(error)
    }
})

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const product = await service.findOne(id)
        res.json(product)
    } catch (error) {
        next(error)
    }
})

// router.get('/filter', async (req: Request, res: Response) => {
//     // res.send('Hello World!')
//     res.json({
//         name: 'Producto 1',
//         price: 100
//     })
// })

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    const product: TProduct = req.body
    const newProduct: TProduct = await service.create(product)
    res.status(201).json(newProduct)
})

router.patch('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const body = req.body
        const product = await service.update(id, body)
        res.status(200).json(product)
    } catch (error) {
        next(error)
    }
})

router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const product = await service.delete(id)
        res.json({
            message: 'Deleted product',
            product
        })
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
})


export default router