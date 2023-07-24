import axios from 'axios'

const getData = async (event) => {
    const page = event.pagination.page + 1
    const peerPage = event.pagination.peerPage
    const globalFilter = event.search.value

    const options = {
        method: 'GET',
        url: `https://api.artic.edu/api/v1/artists/search`,
        params: {
            limit: peerPage,
            page: String(page),
            q: globalFilter
        }
    }

    try {
        const response = await axios.request(options)
        // console.log('response', response)
        return response
    } catch (error) {
        throw new Error(error.message)
    }
}

export default getData