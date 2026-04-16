const { validateSchema } = require('../../src/utils/contractValidator')
const productSchema = require('../../src/schemas/product.schema')
const productsListSchema = require('../../src/schemas/products-list.schema')
const cartSchema = require('../../src/schemas/cart.schema')
const couponSchema = require('../../src/schemas/coupon.schema')
const checkoutSchema = require('../../src/schemas/checkout.schema')

describe('GraphQL Contracts', () => {
  it('deve validar schema de produto', () => {
    const fakeProduct = {
      id: '1',
      databaseId: 1,
      name: 'Produto Teste',
      slug: 'produto-teste',
      type: 'SIMPLE',
      price: '10.00',
      regularPrice: '10.00',
      salePrice: null
    }

    expect(validateSchema(productSchema, fakeProduct).valid).toBe(true)
  })

  it('deve validar schema de lista de produtos', () => {
    const fakeProducts = [
      {
        id: '1',
        databaseId: 1,
        name: 'Produto Teste',
        slug: 'produto-teste',
        type: 'SIMPLE'
      }
    ]

    expect(validateSchema(productsListSchema, fakeProducts).valid).toBe(true)
  })

  it('deve validar schema de carrinho', () => {
    const fakeCart = {
      contents: {
        nodes: [
          {
            key: 'abc123',
            quantity: 1
          }
        ]
      },
      subtotal: '10.00',
      total: '10.00'
    }

    expect(validateSchema(cartSchema, fakeCart).valid).toBe(true)
  })

  it('deve validar schema de cupom', () => {
    const fakeCoupon = {
      id: 1,
      code: 'TESTE10',
      amount: '10.00',
      discount_type: 'fixed_product',
      description: 'Cupom de teste'
    }

    expect(validateSchema(couponSchema, fakeCoupon).valid).toBe(true)
  })

  it('deve validar schema de checkout', () => {
    const fakeCheckout = {
      order: {
        id: '10',
        databaseId: 10,
        orderNumber: '10',
        status: 'PENDING',
        total: '100.00'
      },
      result: 'success',
      redirect: null
    }

    expect(validateSchema(checkoutSchema, fakeCheckout).valid).toBe(true)
  })
})
