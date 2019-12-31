#! /bin/bash

running=$(pgrep -c karaoke-pi.py)
while [[ 1 -eq 1 ]] #[ "$running" -eq 1 ]
do
counts=$(pgrep -c omxplayer.bin)
if [[ $counts -gt 1 ]]
then
killall omxplayer.bin
echo "Killed All omxplayer" >> "/var/karaoke/logs/kill"
fi
running=$(pgrep -c karaoke.pi)
done
