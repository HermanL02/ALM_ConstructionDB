const cloud = require('wx-server-sdk')
cloud.init({
  env: 'almjsk-9g11g4r8f64baa11'
})

const db = cloud.database()

exports.main = async (event, context) => {
    const majorCategory = event.majorCategory;

    // 从数据库中检索与大分类匹配的项
    const queryResult = await db.collection('categories').where({
        'bigCate': majorCategory
    }).get()

    if (queryResult.data.length === 0) {
        return {
            status: 'error',
            message: '未找到对应的大分类',
            minorCategories: []
        }
    }

    // 假设每个大分类下只有一个文档，我们直接取出该文档下的小分类
    const minorCategories = queryResult.data[0].smallCate;

    return {
        status: 'success',
        minorCategories: minorCategories
    }
}
