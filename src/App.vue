<template>
    <div id="app"> 
　　　<router-view></router-view>
    <div class="loading" v-if="loadingtype">
	    <Spin class="img">
	      <Icon type="load-c" size=38 class="demo-spin-icon-load"></Icon>
	      <div>正在拼命加载中...</div>
	    </Spin>
	  </div>
  </div>
</template>

<script>
export default {
    name: 'App',
    data(){
  	  return {
  		  loadingtype:true,
        transitionName: 'slide-right',  // 默认动态路由变化为slide-right
        timeStamp1: '',
        timeStamp2: '',
  	  }
    },
    watch:{
      $route(to,from){
        let _this = this;
        if (to.path == "/home/help") {
          $('iframe').show();
          $('iframe').css('position', 'absolute');
          $($($('#app')[0].parentNode)[0].children[4]).show();
          $($($('#app')[0].parentNode)[0].children[2]).css("zIndex", '1000000');
        } else {
          $($($('#app')[0].parentNode)[0].children[4]).hide();
          $('iframe').hide();
          if (this.$public.isMobile()) {
            this.timeStamp2 = setInterval(function () {
              if ($($($('#app')[0].parentNode)[0].children[4])[0].innerText.indexOf("离线留言") != -1) {
                $($($('#app')[0].parentNode)[0].children[4]).hide();
                $($($('#app')[0].parentNode)[0].children[2]).css("zIndex", '900');
                clearInterval(_this.timeStamp2);
              }
            }, 10);
          } else {
            this.timeStamp1 = setInterval(function () {
              if ($('iframe').length >= 1) {
                $('iframe').hide();
                clearInterval(_this.timeStamp1);
              }
            }, 100);
          }
        }
      }
    },
    beforeRouteLeave(to, from, next){
      clearInterval(this.timeStamp1);
      clearInterval(this.timeStamp2);
      next();
    },
    mounted(){
        var _this = this;
	   window.setTimeout(function(){
		  _this.loadingtype = false;
	   },500);
    },
};
</script>
<style lang="less">
.loading {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  z-index: 999;
}
.loading .img {
  display: block;
  width: 200px;
  height: 100px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  font-size: 18px;
  color: #fff;
}
/*加载中icon样式*/
.demo-spin-icon-load {
  animation: ani-demo-spin 1s linear infinite;
}
@keyframes ani-demo-spin {
  from {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  to {
    transform: rotate(360deg);
  }
}

</style>




// WEBPACK FOOTER //
// src/App.vue