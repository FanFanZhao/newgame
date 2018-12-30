<style lang="less">
    // @import "ranklist.less";
    // @import "../../assets/public.less";
</style>
<template>
    <div class="rank">
        <div class="rank-pc">
            <div class="rank-head">
                <div class="rank-head-left">
                    <div class="head-left-wapss">
                        <p class="head-left-one">排行榜</p>
                        <p class="head-left-two">RANKING LIST</p>
                    </div>
                    <div class="head-left-waps">
                        <Select placeholder="USDT" @on-change="rankSelecChange1" v-model="rankpb" style="width:100px">
                            <Option v-for="item in dataSelect1" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                        <Select @on-change="rankSelecChange" v-model="ranknow" style="width:100px">
                            <Option v-for="item in dataSelect2" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </div>
                </div>
                <div class="rank-head-right">
                    <img src="../../assets/imgs/ranklist.png" alt="">
                </div>
            </div>
            <div class="rank-content">
                <ul class="rank-content-head">
                    <li class="rank-ranking">#</li>
                    <li class="rank-player ">玩家</li>
                    <li class="rank-or1">最高盈利</li>
                    <li>竞猜总额</li>
                </ul>
                <ul class="rank-content-content" v-for="(item,index) in rankContent" :key="item.id">
                    <li class="rank-ranking ranking" >
                        <img :src='"../../assets/imgs/none"+(index+1)+".png"' alt="" v-if="index<=2">
                        <span v-else>{{index+1}}</span>
                    </li>
                    <li class="rank-player player">
                        <img v-if="item.upic != ''" :src="item.upic" alt="">
                        <img v-else src="../../assets/imgs/defaulttouxiang.png" alt="">
                        <span>{{item.realname}}</span>
                    </li>
                    <li class="rank-or1">{{item.zuigao}}</li>
                    <li class="rank-or">{{item.leiji}}</li>
                </ul>
            </div>
        </div>
    </div>


</template>

<script>
    export default {
        name: "ranklist",
        data(){
            return{
                rankpb:'',
                ranknow:'',
                dataSelect1: [
                    {
                        value: 'pb',
                        label: 'FB'
                    },
                    {
                        value: 'cny',
                        label: 'USDT'
                    },{
                        value: 'usdt',
                        label: 'CNY'
                    },
                ],
                dataSelect2: [
                    {
                        value: 'zuigao',
                        label: '最高盈利'
                    },
                    {
                        value: 'leiji',
                        label: '投注总额'
                    }
                ],
                rankContent:[],
                rankType:'zuigao',
                rankBi:'cny'
            }
        },
        methods:{
            getRankData(){
                let _this = this;
                let _data = {
                    money_type:_this.rankBi,
                    type:_this.rankType,
                    page:'',
                    size:'',
                };
                $.ajax({
                    url:_this.$http.ranklist,
                    data:_data,
                    type:'post',
                    success:function(response){
                        if(response.status == 200){
                            let helpDataList = response.data.list;
                            _this.rankContent = helpDataList;
                        }
                    },
                    error:function(data){
                    }
                })
            },
            rankSelecChange(data){
                this.rankType = data;
                this.getRankData();
            },
            rankSelecChange1(data){
                this.rankBi = data;
                this.getRankData();
            }
        },
        mounted:function(){
            this.getRankData();
        }
    }
</script>


