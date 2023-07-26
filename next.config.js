module.exports = {
    env: {
        apiUrl: "http://172.20.162.25:3333",
    },
    images: {
        domains: [
            // 'https://separacaofarmabol-back.azurewebsites.net', // prd
            // "https://separacaobol-back-qas.azurewebsites.net", // qas
            'http://172.20.162.25:3333', // local
            'http://d3ddx6b2p2pevg.cloudfront.net',
            'http://layer.bemol.corecommerce.com.br',
            'https://bemol.layer.core.dcg.com.br',
        ],
    },
}
