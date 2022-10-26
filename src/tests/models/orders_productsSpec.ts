import {orders_products} from '../../models/orders_products'

const orders_productsModel = new orders_products()

describe('Model testing: user model', ()=>{

    it('having add_product method',()=>{
        expect(orders_productsModel.add_product).toBeDefined();
    
    })
    

    it('having delete method',()=>{
        expect(orders_productsModel.delete).toBeDefined();
    })
    

})