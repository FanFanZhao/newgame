<style lang="less">
    // @import '../../assets/public.less';
    // @import './style.less';
    // @import './index.less';
    // @import './indexmove.less';
	#app{
		position:relative;
		z-index: 1000;
		#play-instrduce{
			cursor: pointer;
			position:fixed;
			bottom:100px;
			right:70px;
			width:100px;
			z-index:10000;
			img{
				display:block;
				width:100%;
			}
			.ivu-icon{
				font-size: 14px;
				position: relative;
				top: -5px;
				left: 70px;
			}
			.close_img{
			    width: 20px;
			    position: relative;
			    left: 90%;
			}
		}
	}
	@media screen and (max-width: 768px){
		#app{
			#play-instrduce{
				bottom:10vw;
				right:10vw;
				width:20vw;
				.ivu-icon{
					font-size: 6vw;
					top: -2vw;
					left: 15vw;
				}
			}
		}
	}
</style>
<template>
	<div id="playintru" class="index_box">
		<Header @subsidiary="a"></Header>
		<Record @subsidiary="a"></Record>
		<Game @subsidiary="a" ref="mychild" @refreshList="onRefresList"></Game>
		<GamereCord @subsidiary="a" ref="mychild"></GamereCord>
		<div id="play-instrduce" v-if="Displaystate">
			<!-- <Icon type="md-close" @click="displaystate"></Icon> -->
			<img src="../../assets/imgs/close.png" class="close_img" @click="displaystate">
			<img src="../../assets/imgs/playinstruduce.png" alt="" @click="playInstrduce()">
		</div>
	</div>
</template>
<script>
	import header from "./header.vue";
	import record from "./record.vue";
	import game from "./game.vue";
	import gamerecord from "./gamerecord.vue";
	export default {
        data() {
			return {
				Displaystate:true,
			}
		},
		methods: {
			a(type){
				var _this = this;
				_this.$emit('gwundds',type);
			},
            playInstrduce(){
			    var _this = this;
                _this.$emit('gwundds','19');
			},
			displaystate(){
				var _this = this;
				_this.Displaystate = false;
			},
			onRefresList(){
				var _this = this;
				_this.$refs.mychild.parentHandleclick();
			},
		},
		created: function() {},
		mounted:function(){},
		beforeRouteLeave (to, from, next) {
	      // 导航离开该组件的对应路由时调用
	      // 可以访问组件实例 `this`
	      this.$refs.mychild.parentHandleclick();
	      next();
	    },
		components: {
			"Header": header,
			"Record": record,
			"Game": game,
			"GamereCord": gamerecord,
		}
    }
</script>


