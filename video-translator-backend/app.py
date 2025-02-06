from flask import Flask, request, jsonify, send_file
import os
import uuid
from video_translator import translate_video

app = Flask(__name__)

@app.route('/translate-video', methods=['POST'])
def translate_video_endpoint():
    # Ensure a file is included in the POST request
    if 'file' not in request.files:
        return jsonify({"error": "No file part in the request"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No file selected"}), 400

    # Generate random file names to avoid collisions
    input_filename = f"input_{uuid.uuid4()}.mp4"
    output_filename = f"output_{uuid.uuid4()}.mp4"

    try:
        # Save the user's uploaded file
        file.save(input_filename)

        # Run your Python script to translate the video
        translate_video(input_filename, output_filename)

        # Return the processed video to the client
        return send_file(
            output_filename,
            as_attachment=True,
            download_name="translated_video.mp4"
        )

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    finally:
        # Clean up leftover files
        if os.path.exists(input_filename):
            os.remove(input_filename)
        if os.path.exists(output_filename):
            os.remove(output_filename)

if __name__ == '__main__':
    # For local testing in some environments
    app.run(debug=True, port=5000)