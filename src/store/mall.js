import {reqGetGoodsInfo} from '../api'

const state = {
    goodsList: {}
}
const mutations = {
    GETGOODSINFO(state,data){
        state.goodsList = data
        sessionStorage.setItem('goodsList',JSON.stringify(data.goodsList))
        sessionStorage.setItem('total',JSON.stringify(data.total))

    }
}
const actions = {
    async getGoodsInfo({commit},data){
        let result = await reqGetGoodsInfo(data)
        if(result.code == 200){
            commit('GETGOODSINFO',result.data)
            console.log(result.data)
        }
    }
}
const getters = {
    searchList(state){
        return state.goodsList.goodsList || []
        // return sessionStorage.getItem('goodsList',JSON.stringify('state.goodsList.goodsList'))
    },
    total(state){
        return state.goodsList.total
        // return sessionStorage.getItem('total',JSON.stringify('state.goodsList.tatal'))

    }
}
export default{
    state,
    mutations,
    actions,
    getters
}