import router from 'next/router'
import Head from 'next/head'

import NewMeetupForm from '../components/NewMeetupForm/NewMeetupForm'

const NewMeetupPage = () => {
    const addMeetupHandler = async (meetupData) => {
        const response = await fetch('/api/new-meetup', {
            method: 'POST',
            body: JSON.stringify(meetupData),
            headers: {
                'Content-Type': 'application/json',
            },
        })

        const data = await response.json()
        console.log(data)

        router.push('/')
    }

    return (
        <>
            <Head>
                <title>Add New Meetup | Meetups 2021</title>
                <meta
                    name="description"
                    content="Add your meetup here to get the maximum crowd."
                />
            </Head>
            <NewMeetupForm onAddMeetup={addMeetupHandler} />
        </>
    )
}

export default NewMeetupPage
