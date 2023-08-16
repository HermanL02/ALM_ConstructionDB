// cloudfunctions/getCompanyDetail/index.js
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'almjsk-9g11g4r8f64baa11'
})

const db = cloud.database()

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const _id = event._id

  try {
    const res = await db.collection('companies').doc(_id).get()
    return {
      code: 0,
      data: res.data,
      message: 'Success'
    }
  } catch (error) {
    return {
      code: -1,
      data: null,
      message: error.message
    }
  }
}
