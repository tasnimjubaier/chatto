import ImageKit from "imagekit";
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

var publicKey = "public_+rL2s/vADCZ2JzHasIsIzhviuhw="
var privateKey = "private_bwpoGkut9xMA38xfN1kPU3tPLEU="


var imagekit = new ImageKit({
    publicKey,
    privateKey,
    urlEndpoint : "https://ik.imagekit.io/chatto"
});


export const uploadImage = (imagefile, fileName) => {
  return new Promise((resolve, reject) => {
    const basePath = path.join(path.resolve(path.resolve(__dirname, '..'), '..'), "src", "imagekit")
    const inputPath = path.join(basePath, "doll.jpg")
    const outputPath = path.join(basePath, "dollout.jpg")
    console.log(inputPath)
    const buffer = fs.readFileSync(inputPath);
    fs.writeFileSync(outputPath, buffer)

    imagekit.upload({
      file: buffer,
      fileName,
      extensions: [
        {
          name: "google-auto-tagging",
          maxTags: 5,
          minConfidence: 95,
        },
      ],
    })
    .then((response) => {
      console.log(response);
      resolve(JSON.stringify(response));
    })
    .catch((error) => {
      console.log(error);
      reject(JSON.stringify(error));
    });
  });
}


export const listImages = () => {
  return new Promise((resolve, reject) => {
    imagekit.listFiles({
      skip: 0,
      limit: 10,
    })
      .then((response) => {
        console.log(response);
        resolve(JSON.stringify(response));
      })
      .catch((error) => {
        console.log(error);
        reject(JSON.stringify(error));
      });
  });
};
  


export const getImage = (file) => {
  return new Promise((resolve, reject) => {
    imagekit.getFileDetails(file)
    .then(response => {
        console.log(response);
        resolve(JSON.stringify(response))
    }).catch(error => {
        console.log(error);
        reject(JSON.stringify(error))
    });
  });
}

export default imagekit