from flask import Flask, jsonify, Response
import cv2
from inference.models.utils import get_roboflow_model
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

model_name = "gender-classification-3"
model_version = "1"

model = get_roboflow_model(
    model_id=f"{model_name}/{model_version}",
    api_key="tpXl0YC2sEeQpgKUfNO6"
)

@app.route('/video_feed')
def video_feed():
    cap = cv2.VideoCapture(0)

    def generate_frames():
        while True:
            # Capture frame-by-frame
            ret, frame = cap.read()

            if not ret:
                break

            # Run inference on the frame
            results = model.infer(image=frame, confidence=0.7, iou_threshold=0.7)

            # Draw bounding boxes and labels on the frame
            if results[0]:
                for prediction in results[0].predictions:
                    x, y, w, h = map(int, [prediction.x, prediction.y, prediction.width, prediction.height])
                    x0, y0 = x - w // 2, y - h // 2
                    x1, y1 = x + w // 2, y + h // 2
                    cv2.rectangle(frame, (x0, y0), (x1, y1), (255, 255, 0), 2)
                    cv2.putText(frame, prediction.class_name, (x0, y0 - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (255, 255, 255), 2)

            # Encode the frame as JPEG
            ret, buffer = cv2.imencode('.jpg', frame)
            frame = buffer.tobytes()

            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)