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

    let addedCompanies = []
    let duplicateCompanies = []

    for (let row of rows) {
        const companyName = row[0]
        const companyBusinessTypes = row[1].split('，').map(type => type.trim()); // 分割并去除任何前导或尾随的空白

        // 检查公司名是否已存在
        const queryResult = await db.collection('companies').where({
            'companyName': companyName
        }).get()

        if (queryResult.data.length === 0) {
            // 该公司名在数据库中不存在，添加公司
            const companyData = {
              'companyName': companyName,
              'companyTypes': companyBusinessTypes,  // 使用分割后的数组
              'companyAddress': row[2],
              'companyIntro': row[3],
              'contact': row[4],
              'contact': row[5],
              'reference': row[6],
              'referencePhone': row[7],
              'foundYear': row[8],
              'companyCity': row[9],
              'projectList': []
               // 这里增加了一个空的项目列表
          }
          

            try {
                await db.collection('companies').add({ data: companyData })
                addedCompanies.push(companyName)
            } catch (error) {
                // Handle the error as required
                console.error("Error adding company:", companyName, "Error:", error)
            }
        } else {
            // 该公司名在数据库中已存在，标记为重复
            duplicateCompanies.push(companyName)
        }
    }

    return {
        status: 'completed',
        addedCompanies: addedCompanies,
        duplicateCompanies: duplicateCompanies
    }
}
