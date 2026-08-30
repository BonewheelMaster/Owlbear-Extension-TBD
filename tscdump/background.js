import OBR from "@owlbear-rodeo/sdk";
const message = "Hello World! V4";
console.log(message);
var counter = 0;
// TODO change below to correct name
const menuItem = {
    id: "Owlbear-Extension-TBD/io.github.bonewheelmaster",
    icons: [{ icon: "https://bonewheelmaster.github.io/Owlbear-Extension-TBD/icon.png", label: "Test" }],
    onClick: (() => { counter++; OBR.notification.show(counter.toString()); }),
};
OBR.onReady(() => {
    OBR.contextMenu.create(menuItem);
});
