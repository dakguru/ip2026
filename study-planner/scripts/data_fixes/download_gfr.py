import urllib.request
import os

url = "https://doe.gov.in/sites/default/files/GFR2017_0.pdf"
output_path = r"D:\IP 2026\study-planner\GFR2017_official.pdf"

print(f"Downloading {url}...")
try:
    urllib.request.urlretrieve(url, output_path)
    print(f"Downloaded successfully: {os.path.getsize(output_path)} bytes")
except Exception as e:
    print(f"Error: {e}")
