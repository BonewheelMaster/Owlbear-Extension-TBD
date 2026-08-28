class AssetsApi {
    messageBus;
    constructor(messageBus) {
        this.messageBus = messageBus;
    }
    async uploadImages(images, typeHint) {
        await this.messageBus.sendAsync("OBR_ASSETS_UPLOAD_IMAGES", {
            images,
            typeHint,
        });
    }
    async uploadScenes(scenes, disableShowScenes) {
        await this.messageBus.sendAsync("OBR_ASSETS_UPLOAD_SCENES", {
            scenes,
            disableShowScenes,
        });
    }
    async downloadImages(multiple, defaultSearch, typeHint) {
        const { images } = await this.messageBus.sendAsync("OBR_ASSETS_DOWNLOAD_IMAGES", { multiple, defaultSearch, typeHint }, -1);
        return images;
    }
    async downloadScenes(multiple, defaultSearch) {
        const { scenes } = await this.messageBus.sendAsync("OBR_ASSETS_DOWNLOAD_SCENES", { multiple, defaultSearch }, -1);
        return scenes;
    }
}
export default AssetsApi;
