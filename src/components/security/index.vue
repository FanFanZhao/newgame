<template>
	<Modal v-model="modal2" @on-cancel="Callback()" width="400">
        <p slot="header">
            <span>安全设置</span>
        </p>
        <div class="security_main">
        	<div class="security_header">
        		<Menu mode="horizontal" active-name="3">
                    <MenuItem name="3">
                        <p @click="tabtypefun('3')">支付方式</p>
                    </MenuItem>
			        <MenuItem name="1">
			            <p @click="tabtypefun('1')">密码</p>
			        </MenuItem>
                    <MenuItem name="4">
                        <p @click="tabtypefun('4')">手机号码</p>
                    </MenuItem>
			        <MenuItem name="2">
			            <p @click="tabtypefun('2')">头像</p>
			        </MenuItem>
			        
			    </Menu>
        	</div>
        	<div class="security_box">
                <section class="security_box_one" v-show="tabtype == '3'">
                    <Form :model="payWay" label-position="top" ref="payWay">
                         <FormItem label="支付宝账号" prop="ali_account">
                            <Input v-model="payWay.ali_account" placeholder="支付宝账号"></Input>
                        </FormItem>
                        <FormItem label="真实姓名" prop="wx_account">
                            <Input v-model="payWay.realname" placeholder="真实姓名"></Input>
                        </FormItem>
                        <FormItem label="银行卡号" prop="bankcard">
                            <Input id="bank-card" v-model="payWay.bankcard" placeholder="银行卡号"></Input>
                            <Input v-model="payWay.branch" placeholder="请输入银行卡开户行名称"></Input>
                        </FormItem>
                    </Form>
                    <div class="login_footer">
                        <Button type="primary" :loading="modal_loading3" @click="Paymentmethod">保存</Button>
                    </div>
                </section>
        		<section class="security_box_one" v-show="tabtype == '1'">
        			<Form :model="formTop" ref="formTop" :rules="rules2" label-position="top">
		                <FormItem label="旧密码" prop="oldpwd">
		                    <Input v-model="formTop.oldpwd" type="password" placeholder="旧密码"></Input>
		                </FormItem>
		                <FormItem label="新密码" prop="opwd">
		                    <Input v-model="formTop.opwd" type="password" placeholder="新密码（8-12位字母数字组合密码）"></Input>
		                </FormItem>
                        <!-- <div>
                            <div class="password_state">
                                <span class="light_password_state"></span>
                                <span></span>
                                <span></span>
                            </div>
                            <div class="password_state">
                                <label>危险</label>
                                <label>一般</label>
                                <label>安全</label>
                            </div>
                        </div> -->
		                <FormItem label="确定密码" prop="opwd1">
		                    <Input v-model="formTop.opwd1" type="password" placeholder="确定密码"></Input>
		                </FormItem>
				    </Form>
				    <div class="login_footer">
				    	<Button type="primary" :loading="modal_loading1" @click="ChangePassword">确定</Button>
				    </div>
        		</section>
        		<section class="security_box_two" v-show="tabtype == '2'">
        			<div class="imgshchu">
                        <div class="img_box">
                            <img src="../../assets/imgs/upbil.png" v-if='urlImg=="0"'>
                            <img :src="urlImg" v-else>
                        </div>
        				<div class="imgUp">

                        </div>
        			</div>
                    <!-- <div class="img_operating">
                        <span>放大</span>
                        <span>缩小</span>
                        <span>清除</span>
                    </div> -->
        			<div class="login_footer">
				    	<Button type="primary" :loading="modal_loading2" @click="Headportrait">确定</Button>
				    </div>
        		</section>
        		
                <section class="security_box_one" v-show="tabtype == '4'">
                    <Form  ref="changedata" :rules="rules3" :model="changedata" label-position="top">
                       <!--  <FormItem prop="mobile" label="旧手机号">
                            <Input v-model="changedata.mobile" placeholder="请输入您的手机号"></Input>
                        </FormItem> -->
                         <FormItem prop="newmobile" label="新手机号">
                            <Input v-model="changedata.newmobile" placeholder="请输入您新的手机号"></Input>
                        </FormItem>
                        <!-- <FormItem prop="vcode">
                            <Input v-model="formTop.vcode" placeholder="验证码">
                                <div class="yanzhan" slot="append">
                                    <div id="v_container" style="width: 90px;height: 30px;"></div>
                                </div>
                            </Input>
                        </FormItem> -->
                        <FormItem prop="code" label="短信验证码">
                            <Input v-model="changedata.code" placeholder="短信验证码">
                                <div class="yanzhan" slot="append">
                                    <div @click="VerificationCode()">{{btnCode.time}}</div>
                                </div>
                            </Input>
                        </FormItem>
                        <FormItem prop="zijin" label="资金密码">
                            <Input v-model="changedata.zijin" type="password"  placeholder="请输入8-12位字母数字组合密码"></Input>
                        </FormItem>
                        <div class="login_footer">
                            <Button type="primary" :loading="modal_loading3" @click="changemobile">保存</Button>
                        </div>
                    </Form>
                </section>
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
            var mobile = (rule, value, callback) => {
                if(!_this.$public.checkMobile(value)) {
                    return callback(new Error('请输入有效的手机号'));
                } else {
                    callback();
                };
            };
             var newmobile = (rule, value, callback) => {
                if(!_this.$public.checkMobile(value)) {
                    return callback(new Error('请输入有效的手机号'));
                } else {
                    callback();
                };
            };
            var validateopwd2 = (rule, value, callback) => {
                if(value === '') {
                    callback(new Error('请再次输入密码'));//请再次输入密码
                } else if(value !== _this.formTop.opwd) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                };
            };
            var codesecurity = (rule, value, callback) => {
                if(!_this.$public.code(value)) {
                    return callback(new Error('验证码格式有误'));
                } else {
                    callback();
                };
            };
            return {
                payWay:{
                    bankcard:'',
                    ali_account:'',
                    wx_account:'',
                    branch:'',
                    realname:''
				},
                modal_loading1: false,
                modal_loading2: false,
                modal_loading3: false,
                modal2:false,
                model1:"",
                formTop: {
                    oldpwd: '',
                    opwd: '',
                    opwd1: ''
                },
                rules2:{
                    oldpwd: [{
                        validator: validateopwd,
                        trigger: 'blur'
                    }],
                    opwd: [{
                        validator: validateopwd,
                        trigger: 'blur'
                    }],
                    opwd1: [{
                        validator: validateopwd2,
                        trigger: 'blur'
                    }],
                },
                rules3:{
                    code: [{
                        validator: codesecurity,
                        trigger: 'blur'
                    }],
                    newmobile: [{
                        validator: newmobile,
                        trigger: 'blur'
                    }],
                    zijin: [{
                        validator: validateopwd,
                        trigger: 'blur'
                    }],
                },
                tabtype:'3',
                uploader:"",
                urlImg:"0",
                btnCode: {
                    time: "获取验证码", //倒计时
                    disabled: true,
                },
                changedata:{//修改手机号
                    // mobile:'',
                    newmobile:'',
                    code:'',
                    zijin:''
                },
                zijinmima:false,
            }
        },
        watch: {
        	'Statevalue':function(val,oval){
				var _this = this;
				_this.modal2 = val;
                if(localStorage.Appinteractive){
                    _this.appuploadimg();
                }else {
                    if (!_this.uploader) {
                        _this.uploadImg();
                    }; 
                }
                _this.Getpaymentmethod();
                _this.getstatus();
                if(!val){
                    for (let k in _this.changedata) {
                        _this.changedata[k]='';
                    }
                    for (let j in _this.formTop) {
                        _this.formTop[j]='';
                    }
                    for (let h in _this.payWay) {
                        _this.payWay[h]='';
                    }
                }
			},
        },
        methods: {
        	Callback(){
        		var _this = this;
        		_this.$emit('modifyfun');
        	},
            appuploadimg(){
                var _this = this;
                $('.imgUp').click(function(){
                    if(localStorage.Appinteractive == "iOS"){//ios调用图片上传
                        window.webkit.messageHandlers.inputImage.postMessage(null);
                    }else {
                        bigboom.uploadImg();
                    };
                    var imgurltime = window.setInterval(function(){
                        if(localStorage.uploadimgapp){
                            let uploadimgapps;
                            if(localStorage.uploadimgapp.charAt(0) == '/'){
                                uploadimgapps = localStorage.uploadimgapp.substr(1);
                            }else{
                                uploadimgapps = localStorage.uploadimgapp;
                            }
                            _this.urlImg = _this.$http.base + uploadimgapps;
                            _this.urlImgSend = uploadimgapps;
                            clearInterval(imgurltime);
                            localStorage.removeItem('uploadimgapp');
                        };
                    },150);
                });
            },
            uploadImg() {
                var conent = this;
                //console.log("1212")
                conent.uploader = WebUploader.create({
                    auto: true, // 选完文件后，是否自动上传
                    swf: '../../../static/upload_img/Uploader.swf', // swf文件路径
                    server: conent.$http.upload, // 文件接收服务端
                    pick: ".imgUp", // 选择文件的按钮。可选
                    // 只允许选择图片文件。
                    accept: {
                        title: 'Images',
                        extensions: 'jpg,jpeg,png',
                        mimeTypes: 'image/jpg,image/jpeg,image/png'
                    },
                    thumb: {
                        type: 'image/jpg,jpeg,png'
                    },
                    // 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
                    resize: false,
                    fileNumLimit: 8, //限制上传个数
                    fileSingleSizeLimit: 2048000 //限制单个上传图片的大小
                });
                // 上传成功
                conent.uploader.on('uploadSuccess', function(file, data) {
                    conent.urlImg = conent.$http.base + data.url;
                });
            },
            ChangePassword(){ //修改密码
            	var _this = this;
                _this.$refs['formTop'].validate((valid) => {
                    if(valid){
                        _this.modal_loading1 = true;
                        _this.$http.post(_this.$http.editpwd,_this.formTop).then(function(response) {
                             _this.modal_loading1 = false;
                            if(response.data.status == "200") {
                                _this.$Message.success("修改密码成功！");
                                localStorage.clear();
                                _this.$emit('modifyfun');
                                _this.modal2 = false;
                                window.setTimeout(function(){
                                    window.location.href = "index.html"
                                },1000)
                            }else {
                                _this.$Message.warning(response.data.msg);
                            }
                        }).catch(function(error) {});
                    }else {
                        return false;
                    }
                });
            },
            Headportrait(){//修改头像
                var _this = this;
                if(_this.urlImg == '0'){
                    _this.$Message.warning('头像不能为空！');
                    return false;
                };
                _this.modal_loading2 = true;
                let _data = {
                    upic:_this.urlImg
                }
                _this.$http.post(_this.$http.saveupic,_data).then(function(response) {
                    _this.modal_loading2 = false;
                    if(response.data.status == "200") {
                        _this.$Message.success("修改头像成功！");
                        _this.$emit('modifyfun');
                        _this.$emit('Otherfunctions','20');
                        _this.modal2 = false;
                        _this.urlImg = "0";
                    }else {
                        _this.$Message.warning(response.data.msg);
                    }
                }).catch(function(error) {});
            },
            Paymentmethod(){//修改支付方式
                var _this = this;
                let _data = _this.payWay;
                if(_data.ali_account == '' && _data.bankcard == ''){
                    _this.$Message.warning('请输入至少一种输入方式');
                    return false;
				}
				if(_data.bankcard != '' && !_this.$public.bank_car(_data.bankcard)){
                    _this.$Message.warning('请输入正确的银行卡号');
                    return false;
				}
				if(_data.bankcard != '' && _this.$public.bank_car(_data.bankcard) && _data.branch == ''){
                    _this.$Message.warning('请输入银行卡开户行名称');
                    return false;
				}if(_data.realname==''){
                    _this.$Message.warning('请输入真实姓名');
                    return false;
                }
                _this.$http.post(_this.$http.payway,_data).then(function(response) {
                    _this.modal_loading2 = false;
                    if(response.data.status == "200") {
                        _this.$Message.success(response.data.msg);
                        _this.$emit('modifyfun');
                        _this.modal2 = false;
                    }else {
                        _this.$Message.warning(response.data.msg);
                    }
                }).catch(function(error) {});
            },
          	Getpaymentmethod(){//获取支付方式
				let _this = this;
				_this.$http.post(_this.$http.editpayway).then(function(response){
				  if(response.data.status == 200){
                    _this.payWay.bankcard = response.data.data.bankcard;
                    _this.payWay.ali_account = response.data.data.alicard;
                    _this.payWay.realname=response.data.data.realname;
                    // _this.payWay.wx_account = response.data.data.wxcard;
                    if(response.data.data.branch == null){
                      _this.payWay.branch = '';
					}else{
                      _this.payWay.branch = response.data.data.branch;
					}
				  }
				})
		  	},
            VerificationCode(){
                var _this = this;
                if(_this.btnCode.disabled){
                    if(!_this.$public.checkMobile(_this.changedata.newmobile)){
                        _this.$Message.warning('请输入有效的手机号');
                        return false;
                    };
                    let _data = {
                        mobile:_this.changedata.newmobile,
                        type:"1",
                    };
                    _this.btnCode.disabled = false;
                    $.post(_this.$http.sendsms,_data,function(result){
                        if(result.status == "200"){
                            var i = 60;
                            _this.mobile = _this.changedata.newmobile;
                            _this.$Message.success("短信验证码已发送，请注意查收！");
                            _this.timesetInterval = window.setInterval(function(){
                                _this.btnCode.time = "重新获取(" + i +")";
                                i--;
                                if(i < 0){
                                    _this.yanzhanmatpe();
                                }
                            },1000)
                        }else {
                            _this.btnCode.disabled = true;
                            _this.$Message.warning(result.msg);
                        };
                    })
                };
            },
            yanzhanmatpe(){
                var _this = this;
                clearInterval(_this.timesetInterval);
                _this.btnCode.time = "重新获取";
                _this.btnCode.disabled = true;
            },
            changemobile(){
                var _this = this;
                _this.$refs['changedata'].validate((valid) => {
                    if(valid){
                        if(_this.zijinmima){
                            _this.modal_loading = true;
                            if(!_this.$public.code(_this.changedata.code)){
                                _this.$Message.error('验证码格式错误');
                                return false;
                            }if(_this.changedata.zijin==''){
                                _this.$Message.error('资金密码不能为空');
                                return false;
                            }
                            let _data = {
                                new_mobile:_this.changedata.newmobile,
                                code:_this.changedata.code,
                                tpwd:_this.changedata.zijin,
                            }
                            _this.$http.post(_this.$http.update_my_mobile_post,_data).then(function(res){
                                if(res.data.status=='200'){
                                    _this.$Message.success(res.data.msg);
                                    localStorage.clear();
                                    document.cookie='';
                                    window.setTimeout(function(){
                                        window.location.href = "index.html"
                                    },1000)
                                }else{
                                    _this.$Message.error(res.data.msg);
                                }
                            })
                        }else{
                           _this.$Message.error('请先设置您的资金密码');
                           _this.modal2 = false;
                            _this.$emit('Otherfunctions',"12");
                            _this.changedata.newmobile = '';
                            _this.changedata.zijin = '';
                            _this.changedata.code = '';
                            return false;
                        }

                    }else {
                        return false;
                    }
                });
            },
            //获取当前是否设置资金密码
            getstatus(){
                let _this=this;
                let data={
                    money_type:'PB'
                }
                let account =  localStorage.account;
                let token = localStorage.token;
                if(account || token){
                    _this.$http.post(_this.$http.userinfo,data).then(function(res){
                        if(res.data.status=='200'){
                            _this.zijinmima=res.data.data.has_tpwd;
                        }
                    })
                };
            },
            tabtypefun(type){
            	var _this = this;
            	_this.tabtype = type;
            	//console.log("234234")
            }
        },
        mounted(){
        	var _this = this;

            // _this.getstatus();
        }
    }
</script>
<style lang="less">
    // @import '../../assets/public.less';
    // @import './index.less';
	.yanzhan{
		color:red !important;
		cursor:pointer;
	}
</style>


