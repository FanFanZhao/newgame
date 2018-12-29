<template>
	<Modal id="rengong" v-model="Statevalue" @on-cancel="Callback()">
        <p slot="header">
            <span>人工在线充值</span>
        </p>
        <div class="rengong_main">
            <div class="code_img" v-if="two != ''">
                <img :src="$http.defaults.baseURL + two" alt="">
                <p>支付宝充值</p>
            </div>
            <div class="code_img" v-if="one != ''">
                <img :src="$http.defaults.baseURL + one" alt="">
                <p>微信充值</p>
            </div>
            
            <h5>提现说明</h5>
            <p>{{three}}</p>
        </div>
    </Modal>
</template>
<script>
    import $ from 'jquery'  //加载jquery
    export default {
    	props:['Statevalue'],
        data () {
           return{
            one:'',
            two:'',
            three:''
           }
        },
        watch: {
            'Statevalue':function(val,oval){
                var _this = this;
                _this.getErCode();  
            }     
        },
        methods: {
            Callback(){
                var _this = this;
                _this.$emit('modifyfun');
            },
            getErCode(){
                var _this = this;
                _this.$http.post(_this.$http.getErCode).then(function(response){
                    if(response.data.status == 200){
                        console.log(response.data.data.erCode1);
                        _this.one = response.data.data.erCode1;   //微信
                        _this.two = response.data.data.erCode2;   //支付宝
                        _this.three = response.data.data.withdraw_name;   //支付宝
                    }
                })
            }

        },
        mounted(){
        	var _this = this;

        }
    }
</script>
<style lang="less">
    @import '../../assets/public.less';
    @import './index.less';
    #rengong{
        .rengong_main{
            .code_img{
                text-align:center;
                img{
                    width:260px !important;
                    height:260px !important;
                    margin:0 auto;
                }
                p{
                    font-size:20px;
                    color:#ffe29b;
                    line-height:60px;
                }
            }
        }
    }

    @media screen and (max-width: 768px){
        #rengong{
            .rengong_main{
            .code_img{
            text-align:center;
                    img{
                        width:34vw;
                        height:34vw;
                        margin:0 auto;
                    }
                    p{
                        font-size:4vw;
                        color:#ffe29b;
                        line-height:8vw;
                    }
                }
            }
        }

    }
</style>



// WEBPACK FOOTER //
// src/components/rengong/index.vue