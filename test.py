import urllib.request, json

API_KEY = "579b464db66ec23bdd000001f5eaaeee90304bc85dc9d8e36ff44362"
RESOURCE_ID = "9ef84268-d588-465a-a308-a864a43d0070"

# Test different filter formats
urls = [
    f"https://api.data.gov.in/resource/{RESOURCE_ID}?api-key={API_KEY}&format=json&limit=10&filters[commodity]=Rice",
    f"https://api.data.gov.in/resource/{RESOURCE_ID}?api-key={API_KEY}&format=json&limit=10&filters%5Bcommodity%5D=Rice",
    f"https://api.data.gov.in/resource/{RESOURCE_ID}?api-key={API_KEY}&format=json&limit=100",
]

for i, url in enumerate(urls, 1):
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=8) as r:
            data = json.loads(r.read().decode())
            records = data.get('records', [])
            print(f"URL {i}: SUCCESS - {len(records)} records, commodities: {set(r.get('commodity') for r in records[:5])}")
    except Exception as e:
        print(f"URL {i}: FAILED - {e}")
