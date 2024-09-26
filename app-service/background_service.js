import * as notificationMgr from "@zos/notification";
import { Time } from '@zos/sensor';
import { BasePage } from "@zeppos/zml/base-page";

const time_sensor = new Time();
const debugging = false;
const end_point = "https://jsonplaceholder.typicode.com/todos/1";

const storage = getApp().globals.storage;

function sendMetrics(vm) {
  const start_time = new Date().getTime();

  console.log("Sending request");

  vm.httpRequest({
    method: 'GET',
    url: end_point,
  })
    .then((result) => {
      const response = JSON.stringify(result);
      const end_time = new Date().getTime();
      const duration = end_time - start_time;

      console.log(`Status: ${response}`);
      console.log(`Duration: ${duration}ms`);

      // add duration into response
      // making sure BG service works
      // even if the app-side component fails
      result.duration = duration;

      storage.setKey("response", JSON.stringify(result));

      if (debugging) {
        notificationMgr.notify({
          title: "Agent Service",
          content: "Request status: " + response + " in " + duration + "ms",
          actions: []
        });
      }
    })
    .catch((error) => {
      const status = JSON.stringify(error);
      const end_time = new Date().getTime();
      const duration = end_time - start_time;

      console.log(`ERR: ${status} in ${duration}ms`);

      if (debugging) {
        notificationMgr.notify({
          title: "Agent Service",
          content: "Request error: " + status + " in " + duration + "ms",
          actions: []
        });
      }
    });
}

AppService(
  BasePage({
    onInit() {
      console.log("Timer service INIT");

      time_sensor.onPerMinute(() => {
        console.log("Timer service TICK");

        sendMetrics(this);
      });
    },
    onDestroy() {
      console.log("onDestroy");
    },
  })
);
