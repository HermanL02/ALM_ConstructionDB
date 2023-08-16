// cloudfunctions/addEvaluation/index.js
const cloud = require('wx-server-sdk')
cloud.init({
  env: 'almjsk-9g11g4r8f64baa11'
})

const db = cloud.database()
const companiesCollection = db.collection('companies')

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const evaluation = {
    _openid: wxContext.OPENID,  // 用户的OPENID
    alelmengCertified: event.alelmengCertified,
    date: db.serverDate(),  // 评价日期
    rating: event.rating,
    comment: event.comment
  }
  // 获取公司的信息
  const company = await companiesCollection.doc(event._id).get()

  let updateData = {};

  // 如果公司有evaluations字段，并且它是一个数组
  if (company.data.evaluations && Array.isArray(company.data.evaluations)) {
    updateData = {
      evaluations: db.command.push(evaluation)
    };
  } else {
    // 如果公司没有evaluations字段或者它不是一个数组
    updateData = {
      evaluations: [evaluation]
    };
  }

  // 更新公司的评价列表
  await companiesCollection.doc(event._id).update({
    data: updateData
  })

  return {
    success: true,
    message: '评价添加成功'
  }
}
