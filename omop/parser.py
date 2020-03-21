from bs4 import BeautifulSoup, PageElement
import requests
import pandas as pd

PAGE_URL = 'https://mit-lcp.github.io/mimic-omop/schemaspy-omop/columns.byTable.html'
page = requests.get(PAGE_URL)
soup: BeautifulSoup = BeautifulSoup(page.content, 'lxml')

def _parseTr(tr: PageElement):
    tds = tr.findAllNext ("td")
    return {"Table": tds[0].text, "Column": tds[1].text, "Type": tds[2].text, "Size": tds[3].text, "Nulls": tds[4].text, "Auto": tds[5].text, "Default": tds[6].text}

def generate_csv(output_path_csv: str):
    trs = soup.find("tbody", {"valign": "top"}).findAllNext("tr")
    tables = list(map(_parseTr, trs))
    df = pd.DataFrame.from_dict(tables)
    print(df.head())

    df.to_csv(output_path_csv, index=False)