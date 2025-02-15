from flask import Flask, request, jsonify, send_file
from flask_cors import CORS, cross_origin
import os
import uuid
import youtube_dl
from video_translator import translate_video

app = Flask(__name__)
CORS(app, 
     resources={r"/*": {
         "origins": ["https://lessonlink.org"],
         "methods": ["GET", "POST", "OPTIONS"],
         "allow_headers": ["Content-Type", "Authorization"],
         "expose_headers": ["Content-Type", "Content-Disposition"],
         "supports_credentials": True,
         "max_age": 600  # Cache preflight requests for 10 minutes
     }})

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Route 1: File Upload-based Video Translation
@app.route('/translate-video', methods=['POST'])
@cross_origin()
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
@app.route("/translate-video-url", methods=["POST", "OPTIONS"], strict_slashes=False)
@cross_origin(origin="https://lessonlink.org")
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

if __name__ == '__main__':
    app.run(debug=True, port=5000)