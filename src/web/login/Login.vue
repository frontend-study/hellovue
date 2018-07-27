<template>
    <div class="center">
        <div class="center_text">
            <Form ref="formInline" :model="formInline" :rules="ruleInline" >
                <FormItem prop="username">
                    <Input type="text" size="large" v-model="formInline.username" placeholder="Username">
                        <Icon type="person" size="22" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem prop="passwd">
                    <Input type="password" size="large" v-model="formInline.passwd" placeholder="Password">
                        <Icon type="locked" size="22" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" size="large" @click="handleSubmit('formInline')">Signin</Button>
                </FormItem>
            </Form>
        </div>
    </div>
</template>

<script>
import iView from 'iview';

export default {
    data () {
        return {
            formInline: {
                username: 'a',
                passwd: 'b'
            },
            ruleInline: {
                username: [
                    { 
                        required: true, 
                        message: 'Please fill in the user name', 
                        trigger: 'blur' 
                    }
                ],
                passwd: [
                    { 
                        required: true, 
                        message: 'Please fill in the password.', 
                        trigger: 'blur' 
                    },
                    { 
                        type: 'string', 
                        min: 1, 
                        message: 'The password lengthcannot be less than 6 bits', 
                        trigger: 'blur'
                    }
                ]
            }
        }
    },
    methods: {
        handleSubmit (name) {
            // console.log('## ' + name); // formInline
            // console.log("## " + JSON.stringify(this.formInline));
            var _router = this.$router;
            var _notice = this.$Notice;
            var params = this.formInline;

            this.$refs[name].validate((valid) => {
                // console.log('## ' + valid); // true
                console.log("## localStorage.token " + localStorage.token);
                if (valid) {
                    iView.LoadingBar.start();
                    // this.$Message.success('Success!')
                    this.$http.ajax({
                        url: '/logine',
                        method: 'get',
                        params
                        // params: {
                            // username: 'a',
                            // passwd: 'a'
                        // }
                    }).then(function (response) {
                        if (response) {
                            console.log('## response 获取 token ' + response.data.token);
                            // console.log("## old token " + localStorage.token);
                            localStorage.token = response.data.token;
                            // console.log("## new token " + localStorage.token);
    
                            _notice.info({
                                title: '登录成功',
                                duration: 2
                            });
                            _router.push({name: 'Main'});
                        }
                        iView.LoadingBar.finish();
                    }).catch(function (error) {
                        console.log('## error ' + error.response.data.message);
                        _notice.info({
                            title: error.response.data.message,
                            duration: 2
                        });
                        // _router.push({name: 'Main'});
                        iView.LoadingBar.finish();
                    }) 
                }
                else {
                    // this.$Message.error('Fail!')
                }
            })
        }
    }
}
</script>

<style>
.center {
    text-align: center;
}
.center_text {
      display: inline-block;
      width: 400px;
      /* border:2px solid; */
      /* border-radius:10px; */
    }
</style>
