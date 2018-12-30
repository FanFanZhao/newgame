<template>
	<Modal v-model="modal2" @on-cancel="Callback()">
        <p slot="header">
            <span>添加钱包地址</span>
        </p>
        <div class="login_main">
            <Form ref="formTop" :model="formTop" label-position="top" :rules="rules2">
				<FormItem label="地址" prop="address">
					<Input v-model="formTop.address" placeholder="输入或粘贴钱包地址" type="text">
					</Input>
				</FormItem>
				<FormItem label="备注" prop="remark">
					<Input v-model="formTop.remark" placeholder="" type="text">
					</Input>
				</FormItem>
		    </Form>
		    <div class="login_footer">
		    	<Button type="primary" :loading="modal_loading" @click="putSuccess">确定</Button>
		    </div>
        </div>
        <div slot="footer"></div>
    </Modal>
</template>
<script>
    export default {
    	props:['Statevalue'],
        data () {
          var validateopwd1 = (rule, value, callback) => {
            if(value == '') {
              callback(new Error('请输入提币地址'));
            } else {
              callback();
            };
          };
            var validateopwd2 = (rule, value, callback) => {
                if(value == '') {
                    callback(new Error('请输入备注'));
                } else {
                    callback();
                };
            };
            return {
				modal_loading: false,
				modal2:false,
				formTop: {
                    remark: '',
					address:''
				},
              	rules2:{
                address: [{
                  validator: validateopwd1,
                  trigger: 'blur'
                }],
				remark:[{
                    validator: validateopwd2,
                    trigger: 'blur'
				}]
              },
            }
        },
        watch: {
        	'Statevalue':function(val,oval){
                let _this = this;
				_this.modal2 = val;
			},
        },
        methods: {
            putSuccess(){
                let _this = this;
                _this.$refs['formTop'].validate((valid) => {
                    if(valid){
                        _this.modal_loading = true;
                        let _data = _this.formTop;
                        _this.$http.post(_this.$http.addmoneyAdress,_data).then(function(response){
                            if(response.data.status == 200){
                                _this.modal_loading = false;
                                _this.$Message.success(response.data.msg);
                                _this.modal2 = false;
                                _this.$emit('modifyfun');
                                _this.formTop.remark = '';
                                _this.formTop.address = '';
                            }else{
                                _this.modal_loading = false;
                                _this.formTop.remark = '';
                                _this.formTop.address = '';
                                _this.$Message.error(response.data.msg);
							}
                        })
					}else{
                        return false;
					}
				})
			},
        	Callback(){
        		var _this = this;
                _this.modal2 = false;
        		_this.$emit('modifyfun');
        	}
        },
        mounted(){
        }
    }
</script>
<style lang="less">
    // @import '../../assets/public.less';
    // @import './index.less';
</style>

