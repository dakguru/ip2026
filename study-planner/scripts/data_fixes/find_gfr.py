import requests
from bs4 import BeautifulSoup
import re

url = "https://www.indiapost.gov.in/VAS/DOP_PDFFiles/GFR_2017.pdf"
# Actually, downloading PDF might fail. Let's find an HTML or text version.
# Let's search for "General Financial Rules 2017 Chapter 6 Procurement of Goods" on a text site or write a script to scrape.

# Let's just use pypdf on the downloaded PDF in the workspace if it's readable. Wait, I already tried pypdf on "D:\IP 2026\13. GFR_2017.pdf" and it extracted 333 bytes. It's scanned.
