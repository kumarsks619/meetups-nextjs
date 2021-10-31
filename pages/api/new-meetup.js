import connectDB from '../../utils/connectDB'

const handler = async (req, res) => {
    // POST /api/new-meetup
    if (req.method === 'POST') {
        const { title, image, address, description } = req.body

        const { db, client } = await connectDB()
        const meetupsCollection = db.collection('meetups')
        const result = await meetupsCollection.insertOne({
            title,
            image,
            address,
            description,
        })
        console.log(result)
        client.close()

        res.status(201).json({ message: 'New meetup created.' })
    }
}

export default handler
