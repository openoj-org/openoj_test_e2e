# openoj_test_e2e
对 OpenOJ 的端到端测试，使用 Node.js 和 Selenium 构建。

一、技术栈

使用 Node.js 的 express 框架配合 Selenium 测试框架，构建全自动端到端测试。

其中，前端上传文件时，由于不是采用 input 类型按钮而是 button 类型按钮，不能直接用 Selenium 传本地文件路径。因此只能调用 Windows API 对唤起的文件选择对话框进行操作，于是采用了 AutoIt 的脚本编译成的可执行文件（置于根目录下的 '/static/upload.exe'），带有一个命令行参数，在 Node.js 的 child_process 包 exec 函数下调用命令行执行对对话框的操作。

	WinWaitActive("打开")
	ControlSetText("打开", "", "Edit1", $CmdLine[1])
	Sleep(1000)
	ControlClick("打开", "", "Button1");

二、测试内容

测试流程模仿一个班级准备使用 OJ 系统，于是告知 root 用户登录并批量创建用户，赋予其中一个用户管理员权限。管理员可以创建题目。用户可以修改用户名、密码、个性签名等，在题目界面进行下载数据、评测等一系列操作，并在论坛发帖跟帖等。由于创意工坊模块和官方题库模块基本功能相近、底层逻辑一致，故不再附加测试。

三、测试方法

测试依赖项通过 npm 管理，在控制台或命令行运行如下代码开始测试：

	npm install
	npm run test

测试前应当在数据库中删除测试用户 'test1'~'test50'、'测试管理员'，并通过 root 用户将题目 '测试 1' 删除，否则会出现意料之外的错误。

四、测试结果

测试符合预期流程，完成了用户登录与创建、题目创建与评测、发帖等预期目标。