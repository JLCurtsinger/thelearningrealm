from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import os
import uuid
import youtube_dl
from video_translator import translate_video

app = Flask(__name__)
CORS(app)  # This enables CORS for all routes

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Route 1: File Upload-based Video Translation
@app.route('/translate-video', methods=['POST'])
def translate_video_endpoint():
    if 'file' not in request.files:
        return jsonify({"error": "No file part in the request"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No file selected"}), 400

    input_filename = os.path.join(UPLOAD_FOLDER, f"input_{uuid.uuid4()}.mp4")
    output_filename = os.path.join(UPLOAD_FOLDER, f"output_{uuid.uuid4()}.mp4")

    try:
        file.save(input_filename)
        translate_video(input_filename, output_filename)
        return send_file(output_filename, as_attachment=True, download_name="translated_video.mp4")

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    finally:
        if os.path.exists(input_filename):
            os.remove(input_filename)
        if os.path.exists(output_filename):
            os.remove(output_filename)

# Route 2: URL-Based Video Translation
@app.route("/translate-video-url", methods=["POST"])
def translate_video_url():
    data = request.json
    video_url = data.get("video_url")

    if not video_url:
        return jsonify({"error": "No video URL provided"}), 400

    input_video = os.path.join(UPLOAD_FOLDER, f"downloaded_{uuid.uuid4()}.mp4")
    output_video = os.path.join(UPLOAD_FOLDER, f"translated_{uuid.uuid4()}.mp4")

    try:
        # Download video from the URL
        ydl_opts = {
            'outtmpl': input_video,
            'format': 'bestvideo+bestaudio/best'
        }
        with youtube_dl.YoutubeDL(ydl_opts) as ydl:
            ydl.download([video_url])

        # Translate the video
        translate_video(input_video, output_video)

        return send_file(output_video, as_attachment=True, download_name="translated_video.mp4")

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    finally:
        if os.path.exists(input_video):
            os.remove(input_video)
        if os.path.exists(output_video):
            os.remove(output_video)

# Route 3: route for the root URL
@app.route('/')
def index():
    return "Welcome to the Video Translator API!"

if __name__ == '__main__':
    app.run(debug=True, port=5000)
