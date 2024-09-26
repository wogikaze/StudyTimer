import { BaseSideService } from '@zeppos/zml/base-side';
import { settingsLib } from '@zeppos/zml/base-side';

import { DEFAULT_TODO_LIST } from './../utils/constants';
const webhook_url = "https://discord.com/api/webhooks/1287816092814807062/tVIpkNpt8ypILT9sUxiQybVX2YXPv8hoQ977IYPgRL4-yCG85-BgbTG0WvL1EH-DswjQ";

function getTodoList() {
  return settingsLib.getItem('todoList')
    ? JSON.parse(settingsLib.getItem('todoList'))
    : [...DEFAULT_TODO_LIST];
}
async function postData(param) {
  const requestBody = {
    content: JSON.stringify(param),
    username: "wogikaze"
  };
  const response = await fetch({
    url: webhook_url,
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  }).then((response) => {
    console.log(response.status);
    console.log(response.statusText);
  })
    .catch((error) => {
      console.error("Error sending webhook:", error);
    });;
}
AppSideService(
  BaseSideService({
    onInit() { },
    onRequest(req, res) {
      if (req.method === 'GET_TODO_LIST') {
        res(null, {
          result: getTodoList()
        });
      } else if (req.method === 'ADD') {
        // 这里补充一个
        const todoList = getTodoList();
        const newTodoList = [...todoList, String(Math.floor(Math.random() * 100))];
        settingsLib.setItem('todoList', JSON.stringify(newTodoList));

        res(null, {
          result: newTodoList
        });
      } else if (req.method === 'DELETE') {
        const { index } = req.params;
        const todoList = getTodoList();
        const newTodoList = todoList.filter((_, i) => i !== index);
        settingsLib.setItem('todoList', JSON.stringify(newTodoList));

        res(null, {
          result: newTodoList
        });
      } else if (req.method === "POST_DATA") {
        postData(req.params);
      }
    },
    onSettingsChange({ key, newValue, oldValue }) {
      this.call({
        result: getTodoList()
      });
    },
    onRun() { },
    onDestroy() { }
  })
);
