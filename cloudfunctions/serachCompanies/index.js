const cloud = require('wx-server-sdk')

cloud.init({
  env: 'almjsk-9g11g4r8f64baa11'
})


const db = cloud.database()

exports.main = async (event, context) => {
  const keyword = event.keyword;

  return await db.collection('companies').where({
    // 使用正则表达式进行模糊搜索
    $or: [
      { companyName: db.RegExp({ regexp: keyword, options: 'i' }) },
      { companyTypes: db.RegExp({ regexp: keyword, options: 'i' }) },
      { reference: db.RegExp({ regexp: keyword, options: 'i' }) },
      { contactPerson: db.RegExp({ regexp: keyword, options: 'i' }) }
    ]
  }).get();
}
