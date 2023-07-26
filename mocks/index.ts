import { IGetReceipt } from '../interfaces/GetReceipt'

const MockGetReceiptResult: IGetReceipt = {
    checked: false,
    data: {
        receipt: {
            id: '1',
            receipt_key: '11111111111111111111111111111111111111111111',
            receipt_number: '11111',
            receipt_serie: '11111',
            employee_id: '12345',
            merchant_origin: "FARMA",
            created_at: 'xxx',
            updated_at: 'xxx',
        },
        products: [
            {
                id: '1',
                name: 'barra de cereal',
                description: 'teste 123',
                ean: '1',
                image: '/images/products/dipirona.jpg',
                qtd: 3,
                qtd_checked: 0,
                sku: '1',
                created_at: 'xxx',
                updated_at: 'xxx',
            },
            {
                id: '2',
                name: 'barra de cereal 2',
                description: 'teste 321',
                ean: '2',
                image: '',
                qtd: 2,
                qtd_checked: 0,
                sku: '2',
                created_at: 'xxx',
                updated_at: 'xxx',
            },
        ],
    },
}

export { MockGetReceiptResult }
