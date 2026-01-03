import requests

NEWSAPI_KEY = "78307967c577440ea972024a7bce20c4"

endpoints = [
    f"https://newsapi.org/v2/top-headlines?country=us&apiKey={NEWSAPI_KEY}",
    f"https://newsapi.org/v2/top-headlines?q=India&apiKey={NEWSAPI_KEY}",
    f"https://newsapi.org/v2/everything?q=India&sortBy=publishedAt&apiKey={NEWSAPI_KEY}" 
]

for url in endpoints:
    print(f"\nFetching from {url}...")
    try:
        response = requests.get(url)
        print(f"Status Code: {response.status_code}")
        if response.status_code == 200:
            data = response.json()
            print(f"Total Results: {data.get('totalResults')}")
            print(f"Number of articles: {len(data.get('articles', []))}")
        else:
            print(f"Error: {response.text}")
    except Exception as e:
        print(f"Exception: {e}")
