from bs4 import BeautifulSoup

with open("index.html", "r") as f:

    contents = f.read()

    soup = BeautifulSoup(contents, 'lxml')

    print(soup.h2)
    print(soup.head)
    print(soup.li)