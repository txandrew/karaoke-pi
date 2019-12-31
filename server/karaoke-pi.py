#!/usr/bin/python

from omxplayer import OMXPlayer
from datetime import datetime
import os
import MySQLdb
import time
import socket
import psutil

str_vid_path = "/var/www/html/karaoke/videos/"

dt = datetime.now()
fil_log = open("/var/karaoke/logs/run_" + str(dt.microsecond) + ".log",'w')

try:
    host = socket.gethostbyname("www.google.com")
    s = socket.create_connection((host,80), 2)
except:
    print "No Internet Connection"
    exit()

db = MySQLdb.connect(host="localhost",
                      user="kpi-server",
                      passwd="karaokepi",
                      db="karaoke")
db.autocommit(True)


bool_run = True
obj_Player = None

###############################################################################
# Initiate Player
###############################################################################
def initPlayer():
    global str_c_video
    global str_c_status
    global str_c_youtube
    global str_n_status
    global str_n_youtube
    global str_p_youtube
    global bool_run
    global obj_Player

    obj_Player = OMXPlayer(str_vid_path + "~LOADING.mp4", args=['--display=5','--adev=both'])
#    try:
#        obj_Player = OMXPlayer(str_vid_path + "~LOADING.mp4", args=['--aidx=1'])
#    except:
#        time.sleep(5)
#        obj_Player = OMXPlayer(str_vid_path + "~LOADING.mp4", args=['--display=5','--adev=both'])
#    obj_Player = OMXPlayer(str_vid_path + "~LOADING.mp4", args=['adix=1'])

#    obj_Player.play()

    nxt_cur = db.cursor()
    nxt_cur.execute("UPDATE tbl_status SET status='STARTING', youtube_id='-1';")
    str_p_youtube = "STARTING"
    str_c_video   = "~LOADING"
    str_c_status  = "STARTING"
    str_c_youtube = "STARTING"
    str_n_status  = ""
    str_n_youtube = ""

    bool_run      = True

###############################################################################
# Test if the player is currently playing (test over 3 seconds)
###############################################################################
def isPlaying():
    bool_return = 0
    int_x = 0

    if int_x < 3 and not bool_return:
        try:
            if obj_Player.is_playing():
                bool_return = 1
            else:
                int_x += 1
                time.sleep(1)
                fil_log.write ("\n Video is no longer playing \n")
        except Exception, e:
            fil_log.write ("\nisPlaying() Exception Raised: " + str(e) + "\n")
            int_x += 1
            time.sleep(1)

    return bool_return


###############################################################################
# Set Next Song Function
###############################################################################
def setNextSong():

    global str_n_status
    global str_n_youtube

    nxt_cur = db.cursor()
    nxt_cur.execute("select q.youtube_id, q.queued_by, s.title, s.artist, s.song_type from tbl_queue q LEFT JOIN tbl_songs s ON q.youtube_id = s.youtube_id LEFT JOIN qry_last_played l on l.queued_by = q.queued_by ORDER BY last_played, queue_val LIMIT 1;")
    #nxt_cur.execute("select q.youtube_id, q.queued_by, s.title, s.artist, s.song_type from tbl_queue q LEFT JOIN tbl_songs s ON q.youtube_id = s.youtube_id ORDER BY queue_val LIMIT 1;")


    if ( int(nxt_cur.rowcount) > 0 ):
        nxt_res = nxt_cur.fetchone()
        nxt_ytid = nxt_res[0]
        nxt_qued = nxt_res[1]
        nxt_titl = nxt_res[2]
        nxt_arti = nxt_res[3]
        nxt_type = nxt_res[4]

        nxt_cur.execute("UPDATE tbl_status SET status='READY', youtube_id='" + nxt_ytid + "', queued_by='" + nxt_qued + "';")
        nxt_cur.execute("INSERT INTO tbl_history (youtube_id, queued_by) VALUES ('" + nxt_ytid + "','" + nxt_qued + "');")
        nxt_cur.execute("DELETE FROM tbl_queue ORDER BY queue_val LIMIT 1")

        str_n_status  = "READY"
        str_n_youtube = nxt_ytid


#        playVideo("~LOADING")
#        time.sleep(10)
#        playVideo(nxt_ytid)

        return "READY"
    else:
        nxt_cur.execute("UPDATE tbl_status SET status='STANDBY', youtube_id='-1';")
#        setWaiting()
        return "STANDBY"

    nxt_cur.close()

###############################################################################
# Reset Videos
###############################################################################
def resetVideo():
    killProcesses("omxplayer.bin")
    nxt_cur = db.cursor()
    nxt_cur.execute("UPDATE tbl_status SET status='PLAYING';")
    playVideo(str_c_youtube)
    return "Reset Video"

###############################################################################
# Set Waiting
###############################################################################
def setWaiting():
    if ( obj_Player.get_filename() != str_vid_path + "~WAITING.mp4" ):
        playVideo("~WAITING")

    return "Set Waiting"

###############################################################################
# Kill Process
###############################################################################
def killProcesses(str_process):
    int_kills = 0
    for str_proc in psutil.process_iter():
        if str_proc.name() == str_process:
            str_proc.kill()
            int_kills += 1

    return int_kills

###############################################################################
# Play Video
###############################################################################
def playVideo(str_video):
    global bool_FailLoad
    try:
        obj_Player.load(str_vid_path + str_video + ".mp4")
        obj_Player.play()
        time.sleep(1)
    except Exception, e:
        fil_log.write ("\nplayVideo() Exception Raised: " + str(e) + "\n")
        bool_FailLoad = True

###############################################################################
# Main Loop
###############################################################################

initPlayer()
int_repeat = 0

while bool_run:
    str_function = ""
    bool_FailLoad = False

    cur = db.cursor()
    cur.execute("select c.status, c.youtube_id from tbl_status c left join tbl_songs s on c.youtube_id = s.youtube_id")

    res  = cur.fetchone()

    str_n_status  = res[0]
    str_n_youtube = res[1]

    if str_n_status == "PLAYED" and str_c_status != "PAUSED":
        str_function += "[PLAY : " + resetVideo() + "]"
        cur.execute("UPDATE tbl_status SET status='PLAYING';")

    if str_n_status == "PLAYED" and str_c_status == "PAUSED":
        str_function += "[RESUME : " + str(obj_Player.play()) + "]"
        cur.execute("UPDATE tbl_status SET status='PLAYING';")

    if str_n_status == "PLAYED" and str_n_youtube == "-1" and str_c_status != "PAUSED":
        str_function += "[NO VIDEO : " + setNextSong() + "]"

    if str_c_status == "STARTING" and str_n_status == "PLAYING":
        str_function += "[STARTING : " + setNextSong() + "]"

    if str_c_status == "STARTING" and str_n_youtube == "-1":
        str_function += "[STARTING : " + setNextSong() + "]"

    if str_n_status == "STANDBY":
        str_function += "[STANDBY : " + setNextSong() + "]"

    if ( str_c_status != str_n_status ):
        if ( str_n_status == "PAUSED" ):
            try:
                str_function += obj_Player.pause()
            except:
                bool_FailLoad = True
        if ( str_n_status == "PLAYING" ):
            try:
                str_function += obj_Player.play()
            except:
                bool_FailLoad = True
        if ( str_n_status == "SKIPPING" ):
            obj_Player.stop()
            str_function += "[SKIP : " + setNextSong() + "]"
    time.sleep(1)

    if ( str_n_status == "PLAYING" ):
        time.sleep(1)
        if ( not isPlaying() ):  # str(obj_Player.position()) == "None" ):
            str_function += "[ENDED : " + setNextSong() + "]"

#    print           ("%10s --> %10s  # %14s --> %14s / %s" % (str_c_status, str_n_status, str_c_youtube, str_n_youtube, str_function))
    fil_log.write   ("%10s --> %10s  # %14s --> %14s / %s" % (str_c_status, str_n_status, str_c_youtube, str_n_youtube, str_function))
    try:
        fil_log.write (" % " + str(obj_Player.playback_status()) + "\n")
        int_repeat = 0
    except:
        if int_repeat < 1:
            int_repeat += 1
            obj_Player = None
            initPlayer()
        else:
            str_n_quit = "QUIT"


    #if ( not bool_FailLoad ):
    str_c_status  = str_n_status
    str_p_youtube = str_c_youtube
    str_c_youtube = str_n_youtube

    if ( str_n_status == "QUIT" ):
        try:
            if obj_Player.can_quit():
                obj_Player.quit()
        except:
            fil_log.write ("can_quit had an error.\n")
        cur_quit = db.cursor()
        cur_quit.execute("UPDATE tbl_status SET status = 'STANDBY';")
        bool_run = False

    time.sleep(1)
