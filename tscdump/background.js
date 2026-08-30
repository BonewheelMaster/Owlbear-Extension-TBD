import OBR from "@owlbear-rodeo/sdk";
const message = "Hello World! V4";
console.log(message);
const menuItem = {
    id: "1337",
    icons: [{ icon: "https://bonewheelmaster.github.io/Owlbear-Extension-TBD/icon.png", label: "Test" }],
    onClick: (() => { }),
};
OBR.onReady(() => {
    OBR.contextMenu.create(menuItem);
});
