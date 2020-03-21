from bs4 import BeautifulSoup
import requests
from lxml import html




page = requests.get('http://econpy.pythonanywhere.com/ex/001.html')

contents = page.content


soup = BeautifulSoup(contents, 'lxml')

print(soup.head)
