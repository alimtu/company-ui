import React, { useState, useRef, useEffect, useCallback } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { Row, Col, Button, message } from "antd";
import Words from "../../../../resources/words";

const CropImage = ({ src, parentCallback }) => {
  const imgRef = useRef(null);
  const [upImg, setUpImg] = useState();
  const previewCanvasRef = useRef(null);
  const [crop, setCrop] = useState({
    unit: "%",
    width: 40,
    height: 50,
    x: 25,
    y: 25,
    aspect: 1 / 1,
  });
  const [completedCrop, setCompletedCrop] = useState(null);

  const onLoad = useCallback((img) => {
    imgRef.current = img;
  }, []);

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
    ctx.imageSmoothingQuality = "high";

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
  }, [completedCrop]);

  const onTrigger = (file) => {
    parentCallback({ PicFileName: file });
  };

  const handleFileList = (canvas, crop, src) => {
    if (!crop || !canvas) {
      return;
    }
    canvas.toBlob(
      (blob) => {
        var file = new File([blob], src.name, {
          type: "image/png",
        });

        if (file.size > 150000) {
          return message.error(Words.limit_upload_file_size);
        } else {
          onTrigger(file);
        }
      },
      "image/png",
      1
    );
  };

  return (
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
          onClick={() =>
            handleFileList(previewCanvasRef.current, completedCrop, src)
          }
          style={{ backgroundColor: "#025DF4" }}
        >
          {Words.submit_crop}
        </Button>
      </Col>
    </Row>
  );
};

export default CropImage;
