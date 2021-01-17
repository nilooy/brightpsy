import { WidgetLoader, Widget } from "react-cloudinary-upload-widget";

const ImgUploader = ({ successCallBack, failureCallBack }) => {
  return (
    <>
      <WidgetLoader /> // add to top of file. Only use once.
      <Widget
        sources={["local", "camera"]} // set the sources available for uploading -> by default
        // all sources are available. More information on their use can be found at
        // https://cloudinary.com/documentation/upload_widget#the_sources_parameter
        // add source keys
        // and ID's as an object. More information on their use can be found at
        // https://cloudinary.com/documentation/upload_widget#the_sources_parameter
        resourceType={"image"} // optionally set with 'auto', 'image', 'video' or 'raw' -> default = 'auto'
        cloudName="dgt5wymx5" // your cloudinary account cloud name.
        // Located on https://cloudinary.com/console/
        uploadPreset={"oxrhv0hf"} // check that an upload preset exists and check mode is signed or unisgned
        buttonText={"Open"} // default 'Upload Files'
        style={{
          color: "white",
          border: "none",
          width: "120px",
          backgroundColor: "green",
          borderRadius: "4px",
          height: "25px",
        }} // inline styling only or style id='cloudinary_upload_button'
        folder={"user"} // set cloudinary folder name to send file
        cropping={false} // set ability to crop images -> default = true
        onSuccess={successCallBack} // add success callback -> returns result
        onFailure={failureCallBack} // add failure callback -> returns 'response.error' + 'response.result'
        logging={false} // logs will be provided for success and failure messages,
        // set to false for production -> default = true
        customPublicId={"sample"} // set a specific custom public_id.
        // To use the file name as the public_id use 'use_filename={true}' parameter
        eager={"w_400,h_300,c_pad|w_260,h_200,c_crop"} // add eager transformations -> deafult = null
        use_filename={false} // tell Cloudinary to use the original name of the uploaded
        // endpoint for generating a signature -> check cloudinary docs and SDK's for signing uploads
        apiKey={"751893586821183"} // cloudinary API key -> number format
        accepts={"application/json"} // for signed uploads only -> default = 'application/json'
        contentType={"application/json"} // for signed uploads only -> default = 'application/json'
        withCredentials={true} // default = true -> check axios documentation for more information
        unique_filename={true} // setting it to false, you can tell Cloudinary not to attempt to make
        // the Public ID unique, and just use the normalized file name -> default = true
      />
    </>
  );
};

export default ImgUploader;
