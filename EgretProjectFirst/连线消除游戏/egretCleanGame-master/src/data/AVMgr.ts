class AVMgr {
    public static test() {
        var APP_ID = 'PgJ6NThEgme493wrvexghyRA-gzGzoHsz';
        var APP_KEY = 'yuLVnbbIvDbh2xXg85iDJHtr';

        AV.init({
            appId: APP_ID,
            appKey: APP_KEY
        });

        var todo = new AV.Object('Test');
        todo.set('title', 'Test');
        todo.set('content', 'ÿ�ܹ���ʦ���飬��һ����2��');
        todo.save<AV.Object>().then(
            (data) => {
                var savedTodo:AV.Object = data;
                egret.log("�ɹ�");
            },
            (error) => {
                egret.log("ʧ��");
            }
        );
    }
}