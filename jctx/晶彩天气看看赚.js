var allTasks = ['封面新闻'];
let taskText = '';

// 美好生活 debug

start();
function start () {
  auto.waitFor()
  var appName = "com.ldzs.jcweather";
  if (launch(appName)) {
    console.info("启动晶彩天气");
  }
  console.show();

  kkz();
  exit();
}

//看看赚
function kkz () {
  //初始化时要忽略的任务
  let rct;
  let needBack = false;
  for (var i = 1; i < 50; i++) {
    sleep(1000);
    needBack = false;

    if (i % 5 == 0)
      console.clear();

    if (text('看看赚').findOnce() == undefined) {
      console.log(i, '未在看看赚页面,后退');
      back();
      sleep(1000);
    }

    try {

      var task = getTask(i);
      if (task == undefined) {
        console.log(i, '未获取到任务');
        continue;
      }

      needBack = true;
      console.log(i, '开始任务 ' + taskText);

      rct = task.bounds();
      randomClick(rct.centerX(), rct.centerY());
      sleep(500);

      console.warn(' 任务 ' + taskText + '  成功');


    } catch (error) {
      console.error(error.message);
    }
    finally {
      if (needBack)
        backViewTask();
      sleep(1000);
      if (rct)
        scorrToTask(rct.centerY());
    }

  }

  console.warn(' 任务结束');
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

function getTask (i) {
  // var task1 = textContains('进行中').find();
  // var task2 = text('去完成').find();
  // var tasks = task1.concat(task2);
  //查找所有任务
  var tasks = textContains('0金币').find();

  console.log(i, "找到的任务数据 ", tasks.length);

  for (let index = 0; index < tasks.length; index++) {
    let task = tasks[index];
    taskText = '';
    let par = task.parent();
    if (par && par.childCount() >= 3) {
      let statusText = par.child(2).text();
      //忽略已完成
      if (statusText != '去完成' && statusText != '进行中')
        continue;

      taskText = par.child(0).text();
      // console.log("  ", index, taskText);
    }
    else {
      continue;
    }

    //还未处理过
    if (allTasks.indexOf(taskText) > -1) {
      //console.log("  ", index, "已经处理的任务 ", taskText);
    }
    else {
      allTasks.push(taskText);
      return task;
    }
  }

}

function scorrToTask (y) {
  // var y = task.bounds().centerY();
  if (device.height - 500 < y) {
    console.log("滚动任务列表")
    gesture(400, [520, 1550], [520, 450]);
  }
}

function backViewTask () {
  if (text('看看赚').findOnce() != undefined) {
    return;
  }

  var close = id('ahp').clickable().findOnce();
  if (close != undefined)
    close.click();
  else {
    console.log("  backViewTask后退")
    back();
  }
}

//进入世界任务页面
function viewTask (task) {

  //判断是否进入的标志
  if (id('cz').findOnce() == undefined) {
    console.log(' ', '未在viewTask页面', task.bounds());
    return;
  }

  for (var i = 0; i < 8; i++) {
    if (id('cz').findOnce() == undefined) {
      console.log(' ', i, '未在viewTask页面');
      break;
    }

    closeAd();

    var l1 = boundsInside(10, 300, device.width, device.height).packageName('com.ldzs.jcweather').className('android.view.View').clickable().findOnce();
    var l2 = boundsInside(10, 300, device.width, device.height).packageName('com.ldzs.jcweather').className('android.widget.Image').clickable().findOnce();
    var link = l1 || l2;
    if (link == undefined) {
      console.log(' ', i, '未找到连接');
    }
    else {
      let linkText = link.text() || link.contentDescription || "";
      linkText = linkText.length > 8 ? linkText.substring(0, 8) : linkText;
      // console.log(' ', i, "link ", linkText.length, "  ", linkText);
      console.log(' ', i, "link ", linkText);

      if (linkText.indexOf && linkText.indexOf('广告') > -1) {
        continue;
      }

      sleep(200)
      link.click();
      sleep(1000);
      back();
      sleep(1000);
    }

    // console.log("  下滑!")
    if (id('cz').findOnce() == undefined) {
      console.log(' ', i, '已经退出了viewTask页面');
      break;
    }

    gesture(400, [520, 1550], [520, 450]);
    sleep(300);
  }
  return true;
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

  var rct = obj.bounds();
  click(rct.centerX() + rx, rct.centerY() + ry);
  click(rct.centerX() + rx, rct.centerY() + ry);
  click(rct.centerX() + rx, rct.centerY() + ry);
  return true;
}