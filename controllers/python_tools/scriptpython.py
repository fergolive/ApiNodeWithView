import sys
import cv2
import asyncio

msg_from_node = sys.stdin.readline()

vidcap = cv2.VideoCapture('video.mp4')

async def getFrame(sec):
    vidcap.set(cv2.CAP_PROP_POS_MSEC, sec*1000)
    hasFrames,image = vidcap.read()
    print(image)
    if hasFrames:
        cv2.imwrite("image.jpg", image)     # save frame as JPG file
       
    return hasFrames


async def main():
   
    success = await getFrame(0)
    print('hola',msg_from_node)
    sys.stdout.flush()

frameRate = 0.5 #//it will capture image in each 0.5 second
count=1
asyncio.run(main())
#success = getFrame(sec)

#while success:
    #count = count + 1
    #sec = sec + frameRate
    #sec = round(sec, 2)
    #success = getFrame(sec)
  


#sys.stdout.flush()