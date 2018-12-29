<template>
	<div>
        <Modal v-model="modal2" @on-cancel="Callback()" width="400">
            <p slot="header">
                <span>充值</span>
            </p>
            <div class="login_main">
                <Form label-position="top">
                    <FormItem label="充值方式">
                        <Select @on-change="getPayWay" v-model="payType" disabled>
                            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>

                    <FormItem label="充值金额(CNY)">
                        <!-- <Input v-model="payAmount" placeholder="请输入充值金额，不可小于100，且为10的倍数"></Input> -->
                        <Input v-model="payAmount" :placeholder="'请输入充值金额，不可小于'+min+',且为'+beishu+'的倍数'"></Input>
                    </FormItem>
                </Form>
                <div class="login_footer">
                    <Button type="primary" :loading="modal_loading" @click="sendPay">充值</Button>
                    <p><span>充值说明：</span>充值到账户资产可到充值记录中进行查看</p>
                </div>
            </div>
            <div slot="footer"></div>
        </Modal>
        <Modal v-model="isshow" @on-cancel="cancel()">
            <p slot="header">
                <span>充值</span>
            </p>
            <div class="login_main">
                <div class="code-img">
                    <img :src="erweima" alt="" class="code">
                </div>
                <div class="copy-address">
                    <div class="address">请使用支付宝扫描二维码,完成充值</div>
                </div>
            </div>
            <div slot="footer"></div>
        </Modal>
    </div>
</template>
<script>
    export default {
    	props:['Statevalue'],
        data () {
            return {
                cityList:[{
                    value: '1',
                    label: '支付宝'
               },], // {
                //     value: '2',
                //     label: '微信'
                // },
                modal2:false,
                modal_loading: false,
                payAmount:'',
                payType:'1',
                min:'',
                beizhu:'',
                isshow:false,
                erweima:'',
                links:'',
            }
        },
        watch: {
        	'Statevalue':function(val,oval){
				var _this = this;
				_this.modal2 = val;
                if(val){
                    this.getlimits();
                }else{
                    this.payAmount='';
                }
			},
        },
        methods: {
            getPayWay(data){
                const _this = this;
                _this.payType = data;
            },
            sendPay(){
                const _this = this;
                if(!_this.payType){
                    _this.$Message.error('充值方式不能为空');
                    return false;
                }
                if(_this.payAmount<_this.min){
                    _this.$Message.error('充值最小金额为'+_this.min);
                    return false;
                }if((_this.payAmount%_this.beishu)!=0){
                    _this.$Message.error('充值金额应满足'+_this.beishu+'的倍数');
                    return false;
                }
                let _data = {
                    pay_type:_this.payType,
                    price:_this.payAmount
                };
                _this.$http.post(_this.$http.chongzhi,_data).then(function(response){
                    if(response.data.status == 200){
                        _this.erweima=response.data.data.qrc;
                        _this.links=response.data.data.qrcode;
                        var u = navigator.userAgent;
                        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
                        if (isAndroid) {
                            window.location.href=response.data.data.qrcode;
                        }else{
                            if(localStorage.Appinteractive=='iOS'){
                                window.location.href=response.data.data.qrcode;
                            }else{
                                _this.isshow=true;
                                setTimeout(function(){
                                    _this.del();
                                },2000);
                            }
                        }
                    }else{
                        _this.$Message.error(response.data.msg);
                    }
                })
            },
            getlimits(){
                const _this=this;
                _this.$http.post(_this.$http.ct_data,{}).then(function(res){
                    if(res.data.status=='200'){
                        _this.min=res.data.data.min;
                        _this.beishu=res.data.data.beishu;
                    }
                })
            },
        	Callback(){
        		var _this = this;
        		_this.$emit('modifyfun');
        	},
            cancel(){
                const _this=this;
                _this.isshow=false;
            },
            del(){
            	var _this = this;
            	_this.$emit('modifyfun');
            },
            tabtypefun(type){
            	var _this = this;
            	_this.tabtype = type;
            	//console.log("234234")
            },

        },
        mounted(){
        	var _this = this;
            // _this.getlimits();
        },
        created:function(){
            // this.getlimits();
        }
    }
</script>
<style lang="less">
    @import '../../assets/public.less';
    @import './index.less';
</style>



// WEBPACK FOOTER //
// src/components/rechargecopy/index.vue