<style lang="less">
    // @import '../../assets/public.less';
	// @import '../../assets/index.less';
	// @import 'download.less';
</style>
<template>
	<div class="download">
		<!--头部-->
		<div class="download_head">爆发者</div>
		<div class="download_head1">让竞猜带来乐趣</div>
		<!--头部-->
		<img src="../../assets/imgs/790358.png" alt="" class="download_img">
		<div class="download_tip">算法公开、开奖可公正、返奖率高达99%</div>
		<ul class="download_icon">
			<li>
				<a @click="openA" target="_blank">
					<p>Download it from</p>
					<p>APP STORE</p>
				</a>
			</li>
			<li class="download_icon_ios">
				<a @click="openA" target="_blank">
					<p>Download it from</p>
					<p>ANDROID MARKET</p>
				</a>
			</li>
		</ul>
		<div class="download_account">
			<img :src="erweima" alt="">
		</div>

	</div>
</template>
<script>
	export default {
        data() {
			return {
                erweima:''
			}
		},
		methods: {
            openA(){
                if(localStorage.Appinteractive){
                	if(localStorage.Appinteractive == "iOS"){//ios调用图片上传
                        window.webkit.messageHandlers.gotoAppStore.postMessage('https://admin.xjqgsp.com/upload/?id=De27999981');
                    }else {
                        bigboom.openUrl("https://admin.xjqgsp.com/upload/?id=De27999981");
                    };
                }else {
                	window.open('https://admin.xjqgsp.com/upload/?id=De27999981');
                }
			},
            getData(){
                let _this = this;
                $.post(_this.$http.commondata,function(response) {
                    if(response.status == 200){
                        let erweima = 'http://'+window.location.host+response.data.app_down_url;
                        _this.erweima = erweima
                    }
                })
			}
		},
		created: function() {},
		mounted:function(){
            this.getData();
            if(this.$route.query.id){
                let nthLi = this.$route.query.id;
                $('.layout_nav li').removeClass('dianji');
                $('.layout_nav li').eq(nthLi).addClass('dianji');
                // $('html,body').animate({'scrollTop':'0'});
            }
		},
		components: {
		},
    }
</script>
