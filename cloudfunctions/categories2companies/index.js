const cloud = require('wx-server-sdk')
cloud.init({
  env: 'almjsk-9g11g4r8f64baa11'
})

const db = cloud.database()

exports.main = async (event, context) => {
    const categories = event.categories;
    const sortingMethod = event.sortingMethod;
    console.log(categories);
    const pageIndex = event.pageIndex || 0;
    const PAGE_SIZE = 100;

    try {
        // 从数据库中检索属于这些分类的公司
        let query;

        if (sortingMethod === "创立时间升序排序") {
            query = db.collection('companies').where({
                'companyTypes': db.command.in(categories)
            })
            .orderBy('foundYear', 'asc'); // 用 'desc' 替换 'asc'，如果你想按降序排序
        } else if (sortingMethod === "公司名称升序排序") {
            query = db.collection('companies').where({
                'companyTypes': db.command.in(categories)
            })
            .orderBy('companyName', 'asc'); // 用 'desc' 替换 'asc'，如果你想按降序排序
        } else {
            query = db.collection('companies').where({
                'companyTypes': db.command.in(categories)
            });
        }
        
        const queryResult = await query
            .skip(pageIndex * PAGE_SIZE)
            .limit(PAGE_SIZE)
            .get();
        

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
