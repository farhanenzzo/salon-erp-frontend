// import React from "react";

// const DataTable = () => {
//   return (
//     <DataTable
//       value={bodyData}
//       paginator
//       rows={10}
//       className={styles.datatable}
//       filterIcon
//       stripedRows
//       sortMode="multiple"
//       // filters={filters}
//       selectionMode="single"
//       emptyMessage="No records found."
//       onFilter={(e) => setFilters(e.filters)}
//       rowsPerPageOptions={[5, 10, 25, 50]}
//       onRowClick={(e) => handleRowClick(e.data)}
//     >
//       {headerData.map((header) => (
//         <Column
//           sortable
//           key={header.id}
//           field={header.key}
//           header={header.title}
//           body={
//             header.key === "date"
//               ? dateBodyTemplate
//               : header.key === "employeeStatus" ||
//                 header.key === "appointmentStatus" ||
//                 header.key === "serviceStatus"
//               ? statusBodyTemplate
//               : null
//           }
//           style={{
//             color: header.id === 1 ? "#9B0E53" : "#000",
//           }}
//         />
//       ))}
//       <Column body={actionBodyTemplate} />
//     </DataTable>
//   );
// };

// export default DataTable;
