import styles from '../styles/pages/home.module.scss'
import inputStyles from '../styles/components/input.module.scss'
import buttonStyles from '../styles/components/button.module.scss'
import Layout from '../components/layout'
import Product from '../components/product'
import Message from '../components/message'
import { IGetReceipt } from '../interfaces/GetReceipt'
import { IProduct } from '../interfaces/Product'
import { IMessage } from '../interfaces/Message'
import Functions from '../utils/functions'
import { ResultMessages, ConfirmationMessages } from '../constants/Messages'
import ApiClient from '../services/api-client'
import { useRouter } from 'next/router'
import { useEffect, useState, FormEvent, useRef } from 'react'
// import { MockGetReceiptResult } from '../mocks'

const receiptKeyCharactersAmount = 44

export default function Home() {
    const router = useRouter()

    const [employee_number, setEmployeeNumber] = useState('')
    const [receipt, setReceipt] = useState<IGetReceipt>(null)
    const [receipt_logo, setReceiptLogo] = useState<string>(null)
    const [products, setProducts] = useState<IProduct[]>([])
    const [checkedProducts, setCheckedProducts] = useState<string[]>([])
    const [results, setResults] = useState<IMessage>({ show: false, text: '', type: '' })

    const receiptInput = useRef(null)
    const productInput = useRef(null)
    const productsList = useRef(null)

    useEffect(() => {
        if (!router.query.registration) router.replace('/')
        else setEmployeeNumber(router.query.registration.toString())
        setFocusOnReceiptInput()
        if (results.show) setTimeout(() => setResults({ show: false, text: '', type: '' }), 3000)
    }, [results])

    const checkReceiptOnUrl = (receipt: string) => {
        if (Functions.isValidUrl(receipt)) return receipt.split('?p=')[1].substring(0, receiptKeyCharactersAmount)
        else return receipt
    }

    const getReceipt = async (receipt_key: string) => {
        clearObjects()
        clearProductField()
        const updatedReceipt = checkReceiptOnUrl(receipt_key)
        if (updatedReceipt.length === receiptKeyCharactersAmount) {
            // const receipt: IGetReceipt = MockGetReceiptResult
            // const resultData = receipt
            const result = await ApiClient.post('/api/receipts', { receipt_key: updatedReceipt, employee_number })
            const resultData = result.data
            // console.log(resultData)
            if (resultData?.data) {
                if (!resultData.checked) {
                    setReceipt(resultData)
                    setProducts(resultData.data.products)

                    const logo = resultData.data.receipt.merchant_origin
                    const logo_src = `/images/logos/${logo === 'FARMA' ? 'bemol-farma.png' : 'bemol-mercado.png'}`
                    setReceiptLogo(logo_src)

                    setTimeout(() => setFocusOnProductInput(), 1)
                } else {
                    setResults({ show: true, text: ResultMessages.receipt_already_checked, type: 'warning' })
                }
            } else {
                setResults({ show: true, text: ResultMessages.receipt_not_found, type: 'error' })
            }
        }
    }

    const sendSeparation = async (
        receipt_number: string,
        receipt_serie: string,
        products: IProduct[],
        pendencies = false,
    ) => {
        let message = ''
        const result = await ApiClient.put('/api/receipts', {
            receipt_number,
            receipt_serie,
            products,
            pendencies,
            employee_number,
        })
        const resultData = result.data
        if (resultData?.status) {
            if (pendencies) message = ResultMessages.receipt_separated_with_pendencies
            else message = ResultMessages.receipt_separated_success
            setResults({ show: true, text: message, type: 'success' })
        } else {
            setResults({ show: true, text: ResultMessages.receipt_separation_error, type: 'error' })
        }
        clearFields()
        clearObjects()
        setFocusOnReceiptInput()
    }

    const closeSeparation = async (pendencies?: boolean) => {
        if (products.length) {
            if (!pendencies) {
                sendSeparation(receipt.data.receipt.receipt_number, receipt.data.receipt.receipt_serie, products)
            } else {
                const confirm = window.confirm(ConfirmationMessages.confirmation_pendencies)
                if (confirm) {
                    sendSeparation(
                        receipt.data.receipt.receipt_number,
                        receipt.data.receipt.receipt_serie,
                        products,
                        confirm,
                    )
                }
            }
        }
    }

    const checkProduct = (value: string) => {
        const newProductsArray = [...products]
        products.map((item, index) => {
            if (item.qtd_checked < item.qtd) {
                if (item.ean === value || item.sku === value) {
                    newProductsArray[index].qtd_checked++
                    clearProductField()
                    // if (item.qtd === item.qtd_checked) {
                    //     setTimeout(() => productsList.current.scrollTo(0, 0), 3000) // scroll to top
                    //     // setTimeout(() => (productsList.current.scrollTop = productsList.current.scrollHeight), 3000) // scroll to bottom
                    // }
                }
                if (item.qtd_checked === item.qtd) {
                    if (!checkedProducts.includes(item.ean)) updateCheckedProductsArray(item.ean)
                }
            }
        })
        setProducts(newProductsArray)
    }

    const updateCheckedProductsArray = (ean: string) => {
        setCheckedProducts((arr) => [...arr, ean])
    }

    const setFocusOnReceiptInput = () => {
        receiptInput.current.focus()
    }

    const setFocusOnProductInput = () => {
        // console.log('product input focus!')
        productInput.current.focus()
    }

    const clearObjects = () => {
        setReceipt(null)
        setProducts([])
        setCheckedProducts([])
        setReceiptLogo(null)
    }

    const clearFields = () => {
        receiptInput.current.value = ''
        productInput.current.value = ''
    }

    const clearProductField = () => {
        productInput.current.value = ''
    }

    return (
        <Layout title="Home" logo_src={receipt_logo}>
            <span className={styles.hiddenProductsAmount}>{products.length}</span>
            {/* results */}
            <Message show={results.show} text={results.text} type={results.type} />
            <section className={styles.forms}>
                {/* receipt form */}
                <form method="post" onSubmit={(e: FormEvent) => e.preventDefault()}>
                    <label className={inputStyles.label}>
                        {/* <span className={inputStyles.span}>NFE</span> */}
                        <input
                            ref={receiptInput}
                            name="receipt_key"
                            type="tel"
                            className={inputStyles.input}
                            placeholder="Chave da NF-e / NFC-e"
                            onChange={(e) => getReceipt(e.target.value)}
                        />
                    </label>
                </form>
                {/* product form */}
                <form method="post" className={styles.formProduct} onSubmit={(e: FormEvent) => e.preventDefault()}>
                    <label className={inputStyles.label}>
                        {/* <span className={inputStyles.span}>Produto</span> */}
                        <input
                            ref={productInput}
                            name="code"
                            type="tel"
                            className={inputStyles.input}
                            placeholder="EAN ou SKU do Produto"
                            onChange={(e) => checkProduct(e.target.value)}
                            onClick={() => clearProductField()}
                        />
                    </label>
                </form>
            </section>
            {/* show products */}
            {products.length ? (
                <>
                    <main
                        ref={productsList}
                        className={styles.products}
                        onScroll={() => setFocusOnProductInput()}
                        onClick={() => setFocusOnProductInput()}
                    >
                        {products.map((product: IProduct) => (
                            <Product
                                key={product.id}
                                id={product.id}
                                image={
                                    product?.image && (product.image !== '' || product.image !== null)
                                        ? product.image
                                        : '/images/products/no-img.png'
                                }
                                name={product.name}
                                description={product.description}
                                ean={
                                    product?.ean && (product.ean !== '' || product.ean !== null)
                                        ? product.ean
                                        : 'Não identificado'
                                }
                                sku={product.sku}
                                qtd={product.qtd}
                                qtd_checked={product.qtd_checked}
                                created_at={product.created_at}
                                updated_at={product.updated_at}
                            />
                        ))}
                    </main>
                    {/* action buttons */}
                    <div className={styles.actions}>
                        <button
                            type="button"
                            className={buttonStyles.button}
                            onClick={() => closeSeparation()}
                            disabled={products.length && checkedProducts.length === products.length ? false : true}
                        >
                            Finalizar Conferência
                        </button>
                        {/* <button
                            type="button"
                            className={`${buttonStyles.button} ${buttonStyles.danger}`}
                            onClick={() => closeSeparation(true)}
                            disabled={
                                !products.length || (products.length && checkedProducts.length === products.length)
                                    ? true
                                    : false
                            }
                        >
                            Finalizar c/ pendência(s)
                        </button> */}
                    </div>
                </>
            ) : (
                <span className={styles.empty}>Não há produtos...</span>
            )}
        </Layout>
    )
}
