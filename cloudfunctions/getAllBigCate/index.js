const cloud = require('wx-server-sdk')
cloud.init({
  env: 'almjsk-9g11g4r8f64baa11'
})

const db = cloud.database()

exports.main = async (event, context) => {
  try {
    const res = await db.collection('categories').field({
      bigCate: true  // 只返回 bigCate 字段
    }).get()
    
    const bigCateList = res.data.map(item => item.bigCate)

    return {
      code: 0,
      message: '成功获取所有大分类',
      data: bigCateList
    }

  } catch (e) {
    console.error(e)
    return {
      code: -1,
      message: '获取大分类失败',
      data: null
    }
  }
}
