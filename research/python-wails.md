For offline Speech-to-Text (STT) functionality that runs entirely on localhost and can be packaged for Windows and macOS, you might consider using open-source libraries that are not limited to C, C++, C#, or Rust. Given your constraints, Python is a versatile language that offers several libraries for STT, including those that can run offline.

Python and SpeechRecognition Library
The SpeechRecognition library in Python is a powerful and easy-to-use option for implementing STT in your application. It supports several engines and APIs, including offline engines like pocketsphinx for English and deepspeech for English and other languages.

Installation
You can install the SpeechRecognition library using pip:

pip install SpeechRecognition
Example Usage
Here's a basic example of how to use the SpeechRecognition library for STT:

import speech_recognition as sr

# Initialize recognizer class (for recognizing the speech)
r = sr.Recognizer()

# Reading Microphone as source
# listening the speech and store in audio_text variable

with sr.Microphone() as source:
    print("Talk")
    audio_text = r.listen(source)
    print("Time over, thanks")
# recoginize_() method will throw a request error if the API is unreachable, hence using exception handling
    
    try:
        # using google speech recognition
        print("Text: "+r.recognize_google(audio_text))
    except:
         print("Sorry, I did not get that")
Integrating with Wails
To integrate Python with Wails, you can use a Python backend with Wails. Wails supports Python as a backend language, allowing you to write your backend logic in Python and communicate with it from your frontend.

Steps to Integrate Python with Wails
Set Up Your Wails Project: Initialize a new Wails project if you haven't already.
Configure Python Backend: In your Wails project, configure the Python backend. You can do this by specifying the Python script to run in your wails.json configuration file.
Implement STT in Python: Use the SpeechRecognition library in your Python script to implement the STT functionality.
Communicate Between Frontend and Backend: Use Wails' built-in bindings to communicate between your frontend and the Python backend. You can call Python functions from your frontend and pass data back and forth.
Packaging for Windows and macOS
Wails allows you to package your application for Windows and macOS. You can use the wails build command to build your application for the target platform. This will compile your Python backend and bundle it with your frontend assets into a single executable for your target platform.

Conclusion
By using Python and the SpeechRecognition library, you can implement offline STT functionality in your application. Wails provides a straightforward way to integrate Python with your frontend, allowing you to build a cross-platform desktop application that runs entirely on localhost.
