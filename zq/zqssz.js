start();

function start () {
  auto.waitFor()
  var appName = "cn.youth.news";
  if (launch(appName)) {
    console.info("启动中青看点");
  }
  console.show();
  // sleep(2000);

  // var taskBtn = getById(30, 'cn.youth.news:id/x8');
  // if (taskBtn == undefined) {
  //   console.error('未找到,任务入口');
  //   exit()
  // }

  // randomClickObject(taskBtn);
  // sleep(2000);

  // var btn = getById(10, 'cn.youth.news:id/ach'); // id('acj').findOnce();
  // if (btn == undefined) {
  //   console.error('未找打,看看赚入口');
  //   exit()
  // }
  // randomClickObject(btn);
  // sleep(2000);

  // kkz();
  ssz();
  exit();
}

//浏览赚
function llz () {
  console.clear();
  if (text('看看赚').findOnce() == undefined) {
    console.log('未在看看赚页面,后退');
    back();
  }

  var goBtn = text('浏览赚').clickable().findOnce();
  if (goBtn == undefined) {
    console.warn('未找到浏览赚进入按钮,结束');
    return;
  }

  goBtn.click();
  sleep(1000);
}

//浏搜索赚
function ssz () {
  console.clear();

  if (text('看看赚').findOnce() == undefined) {
    console.log('未在看看赚页面,后退');
    back();
  }

  var goBtn = text('搜索赚').findOnce();
  if (goBtn == undefined) {
    console.warn('未找到搜索赚进入按钮,结束');
    return;
  }

  randomClickObject(goBtn);

  sleep(3000);

  //等待页面出现
  if (text('去搜索').findOne(18 * 1000) == undefined) {
    console.warn('未找到去搜索的任务');
    return;
  }

  //任务列表
  var items = text('去搜索').find();
  if (items == undefined || items.length == 0) {
    console.warn('未找到去搜索的任务');
    // back();
    return;
  }

  console.warn("开始'去搜索'任务");
  for (let index = 0; index < items.length; index++) {

    if (text('去搜索').findOnce() == undefined) {
      console.warn(" ", index, "未在 去搜索 页面,后退");
      back();
      sleep(2000);
    }

    var item = text('去搜索').findOnce(index);
    if (item == undefined) {
      console.warn(" ", index, "未找到");
      sleep(500);
      continue;
    }

    console.warn(" ", index, "去搜索任务 ", item.parent().child(0).text());

    randomClickObject(item);

    sleep(2000);

    if (textContains('今日热词').findOne(5 * 1000) != undefined) {
      sszViewTask();
    }
    else {
      console.warn(" ", index, "未找到定位对象 今日热词 结束");
    }
  }

  console.warn("结束'去搜索'任务");

}

function sszViewTask () {
  console.log("  开始sszViewTask");
  for (var i = 0; i < 12; i++) {

    //定位对象
    var pObject = textContains('今日热词').findOne(5 * 1000);
    if (pObject == undefined) {
      console.log("  ", i, "未找到定位对象 今日热词");
      back();
      console.log("  ", i, '后退');
    }

    let minY = 0
    try {
      minY = pObject.bounds().bottom + 5;
    } catch (error) {
      console.log("  ", i, pObject);
      continue;
    }

    var task = className('android.view.View').filter(function (v) {
      return v.text().length > 3 && v.bounds().bottom > minY;
    }).findOnce();

    if (task == undefined) {
      console.log("  ", i, "未找到");
      sleep(500);
      continue;
    }

    console.log("  ", i, task.text());
    randomClickObject(task);
    sleep(1000);

    if (textContains('今日热词').findOnce(3 * 1000) == undefined) {
      console.log("  ", i, '后退');
      back();
      sleep(2000);
    }
    else {
      console.warn("在 今日热词 不后退");
    }
  }

  //退回到主界面
  if (textContains('今日热词').findOnce(3 * 1000) != undefined) {
    back();
    sleep(2000);
  }
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