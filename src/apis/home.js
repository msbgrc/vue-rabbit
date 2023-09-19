import httpInstance from '@/utils/http'


//获取banner
export function getBannerAPI(params = {}){
    const {distributionSite = '1'} = params
    return httpInstance({
        url:'/home/banner',
        params: {
            distributionSite
        }
    })
}

//获取新鲜好物
export const findNewAPI = () => {
    return httpInstance({
        url: '/home/new'
    })
}

//获取人气推荐
export const getHotAPI = () => {
    return httpInstance({
        url: 'home/hot'
    })
}

//获取所有商品模块
export const getGoodsAPI = () => {
    return httpInstance({
        url: '/home/goods'
    })
}