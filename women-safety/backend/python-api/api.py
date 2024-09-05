from inference.models.utils import get_roboflow_model
import cv2

# Roboflow model
model_name = "gender-classification-3"
model_version = "1"

# Open the default camera (usually the built-in webcam)
cap = cv2.VideoCapture(0)

# Check if the webcam is opened successfully
if not cap.isOpened():
    print("Error: Could not open camera.")
    exit()

# Get Roboflow face model (this will fetch the model from Roboflow)
model = get_roboflow_model(
    model_id="{}/{}".format(model_name, model_version),
    #Replace ROBOFLOW_API_KEY with your Roboflow API Key
    api_key="tpXl0YC2sEeQpgKUfNO6"
)

while True:
    # Capture frame-by-frame
    ret, frame = cap.read()

    # If the frame was read successfully, display it
    if ret:
        # Run inference on the frame
        results = model.infer(image=frame,
                        confidence=0.7,
                        iou_threshold=0.7)

        # Plot image with face bounding box (using opencv)
        if results[0]:
            for prediction in results[0].predictions:
                x, y, w, h = map(int, [prediction.x, prediction.y, prediction.width, prediction.height])
                # Calculate the top-left and bottom-right corners of the bounding box
                x0, y0 = x - w // 2, y - h // 2
                x1, y1 = x + w // 2, y + h // 2

                # Draw the rectangle
                cv2.rectangle(frame, (x0, y0), (x1, y1), (255, 255, 0), 2)
                # Optionally, put text above the bounding box
                cv2.putText(frame, prediction.class_name, (x0, y0 - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (255, 255, 255), 2)

        # Display the resulting frame
        cv2.imshow('Webcam Feed', frame)

        # Press 'q' to quit the video window
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break
    else:
        print("Error: Could not read frame.")
        break

# When everything is done, release the capture and destroy all windows
cap.release()
cv2.destroyAllWindows()