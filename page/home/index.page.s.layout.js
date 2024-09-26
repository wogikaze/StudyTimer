import { getDeviceInfo } from '@zos/device';
import { getText } from '@zos/i18n';
import * as hmUI from '@zos/ui';
import { px } from '@zos/utils';

export const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = getDeviceInfo();

export const TITLE_TEXT_STYLE = {
  text: getText('todoList'),
  x: px(42),
  y: px(65),
  w: DEVICE_WIDTH - px(42 * 2),
  h: px(50),
  color: 0xffffff,
  text_size: 36,
  align_h: hmUI.align.CENTER_H,
  text_style: hmUI.text_style.WRAP
};

export const TIPS_TEXT_STYLE = {
  text: getText('noData'),
  x: px(15),
  y: px(120),
  w: DEVICE_WIDTH - px(15 * 2),
  h: DEVICE_HEIGHT - px(120),
  color: 0xffffff,
  text_size: px(32),
  align_h: hmUI.align.CENTER_H,
  align_v: hmUI.align.CENTER_V,
  text_style: hmUI.text_style.WRAP
};

export const SCROLL_LIST = {
  item_height: px(60),
  item_space: px(10),
  item_config: [
    {
      type_id: 1,
      item_bg_color: 0x333333,
      item_bg_radius: px(25),
      text_view: [
        {
          x: px(80),
          y: px(0),
          w: px(360),
          h: px(60),
          key: 'name',
          color: 0xffff00,
          text_size: px(36),
          align_h: hmUI.align.LEFT
        }
      ],
      text_view_count: 1,
      image_view: [
        {
          x: DEVICE_WIDTH - px(10),
          y: px(16),
          w: px(44),
          h: px(44),
          key: 'img_src',
          action: true
        }
      ],
      image_view_count: 1,
      item_height: px(60)
    },
    {
      type_id: 2,
      item_bg_color: 0x333333,
      item_bg_radius: px(25),
      text_view: [
        {
          x: px(80),
          y: px(0),
          w: px(360),
          h: px(60),
          key: 'name',
          color: 0xff0000,
          text_size: px(36),
          align_h: hmUI.align.LEFT
        }
      ],
      text_view_count: 1,
      image_view: [
        {
          x: DEVICE_WIDTH - px(10),
          y: px(16),
          w: px(44),
          h: px(44),
          key: 'img_src',
          action: true,
          auto_scale:true
        }
      ],
      image_view_count: 1,
      item_height: px(120)
    }
  ],
  item_config_count: 2,
  x: px(10),
  y: px(65),
  h: DEVICE_HEIGHT - px(10) * 2 - 65,
  w: DEVICE_WIDTH - px(10) * 2
};
