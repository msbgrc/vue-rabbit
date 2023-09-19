import httpInstance from '@/utils/http'

//获取二级分类列表
export function getCategoryAPI(id) {
    return httpInstance({
        url: '/category',
        params:{
            id
        }
    })
}