<template>
	<div class="record">
		<div class="record_header">
			<Menu mode="horizontal" :active-name="activename">
		        <MenuItem name="1" to="/home/allguessing">
		            所有竞猜
		        </MenuItem>
		        <MenuItem name="2" to="/home/myguessing">
		            我的竞猜
		        </MenuItem>
		        <MenuItem name="3" to="/home/history">
		            开奖历史
		        </MenuItem>
		    </Menu>
		</div>
		<div>
			<router-view ref="mychild"></router-view>
		</div>
	</div>
</template>
<script>
	export default {
	    // 数据
	    data() {
	        return {
	            activename:'1'
			};
		},
	    methods:{
	    	parentHandleclick(){
	    		let _this = this;
	    		if (_this.activename == '2') {
	    			_this.$refs.mychild.getDate('1');
	    		}
	    	}
	    },
		mounted(){
	        var _this = this;
	        switch (_this.$route.path) {
				case '/home/allguessing':
					_this.activename = '1';
					break;
                case '/home/myguessing':
                    _this.activename = '2';
                    break;
                case '/home/history':
                    _this.activename = '3';
                    break;
				default:
				    break;
            }
		}
	}
</script>



// WEBPACK FOOTER //
// src/components/home/gamerecord.vue