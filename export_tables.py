
from omop.parser import generate_csv, generate_json_from_schema
if __name__ == '__main__':
    generate_json_from_schema("./tables.json")