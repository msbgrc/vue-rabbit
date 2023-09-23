// 封装购物车模块

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useUserStore } from './user'
import { insertCartAPI, findNewCartListAPI, delCartAPI } from '@/apis/cart'
import router from '@/router'
import { ElMessage } from 'element-plus'

export const useCartStore = defineStore('cart', () => {
    const userStore = useUserStore()
    const isLogin = computed(()=>userStore.userInfo.token)
    // 1. 定义state 
    const cartList = ref([])
    // 2. 定义action - addCart
    const addCart = async (goods) => {
        const {skuId,count} = goods
        if(isLogin.value){
            //登录之后的加入购物车逻辑
            await insertCartAPI({skuId,count})
            updateNewList()
        }else{
            //未登录跳转到登录页面
            router.push("/login")
            ElMessage({ type: 'warning', message: '请先登录' })
        }
    }
    // 删除购物车中数据
    const delCart = async (skuId) => {
        await delCartAPI([skuId])
        updateNewList()
    }
    //清空购物车
    const clearCart = () => {
        cartList.value = []
    }
    //获取选中的商品 提交订单时回显
    const selectedCartList  = ref([])
    const getSelectedCartList = () => {
        selectedCartList.value = cartList.value.filter(item => item.selected).slice()
    }
    //获取最新购物车列表
    const updateNewList = async () =>{
        const res = await findNewCartListAPI()
        cartList.value = res.result
    }
    //单选功能
    const singleCheck = (skuId) => {
        // 通过skuId找到要修改的那一项 然后把它的selected修改为传过来的selected
        const item = cartList.value.find((item) => item.skuId === skuId)
        item.selected = !item.selected
    }
    // 全选功能
    const allCheck = (selected) => {
        // 把cartList中的每一项的selected都设置为当前的全选框状态
        cartList.value.forEach(item => item.selected = selected)
    }
    // 计算属性
    // 1. 总的数量 所有项的count之和
    const allCount = computed(() => cartList.value.reduce((a, c) => a + c.count, 0))
    // 2. 总价 所有项的count*price之和
    const allPrice = computed(() => cartList.value.reduce((a, c) => a + c.count * c.price, 0))
    // 3. 已选择数量
    const selectedCount = computed(() => cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count, 0))
    // 4. 已选择商品价钱合计
    const selectedPrice = computed(() => cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count * c.price, 0))

    // 是否全选
    const isAll = computed(() => cartList.value.every((item) => item.selected))
    return {
        cartList,
        addCart,
        delCart,
        allCount,
        allPrice,
        singleCheck,
        allCheck,
        selectedCount,
        selectedPrice,
        isAll,
        clearCart,
        updateNewList,
        selectedCartList,
        getSelectedCartList
    }
},{
    persist:true
})