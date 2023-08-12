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

    let addedProjects = []
    let unsuccessfulProjects = []

    for (let row of rows) {
        const companyName = row[0]
        const projectData = {
            'projectName': row[1],
            'projectType': row[2],
            'projectAddress': row[3],
            'projectTime': row[4],
            'fund': row[5],
            'comment': row[6],
            'note': row[7]
        }

        // 检查公司是否存在
        const queryResult = await db.collection('companies').where({
            'companyName': companyName
        }).get()

        if (queryResult.data.length === 0) {
            // 公司不存在，添加项目到未成功的列表
            unsuccessfulProjects.push(projectData)
        } else {
            // 公司存在，添加项目到该公司的项目列表
            try {
                await db.collection('companies').where({
                    'companyName': companyName
                }).update({
                    data: {
                        'projectList': db.command.push(projectData)
                    }
                })
                addedProjects.push(projectData)
            } catch (error) {
                console.error("Error adding project to company:", companyName, "Error:", error)
                unsuccessfulProjects.push(projectData)
            }
        }
    }

    return {
        status: 'completed',
        addedProjects: addedProjects,
        unsuccessfulProjects: unsuccessfulProjects
    }
}
