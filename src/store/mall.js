import {reqGetGoodsInfo} from '../api'

const state = {
    goodsList: {}
}
const mutations = {
    GETGOODSINFO(state,data){
        state.goodsList = data
    }
}
const actions = {
    async getGoodsInfo({commit},data){
        let result = await reqGetGoodsInfo(data)
        console.log(result)
        if(result.code == 200){
            commit('GETGOODSINFO',result.data)
        }
    }
}
const getters = {
    searchList(state){
        return state.goodsList.goodsList || []
    },
    total(state){
        return state.goodsList.total
    }
}
export default{
    state,
    mutations,
    actions,
    getters
}