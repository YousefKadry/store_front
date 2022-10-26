"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var orders_products_1 = require("../../models/orders_products");
var orders_productsModel = new orders_products_1.orders_products();
describe('Model testing: user model', function () {
    it('having add_product method', function () {
        expect(orders_productsModel.add_product).toBeDefined();
    });
    it('having delete method', function () {
        expect(orders_productsModel.delete).toBeDefined();
    });
});
