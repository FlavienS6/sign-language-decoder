import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import styled from 'styled-components';
import * as tf from '@tensorflow/tfjs';

const HeaderContainer = styled.div`
  background-color: #333;
  color: #fff;
  padding: 10px;
  text-align: center;
`;

const HeaderTitle = styled.h1`
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const HeaderSubtitle = styled.p`
  font-size: 18px;
  margin: 0;
`;

const WebcamContainer = styled.div`
  position: relative;
`;

const PageContainer = styled.div`
  background-color: #333;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const WebcamPage = () => {
  const webcamRef = useRef(null);
  const [prediction, setPrediction] = useState(null);
  const [boxData, setBoxData] = useState([]);
  const [model, setModel] = useState(null);

  useEffect(() => {
    const loadModel = async () => {
      const loadedModel = await tf.loadGraphModel("/model.json");
      setModel(loadedModel);
    };

    loadModel();
  }, []);

  const inputWidth = 640;
  const inputHeight = 480;

  const sendFramesToModel = async () => {
    if (webcamRef.current && webcamRef.current.video.readyState === 4 && model) {
      const video = webcamRef.current.video;
      const videoWidth = video.videoWidth;
      const videoHeight = video.videoHeight;

      if (videoWidth > 0 && videoHeight > 0) {
        const imageTensor = tf.browser.fromPixels(video)
          .resizeBilinear([224, 224])
          .toFloat()
          .div(tf.scalar(255.0))
          .expandDims();
        try {
          const predictions = await model.predict(imageTensor);

          const logits = predictions.dataSync();
          const maxval = Math.max(logits)
          const maxi = logits.indexOf(maxval);
          /*
          const detectionBoxes = predictions[0].dataSync();
          const detectionClassEntities = predictions[1].dataSync();
          const detectionClassNames = predictions[2].dataSync();
          const detectionClassLabels = predictions[3].dataSync();
          const detectionScores = predictions[4].dataSync();
          */
         const detectionBoxes = [[.15, .24, .34, .56], ];
         const detectionClassNames = [maxi];
         const detectionScores=[maxval];
          const boundingBoxes = detectionBoxes.map((box, i) => {
            const [ymin, xmin, ymax, xmax] = box;

            return {
              box: [
                ymin * videoHeight,
                xmin * videoWidth,
                ymax * videoHeight,
                xmax * videoWidth,
              ],
              className: detectionClassNames[i],
              score: detectionScores[i],
            };
          });

          setBoxData(boundingBoxes);
        } catch (error) {
          console.error('Error predicting:', error);
        }

        imageTensor.dispose();
      }

      requestAnimationFrame(sendFramesToModel);
    }
  };

  useEffect(() => {
    sendFramesToModel();
  }, [model]);

  const renderBoundingBoxes = () => {
    if (!boxData.length) return null;

    return (
      <div>
        {boxData.map((data, index) => (
          <div
            key={index}
            style={{
              position: 'absolute',
              top: data.box[0],
              left: data.box[1],
              width: data.box[3] - data.box[1],
              height: data.box[2] - data.box[0],
              border: '2px solid red',
              boxSizing: 'border-box',
              pointerEvents: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '12px',
              fontWeight: 'bold',
            }}
          >
            {data.className} ({(data.score * 100).toFixed(2)}%)
          </div>
        ))}
      </div>
    );
  };

  return (
    <PageContainer>
      <HeaderContainer>
          <HeaderTitle>Sign Language Recognition</HeaderTitle>
          <HeaderSubtitle>Bridging the communication gap with technology</HeaderSubtitle>
      </HeaderContainer>
      <WebcamContainer>
        <Webcam
          ref={webcamRef}
          style={{
            position: 'absolute',
            marginLeft: 'auto',
            marginRight: 'auto',
            left: 0,
            right: 0,
            textAlign: 'center',
            zIndex: 9,
            width: inputWidth,
            height: inputHeight,
          }}
        />
        {renderBoundingBoxes()}
      </WebcamContainer>
    </PageContainer>

  );
};

export default WebcamPage;