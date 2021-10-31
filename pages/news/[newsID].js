import { useRouter } from 'next/router'

const NewsDetailPage = () => {
    const { query } = useRouter()

    return (
        <div>
            <h1>{`${query.newsID} Page`}</h1>
        </div>
    )
}

export default NewsDetailPage
