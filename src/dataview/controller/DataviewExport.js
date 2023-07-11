import jsPDF from 'jspdf'
import 'jspdf-autotable'
import * as xlsx from 'xlsx'
import FileSaver from 'file-saver'

const exportCSV = (dataTableRef, selectionOnly) => {
  dataTableRef.current.exportCSV({ selectionOnly })
}

const exportPdf = (_data, fileName, exportColumns) => {
  // eslint-disable-next-line new-cap
  const doc = new jsPDF.default(0, 0)
  doc.autoTable(exportColumns, _data)
  doc.save(`${fileName}.pdf`)
}

const exportExcel = (_data, fileName) => {
  const saveAsExcelFile = (buffer, fileName) => {
    if (FileSaver && FileSaver.default) {
      const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
      const EXCEL_EXTENSION = '.xlsx'
      const data = new Blob([buffer], {
        type: EXCEL_TYPE
      })
      FileSaver.default.saveAs(data, `${fileName}${EXCEL_EXTENSION}`)
    }
  }
  const worksheet = xlsx.utils.json_to_sheet(_data)
  const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] }
  const excelBuffer = xlsx.write(workbook, {
    bookType: 'xlsx',
    type: 'array'
  })
  saveAsExcelFile(excelBuffer, fileName)
}

export {
  exportExcel,
  exportPdf,
  exportCSV
}
