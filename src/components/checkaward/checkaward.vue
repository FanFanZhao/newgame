<template>
    <div id="checkaward">
        <img @click="checkBack" src="../../assets/imgs/close.png" alt="" class="check-back">
        <div class="checkaward">
            <div class="checkaward-head">
                <p class="head-top">Outbreaks</p>
                <p class="head-bottom">Third party script used to verify games on crash game.</p>
            </div>
            <div class="checkaward-form">
                <input v-model="hash" placeholder="" style="width: 100%">
                    <img src="../../assets/imgs/key.png" slot="prefix">
                </input>
                <input v-model="num" placeholder="" style="width: 100%">
                    <img src="../../assets/imgs/#.png" slot="prefix">
                </input>
                <div @click="vcerify" class="form-button">Verify</div>
            </div>
            <div class="checkaward-list">
                <ul class="list-top">
                    <li>Game's hash</li>
                    <li>Bust</li>
                </ul>
                <div class="list-content">
                    <ul v-for="item in hasData" class="list-content-list">
                        <li>{{item.boomHash}}</li>
                        <li>{{item.boomValue}}</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        name: "checkaward",
        data(){
            return{
                hash:'',
                num:'10',
                hasData:[]
            }
        },
        methods:{
            checkBack(){
                window.history.back(-1);
            },
            vcerify(){
                let _this = this;
                let _data = {
                    hash:_this.hash,
                    num:_this.num
                };
                $.post(_this.$http.vcerify,_data,function(response){
                    if(response.status == 200){
                        if(response.data == null){
                            _this.$Message.error(response.msg);
                            _this.hasData = [];
                        }else{
                            let dataList = response.data.list;
                            _this.hasData = dataList;
                        }
                    }
                })
            }
        },
        mounted:function(){
            let hashHref = location.href.split('?')[1];
            let _this = this;
            _this.hash = hashHref;
            this.vcerify();
        }
    }
</script>

<style lang="less">
    // @import "../../assets/index.less";
    // @import "../../assets/public.less";
    // @import "index.less";
</style>

