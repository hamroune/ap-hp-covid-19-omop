
from omop.parser import generate_csv, generate_csv_from_schema
if __name__ == '__main__':
    generate_csv_from_schema("./tables.csv")