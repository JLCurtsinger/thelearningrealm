# pip install moviepy SpeechRecognition googletrans==4.0.0-rc1 pydub

import moviepy.editor as mp
import speech_recognition as sr
from googletrans import Translator
from pydub import AudioSegment
import os

# Step 1: Extract audio from the video
def extract_audio(video_path, audio_path):
   video = mp.VideoFileClip(video_path)
   video.audio.write_audiofile(audio_path)
   print(f"Audio extracted and saved to {audio_path}")

# Step 2: Transcribe audio to text
def transcribe_audio(audio_path):
   recognizer = sr.Recognizer()
   with sr.AudioFile(audio_path) as source:
       audio = recognizer.record(source)
   try:
       text = recognizer.recognize_google(audio)
       print("Transcription successful.")
       return text
   except sr.UnknownValueError:
       print("Google Speech Recognition could not understand the audio.")
       return ""
   except sr.RequestError:
       print("Could not request results from Google Speech Recognition service.")
       return ""

# Step 3: Translate text from English to Spanish
def translate_text(text, dest_language='es'):
   translator = Translator()
   translated = translator.translate(text, dest=dest_language)
   return translated.text

# Step 4: Generate Spanish subtitles
def generate_subtitles(translated_text, subtitle_path):
   with open(subtitle_path, 'w', encoding='utf-8') as f:
       f.write("1\n00:00:00,000 --> 00:00:05,000\n")  # Example timestamp
       f.write(translated_text)
   print(f"Subtitles saved to {subtitle_path}")

# Step 5: Overlay subtitles onto the video
def add_subtitles_to_video(video_path, subtitle_path, output_video_path):
    video = mp.VideoFileClip(video_path)
    subtitles_text = open(subtitle_path, 'r', encoding='utf-8').read()
    subtitles = mp.TextClip(
        subtitles_text,
        fontsize=24,
        color='white',
        bg_color='black',
        method='caption',
        size=(video.w - 100, None)
    ).set_position(("center", "bottom")).set_duration(video.duration)
    final_video = mp.CompositeVideoClip([video, subtitles])
    
    # Restore the original audio
    final_video = final_video.set_audio(video.audio)
    
    # Write out with audio_codec to keep the audio
    final_video.write_videofile(
        output_video_path,
        codec='libx264',
        audio_codec='aac'
    )
    print(f"Video with subtitles saved to {output_video_path}")

# Main function
def translate_video(video_path, output_video_path):
   # Step 1: Extract audio
   audio_path = "extracted_audio.wav"
   extract_audio(video_path, audio_path)

   # Step 2: Transcribe audio
   transcribed_text = transcribe_audio(audio_path)
   if not transcribed_text:
       print("Transcription failed. Exiting.")
       return

   # Step 3: Translate text
   translated_text = translate_text(transcribed_text, dest_language='es')
   print(f"Translated text: {translated_text}")

   # Step 4: Generate subtitles
   subtitle_path = "spanish_subtitles.srt"
   generate_subtitles(translated_text, subtitle_path)

   # Step 5: Overlay subtitles onto the video
   add_subtitles_to_video(video_path, subtitle_path, output_video_path)

   # Clean up temporary files
   os.remove(audio_path)
   os.remove(subtitle_path)

  #now called by app.py 
# # Run the script
# if __name__ == "__main__":
#    input_video = "/Users/justincurtsinger/Desktop/test_video.mp4"  # Replace with your video file path
#    output_video = "/Users/justincurtsinger/Desktop/output_video_with_subtitles.mp4"  # Output video file path
#    translate_video(input_video, output_video)