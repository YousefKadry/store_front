import { product, products } from "../../models/product";

const productModel = new products();
const prod: product = {
    id: '0',
    name: 'iphone13',
    price: 1000
}

let productExample:product;

describe('Model testing: user model', ()=>{

    it('having create method',()=>{
        expect(productModel.create).toBeDefined();
    })

    it('Testing the create method with a product', async ()=>{
        productExample = await productModel.create(prod)
        expect({
            name: productExample.name,
            price: productExample.price})
            .toEqual({
                name: 'iphone13',
                price: 1000
            }
        );
    })

    it('having index method',()=>{
        expect(productModel.index).toBeDefined();
    })

    it('Testing the index method to include the productExample', async () => {
        const products = await productModel.index();
        expect(products).toContain(productExample);
        });

    it('having show method', () => {
        expect(productModel.show).toBeDefined();
        });

    it('Testing the show method to return the productExample', async () => {
        const findProduct = await productModel.show(productExample.id as string);
        expect(findProduct).toEqual(productExample);
        })

    it('having delete method', () => {
        expect(productModel.delete).toBeDefined();
        });

    it('Testing the delete method to return the productExample', async () => {
        const deletedProduct = await productModel.delete(productExample.id as string);
        expect(deletedProduct).toEqual(productExample);
        })

})