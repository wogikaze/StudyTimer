import * as hmUI from '@zos/ui';
// import { getText } from '@zos/i18n'
import { getDeviceInfo } from '@zos/device';
import { align, text_style } from '@zos/ui';
import { px } from '@zos/utils';
export const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = getDeviceInfo();

export const padding_top = 65;
export const SampleText = {
    x: px(15),
    y: px(120),
    w: DEVICE_WIDTH - px(15 * 2),
    h: DEVICE_HEIGHT - px(120),
    color: 0xffffff,
    text_size: 36,
    align_h: hmUI.align.CENTER_H,
    align_v: hmUI.align.CENTER_V,
    text_style: hmUI.text_style.NONE,
    text: 'HELLO ZEPPOS'
};

export const SelectTimerARC = {
    x: 0,
    y: 0,
    w: 150,
    h: 150,
    start_angle: -90,
    end_angle: 270,
    color: 0xfd6852,
    line_width: 10
};
export const TimerTEXT = {
    x: 0,
    y: 0,
    w: 150,
    h: 150,
    color: 0xffffff,
    text_size: 36,
    align_h: align.CENTER_H,
    align_v: align.CENTER_V,
    text_style: text_style.NONE,
    text: 'HELLO'
};

export const TimerCountTEXT = {
    x: 0,
    y: 0,
    w: DEVICE_WIDTH,
    h: DEVICE_HEIGHT,
    color: 0xffffff,
    text_size: 60,
    align_h: align.CENTER_H,
    align_v: align.CENTER_V,
    text_style: text_style.NONE,
    text: 'HELLO'
};
const padding = 20;
const arc_size = DEVICE_HEIGHT - padding_top - 2 * padding;
const margin_left = (DEVICE_WIDTH - arc_size) / 2;
export const TimerARC = {
    x: margin_left,
    y: padding_top + padding,
    w: arc_size,
    h: arc_size,
    start_angle: -90,
    end_angle: 270,
    color: 0xfd6852,
    line_width: 10
};
const buttun_size = 60;
export const QuitButton = {
    x: DEVICE_WIDTH / 2 - buttun_size - padding,
    y: padding_top + 3 * padding + 0.5 * arc_size,
    w: buttun_size,
    h: buttun_size,
    radius: buttun_size / 2,
    normal_src: 'close_16dp_FFFFFF_FILL1_wght400_GRAD-25_opsz20.png',
    press_src: 'close_16dp_3C3C3C_FILL1_wght400_GRAD-25_opsz20.png',
};
export const DoneButton = {
    x: DEVICE_WIDTH / 2 + padding,
    y: padding_top + 3 * padding + 0.5 * arc_size,
    w: buttun_size,
    h: buttun_size,
    radius: buttun_size / 2,
    normal_src: 'check_16dp_FFFFFF_FILL1_wght400_GRAD-25_opsz20.png',
    press_src: 'check_16dp_3C3C3C_FILL1_wght400_GRAD-25_opsz20.png',
};