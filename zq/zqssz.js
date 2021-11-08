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

  var goBtn = text('搜索赚').clickable().findOnce();
  if (goBtn == undefined) {
    console.warn('未找到搜索赚进入按钮,结束');
    return;
  }

  randomClickObject(goBtn);
  // goBtn.click();
  sleep(3000);


  //等待页面出现
  if (text('去搜索').findOne(18 * 1000) == undefined) {
    console.warn('未找到去搜索的任务');
    return;
  }

  //任务列表
  var items = text('去搜索').clickable().find();
  if (items == undefined || items.length == 0) {
    console.warn('未找到去搜索的任务');
    // back();
    return;
  }

  console.warn("开始'去搜索'任务");
  for (let index = 0; index < items.length; index++) {

    var item = text('去搜索').clickable().findOnce(index);
    if (item == undefined) {
      console.warn(" ", index, "未找到");
      continue;
    }

    console.warn(" ", index, "去搜索任务 ", item.parent().child(1).text());

    randomClickObject(item);

    if (text('step3').findOne(18 * 1000) != undefined) {
      sszViewTask();
    }
  }
}

function sszViewTask () {
  for (var i = 0; i < 12; i++) {

    var task = className('android.view.View').clickable().filter(function (v) {
      return v.text().length > 3;
    }).findOnce();

    if (task == undefined) {
      console.log("  ", i, "未找到");
      continue;
    }

    console.log("  ", i, task.text());
    randomClickObject(task);
    sleep(1000);

    if (text('step3').findOnce() == undefined) {
      back();
      sleep(2000);
    }
  }

  //退回到主界面
  if (text('step3').findOnce() != undefined) {
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