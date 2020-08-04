import { ExcelExport } from "@progress/kendo-react-excel-export";
import { Grid, GridColumn, GridToolbar } from "@progress/kendo-react-grid";
import "@progress/kendo-theme-default/dist/all.css";
import React, { useRef, useState } from "react";
import "./App.css";
import Employees from "./data/employee.json";

function App() {
	const [skip, setSkip] = useState(0);
	const [take, setTake] = useState(10);
	const [data, setData] = useState(Employees.slice(skip, take + skip));
	const exportRef = useRef();
	const gridRef = useRef();

	const handlePageChange = (ev) => {
		setSkip(ev.page.skip);
		setTake(ev.page.take);
	};

	const exportData = () => {
		exportRef.current.save(Employees, gridRef.columns);
		console.log(exportRef.current.save);
	};

	return (
		<div className="App">
			<h1>Products table</h1>
			<ExcelExport
				data={Employees}
				ref={(exporter) => (exportRef.current = exporter)}
			>
				<Grid
					data={data}
					className="product__table"
					pageable={true}
					total={Employees.length}
					skip={skip}
					take={take}
					onPageChange={handlePageChange}
					ref={(grid) => {
						gridRef.current = grid;
					}}
				>
					<GridToolbar>
						<button
							title="Export Excel"
							className="k-button k-primary"
							onClick={exportData}
						>
							Export to Excel
						</button>
					</GridToolbar>
					<GridColumn title="Product Information">
						<GridColumn field="full_name" />
						<GridColumn field="job_title" />
						<GridColumn field="country">
							
						</GridColumn>
						<GridColumn field="is_online" />
					</GridColumn>

					<GridColumn title="Product Status">
						<GridColumn field="Discontinued" />
					</GridColumn>
				</Grid>
			</ExcelExport>
		</div>
	);
}

export default App;
