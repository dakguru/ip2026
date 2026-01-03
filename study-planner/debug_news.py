import requests

NEWSAPI_KEY = "78307967c577440ea972024a7bce20c4"
url = f"https://newsapi.org/v2/top-headlines?country=in&apiKey={NEWSAPI_KEY}"

try:
    print(f"Fetching from {url}...")
    response = requests.get(url)
    print(f"Status Code: {response.status_code}")
    if response.status_code == 200:
        data = response.json()
        articles = data.get('articles', [])
        print(f"Total Results: {data.get('totalResults')}")
        print(f"Number of articles: {len(articles)}")
        if len(articles) > 0:
            print("First article sample:")
            print(articles[0])
            no_img_count = sum(1 for a in articles if not a.get('urlToImage'))
            print(f"Articles without image: {no_img_count}")
    else:
        print("Error response:")
        print(response.text)
except Exception as e:
    print(f"Exception: {e}")
