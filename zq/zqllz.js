start();

function start () {
  auto.waitFor()
  var appName = "cn.youth.news";
  if (launch(appName)) {
    console.info("启动中青看点");
  }
  console.show();
  llz();
  exit();
}

//浏览赚
function llz () {
  console.clear();

  if (text('看看赚').findOnce() == undefined) {
    console.log('未在看看赚页面,后退');
    back();
  }

  var goBtn = text('浏览赚').findOnce();
  if (goBtn == undefined) {
    console.warn('未找到 浏览赚 进入按钮,结束');
    return;
  }

  randomClickObject(goBtn);

  sleep(3000);

  //等待页面出现
  if (text('去白拿').findOne(18 * 1000) == undefined) {
    console.warn('未找到 浏览赚 的任务');
    return;
  }

  //任务列表
  var items = text('去白拿').find();
  if (items == undefined || items.length == 0) {
    console.warn('未找到 浏览赚 的任务');
    return;
  }

  console.warn("开始 浏览赚 任务", items.length);
  for (let index = 0; index < items.length; index++) {

    if (text('去白拿').findOnce() == undefined) {
      console.warn(" ", index, "未在 去白拿 页面,后退");
      back();
      sleep(2000);
    }

    var item = text('去白拿').findOnce(index);
    if (item == undefined) {
      console.warn(" ", index, "未找到");
      sleep(500);
      continue;
    }
    var taskText = item.parent().child(item.indexInParent() - 2).text();

    if (taskText == '热闻漫谈') {
      console.warn(" ", index, "任务 ", taskText, '跳过');
      continue;
    }

    console.warn(" ", index, "任务 ", taskText);

    randomClickObject(item);

    sleep(2000);

    console.log(" ", index, "后退")
    
    back()
    sleep(2000);

    // if (textContains('去白拿').findOne() == undefined) {

    // }
  }
  console.warn("结束'去搜索'任务");
}

function getById (maxIndex, name) {
  for (let index = 0; index < maxIndex; index++) {
    console.verbose(index, name);
    var t = id(name).findOnce();
    if (t != undefined)
      return t;
    sleep(500);
  }

  return null;
}


function closeAd () {
  var closeBtn = id('big_pic_close_btn').findOnce();
  if (closeBtn != undefined) {
    console.log("点击广告关闭按钮");
    randomClickObject(closeBtn);
    sleep(1300);
  }

  closeBtn = id('btn-close').findOnce();
  if (closeBtn != undefined) {
    console.log("点击广告关闭按钮");
    randomClickObject(closeBtn);
    sleep(1300);
  }

  closeBtn = idContains('gdt_template').findOnce();
  if (closeBtn != undefined) {
    let rect = closeBtn.bounds();
    console.log("点击广告右上角按钮");
    randomClick(rect.right - 30, rect.top + 30);
    sleep(1300);
  }
}
/**
 * 点击
 * @param {横坐标} x 
 * @param {纵坐标} y 
 */
function randomClick (x, y) {
  var rx = 0;// random(0, 5);
  var ry = 0;//random(0, 5);

  click(x + rx, y + ry);
  return true;
}

/**
 * 点击
 * @param {横坐标} x 
 * @param {纵坐标} y 
 */
function randomClickObject (obj) {
  var rx = 0;// random(0, 5);
  var ry = 0;// random(0, 5);

  if (obj && obj.click) {
    obj.click();
  }

  var rct = obj.bounds();
  click(rct.centerX() + rx, rct.centerY() + ry);
  click(rct.centerX() + rx, rct.centerY() + ry);
  click(rct.centerX() + rx, rct.centerY() + ry);
  return true;
}