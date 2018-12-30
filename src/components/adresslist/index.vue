<template>
	<Modal v-model="modal2" @on-cancel="Callback()">
        <p slot="header">
            <span>钱包地址管理</span>
        </p>
        <div class="putadress-main">
			<div class="main-list" v-for="(item,index) in cityList" :key="index">
				<p class="one">{{item.remark}}</p>
				<ul>
					<li @click="goPutFor(item.address)">{{item.address}}</li>
					<li @click="deleteS(item.id)">删除</li>
				</ul>
			</div>
        </div>
		<div class="login_footer">
			<Button @click="goAddAdress" type="primary" >添加钱包地址</Button>
		</div>
    </Modal>
</template>
<script>
    export default {
    	props:['Statevalue'],
        data () {
            return {
                cityList:[],
                modal_loading: false,
                modal2:false,
            }
        },
        watch: {
        	'Statevalue':function(val,oval){
				var _this = this;
				_this.modal2 = val;
                _this.getdata();
			},
        },
        methods: {
            goPutFor(data){//从提币列表返回提币页
                this.modal2 = false;
                this.$emit('Otherfunctions','16');
                this.$emit('getAddress',data);
			},
            deleteS(data){
                let _this = this;
                let _data = {id:data};
                _this.$http.post(_this.$http.delmoneyAdress,_data).then(function(response) {
                    if(response.data.status == 200){
                        _this.$Message.success(response.data.msg);
						if(_this.cityList.length >= 0){
						    // console.log(_data);
                            _this.getdata();
						}
					}
				})
			},
            goAddAdress(){
                let _this = this;
                _this.modal2 = false;
                _this.$emit('Otherfunctions','14');
			},
        	Callback(){
        		var _this = this;
                _this.modal2 = false;
        		_this.$emit('modifyfun');
        	},
            getdata(){
                var _this = this;
                _this.$http.post(_this.$http.adresslist).then(function(response) {
                    if(response.data.status == "200") {
                        _this.cityList = response.data.data.list;
                        // console.log(_this.cityList)
                    }
                }).catch(function(error) {});
            }
        },
        mounted(){

        }
    }
</script>
<style lang="less">
    // @import '../../assets/public.less';
    // @import './index.less';
	// @import "index.less";
</style>
