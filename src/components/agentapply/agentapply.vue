<style lang="less">
    // @import '../../assets/public.less';
	// @import '../../assets/index.less';
	// @import '../../assets/ivewpublic.less';
	// @import 'agentapply.less';
</style>
<template>
	<div class="agent-apply">
		<div class="apply-title">全民代理申请</div>
		<div class="apply-form">
			<ul class="form-name">
				<li>姓名</li>
				<li>
					<input v-model="realname" @blur="nameCheck" type="text" placeholder="请输入您的真实姓名">
					<div v-if="nametips" class="name-tips">请输入您的真实姓名</div>
					<div v-else class="name-tips"></div>
				</li>
			</ul>
			<ul class="form-tele">
				<li>手机号</li>
				<li>
					<input @blur="telephoneCheck" v-model="telephone" type="text" placeholder="请输入您的手机号">
					<div v-if="teletips" class="name-tips">请输入有效的手机号</div>
					<div v-else class="name-tips"></div>
				</li>
			</ul>
			<ul class="form-idfront">
				<li>身份证正面照</li>
				<li class="imgshchu">
					<div class="img_box">
						<div class="imgshuchu_tips">上传身份证正面照</div>
						<img src="../../assets/imgs/upimgsagent.png" v-if="urlImg==0">
						<img class="upimg_show" :src="urlImg" v-else>
					</div>
					<div class="imgUp imgUp1">

					</div>
				</li>
				<li class="id-tips">必须能看清证件号和姓名，支持jpg/png/jpeg 大小不要超过2M</li>
			</ul>
			<ul class="form-idback">
				<li>身份证反面照</li>
				<li class="imgshchu">
					<div class="img_box">
						<div class="imgshuchu_tips">上传身份证反面照</div>
						<img src="../../assets/imgs/upimgsagent.png" v-if="urlImg1==0">
						<img class="upimg_show" :src="urlImg1" v-else>
					</div>
					<div class="imgUp imgUp2">

					</div>
				</li>
				<li class="id-tips">必须能看清发证机关和有效日期，支持jpg/png/jpeg 大小不要超过2M</li>
			</ul>
			<!--<div class="form-submit">提交申请</div>-->
			<Button class="form-submit" type="primary" :loading="modal_loading2" @click="Headportrait">提交申请</Button>
		</div>
	</div>
</template>
<script>

	export default {
        data() {
			return{
                realname:'',
                telephone:'',
                nametips:false,
				teletips:false,
                urlImg:"0",
                urlImg1:"0",
                modal_loading2:false,
				urlImgSend:'',
				urlImgSend1:''
			}
		},
		methods: {
            nameCheck(){
				let _this = this;
				if(_this.realname == ''){
					_this.nametips = true;
				}else{
                    _this.nametips = false;
				}
			},
            telephoneCheck(){
                let _this = this;
                if(_this.$public.checkMobile(_this.telephone)){
                    _this.teletips = false;
				}else{
                    _this.teletips = true;
				}
			},
            appuploadimg(){
                var _this = this;

                $('.imgUp1').click(function(){
                    
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
                $('.imgUp2').click(function(){
                    if(localStorage.Appinteractive == "iOS"){//ios调用图片上传
                        window.webkit.messageHandlers.inputImage.postMessage(null);
                    }else {
                            bigboom.uploadImg();
                    };
                    var imgurltime1 = window.setInterval(function(){
                        if(localStorage.uploadimgapp){
                            let uploadimgapps;
                            if(localStorage.uploadimgapp.charAt(0) == '/'){
                                uploadimgapps = localStorage.uploadimgapp.substr(1);
							}else{
                                uploadimgapps = localStorage.uploadimgapp;
							}
                            _this.urlImg1 = _this.$http.base + uploadimgapps;
                            _this.urlImgSend1 = uploadimgapps;
                            clearInterval(imgurltime1);
                            localStorage.removeItem('uploadimgapp');
                        };
                    },150);
                });
            },
            uploadImg(imgClass, index) {
                var conent = this;
                conent.uploader = WebUploader.create({
                    auto: true, // 选完文件后，是否自动上传
                    swf: '../../../static/upload_img/Uploader.swf', // swf文件路径
                    server: conent.$http.upload, // 文件接收服务端
                    pick: imgClass, // 选择文件的按钮。可选
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
				if(index == 1){
                    conent.uploader.on('uploadSuccess', function(file, data) {
                        conent.urlImg = conent.$http.base + data.url;
                        conent.urlImgSend = data.url;
                        // console.log(conent.urlImgSend)
                    });
				}else{
                    conent.uploader.on('uploadSuccess', function(file, data) {
                        conent.urlImg1 = conent.$http.base + data.url;
                        conent.urlImgSend1 = data.url;
                        // console.log(conent.urlImgSend1)
                    });
				}

            },
            Headportrait(){//上传头像
                var _this = this;
                if(_this.realname == '' || _this.realname.length <= 1){
                    _this.$Message.warning('请输入您的真实姓名！');
                    return false;
				}
                if (_this.$public.patternvalidate(_this.realname)) {
                    _this.$Message.warning('姓名中不能有特殊字符！');
                    return false;
                }
                if(!_this.$public.checkMobile(_this.telephone)){
                    _this.$Message.warning('请输入有效的手机号码！');
                    return false;
                }
                if(_this.urlImg == '0'){
                    _this.$Message.warning('身份证正面照不能为空！');
                    return false;
                };
                if(_this.urlImg1 == '0'){
                    _this.$Message.warning('身份证反面照不能为空！');
                    return false;
                };
                _this.modal_loading2 = true;
                let _data = {
                    card1:_this.urlImgSend,
                    card2:_this.urlImgSend1,
                    name:_this.realname,
                    mobile: _this.telephone
                };
                _this.$http.post(_this.$http.applyAgent,_data).then(function(response) {
                    _this.modal_loading2 = false;
                    if(response.data.status == "200") {
                        _this.$Message.success("申请成功！");
                        _this.urlImg = "0";
                        _this.urlImg1 = "0";
                        _this.$router.push('./agent');
                    }else {
                        _this.$Message.warning(response.data.msg);
                    }
                }).catch(function(error) {});
            },
		},
       mounted: function() {
            let _this = this;
           if(localStorage.Appinteractive!='undefined'){
               _this.appuploadimg();
           }else {
               if (!_this.uploader) {
                   let urlImg;
                   _this.uploadImg('.imgUp1',1);
                   _this.uploadImg('.imgUp2',2);
               };
           }
		},
		components: {

		}
    }
</script>

