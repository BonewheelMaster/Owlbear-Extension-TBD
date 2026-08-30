import OBR from "@owlbear-rodeo/sdk";

const message : string = "Hello World! V4";

console.log(message);

var counter : number = 0;

const menuItem = {
    id: "1337",
    icons: [{icon: "https://bonewheelmaster.github.io/Owlbear-Extension-TBD/icon.png", label: "Test"}],
    onClick: (() => {counter++; OBR.notification.show(counter.toString());}),
};

OBR.onReady(() => {
    OBR.contextMenu.create(menuItem);
})
