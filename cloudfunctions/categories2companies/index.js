const cloud = require('wx-server-sdk')
cloud.init({
  env: 'almjsk-9g11g4r8f64baa11'
})

const db = cloud.database()

exports.main = async (event, context) => {
    const categories = event.categories;

    try {
        // 从数据库中检索属于这些分类的公司
        const queryResult = await db.collection('companies').where({
            'companyTypes': db.command.in(categories)
        }).get()

        // 由于我们使用的是 `$in` 操作符，所以返回的公司列表不会有重复
        const companies = queryResult.data;

        return {
            status: 'success',
            companies: companies
        }
    } catch (error) {
        return {
            status: 'error',
            message: '查询失败',
            error: error
        }
    }
}
