import React from 'react';
import './Home.css';
import axios from 'axios'
import {connect} from 'react-redux'
import Utils from '../utils/Utils'




import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

import {AgGridReact} from 'ag-grid-react';
import { AllModules } from '@ag-grid-enterprise/all-modules';



let myComparator = function(_, value, filterText) {
  var filterTextLowerCase = filterText.toLowerCase();
  var valueLowerCase = value.toString().toLowerCase();

  var filterTextLowerCaseMatch = filterTextLowerCase.replace(/ /gi, '_',)

  //Exact Match
  if (valueLowerCase === filterTextLowerCaseMatch){
    return true
  }

  // contains
  let filterWords = filterTextLowerCase.split(' ')
  let valueWords = valueLowerCase.split('_')
  let foundList = valueWords.find( w => filterWords.includes(w))
  return foundList !== undefined;
}

 class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedRow: null,
            modules: AllModules,
            defaultColDef: {
                flex: 1,
                minWidth: 100,
                filter: true,
                sortable: true,
                resizable: true,
                enableValue: true,
                enableRowGroup: true,
              },
			columnDefs: [
				{
				headerName: "Table Name",
				field: "table",
				rowGroup: true, rowGroupIndex: 0,
				filter: 'agTextColumnFilter',
				filterParams: {
                    filterOptions: ['contains'],
                    textCustomComparator: myComparator,
                    debounceMs: 2000,
                  },
				},
				{
				headerName: "Column Name",
				field: "col_name",
				filter: 'agTextColumnFilter',
                filterParams: {
                    filterOptions: ['contains'],
                    textCustomComparator: myComparator,
                    debounceMs: 2000,
                  },
                },
				{
				headerName: "Remarks",
				field: "col_remarks",
                filter: 'agTextColumnFilter',
                filterParams: {
                    filterOptions: ['contains'],
                    textCustomComparator: myComparator,
                    debounceMs: 2000,
                  },
                }
			],
			defaultColDef: {
                flex: 1,
                minWidth: 100,
                filter: true,
                sortable: true,
                resizable: true
              },
            rowSelection: 'single',
			autoGroupColumnDef: { minWidth: 200 },
			sideBar: 'columns',
			rowData: null
		}
     }

     onGridReady = params => {
        console.log('Params ==>', params)
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
     }

     onSelectionChanged () {
        var selectedRows = this.gridApi.getSelectedRows();
        this.setState({"selectedRow":selectedRows[0]})
        console.log('this.state =>', this.state)
     }
     async componentDidMount (){

          let response = await axios.get('/api/tables')
          let rowData = JSON.parse(JSON.stringify(response.data))
          console.log('rowData =>', rowData)
          this.setState({rowData: rowData})
          console.log('this.state.rowData ==>', this.state.rowData)

     }

    render (){
         return (

         <div className="row">
                <div
                    className="col-6 ag-theme-balham"
                    style={{
                        height: '1024px'
                    }}
                >
                    <AgGridReact
                        modules={this.state.modules}
                        columnDefs={this.state.columnDefs}
                        defaultColDef={this.state.defaultColDef}
                        autoGroupColumnDef={this.state.autoGroupColumnDef}
                        enableRangeSelection={true}
                        enableFilter={true}
                        animateRows={true}
                        onGridReady={this.onGridReady}
                        groupMultiAutoGroup={true}
                        rowSelection={this.state.rowSelection}
                        onSelectionChanged={this.onSelectionChanged.bind(this)}
                        rowData={this.state.rowData}>
                    </AgGridReact>


                </div>

                 <div className="col-6">


                        <div class="card text-center">
                          <div class="card-header">
                            <ul class="nav nav-pills card-header-pills">
                              <li class="nav-item">
                                <a class="nav-link active" href="#">Selected Column</a>
                              </li>
                              <li class="nav-item">
                                <a class="nav-link" href="#">Relation</a>
                              </li>
                              <li class="nav-item">
                                <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
                              </li>
                            </ul>
                          </div>

                          <div class="card-body">
                            <h5 class="card-title">
                                <button className="badge badge-primary">{ this.state.selectedRow && this.state.selectedRow.table  } </button>
                            </h5>

                             <h4 class="card-title">
                                <button className="badge badge-secondary">{ this.state.selectedRow && this.state.selectedRow.col_name  } </button>
                            </h4>

                            <p class="card-text">
                                { this.state.selectedRow && this.state.selectedRow.col_remarks  }
                            </p>
                            <a href="#" class="btn btn-primary">Go somewhere</a>
                          </div>


                        </div>



                    </div>
         </div>


                );
     }
}
const mapStateToProps = (state) => {
    return {
        id : state.id
}
}
export default connect(mapStateToProps)(Home);