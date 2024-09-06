from flask import Flask, Response
import cv2
from inference.models.utils import get_roboflow_model
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Roboflow model details
model_name = "gender-classification-3"
model_version = "1"

# Load the Roboflow model
model = get_roboflow_model(
    model_id=f"{model_name}/{model_version}",
    api_key="tpXl0YC2sEeQpgKUfNO6"
)

# Function to check if two boxes overlap
def overlap(box1, box2):
    x0_1, y0_1, x1_1, y1_1 = box1
    x0_2, y0_2, x1_2, y1_2 = box2

    # Check if boxes do not overlap
    if x1_1 < x0_2 or x1_2 < x0_1 or y1_1 < y0_2 or y1_2 < y0_1:
        return False
    return True

@app.route('/video_feed')
def video_feed():
    cap = cv2.VideoCapture("women-safety/src/assets/testing.mov")

    def generate_frames():
        frame_count = 0  # Initialize frame counter
        alert_frame_count = 0  # Counter to track frames since the last alert

        while True:
            ret, frame = cap.read()
            if not ret:
                break

            frame_count += 1
            alert_frame_count += 1

            frame = cv2.resize(frame, (640, 480))

            # Run inference on the frame
            results = model.infer(image=frame, confidence=0.7, iou_threshold=0.7)

            # Initialize counts for the current frame
            men_count = 0
            women_count = 0

            # To store detected bounding boxes in this frame
            detected_men_boxes = []
            detected_women_boxes = []

            # Process the results
            if results[0]:
                for prediction in results[0].predictions:
                    x, y, w, h = map(int, [prediction.x, prediction.y, prediction.width, prediction.height])
                    x0, y0 = x - w // 2, y - h // 2
                    x1, y1 = x + w // 2, y + h // 2
                    bounding_box = (x0, y0, x1, y1)

                    # Check if the detection is a man or a woman
                    if prediction.class_name == "MEN":
                        # Only count if no significant overlap with previous men's boxes
                        if not any(overlap(bounding_box, box) for box in detected_men_boxes):
                            men_count += 1
                            detected_men_boxes.append(bounding_box)

                        cv2.putText(frame, "Man", (x0, y0 - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (255, 255, 255), 2)
                        cv2.rectangle(frame, (x0, y0), (x1, y1), (255, 0, 0), 2)

                    elif prediction.class_name == "WOMEN":
                        # Only count if no significant overlap with previous women's boxes
                        if not any(overlap(bounding_box, box) for box in detected_women_boxes):
                            women_count += 1
                            detected_women_boxes.append(bounding_box)

                        cv2.putText(frame, "Woman", (x0, y0 - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (255, 255, 255), 2)
                        cv2.rectangle(frame, (x0, y0), (x1, y1), (192, 15, 252), 2)

            cv2.putText(frame, f"Men Count: {men_count}", (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)
            cv2.putText(frame, f"Women Count: {women_count}", (10, 60), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)

            if women_count == 1 and men_count > 2:
                if alert_frame_count >= 40:
                    cv2.putText(frame, "ALERT: LONE WOMAN", (10, 90), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)  # Red color

                    screenshot_filename = f"lone_woman_{frame_count}.jpg"
                    cv2.imwrite(screenshot_filename, frame)

                    alert_frame_count = 0

            # Encode the frame as JPEG
            ret, buffer = cv2.imencode('.jpg', frame)
            frame = buffer.tobytes()

            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
