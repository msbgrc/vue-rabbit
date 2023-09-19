//封装分类数据业务相关的方法
import { getCategoryAPI } from "@/apis/category";
import { onMounted, ref } from "vue";
import { onBeforeRouteUpdate, useRoute } from "vue-router";

export function useCategory() {
    //获取二级路由分类
    const categoryData = ref({});
    const route = useRoute();
    const getCategory = async (id = route.params.id) => {
        const res = await getCategoryAPI(id);
        categoryData.value = res.result;
    };
    onMounted(() => getCategory());

    //路由参数变化时 可以把分类数据接口重新发送
    onBeforeRouteUpdate((to) => {
        getCategory(to.params.id)
    })

    return {categoryData}
} 
