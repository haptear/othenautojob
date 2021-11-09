start();


function start () {
  auto.waitFor()
  var appName = "cn.youth.news";
  if (launch(appName)) {
    console.info("启动中青看点");
  }
  console.show();
  viewTask();
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

function getById (maxIndex, name) {
  for (let index = 0; index < maxIndex; index++) {
    // console.verbose(index, name);
    var t = id(name).findOnce();
    if (t != undefined)
      return t;
    sleep(500);
  }

  return null;
}

function viewTask () {
  for (var i = 1; i < 500; i++) {
    sleep(1000);
    console.log("下滑!")
    gesture(400, [520, 1550], [520, 450]);
    sleep(1000);
    var y1 = id("ah5").className("android.widget.TextView").findOnce(1);
    var y2 = id("a03").className("android.widget.LinearLayout").findOnce(1);
    var y3 = id("ah5").className("android.widget.TextView").findOnce(0);
    var y4 = id("a03").className("android.widget.LinearLayout").findOnce(0);
    var y5 = id("ail").className("android.widget.TextView").findOnce(0);

    // console.log("y1=", (y1 == undefined), "y2=", (y2 == undefined), "y3=", (y3 == undefined), "y4=", (y4 == undefined), "y5=", (y5 == undefined))
    var youth = y1 || y2 || y3 || y4 || y5;

    sleep(200);

    if (youth == undefined) {
      console.log(i, "未找到!")
      continue;
    }

    try {
      console.log(i, youth.text());
      randomClickObject(youth);
      // var youok = youth.bounds();
      // var a = youok.centerX();
      // var b = youok.centerY();
      // click(a, b);
      sleep(1000);
      var taskBtn = getById(4, 'cn.youth.news:id/x8');
      if (taskBtn == undefined)
        back();
    } catch (error) {

    }
  }
}