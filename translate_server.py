from flask import Flask, request
from werkzeug.utils import secure_filename
from PIL import Image
import base64
import cv2
import pytesseract
import urllib.request
import json

app = Flask(__name__)

tesseract_path = r'C:\\Users\\lg\AppData\\Local\\Tesseract-OCR\\tesseract.exe'
#네이버 언어감지를 위한 key
naver_client_id = "XtaunbyuK4kKKVK7iHOv"
naver_client_secret = "HexFLNsvfe"

pytesseract.pytesseract.tesseract_cmd = tesseract_path

@app.route("/translate", methods = ['POST'])
def translate():
    if request.method == 'POST':
        imgfile_path = './image.jpg'
        imgdata = request.form['file']
        imgdata = base64.b64decode(imgdata)

        with open(imgfile_path, 'wb') as f:
            f.write(imgdata)

        ocr_txt = pytesseract.image_to_string(Image.open(imgfile_path))
        if ocr_txt == "" or ocr_txt == None:
            return "None"
        src = naver_check_language(ocr_txt)
        if src == -1:
            return "None"
        translated_txt = naver_translate_language(ocr_txt, src)
        if translated_txt == -1:
            return "None"
        print('translated_txt : ', translated_txt)
        return translated_txt

#언어를 감지하는 코드이다
def naver_check_language(txt):
    encQuery = urllib.parse.quote(txt)
    data = "query=" + encQuery

    url = "https://openapi.naver.com/v1/papago/detectLangs"

    request = urllib.request.Request(url)
    request.add_header("X-Naver-Client-Id", naver_client_id)
    request.add_header("X-Naver-Client-Secret", naver_client_secret)

    try:
        response = urllib.request.urlopen(request, data = data.encode("utf-8"))
        rescode = response.getcode()
        if(rescode == 200):
            response_body = json.loads(response.read())
            language = response_body['langCode']
            return language
        else:
            print('Error Code : ' + rescode)
            return -1
        
    except urllib.error.HTTPError as e:
        print(e.code)
        print(e.read())
        return -1
    return None

#네이버 번역 api
def naver_translate_language(txt, src):
    encText = urllib.parse.quote(txt)
    data = "source=" + src + "&target=ko&text=" + encText

    url = "https://openapi.naver.com/v1/papago/n2mt"

    request = urllib.request.Request(url)
    request.add_header("X-Naver-Client-Id", naver_client_id)
    request.add_header("X-Naver-Client-Secret", naver_client_secret)

    try:
        response = urllib.request.urlopen(request, data = data.encode("utf-8"))
        rescode = response.getcode()
        if rescode == 200:
            response_body = json.loads(response.read())
            #response_body = response_body.decode('utf-8')
            return response_body['message']['result']['translatedText']
        else:
            print("Error Code : " + rescode)
            return -1

    except urllib.error.HTTPError as e:
        print(e.code)
        print(e.read().decode('utf-8'))
        return -1
    return None

if __name__ == "__main__":
    app.run(debug = True, host = '0.0.0.0', port = 50000)