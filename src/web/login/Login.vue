<template>
    <div class="center">
        <div class="center_text">
            <Form ref="formInline" :model="formInline" :rules="ruleInline" >
                <FormItem prop="user">
                    <Input type="text" size="large" v-model="formInline.user" placeholder="Username">
                        <Icon type="person" size="22" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem prop="password">
                    <Input type="password" size="large" v-model="formInline.password" placeholder="Password">
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
export default {
    data () {
        return {
            formInline: {
                user: 'a',
                password: 'b'
            },
            ruleInline: {
                user: [
                    { 
                        required: true, 
                        message: 'Please fill in the user name', 
                        trigger: 'blur' 
                    }
                ],
                password: [
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
            var _router = this.$router;
            var _notice = this.$Notice;

            this.$refs[name].validate((valid) => {
                // console.log('## ' + valid); // true
                console.log("## localStorage.token " + localStorage.token);
                if (valid) {
                    // this.$Message.success('Success!')
                    this.$http.ajax({
                        url: '/logine',
                        method: 'post',
                        data: {
                            username: 'a',
                            passwd: 'b'
                        }
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
                    }).catch(function (error) {
                        console.log('## error ' + error);
                        _router.push({name: 'Main'});
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
