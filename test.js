async function sendKeysByXPath(driver, By, xpath, keys) {
    await driver.executeScript('arguments[0].scrollIntoView(false); arguments[0].value = "";',
        driver.findElement(By.xpath(xpath)));
    return driver.findElement(By.xpath(xpath)).sendKeys(keys);
}

async function sendKeysByXPathWithDelay(driver, By, xpath, keys, delay) {
    let ret = await sendKeysByXPath(driver, By, xpath, keys);
    await driver.sleep(delay);
    return ret;
}

async function clickBtnByXPath(driver, By, xpath) {
    return driver.executeScript('arguments[0].scrollIntoView(false); arguments[0].click();',
        driver.findElement(By.xpath(xpath)));
}

async function clickBtnByXPathWithDelay(driver, By, xpath, delay) {
    let ret = await clickBtnByXPath(driver, By, xpath);
    await driver.sleep(delay);
    return ret;
}

async function clickAreaByXPath(driver, By, xpath) {
    let e = driver.findElement(By.xpath(xpath));
    await driver.executeScript('arguments[0].scrollIntoView(false);', e);
    return e.click();
}

async function clickAreaByXPathWithDelay(driver, By, xpath, delay) {
    let ret = await clickAreaByXPath(driver, By, xpath);
    await driver.sleep(delay);
    return ret;
}

(async() => {
	require('chromedriver');
    const { exec } = require('child_process');
	const { Builder, By, Key, until, Button } = require('selenium-webdriver');
    const chrome = require('selenium-webdriver/chrome');
    const chromeOptions = new chrome
        .Options()
        // .headless()
        .addArguments(['--disable-web-security', '--ignore-certificate-errors', '--enable-chrome-browser-cloud-management']);
    // console.log(chromeOptions);
    const driver = new Builder()
        .forBrowser('chrome')
        .setChromeOptions(chromeOptions)
        .build();
    try {
        await driver.get('http://101.43.210.67:8080');
        await driver.manage().window().maximize();
        await driver.sleep(500);

        // 在主页选择登录
        await clickBtnByXPathWithDelay(driver, By, '//*[@id="pageheader"]/div/div[2]/div/button[1]', 500);

        // 输入 root 的用户名和密码并登录
        await sendKeysByXPath(driver, By, '//*[@id="app"]/section/section/div[2]/div[1]/div/div/div/div/form/div[1]/div/div/div/input', 'root');
        await sendKeysByXPathWithDelay(driver, By, '//*[@id="app"]/section/section/div[2]/div[1]/div/div/div/div/form/div[2]/div/div/div/input', '123456', 500);
        await clickBtnByXPathWithDelay(driver, By, '//*[@id="app"]/section/section/div[2]/div[1]/div/div/div/div/form/div[3]/div/button[1]', 500);

        // 下拉栏查看详细资料
        await clickBtnByXPathWithDelay(driver, By, '//*[@id="app"]/section/header/div/div/div[2]/div/div/button', 500);
        await clickBtnByXPathWithDelay(driver, By, '/html/body/div[2]/div[1]/div/div[1]/div/ul/li[1]', 500);

        // 查看用户列表
        await clickBtnByXPathWithDelay(driver, By, '//*[@id="app"]/section/section/div[1]/ul[2]/li/div', 500);
        await clickBtnByXPathWithDelay(driver, By, '//*[@id="app"]/section/section/div[1]/ul[1]/li[4]', 500);

        // 下拉栏选择实例设置
        await clickBtnByXPathWithDelay(driver, By, '//*[@id="app"]/section/header/div/div/div[2]/div/div/button', 500);
        await clickBtnByXPathWithDelay(driver, By, '/html/body/div[2]/div[1]/div/div[1]/div/ul/li[8]', 500);

        // 批量创建用户，以 test 为前缀，1234 为初始密码，创建 50 个用户
        await sendKeysByXPath(driver, By, '//*[@id="app"]/section/section/div[2]/div[1]/div/div/div[2]/div/form/div[1]/div/div/div/input', 'test');
        await sendKeysByXPath(driver, By, '//*[@id="app"]/section/section/div[2]/div[1]/div/div/div[2]/div/form/div[2]/div/div/div/input', '1234');
        await sendKeysByXPath(driver, By, '//*[@id="app"]/section/section/div[2]/div[1]/div/div/div[2]/div/form/div[3]/div/div/div/input', '1234');
        await sendKeysByXPathWithDelay(driver, By, '//*[@id="app"]/section/section/div[2]/div[1]/div/div/div[2]/div/form/div[4]/div/div/div/input', '50', 500);
        await clickBtnByXPathWithDelay(driver, By, '//*[@id="app"]/section/section/div[2]/div[1]/div/div/div[2]/div/form/div[5]/div/button', 500);
        await clickBtnByXPathWithDelay(driver, By, '/html/body/div[3]/div/div/div[3]/button[2]', 500);

        // 为 test1 账号赋予管理员权限
        await clickBtnByXPathWithDelay(driver, By, '//*[@id="main-menu"]/li[4]', 500);
        await clickBtnByXPathWithDelay(driver, By, '//*[@id="app"]/section/section/div[2]/div[1]/div/div/div/div[2]/div[1]/div[1]/div[2]/div/div[1]/div/table/thead/tr/th[1]/div/span/i[1]', 500);
        await clickBtnByXPathWithDelay(driver, By, '//*[@id="app"]/section/section/div[2]/div[1]/div/div/div/div[2]/div[2]/button[2]', 500);
        await clickBtnByXPathWithDelay(driver, By, '//*[@id="app"]/section/section/div[2]/div[1]/div/div/div/div[2]/div[2]/button[2]', 500);
        await clickBtnByXPathWithDelay(driver, By, '//*[@id="app"]/section/section/div[2]/div[1]/div/div/div/div[2]/div[2]/button[1]', 500);
        await clickBtnByXPathWithDelay(driver, By, '//*[@id="app"]/section/section/div[2]/div[1]/div/div/div/div[2]/div[2]/button[1]', 500);
        await clickBtnByXPathWithDelay(driver, By, '//a[@class="el-link el-link--primary"]/span[text()="test1"]', 500);
        await clickBtnByXPathWithDelay(driver, By, '//*[@id="app"]/section/section/div[2]/div[1]/div/div/div/button', 500);
        if ('普通用户' == await driver.findElement(By.xpath('//*[@id="app"]/section/section/div[2]/div[1]/div/div/div[2]/div[1]/div[2]/table/tbody/tr/td[2]/span[2]')).getText()) {
            await clickBtnByXPathWithDelay(driver, By, '//*[@id="app"]/section/section/div[2]/div[1]/div/div/div[2]/div[4]/button', 500);
            await clickBtnByXPathWithDelay(driver, By, '/html/body/div[3]/div/div/div[3]/button[2]', 500);
        }

        // 下拉栏退出登录
        await clickBtnByXPathWithDelay(driver, By, '//*[@id="app"]/section/header/div/div/div[2]/div/div/button', 500);
        await clickBtnByXPathWithDelay(driver, By, '/html/body/div[2]/div[1]/div/div[1]/div/ul/li[10]', 500);

        // 登录 test1 账号
        await clickBtnByXPathWithDelay(driver, By, '//*[@id="pageheader"]/div/div[2]/div/button[1]', 500);
        await sendKeysByXPath(driver, By, '//*[@id="app"]/section/section/div[2]/div[1]/div/div/div/div/form/div[1]/div/div/div/input', 'test1');
        await sendKeysByXPathWithDelay(driver, By, '//*[@id="app"]/section/section/div[2]/div[1]/div/div/div/div/form/div[2]/div/div/div/input', '1234', 500);
        await clickBtnByXPathWithDelay(driver, By, '//*[@id="app"]/section/section/div[2]/div[1]/div/div/div/div/form/div[3]/div/button[1]', 500);

        // 下拉栏选择修改资料，修改用户名、个性签名
        await clickBtnByXPathWithDelay(driver, By, '//*[@id="app"]/section/header/div/div/div[2]/div/div/button', 500);
        await clickBtnByXPathWithDelay(driver, By, '/html/body/div[2]/div[1]/div/div[1]/div/ul/li[7]', 500);
        await sendKeysByXPathWithDelay(driver, By, '//*[@id="app"]/section/section/div[2]/div[1]/div/div/div[2]/div/form[1]/div/div/div/div/input', '测试管理员', 500);
        await clickBtnByXPathWithDelay(driver, By, '//*[@id="app"]/section/section/div[2]/div[1]/div/div/div[2]/div/form[1]/div/div/button', 500);
        await clickBtnByXPathWithDelay(driver, By, '//*[@id="app"]/section/header/div/div/div[2]/div/div/button', 500);
        await clickBtnByXPathWithDelay(driver, By, '/html/body/div[2]/div[1]/div/div[1]/div/ul/li[7]', 500);
        await sendKeysByXPathWithDelay(driver, By, '//*[@id="app"]/section/section/div[2]/div[1]/div/div/div[2]/div/form[5]/div[1]/div/div/textarea', '此为测试使用的个签', 500);
        await clickBtnByXPathWithDelay(driver, By, '//*[@id="app"]/section/section/div[2]/div[1]/div/div/div[2]/div/form[5]/div[2]/div/button', 500);
        await clickBtnByXPathWithDelay(driver, By, '//*[@id="app"]/section/header/div/div/div[2]/div/div/button', 500);
        await clickBtnByXPathWithDelay(driver, By, '/html/body/div[2]/div[1]/div/div[1]/div/ul/li[7]', 500);
        
        // 前往官方题库，创建题目
        await clickBtnByXPathWithDelay(driver, By, '//*[@id="main-menu"]/li[1]', 500);
        await clickBtnByXPathWithDelay(driver, By, '//*[@id="app"]/section/section/div[2]/div[1]/div/div/div/button', 500);
        await sendKeysByXPathWithDelay(driver, By, '//*[@id="pane-regular"]/form/div[1]/div/div/div/input', '1001', 500);
        await sendKeysByXPathWithDelay(driver, By, '//*[@id="pane-regular"]/form/div[2]/div/div/div/input', '测试 1', 500);
        await sendKeysByXPathWithDelay(driver, By, '//*[@id="pane-regular"]/form/div[3]/div/div/div/input', 'helloworld', 500);
        await sendKeysByXPathWithDelay(driver, By, '//*[@id="pane-regular"]/form/div[5]/div/div/div/input', '1000', 500);
        await sendKeysByXPathWithDelay(driver, By, '//*[@id="pane-regular"]/form/div[6]/div/div/div/input', '256', 500);
        await sendKeysByXPathWithDelay(driver, By, '//*[@id="pane-regular"]/form/div[7]/div/div/div/input', '测试目的', 500);
        await sendKeysByXPathWithDelay(driver, By, '//*[@id="statement"]/div[4]/div[1]/div/div[2]/div[1]', '这是第 $1$ 个题目，仅供测试使用', 500);
        await sendKeysByXPathWithDelay(driver, By, '//*[@id="inputStatement"]/div[4]/div[1]/div/div[2]/div[1]', '无', 500);
        await sendKeysByXPathWithDelay(driver, By, '//*[@id="outputStatement"]/div[4]/div[1]/div/div[2]/div[1]', '输出`Hello, World!`即可', 500);
        await clickBtnByXPathWithDelay(driver, By, '//*[@id="pane-regular"]/div[6]/div/button', 500);
        await exec(`${__dirname + '\\static\\upload.exe'} "${__dirname + '\\static\\1001_data.zip'}"`);
        await driver.sleep(5000); // 由于关闭对话框有延时，sleep 短了会让后面按钮按不到
        await clickBtnByXPathWithDelay(driver, By, '/html/body/div[1]/section/section/div[2]/div[1]/div/div/div[2]/div/div[2]/div[1]/div[6]/button', 500);
        await clickBtnByXPathWithDelay(driver, By, '/html/body/div[3]/div/div/div[3]/button[2]', 500);

        // 测试下载数据文件
        await clickBtnByXPathWithDelay(driver, By, '//*[@id="app"]/section/section/div[2]/div[1]/div/div/div/div[2]/div[1]/div[1]/div[2]/div/div[1]/div/table/thead/tr/th[2]/div/span/i[2]', 500);
        await clickBtnByXPathWithDelay(driver, By, '//a[@class="el-link el-link--primary"]/span[text()="测试 1"]', 500);
        await clickBtnByXPathWithDelay(driver, By, '//*[@id="app"]/section/section/div[2]/div[1]/div/div/section/aside/div/div[1]/div[2]/button[2]', 5000);

        // 测试 Hello, World! 程序 Python 评测
        await clickBtnByXPathWithDelay(driver, By, '//*[@id="app"]/section/section/div[2]/div[1]/div/div/section/aside/div/div[1]/div[2]/button[1]', 500);
        await clickAreaByXPathWithDelay(driver, By, '//*[@id="app"]/section/section/div[2]/div[1]/div/div/div/div[1]/div/div/div/div/input', 5000);
        await clickAreaByXPathWithDelay(driver, By, '/html/body/div[2]/div[2]/div/div/div[1]/ul/li[2]', 500);
        await sendKeysByXPathWithDelay(driver, By, '//*[@id="app"]/section/section/div[2]/div[1]/div/div/div/div[2]/div/div[2]/div[2]', 'print("Hello, World!")', 500);
        await clickBtnByXPathWithDelay(driver, By, '//*[@id="app"]/section/section/div[2]/div[1]/div/div/div/div[1]/button', 500);
        while ('Judging' == await driver.findElement(By.xpath('//*[@id="app"]/section/section/div[2]/div[1]/div/div/div/div[2]/div[1]/div[3]/div/div[1]/div/table/tbody/tr/td[2]/div/span')).getText()) {
            await driver.navigate().refresh();
            await driver.sleep(1000);
        }
        await driver.sleep(3000);

        // 测试 Hello, World! 程序 C++ 评测
        await clickBtnByXPathWithDelay(driver, By, '//*[@id="main-menu"]/li[1]', 500);
        await clickBtnByXPathWithDelay(driver, By, '//*[@id="app"]/section/section/div[2]/div[1]/div/div/div/div[2]/div[1]/div[1]/div[2]/div/div[1]/div/table/thead/tr/th[2]/div/span/i[2]', 500);
        await clickBtnByXPathWithDelay(driver, By, '//a[@class="el-link el-link--primary"]/span[text()="测试 1"]', 500);
        await clickBtnByXPathWithDelay(driver, By, '//*[@id="app"]/section/section/div[2]/div[1]/div/div/section/aside/div/div[1]/div[2]/button[1]', 500);
        await clickAreaByXPathWithDelay(driver, By, '//*[@id="app"]/section/section/div[2]/div[1]/div/div/div/div[1]/div/div/div/div/input', 5000);
        await clickAreaByXPathWithDelay(driver, By, '/html/body/div[2]/div[2]/div/div/div[1]/ul/li[1]', 500);
        await sendKeysByXPathWithDelay(driver, By, '//*[@id="app"]/section/section/div[2]/div[1]/div/div/div/div[2]/div/div[2]/div[2]', '#include <iostream>\nusing namespace std;\nint main() {\n\tcout << "Hello, world!";\n\treturn 0;\n', 500);
        await clickBtnByXPathWithDelay(driver, By, '//*[@id="app"]/section/section/div[2]/div[1]/div/div/div/div[1]/button', 500);
        while ('Judging' == await driver.findElement(By.xpath('//*[@id="app"]/section/section/div[2]/div[1]/div/div/div/div[2]/div[1]/div[3]/div/div[1]/div/table/tbody/tr/td[2]/div/span')).getText()) {
            await driver.navigate().refresh();
            await driver.sleep(1000);
        }
        await driver.sleep(3000);

        // 测试论坛
        await clickBtnByXPathWithDelay(driver, By, '//*[@id="main-menu"]/li[5]', 500);
        await clickBtnByXPathWithDelay(driver, By, '//*[@id="app"]/section/section/div[2]/div[1]/div/div/div/button', 500);
        await clickAreaByXPathWithDelay(driver, By, '//*[@id="app"]/section/section/div[2]/div[1]/div/div/div[1]/div/span', 500);
        await sendKeysByXPath(driver, By, '//*[@id="app"]/section/section/div[2]/div[1]/div/div/div[2]/form/div[2]/div/div/div/input', '1001', 500);
        await sendKeysByXPath(driver, By, '//*[@id="app"]/section/section/div[2]/div[1]/div/div/div[3]/form/div/div/div/div/input', '开启我的编程之旅', 1000);
        await sendKeysByXPath(driver, By, '//*[@id="reply"]/div[4]/div[1]/div/div[2]/div[1]', '哈哈哈 $\\LaTeX$', 1000);
        await clickBtnByXPathWithDelay(driver, By, '//*[@id="app"]/section/section/div[2]/div[1]/div/div/button', 2000);
        await clickBtnByXPathWithDelay(driver, By, '//*[@id="app"]/section/section/div[2]/div[1]/div/div/div/section/main/div[1]/div[1]/div/div/button', 500);
        await sendKeysByXPathWithDelay(driver, By, '//*[@id="reply"]/div[4]/div[1]/div/div[2]/div[1]', '顶', 1000);
        await clickBtnByXPathWithDelay(driver, By, '//*[@id="app"]/section/section/div[2]/div[1]/div/div/div/button', 5000);
    } catch (e) {
        console.error(e);
    } finally {
        // 登出 test1 账号
        await clickBtnByXPathWithDelay(driver, By, '//*[@id="app"]/section/header/div/div/div[2]/div/div/button', 500);
        await clickBtnByXPathWithDelay(driver, By, '/html/body/div[2]/div[1]/div/div[1]/div/ul/li[9]', 10000);
        await driver.quit();
    }
})();