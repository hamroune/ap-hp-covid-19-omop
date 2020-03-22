import React from 'react';
import './Home.css';
import axios from 'axios'
import {connect} from 'react-redux'
import Utils from '../utils/Utils'




import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

import {AgGridReact} from 'ag-grid-react';
import { AllModules } from '@ag-grid-enterprise/all-modules';




 class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modules: AllModules,
			columnDefs: [
				{headerName: "Table Name", field: "table",suppressMenu: true,
          filter: 'agTextColumnFilter' },
				{headerName: "Column Name", field: "col_name",suppressMenu: true,
          filter: 'agTextColumnFilter' },
				{headerName: "Remarks", field: "col_remarks",suppressMenu: true,
          filter: 'agTextColumnFilter'}
			],
			defaultColDef: {
                flex: 1,
                minWidth: 100,
                filter: true,
                sortable: true,
                resizable: true
              },
			autoGroupColumnDef: { minWidth: 200 },
			sideBar: 'columns',
			rowData: null
		}
     }

     onGridReady = params => {
        console.log('Params ==>', params)
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
                <div
                    className="ag-theme-balham"
                    style={{
                        height: '1024px',
                        width: '800px'
                    }}
                >
                    <AgGridReact
                        modules={this.state.modules}
                        columnDefs={this.state.columnDefs}
                        autoGroupColumnDef={this.state.autoGroupColumnDef}
                        enableRangeSelection={true}
                        enableFilter={true}
                        animateRows={true}
                        onGridReady={this.onGridReady}
                        floatingFilter={true}
                        rowData={this.state.rowData}>
                    </AgGridReact>
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