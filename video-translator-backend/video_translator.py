# pip install moviepy SpeechRecognition deep-translator pydub

import moviepy.editor as mp
import speech_recognition as sr
from deep_translator import GoogleTranslator
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
    # Use the passed dest_language parameter here
    translator = GoogleTranslator(source='auto', target=dest_language)
    return translator.translate(text)

# Step 4: Generate Spanish subtitles
def generate_subtitles(translated_text, subtitle_path):
    with open(subtitle_path, 'w', encoding='utf-8') as f:
        # Example subtitle timing; adjust as needed for your use-case
        f.write("1\n00:00

Below is a corrected version of your **video_translator.py** file with the necessary fixes:

1. **Removed the duplicate definition of `translate_text` inside `translate_video`.**  
2. **Fixed the variable name error in `translate_text` (changed `target=target_language` to `target=dest_language`).**

Review the updated code below:

---

```python
# pip install moviepy SpeechRecognition deep-translator pydub

import moviepy.editor as mp
import speech_recognition as sr
from deep_translator import GoogleTranslator
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
    translator = GoogleTranslator(source='auto', target=dest_language)
    return translator.translate(text)

# Step 4: Generate Spanish subtitles
def generate_subtitles(translated_text, subtitle_path):
    with open(subtitle_path, 'w', encoding='utf-8') as f:
        # Example subtitle timing; adjust as needed for your use-case
        f.write("1\n00:00:00,000 --> 00:00:05,000\n")
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

# now called by app.py 
# Uncomment the block below if you wish to test this module independently.
# if __name__ == "__main__":
#    input_video = "/Users/justincurtsinger/Desktop/test_video.mp4"  # Replace with your video file path
#    output_video = "/Users/justincurtsinger/Desktop/output_video_with_subtitles.mp4"  # Output video file path
#    translate_video(input_video, output_video)# pip install moviepy SpeechRecognition deep-translator pydub

import moviepy.editor as mp
import speech_recognition as sr
from deep_translator import GoogleTranslator
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
    # Use the passed dest_language parameter here
    translator = GoogleTranslator(source='auto', target=dest_language)
    return translator.translate(text)

# Step 4: Generate Spanish subtitles
def generate_subtitles(translated_text, subtitle_path):
    with open(subtitle_path, 'w', encoding='utf-8') as f:
        # Example subtitle timing; adjust as needed for your use-case
        f.write("1\n00:00

Below is a corrected version of your **video_translator.py** file with the necessary fixes:

1. **Removed the duplicate definition of `translate_text` inside `translate_video`.**  
2. **Fixed the variable name error in `translate_text` (changed `target=target_language` to `target=dest_language`).**

Review the updated code below:

---

```python
# pip install moviepy SpeechRecognition deep-translator pydub

import moviepy.editor as mp
import speech_recognition as sr
from deep_translator import GoogleTranslator
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
    translator = GoogleTranslator(source='auto', target=dest_language)
    return translator.translate(text)

# Step 4: Generate Spanish subtitles
def generate_subtitles(translated_text, subtitle_path):
    with open(subtitle_path, 'w', encoding='utf-8') as f:
        # Example subtitle timing; adjust as needed for your use-case
        f.write("1\n00:00:00,000 --> 00:00:05,000\n")
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

# now called by app.py 
# Uncomment the block below if you wish to test this module independently.
# if __name__ == "__main__":
#    input_video = "/Users/justincurtsinger/Desktop/test_video.mp4"  # Replace with your video file path
#    output_video = "/Users/justincurtsinger/Desktop/output_video_with_subtitles.mp4"  # Output video file path
#    translate_video(input_video, output_video)