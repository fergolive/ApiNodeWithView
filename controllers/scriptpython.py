import sys
import cv2

nombre = sys.stdin.readline()

vidcap = cv2.VideoCapture('./tempfiles/'+nombre)
vidcap.set(cv2.CAP_PROP_POS_MSEC,20000)      # just cue to 20 sec. position
success,image = vidcap.read()
if success:
    cv2.imwrite("./tempfiles/frame20sec.jpg", image)     # save frame as JPEG file
    cv2.imshow("20sec",image)
    cv2.waitKey() 

nombre = sys.stdin.readline()

print("imagen generada de >", nombre)

sys.stdout.flush()