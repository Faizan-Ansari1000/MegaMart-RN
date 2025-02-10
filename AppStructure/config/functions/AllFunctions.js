import { launchCamera } from "react-native-image-picker"

export const openCamera = () => {
    const result = launchCamera({
        mediaType: 'mixed'
    })
    console.log(result)
}

