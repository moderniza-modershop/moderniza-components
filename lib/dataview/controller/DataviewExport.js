const normalizeResults = (results, exportColumns) => {
  const exportFields = exportColumns.map((field) => {
    return field.dataKey
  })

  return results.map((item) => {
    const _item = {}
    Object.keys(item).map((key) => {
      if (exportFields.includes(key)) {
        _item[key] = item[key]
      }
    })
    return _item
  })
}

const exportCSV = (results, fileName, exportColumns) => {
  const header = exportColumns.map((col) => {
    return col.title
  }).join(';')

  const body = normalizeResults(results, exportColumns).map((row) => {
    return Object.values(row).join(';')
  }).join('\n')

  const csvString = `${header}\n${body}`
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  link.setAttribute('href', window.URL.createObjectURL(blob))
  link.setAttribute('download', `${fileName}.csv`)
  link.style.visibility = 'hidden'
  link.style.display = 'none'
  document.body.appendChild(link)
  link.click()
}

const exportPdf = (_data, fileName, exportColumns) => {
  import('jspdf').then((jsPDF) => {
    import('jspdf-autotable').then(() => {
      const doc = new jsPDF.default(0, 0)
      doc.autoTable(exportColumns, _data)
      doc.save(`${fileName}.pdf`)
    })
  })
}

const exportExcel = (data, fileName, exportColumns) => {
  const _data = normalizeResults(data, exportColumns)
  const saveAsExcelFile = (buffer, fileName) => {
    import('file-saver').then((module) => {
      if (module && module.default) {
        const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
        const EXCEL_EXTENSION = '.xlsx'
        const data = new Blob([buffer], {
          type: EXCEL_TYPE
        })

        module.default.saveAs(data, `${fileName}${EXCEL_EXTENSION}`)
      }
    })
  }

  import('xlsx').then((xlsx) => {
    const worksheet = xlsx.utils.json_to_sheet(_data)
    const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] }
    const excelBuffer = xlsx.write(workbook, {
      bookType: 'xlsx',
      type: 'array'
    })

    saveAsExcelFile(excelBuffer, fileName)
  })
}

export {
  exportExcel,
  exportPdf,
  exportCSV
}
