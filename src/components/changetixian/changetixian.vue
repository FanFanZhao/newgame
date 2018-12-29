<template>
	<Modal v-model="modal2" @on-cancel="Callback()">
        <p slot="header">
            <span>修改资金密码</span>
        </p>
        <div class="login_main">
        	<div class="logo">
        		<img src="../../assets/imgs/tixianpass.png">
        	</div>
            <Form :model="formTop" ref="formTop" :rules="rules2" label-position="top">
				<FormItem label="资金密码" prop="tpwd">
					<Input v-model="formTop.tpwd" type="password" placeholder="8-12位字母数字组合密码"></Input>
				</FormItem>
				<FormItem label="确定密码" prop="tpwd1">
					<Input v-model="formTop.tpwd1" type="password" placeholder="确定密码"></Input>
				</FormItem>
		    </Form>
		    <div class="login_footer">
		    	<Button type="primary" :loading="modal_loading" @click="changeConfirm">确认</Button>
		    </div>
        </div>
        <div slot="footer"></div>
    </Modal>
</template>
<script>
    export default {
    	props:['Statevalue'],
        data () {
            var _this = this;
            var validateopwd = (rule, value, callback) => {
                if(!_this.$public.pwd(value)) {
                    callback(new Error('请输入有效的密码'));
                } else {
                    callback();
                };
            };
            var validateopwd2 = (rule, value, callback) => {
                if(value === '') {
                    callback(new Error('请再次输入密码'));//请再次输入密码
                } else if(value !== _this.formTop.tpwd) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                };
            };
            return {
                modal_loading: false,
                modal2:false,
                verifyCode:"",
                formTop: {
                    tpwd: '',
                    tpwd1: ''
                },
                rules2:{
                    tpwd: [{
                        validator: validateopwd,
                        trigger: 'blur'
                    }],
                    tpwd1: [{
                        validator: validateopwd2,
                        trigger: 'blur'
                    }],
                },
            }
        },
        watch: {
        	'Statevalue':function(val,oval){
				var _this = this;
				_this.modal2 = val;
			},
        },
        methods: {
        	Callback(){
        		var _this = this;
        		_this.$emit('modifyfun');
                _this.$public.wipedata(_this.formTop);
        	},
            changeConfirm(){
            	var _this = this;
                _this.$refs['formTop'].validate((valid) => {
                    if(valid){
                        _this.modal_loading = true;
                        _this.$http.post(_this.$http.edittpwd,_this.formTop).then(function(response) {
                            _this.modal_loading = false;
                            if(response.data.status == "200") {
                                _this.$Message.success("修改密码成功！");
                                _this.$emit('modifyfun');
                                _this.modal2 = false;
                            }else {
                                _this.$Message.warning(response.data.msg);
                            };
                            _this.$public.wipedata(_this.formTop);
                        }).catch(function(error) {});
                    }else {
                        return false;
                    }
                });
            }
        },
        mounted(){
        	var _this = this;
            // _this.$public.codeImg('v_container');
            // _this.verifyCode = new GVerify("v_container");
        }
    }
</script>
<style lang="less">
    @import '../../assets/public.less';
    @import './index.less';
</style>



// WEBPACK FOOTER //
// src/components/changetixian/changetixian.vue