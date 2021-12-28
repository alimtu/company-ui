import React, { useState, useRef, useEffect, useCallback } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { Row, Col, Button, Spin, message } from "antd";
import Words from "../../../../resources/words";
import imageCompression from "browser-image-compression";

const CropImage = ({
  src,
  parentCallback,
  setShowCropSection,
  setShowCropedImage,
}) => {
  const imgRef = useRef(null);
  const [upImg, setUpImg] = useState();
  const [inProgress, setInProgress] = useState(false);
  const previewCanvasRef = useRef(null);
  const [completedCrop, setCompletedCrop] = useState(null);

  const [crop, setCrop] = useState({
    unit: "px",
    width: 100,
    height: 100,
    x: 100,
    y: 30,
    aspect: 1 / 1,
  });

  const onLoad = useCallback(
    (img) => {
      imgRef.current = img;
      message.info(Words.please_wait_for_load_image, 1);
    },
    [src]
  );

  useEffect(() => {
    if (src) {
      const reader = new FileReader();
      reader.addEventListener("load", () => setUpImg(reader.result));
      reader.readAsDataURL(src);
    }

    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return;
    }

    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const crop = completedCrop;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext("2d");
    const pixelRatio = window.devicePixelRatio;

    canvas.width = crop.width * pixelRatio * scaleX;
    canvas.height = crop.height * pixelRatio * scaleY;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "low";

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    );
  }, [src, completedCrop]);

  const compressImage = async (file, useWebWorker) => {
    var options = {
      maxSizeMB: 0.13, //correct is 0.15 but For Package tolerance that is 0.13
      maxWidthOrHeight: 1024,
      useWebWorker,
    };
    try {
      setInProgress(true);
      const output = await imageCompression(file, options);
      setInProgress(false);
      return output;
    } catch (error) {
      setInProgress(false);
      message.error(error);
    }
  };

  const onTrigger = (file) => {
    parentCallback({ PicFileName: file });
  };

  const handleFileList = async (canvas, crop, src) => {
    if (!crop || !canvas) {
      return;
    }
    await canvas.toBlob(
      async (blob) => {
        var file = new File([blob], src.name, {
          type: "image/png",
        });

        if (file.size > 153600) {
          let compressFile = await compressImage(file, true);
          compressFile = new File([compressFile], src.name, {
            type: "image/png",
          });
          if (compressFile.size > 153600) {
            message.error(Words.limit_upload_file_size);
          } else {
            onTrigger(compressFile);
            setShowCropSection(false);
            setShowCropedImage(true);
          }
          // return message.error(Words.limit_upload_file_size);
        } else {
          onTrigger(file);
          setShowCropSection(false);
          setShowCropedImage(true);
        }
      },
      "image/png",
      1
    );
  };

  return (
    <Spin spinning={inProgress} tip={Words.please_wait}>
      <Row justify="center" align="middle" gutter={[20, 10]}>
        <Col md={12} xs={24}>
          {" "}
          <ReactCrop
            src={upImg}
            onImageLoaded={onLoad}
            crop={crop}
            onChange={(c) => setCrop(c)}
            onComplete={(c) => setCompletedCrop(c)}
            style={{ borderRadius: "10px" }}
            ruleOfThirds={true}
          />
        </Col>
        <Col
          md={12}
          xs={24}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <canvas
            ref={previewCanvasRef}
            style={{
              width: Math.round(completedCrop?.width ?? 0),
              height: Math.round(completedCrop?.height ?? 0),
              borderRadius: "10px",
            }}
          />
        </Col>
        <Col>
          <Button
            type="primary"
            disabled={!completedCrop?.width || !completedCrop?.height}
            onClick={async () =>
              await handleFileList(previewCanvasRef.current, completedCrop, src)
            }
            style={{ backgroundColor: "#025DF4" }}
          >
            {Words.submit_crop}
          </Button>
        </Col>
      </Row>
    </Spin>
  );
};

export default CropImage;
