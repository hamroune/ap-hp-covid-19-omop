from bs4 import BeautifulSoup, PageElement, ResultSet
import requests
import pandas as pd
import itertools
from functools import partial




def _parseTable(table: PageElement):

    print('table =======>', table)
    tb = dict({"table": table.get('name', ''),
              "numRows": table.get('numrows', ''),
            #"remarks": table.get('remarks', '')
    })

    cols = table.findAllNext('column')

    def _parseCol(col: PageElement):
        col_dict = {"col_name": col.get('name', 'unknown name'),
                    "col_remarks": col.get('remarks', ''),
                    "autoUpdated": col.get('autoupdated', ''),
                    "nullable": col.get('nullable', ''),
                    }
        return col_dict

    columns = list(map(_parseCol, cols))
    cols = {"columns": list(columns)}
    tab = {"tb": tb}

    return {**tab, **cols}

def _parseTr(tr: PageElement):
    tds = tr.findAllNext ("td")
    return {"Table": tds[0].text, "Column": tds[1].text, "Type": tds[2].text, "Size": tds[3].text, "Nulls": tds[4].text, "Auto": tds[5].text, "Default": tds[6].text}

def generate_csv(output_path_csv: str):
    PAGE_URL = 'https://mit-lcp.github.io/mimic-omop/schemaspy-omop/columns.byTable.html'
    page = requests.get(PAGE_URL)
    soup: BeautifulSoup = BeautifulSoup(page.content, 'lxml')

    trs = soup.find("tbody", {"valign": "top"}).findAllNext("tr")
    tables = list(map(_parseTr, trs))
    df = pd.DataFrame.from_dict(tables)
    print(df.head())

    df.to_csv(output_path_csv, index=False)

def generate_json_from_schema(out_path_csv: str):
    PAGE_URL = 'https://mit-lcp.github.io/mimic-omop/schemaspy-omop/postgres.omop.xml'
    page = requests.get(PAGE_URL)
    soup: BeautifulSoup = BeautifulSoup(page.content, 'lxml')
    xml_tables: ResultSet = soup.find("tables").findAllNext("table")
    tables = list(map(_parseTable, xml_tables))
    columns = list()
    for tab in tables:
        for col in tab.get('columns', []):
            z = {**tab.get('tb'), **col}
            columns.append(z)

    df = pd.DataFrame.from_dict(columns)
    print(df.head())

    df.drop_duplicates(["table", "col_name"], keep='last', inplace=True)
    df.to_json(out_path_csv, orient='records')

