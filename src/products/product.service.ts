import { faker } from "@faker-js/faker"
import { TProduct } from "./products.model"
import boom from '@hapi/boom'

class ProductService {
    products: TProduct[]

    constructor() {
        this.products = []
        this.generate()
    }

    async generate() {
        const limit: number = 10
        for (let i: number = 0; i < limit; i++) {
            this.products.push({
                id: faker.datatype.uuid(),
                name: faker.commerce.productName(),
                price: Number(faker.commerce.price()),
                image: faker.image.imageUrl(),
                isBlock: faker.datatype.boolean()
            })
        }
    }

    async create(data: TProduct) {
        const newProduct: TProduct = {
            id: faker.datatype.uuid(),
            ...data
        }
        this.products.push(newProduct)

        return newProduct
    }

    async find() {
        if (this.products.length === 0) throw boom.notFound('No products found')
        return this.products
    }

    async findOne(id: string) {
        const product = this.products.find(item => item.id === id)
        if (!product)
            throw boom.notFound('Product not found')
        if (product.isBlock)
            throw boom.conflict('Product is block')

        return product
    }

    async update(id: string, changes: TProduct) {
        const index = this.products.findIndex(item => item.id === id)
        console.log(index)
        if (index === -1) throw boom.notFound('Product not found')
        this.products[index] = {
            ...this.products[index],
            ...changes
        }
        return this.products[index]
    }

    async delete(id: string) {
        const index = this.products.findIndex(item => item.id === id)
        if (index === -1) throw new Error('Product not found')
        this.products.splice(index, 1)
        return { id }
    }
}

export default ProductService