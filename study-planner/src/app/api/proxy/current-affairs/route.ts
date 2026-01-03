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
        let fetchOptions: RequestInit = {
            cache: 'no-store'
        };
        let json: any; // Declare json here to be accessible for fallback logic

        switch (type) {
            case 'recent':
                // Special handling for 'recent' with fallback logic
                isNewsApi = true;
                const primaryUrl = `https://newsapi.org/v2/top-headlines?q=India&apiKey=${NEWSAPI_KEY}`;
                let response = await fetch(primaryUrl, fetchOptions);

                if (!response.ok) {
                    const errorText = await response.text();
                    console.error(`Upstream API error (recent primary):`, response.status, errorText);
                    // If primary fetch fails, try fallback
                    console.log("Fallback: Primary fetch failed for India news, trying /everything.");
                    const fallbackUrl = `https://newsapi.org/v2/everything?q=India&sortBy=publishedAt&language=en&pageSize=20&apiKey=${NEWSAPI_KEY}`;
                    response = await fetch(fallbackUrl, fetchOptions);
                }

                json = await response.json();

                // If primary fetch was successful but returned no articles, try fallback
                if (response.ok && (!json.articles || json.articles.length === 0)) {
                    console.log("Fallback: No articles from top-headlines for India, trying /everything.");
                    const fallbackUrl = `https://newsapi.org/v2/everything?q=India&sortBy=publishedAt&language=en&pageSize=20&apiKey=${NEWSAPI_KEY}`;
                    const fallbackResponse = await fetch(fallbackUrl, fetchOptions);
                    if (fallbackResponse.ok) {
                        json = await fallbackResponse.json();
                    } else {
                        const errorText = await fallbackResponse.text();
                        console.error(`Upstream API error (recent fallback):`, fallbackResponse.status, errorText);
                        throw new Error(`Upstream API returned ${fallbackResponse.status} for fallback`);
                    }
                }
                break;
            case 'international':
                apiUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${NEWSAPI_KEY}`;
                break;
            case 'sports':
                apiUrl = `https://newsapi.org/v2/top-headlines?country=in&category=sports&apiKey=${NEWSAPI_KEY}`;
                break;
            case 'history':
                isNewsApi = false;
                apiUrl = `https://${HISTORY_API_HOST}/history-of-today`;
                fetchOptions.headers = {
                    'x-rapidapi-key': RAPID_API_KEY,
                    'x-rapidapi-host': HISTORY_API_HOST
                };
                break;
            default:
                return NextResponse.json({ error: 'Invalid type parameter' }, { status: 400 });
        }

        // For types other than 'recent', perform the fetch here
        if (type !== 'recent') {
            const response = await fetch(apiUrl, fetchOptions);

            if (!response.ok) {
                const errorText = await response.text();
                console.error(`Upstream API error (${type}):`, response.status, errorText);
                throw new Error(`Upstream API returned ${response.status}`);
            }
            json = await response.json();
        }

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
            })).filter((item: any) => item.title && item.link); // Removed strict photo_url requirement
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
