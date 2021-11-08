start();


function start() {
  auto.waitFor()
  var appName = "com.jingdong.app.mall";
  if (launch(appName)) {
      console.info("启动中青看点");
  }
  console.show();
}

/**
 * 点击
 * @param {横坐标} x 
 * @param {纵坐标} y 
 */
 function randomClick(x, y) {
  var rx = random(0, 5);
  var ry = random(0, 5);

  click(x + rx, y + ry);
  sleep(2000);
  return true;
}

auto();
sleep(1000);
console.show();
for (var i = 1; i < 500; i++) {
  sleep(1000);
  console.log("下滑!")
  gesture(400, [520, 1550], [520, 450]);
  sleep(1000);
  var youth = id("ah5").className("android.widget.TextView").findOnce(1);
  sleep(200);
  if (youth == undefined)
    youth = id("a03").className("android.widget.LinearLayout").findOnce(1);
  if (youth == undefined) {
    console.log(i, "未找到!")
    continue;
  }
  try {

    console.log(i, youth.text());
    var youok = youth.bounds();
    var a = youok.centerX();
    var b = youok.centerY();
    click(a, b);
    sleep(1000);
    back();
  } catch (error) {

  }

}