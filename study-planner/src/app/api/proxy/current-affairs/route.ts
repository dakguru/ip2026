import { NextResponse } from 'next/server';

const NEWSAPI_KEY = "78307967c577440ea972024a7bce20c4";
const RAPID_API_KEY = "1bc39bde08msh044dfa558b1e89fp10d0d8jsn64cd63789ee0";
const HISTORY_API_HOST = "current-affairs-of-india.p.rapidapi.com";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');

    if (!type) {
        return NextResponse.json({ error: 'Missing type parameter' }, { status: 400 });
    }

    try {
        let data = [];
        let apiUrl = "";
        let isNewsApi = true;

        switch (type) {
            case 'recent':
                apiUrl = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${NEWSAPI_KEY}`;
                break;
            case 'international':
                apiUrl = `https://newsapi.org/v2/top-headlines?language=en&apiKey=${NEWSAPI_KEY}`; // General English news
                break;
            case 'sports':
                apiUrl = `https://newsapi.org/v2/top-headlines?country=in&category=sports&apiKey=${NEWSAPI_KEY}`;
                break;
            case 'history':
                isNewsApi = false;
                apiUrl = `https://${HISTORY_API_HOST}/history-of-today`;
                break;
            default:
                return NextResponse.json({ error: 'Invalid type parameter' }, { status: 400 });
        }

        const fetchOptions: RequestInit = {
            cache: 'no-store'
        };

        if (type === 'history') {
            fetchOptions.headers = {
                'x-rapidapi-key': RAPID_API_KEY,
                'x-rapidapi-host': HISTORY_API_HOST
            };
        }

        const response = await fetch(apiUrl, fetchOptions);

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Upstream API error (${type}):`, response.status, errorText);
            throw new Error(`Upstream API returned ${response.status}`);
        }

        const json = await response.json();

        if (isNewsApi) {
            // Normalize NewsAPI data
            if (json.status === 'error') {
                throw new Error(json.message || 'NewsAPI error');
            }
            const articles = json.articles || [];
            data = articles.map((article: any) => ({
                title: article.title,
                photo_url: article.urlToImage,
                link: article.url,
                source_name: article.source?.name,
                published_datetime_utc: article.publishedAt,
                snippet: article.description,
                source_logo_url: null
            })).filter((item: any) => item.title && item.link && item.photo_url); // Filter out items without images for better UI
        } else {
            // Pass through History API data directly or normalize if needed
            // The client expects specific fields, let's just pass the JSON (array or object)
            data = json;
        }

        return NextResponse.json({ data });

    } catch (error: any) {
        console.error("API Proxy Error:", error);
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}
