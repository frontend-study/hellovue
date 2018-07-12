<template>
    <div>
        Main
    </div>
</template>

<script>

// 代码全部写在 export default 内部，写在外部就是普通的 javascript 方式；
export default {
    created () {
        console.log("## Main ");
        this.$http.ajax({
            url: '/index',
            method: 'get'
        }).then(function (response) {
            console.log('## Main response ' + response.data);
        }).catch(function (error) {
            console.log('## Main error ' + error);
        });
    }
}
</script>
