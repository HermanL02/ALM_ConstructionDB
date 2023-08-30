const cloud = require('wx-server-sdk')
const xlsx = require('node-xlsx')
cloud.init({
  env: 'almjsk-9g11g4r8f64baa11'
})


const db = cloud.database()
exports.main = async (event, context) => {
  const fileID = event.fileID
  const res = await cloud.downloadFile({
      fileID: fileID,
  })

  const buffer = res.fileContent
  const parsedData = xlsx.parse(buffer)

  const rows = parsedData[0].data
  rows.shift()

  let deletedCompanies = []
  let notFoundCompanies = []

  for (let row of rows) {
      const companyName = row[0]
      if (!companyName) {
        continue;
    }
      // 检查公司名是否已存在
      const queryResult = await db.collection('companies').where({
          'companyName': companyName
      }).get()

      if (queryResult.data.length > 0) {
          // 该公司名在数据库中存在，删除公司
          try {
              await db.collection('companies').where({
                  'companyName': companyName
              }).remove()
              
              deletedCompanies.push(companyName)
          } catch (error) {
              // Handle the error as required
              console.error("Error deleting company:", companyName, "Error:", error)
          }
      } else {
          // 该公司名在数据库中不存在，标记为“未找到”
          notFoundCompanies.push(companyName)
      }
  }

  return {
      status: 'completed',
      deletedCompanies: deletedCompanies,
      notFoundCompanies: notFoundCompanies
  }
}
