const cloud = require('wx-server-sdk')
cloud.init({
  env: 'almjsk-9g11g4r8f64baa11'
})
const db = cloud.database()

exports.main = async (event, context) => {
  const { bigCate, newSmallCate } = event

  try {
    return await db.collection('categories').where({
      bigCate
    }).update({
      data: {
        smallCate: newSmallCate
      }
    })
  } catch (e) {
    console.error(e)
    return null
  }
}
