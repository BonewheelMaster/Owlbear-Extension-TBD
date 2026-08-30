import OBR from "@owlbear-rodeo/sdk";

const message : string = "Hello World! V4";

console.log(message);

OBR.onReady(() => {
    OBR.notification.show(message);
})
