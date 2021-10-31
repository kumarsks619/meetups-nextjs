import { ObjectId } from 'mongodb'
import Head from 'next/head'

import MeetupDetail from '../../components/MeetupDetail/MeetupDetail'
import connectDB from '../../utils/connectDB'

const MeetupDetails = ({ meetupData }) => {
    return (
        <>
            <Head>
                <title>{meetupData.title} | Meetups 2021</title>
                <meta name="description" content={meetupData.description} />
            </Head>
            <MeetupDetail {...meetupData} />
        </>
    )
}

// need to add getStaticPaths() in a dynamic route page (route with params) while using getStaticProps()
// this is used pre-generate the based on the each params
export const getStaticPaths = async () => {
    const { db, client } = await connectDB()
    const meetupsCollection = db.collection('meetups')
    const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray()
    client.close()

    return {
        paths: meetups.map((meetup) => ({
            params: { meetupID: meetup._id.toString() },
        })),
        fallback: 'blocking', // true when we couldn't list down all the params in the params array and we want to dynamically generate those left-out pages on the fly when requested
    }
}

export const getStaticProps = async ({ params }) => {
    const meetupID = params.meetupID
    console.log(meetupID) // ---> will be logged on server (i.e. terminal)

    const { db, client } = await connectDB()
    const meetupsCollection = db.collection('meetups')
    const selectedMeetup = await meetupsCollection.findOne({ _id: ObjectId(meetupID) })
    client.close()

    return {
        props: {
            meetupData: {
                id: selectedMeetup._id.toString(),
                title: selectedMeetup.title,
                image: selectedMeetup.image,
                address: selectedMeetup.address,
                description: selectedMeetup.description,
            },
        },
    }
}

export default MeetupDetails
