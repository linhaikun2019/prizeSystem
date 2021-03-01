$(function () {
    const itemList = [{
            index: 0,
            className: "item1",
            bgImg: "./images/iphone12.png",
            name: "iPhone12(64G)",
            p: 0.01,
        },
        {
            index: 1,
            className: "item2",
            bgImg: "./images/package.png",
            name: "新年大礼包",
            p: 0.08,
        },
        {
            index: 2,
            className: "item3",
            bgImg: "./images/ipadair.png",
            name: "iPadAir(64G)",
            p: 0.02,
        },
        {
            index: 3,
            className: "item5",
            bgImg: "./images/mi11.png",
            name: "小米11(8G+256G)",
            p: 0.02,
        },
        {
            index: 4,
            className: "item8",
            bgImg: "./images/pocket.png",
            name: "新年红包",
            p: 0.2,
        },
        {
            index: 5,
            className: "item7",
            bgImg: "./images/star.png",
            name: "谢谢参与",
            p: 0.8,
        },
        {
            index: 6,
            className: "item6",
            bgImg: "./images/macbookair.png",
            name: "MacBookAir(8G+256G)",
            p: 0.01,
        },
        {
            index: 7,
            className: "item4",
            bgImg: "./images/mate40pro.png",
            name: "HUAWEIMate40(8G+128G)",
            p: 0.01,
        }
    ]; //定义奖项数组
    let a = new Array(8); //定义奖项项目数组
    let i, j, n, time, r; //定义i,j,n(随机奖项下标),r(随机数)
    toggleSound(); //声音开关
    //初始化所有奖项为itemList的className顺序
    for (i = 0; i < 8; i++) {
        a[i] = document.getElementsByClassName(itemList[i].className)[0];
    }
    //定义抽奖动画
    const move = async function move() {
        //开始抽奖时移除点击事件（放止再次点击抽奖）
        document.querySelector(".btn").removeEventListener("click", move);
        //将开始抽奖按钮禁用并显示灰度
        $(".btn").css({
            cursor: "default",
            transition: "none",
            transform: "none",
            background: "url('./images/btn_d_bg.jpg') no-repeat",
            "box-shadow": "0px 0px",
            "background-size": "450px",
            "background-position": "center",
            "border-radius": "0px",
            border: "5px inset #ff9966",
            "border-radius": "15px",
            width: "145px",
            height: "145px"
        });
        cssRule(
            ".btn:after{color: #d0d0d0;text-shadow: 1px 1px 5px #d0d0d0;transition: none;}"
        );
        $(".btn").mouseleave(function () {
            cssRule(
                ".btn:after{color: #d0d0d0;text-shadow: 1px 1px 5px #d0d0d0;transition: none;}"
            );
        })
        //移除按钮悬浮效果
        $(".btn").off("mouseenter", overMouse);
        $(".btn").off("mouseleave", leaveMouse);
        $(".btn").off("mousedown", activeMouse);
        $(".btn").off("mouseup", resumeMouse);
        //初始化所有奖项背景
        for (i = 0; i < 8; i++) {
            a[i].style.backgroundColor = "#FFCC99";
        }
        r = Math.random();
        //生成随机数，参考各奖项概率输出相对应的下标
        for (i = 0; i < 8; i++) {
            if (r < itemList[i].p) {
                n = i;
                break;
            }
            r -= itemList[i].p;
        }
        //初始化停留时间
        time = 50;
        //前4圈的动画                
        for (i = 0; i < 5; i++) {
            for (j = 0; j < 8; j++) {
                a[(j + 7) % 8].style.backgroundColor = "#FFCC99"; //这里是前一个奖项的背景还原
                a[j].style.backgroundColor = "#FF9900"; //这里是当前的奖项背景变色
                await sleep(time); //调用异步函数(暂停time的时间)
                if (i == 4 && j == n) break; //如果到了第4圈并且奖项下标等于随机下标则跳出循环
            }
            time *= 1.3; //时间倍率
        }
        //最后一圈的动画(因为最后一圈动画特殊所以单独写)
        for (i = n + 1; i < n + 9; i++) {
            a[(i + 7) % 8].style.backgroundColor = "#FFCC99";
            a[i % 8].style.backgroundColor = "#FF9900";
            await sleep(time);
            time *= 1.3;
        }
        //最后弹出奖项名称
        // alert(itemList[n].name)
        let rNum = (Math.random() * (10 - 1) + 1).toFixed(2); //生成1-10的随机两位小数红包
        if (itemList[n].name == '谢谢参与') {
            Swal.fire({
                title: '很遗憾！你没有抽中奖品！',
                html: '这次的运气有点low了，希望下次再接再厉！',
                confirmButtonText: '再试一次',
                imageUrl: itemList[n].bgImg,
                imageWidth: '100px',
                heightAuto: false
            })
        } else if (itemList[n].name == '新年红包') {
            Swal.fire({
                title: `恭喜你抽中了${rNum}元红包！`,
                text: '祝你新年快乐！心想事成！',
                showCancelButton: true,
                confirmButtonText: '去领取',
                cancelButtonText: '果断放弃',
                imageUrl: itemList[n].bgImg,
                imageWidth: '100px',
                heightAuto: false
            }).then((result) => {
                if (result.value) {
                    Swal.fire({
                        title: `成功领取${rNum}元红包！`,
                        type: 'success',
                        text: '红包已经存入你的钱包啦！',
                        confirmButtonText: '确定',
                        heightAuto: false
                    })
                }
            })
        } else if (itemList[n].name == '新年大礼包') {
            Swal.fire({
                title: `恭喜你抽中了${itemList[n].name}！`,
                html: '新年大礼包包含66元红包和一些小奖品，赶快去领取吧！<br>祝你新的一年里财源滚滚，财运亨通！',
                showCancelButton: true,
                confirmButtonText: '去领取',
                cancelButtonText: '果断放弃',
                imageUrl: itemList[n].bgImg,
                imageWidth: '100px',
                heightAuto: false
            }).then((result) => {
                if (result.value) {
                    Swal.fire({
                        title: `成功领取${itemList[n].name}！`,
                        type: 'success',
                        html: '红包已经存入你的钱包啦！<br>其他奖品可以去设置收货地址接收哦~~',
                        confirmButtonText: '确定',
                        heightAuto: false
                    })
                }
            })
        } else {
            Swal.fire({
                title: `恭喜你抽中了<br>${itemList[n].name}！`,
                text: `你太厉害了！居然抽中了${itemList[n].name},还不赶快去领取！`,
                showCancelButton: true,
                confirmButtonText: '去领取',
                cancelButtonText: '果断放弃',
                imageUrl: itemList[n].bgImg,
                imageWidth: '100px',
                heightAuto: false
            }).then((result) => {
                if (result.value) {
                    Swal.fire({
                        title: `成功领取${itemList[n].name}！`,
                        type: 'success',
                        text: '奖品可以去设置收货地址接收哦~~',
                        confirmButtonText: '确定',
                        heightAuto: false
                    })
                }
            })
        }

        //重新初始化奖项背景
        for (i = 0; i < 8; i++) {
            a[i].style.backgroundColor = "#FFCC99";
        }
        //重新监听点击抽奖事件               
        document.querySelector(".btn").addEventListener("click", move);
        //重新绑定鼠标悬浮效果
        $(".btn").on("mouseenter", overMouse);
        $(".btn").on("mouseleave", leaveMouse);
        $(".btn").on("mousedown", activeMouse);
        $(".btn").on("mouseup", resumeMouse);
        $(".btn").on("mouseout", resumeMouse);
        //重新恢复按钮效果
        $(".btn").css({
            cursor: "pointer",
            transition: "all 0.2s;",
            transform: "scale(1.0)",
            background: "url('./images/btn_bg.jpg') no-repeat",
            "box-shadow": "0px 0px 20px 10px #CC3333",
            "background-size": "450px",
            "background-position": "center",
            "border-radius": "15px",
            border: 0,
            width: "150px",
            height: "150px"
        });
        cssRule(
            ".btn:after{color: #FFFF66;text-shadow: 1px 1px 5px #FFFFFF;transition: all 0.2s;}"
        );
    };
    //这里也加一个监听事件(初始化时的监听)
    document.querySelector(".btn").addEventListener("click", move);
    //初始化时的绑定鼠标悬浮效果    
    $(".btn").on("mouseenter", overMouse);
    $(".btn").on("mouseleave", leaveMouse);
    $(".btn").on("mousedown", activeMouse);
    $(".btn").on("mouseup", resumeMouse);
    $(".btn").on("mouseout", resumeMouse);
    //初始化时的按钮效果
    $(".btn").css({
        cursor: "pointer",
        transition: "all 0.2s;",
        transform: "scale(1.0)",
        background: "url('./images/btn_bg.jpg') no-repeat",
        "box-shadow": "0px 0px 20px 10px #CC3333",
        "background-size": "450px",
        "background-position": "center",
        "border-radius": "15px",
        border: 0,
        width: "150px",
        height: "150px"
    });
    cssRule(
        ".btn:after{color: #FFFF66;text-shadow: 1px 1px 5px #FFFFFF;transition: all 0.2s;}"
    );
});
//异步延迟函数（使用异步模拟延迟加载setTimeout）
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
//定义插入css规则的方法
function cssRule(t) {
    s = document.createElement("style");
    s.innerText = t;
    document.body.appendChild(s);
};
//鼠标移入效果
function overMouse() {
    $(this).css({
        cursor: "pointer",
        transition: "all 0.2s",
        transform: "scale(1.1)",
    });
    cssRule(
        ".btn:after{color: #FFFF66;text-shadow: 1px 1px 5px #FFFFFF;transition: all 0.2s;}"
    );
}
//鼠标移出效果
function leaveMouse() {
    $(this).css({
        cursor: "default",
        transition: "all 0.2s",
        transform: "scale(1.0)",
    });
    cssRule(
        ".btn:after{color: #FFFF66;text-shadow: 1px 1px 5px #FFFFFF;transition: all 0.2s;}"
    );
}
//鼠标焦点效果
function activeMouse() {
    $(this).css({
        cursor: "pointer",
        transition: "all 0.2s",
        transform: "scale(1.0)",
        "-webkit-filter": "saturate(50%)",
        filter: "saturate(50%)"
    });
    cssRule(
        ".btn:after{color: #bfbf69;text-shadow: 1px 1px 5px #bFbFbF;transition: all 0.2s;}"
    );
}

//鼠标失焦效果
function resumeMouse() {
    $(this).css({
        cursor: "pointer",
        transition: "all 0.2s",
        transform: "scale(1.0)",
        "-webkit-filter": "saturate(100%)",
        filter: "saturate(100%)"
    });
    cssRule(
        ".btn:after{color: #FFFF66;text-shadow: 1px 1px 5px #FFFFFF;transition: all 0.2s;}"
    );
}
//声音开关
function toggleSound() {
    const music = document.querySelector("#bg_music"); //获取audio
    let flag = false; //定义开关
    $('#music').click(function () {
        if (flag) {
            $(this).css('background', 'url(./images/m_off.png) no-repeat');
            $(this).css('background-size', '40px');
            if (!music.paused) { //声音暂停
                music.pause();
            }
        } else {
            $(this).css('background', 'url(./images/m_on.png) no-repeat');
            $(this).css('background-size', '40px');
            if (music.paused) { //声音播放
                music.play();
                music.volume = 0.3;
            }
        }
        flag = !flag;
    })

}