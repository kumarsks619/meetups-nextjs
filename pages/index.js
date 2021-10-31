import Head from 'next/head'

import MeetupList from '../components/MeetupList/MeetupList'
import connectDB from '../utils/connectDB'

const HomePage = ({ meetups }) => {
    return (
        <>
            <Head>
                <title>Meetups 2021</title>
                <meta
                    name="description"
                    content="Get to know about most popular upcoming meetups around you."
                />
            </Head>
            <MeetupList meetups={meetups} />
        </>
    )
}

// re-runs after every 'revalidate' interval
export const getStaticProps = async () => {
    // api call here
    const { db, client } = await connectDB()
    const meetupsCollection = db.collection('meetups')
    const meetups = await meetupsCollection.find().toArray()
    client.close()

    return {
        props: {
            meetups: meetups.map((meetup) => ({
                id: meetup._id.toString(),
                title: meetup.title,
                image: meetup.image,
                address: meetup.address,
                description: meetup.description,
            })),
        },
        revalidate: 10, //re-generate this page after every 10 seconds
    }
}

// re-runs on each request
// export const getServerSideProps = async ({ req, res }) => {
//      console.log(req, res) // ---> will be logged on server (i.e. terminal)
//     // api call here

//     return {
//         props: {
//             meetups: DUMMY_MEETUPS,
//         },
//     }
// }

export default HomePage
