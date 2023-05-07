# This was used to rename the thumbnails correctly and change their extension, clever isn't it?

import os

def rename(directory, name, ext):
    os.chdir(directory)
    i = 1
    for file in [ file for file in sorted(os.listdir(), key=os.path.getctime)]:
            os.rename(file, f"{name}-{i}.{ext}")
            i += 1
            print("Done")
path=input("Enter the file path: ")
name=input("Enter the file name: ")
ext=input("Enter the file extension: ")
rename(path, name, ext)