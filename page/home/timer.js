import VisLog from "@silver-zepp/vis-log";
import { getDeviceInfo } from '@zos/device';
import { back } from "@zos/router";
import { Vibrator, VIBRATOR_SCENE_NOTIFICATION } from "@zos/sensor";
import { align, createWidget, deleteWidget, event, prop, text_style, updateStatusBarTitle, widget } from "@zos/ui";
import { log as Logger } from "@zos/utils";
import { ZeppTimer } from "../../libs/zeppos_timer"; // Replace with the path to your zeppos_timer.js
import { DoneButton, padding_top, QuitButton, SelectTimerARC, TimerARC, TimerCountTEXT, TimerTEXT } from "./timer.s.layout";
import { BasePage } from "@zeppos/zml/base-page";
const vis = new VisLog("index.js");
const logger = Logger.getLogger("timer-page");
import { getAutoBrightness } from '@zos/display'

const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = getDeviceInfo();
Page(
    BasePage({
        state: {
            taskId: null,
            timerList: [0.1 / 6, 25, 45, 60],
            taskName: null,
            timer: null,
            startDate: null,
            endDate: null
        },
        onInit(params) {
            const param = JSON.parse(params);
            this.state.taskId = param["taskId"];
            this.state.taskName = param["taskName"];
        },
        build() {
            updateStatusBarTitle(this.state.taskName);
            const padding = DEVICE_WIDTH / 3 - 100;
            const right = DEVICE_WIDTH * 2 / 3 - 50;
            const Positions = [
                { x: padding, y: padding_top + padding / 2 },
                { x: right, y: padding_top + padding / 2 },
                { x: padding, y: padding_top + padding * 1.5 + 150 },
                { x: right, y: padding_top + padding * 1.5 + 150 }
            ];

            const TimerARCInstances = Positions.map(position => ({
                ...SelectTimerARC,
                x: position.x,
                y: position.y
            }));
            const TextInstances = Positions.map((position, index) => ({
                ...TimerTEXT,
                x: position.x,
                y: position.y,
                text: this.state.timerList[index] + "m"
            }));


            const arcs = TimerARCInstances.map((instance, i) => {
                return [createWidget(widget.TEXT, TextInstances[i]), createWidget(widget.ARC, instance)];
            });

            arcs.forEach((e, index) => {
                e[1].addEventListener(event.CLICK_UP, (info) => {
                    this.state.timer = this.state.timerList[index];
                    clearAllWidget(arcs.flat());
                    showTimer();
                });
            });
            const clearAllWidget = (widgets) => {
                widgets.forEach(w => deleteWidget(w));
            };
            const showDialog = () => {
                const DialogTitle = createWidget(widget.TEXT, {
                    x: 0,
                    y: 0,
                    w: DEVICE_WIDTH,
                    h: DEVICE_HEIGHT - padding_top,
                    color: 0xffffff,
                    text_size: 36,
                    align_h: align.CENTER_H,
                    align_v: align.CENTER_V,
                    text_style: text_style.NONE,
                    text: this.state.taskName
                });
                console.log(this.state.startDate);
                console.log(this.state.endDate);
                const DialogConfirmButton = createWidget(widget.BUTTON, {
                    x: padding,
                    y: DEVICE_HEIGHT - padding - 100,
                    w: DEVICE_WIDTH - padding * 2,
                    h: 60,
                    radius: 12,
                    normal_color: 0x666666,
                    press_color: 0x999999,
                    text: 'Ok',
                    click_func: (button_widget) => { this.sendData(); back(); }
                });
            };

            const showTimer = () => {
                const TimerProp = { ...TimerCountTEXT, text: String(this.state.timer).padStart(2, '0') + " : 00" };
                const TimerText = createWidget(widget.TEXT, TimerProp);

                const arc = createWidget(widget.ARC, TimerARC);
                const button0 = createWidget(widget.BUTTON, {
                    ...QuitButton,
                    click_func: () => {
                        back();
                    }
                });
                const button1 = createWidget(widget.BUTTON, {
                    ...DoneButton,
                    click_func: () => {
                        back();
                        this.state.endDate = new Date();
                        this.sendData();
                    }
                });

                // timer start
                this.state.startDate = new Date();
                const viewTimer = new CountdownTimer(parseFloat(this.state.timer));
                const WhenEndTimer = () => {
                    this.state.endDate = new Date();
                    clearAllWidget([TimerText, arc, button0, button1]);
                    showDialog();
                };
                viewTimer.start(TimerText, WhenEndTimer);
            };
        },
        onDestroy() {
            console.log("timer page onDestroy invoked");
        },
        sendData() {
            this.request({
                method: "POST_DATA",
                params: {
                    taskName: this.state.taskName,
                    startDate: this.state.startDate,
                    endDate: this.state.endDate,
                }
            })
                .then((data) => {
                    logger.log("receive data");
                })
                .catch((res) => { });
        }
    })
);

// setStatusBarVisible(false);

class CountdownTimer {
    constructor(initialMinutes) {
        this.timer = initialMinutes * 60; // 分を秒に変換
        this.isRunning = false;
        this.vibrator = new Vibrator();
        this.vibrator.setMode(VIBRATOR_SCENE_NOTIFICATION);
    }

    start(text, callback) {
        if (this.isRunning) return;
        this.isRunning = true;


        const tick = () => {
            if (this.timer <= 0) {
                this.vibrator.start();
                // once
                if (this.isRunning) {
                    this.isRunning = false;
                    callback();
                };
                return;
            }

            // 残り時間を計算
            this.timer--;

            // mm:ss形式で表示
            const minutes = Math.floor(this.timer / 60);
            const seconds = this.timer % 60;

            const formattedTime = `${String(minutes).padStart(2, '0')} : ${String(seconds).padStart(2, '0')}`;
            text.setProperty(prop.MORE, { text: formattedTime });
            // console.log(formattedTime);
        };

        const zeppTimer = new ZeppTimer(tick, 1000);
        zeppTimer.start();
    }

    stop() {
        this.isRunning = false;
    }
}