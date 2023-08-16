const cloud = require('wx-server-sdk')
cloud.init({
  env: 'almjsk-9g11g4r8f64baa11'
})

const db = cloud.database()

exports.main = async (event, context) => {
    const categories = event.categories;
    const pageIndex = event.pageIndex || 0;
    const PAGE_SIZE = 100;

    try {
        // 从数据库中检索属于这些分类的公司
        const queryResult = await db.collection('companies').where({
            'companyTypes': db.command.in(categories)
        })
        .skip(pageIndex * PAGE_SIZE)
        .limit(PAGE_SIZE)
        .get()

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
