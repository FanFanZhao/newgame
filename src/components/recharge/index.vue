<template>
	<Modal v-model="modal2" @on-cancel="Callback()">
        <p slot="header">
            <span>充值</span>
        </p>
        <div class="login_main">
            <div class="code-img">
                <img :src="codeUrl" alt="" class="code save">
                <p>点击二维码保存至相册</p>
            </div>
            <div class="copy-address">
                <div class="address">{{codeAddress}}</div>
                <div class="copy" @click="doCopy">复制地址</div>
            </div>
            <ul class="login_footer">
                <li id="login_footer">{{explain}}</li>
            </ul>
        </div>
        <div slot="footer"></div>
    </Modal>
</template>
<script>
    export default {
    	props:['Statevalue'],
        data () {
            return {
                modal2:false,
                codeUrl:'',
                codeAddress:'',
                explain:''
            }
        },
        watch: {
        	'Statevalue':function(val,oval){
				var _this = this;
				_this.modal2 = val;
				_this.getData();
				_this.getExplain();
                if(localStorage.Appinteractive){
                    _this.saveimage();
                }else {
                    if (!_this.uploader) {
                        _this.saveimage();
                    }; 
                }
			},
        },
        methods: {
            doCopy: function () {
                let _this=this;
                _this.$copyText(_this.codeAddress).then(function (e) {
                    // _this.$toast.message('复制成功');
                    _this.$Message.success('复制成功');
                }, function (e) {
                    // _this.$toast.message('复制失败');
                    _this.$Message.success('复制失败');
                })
            },
            getExplain(){
                let _this = this;
                $.post(_this.$http.commondata,function(response) {
                    if (response.status == 200) {
                        let explain = response.data.buy_info.recharge.recharge;
                        _this.explain = explain
                    }
                })
            },
            getData(){
                let _this = this;
                _this.$http.post(_this.$http.recharge).then(function(response){
                    if(response.data.status == 200){
                        _this.codeUrl = response.data.data.qrc;
                        _this.codeAddress = response.data.data.url;
                    }
                })
            },
        	Callback(){
        		var _this = this;
        		_this.modal2 = false;
        		_this.$emit('modifyfun');
        	},
            saveimage(){
                const _this=this;
               $('.save').click(function(){
                    if(localStorage.Appinteractive == "iOS"){//ios调用图片上传
                        window.webkit.messageHandlers.saveImage.postMessage(_this.codeUrl);
                    }else {
                        bigboom.saveImg(_this.codeUrl);
                        // alert(_this.codeUrl);
                    };
                    // var imgurltime = window.setInterval(function(){
                    //     if(localStorage.uploadimgapp){
                    //         let uploadimgapps;
                    //         if(localStorage.uploadimgapp.charAt(0) == '/'){
                    //             uploadimgapps = localStorage.uploadimgapp.substr(1);
                    //         }else{
                    //             uploadimgapps = localStorage.uploadimgapp;
                    //         }
                    //         _this.urlImg = _this.$http.base + uploadimgapps;
                    //         _this.urlImgSend = uploadimgapps;
                    //         clearInterval(imgurltime);
                    //         localStorage.removeItem('uploadimgapp');
                    //     };
                    // },150);
               })
            }
        },
        mounted(){
        }
    }
</script>
<style lang="less">
    @import '../../assets/public.less';
    @import './index.less';
    @import "index.less";
    #login_footer{
        padding-bottom: 30px !important;
    }
</style>



// WEBPACK FOOTER //
// src/components/recharge/index.vue