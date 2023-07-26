import { IProduct } from './Product'
import { IReceipt } from './Receipt'

export interface IGetReceipt {
    checked: boolean
    data: {
        receipt: IReceipt
        products: IProduct[]
    }
}
