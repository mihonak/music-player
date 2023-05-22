import React, { useState } from "react";
import { Song } from "./Song";
import { ShuffleEngine } from "./ShuffleEngine";

const sampleSongs = [
    new Song("Sunday Morning","Maroon 5"),
    new Song("Kiss Me More(feat. SZA)","Doja Cat"),
    new Song("Uptown Funk(feat. Bruno Mars)","Mark Ronson"),
    new Song(22,"Taylor Swift"),
    new Song("Problem(feat. Iggy Azalea)"),
    new Song("Boyfriend", "Ariana Grande & Social House"),
    new Song("Dirty Work", "Austin Mahone"),
];
const playList = new ShuffleEngine();

export const Player = () => {
    const [currentSong, setCurrentSong] = useState(null);
    const [upNextSongs, setUpNextSongs] = useState([]);
    const [hasSongs, setHasSongs] = useState(false);

    const onClickSet = () => {
        playList.setSongs(sampleSongs);
        setHasSongs(true);
    };

    const onClickPlay = () => {
        setCurrentSong(playList.getNextSong());
        setUpNextSongs(() => playList.peekQueue());
    };

    return (
        <div className="player">
            <h1>Player</h1>
            <button onClick={onClickSet}>Set songs</button>
            {hasSongs ? (
                <button onClick={onClickPlay}>Play next</button>
            ) : null}
            {currentSong ? (
                <>
                <h2>Now Playing</h2>
                <dl className="current">
                    <dt>{currentSong.title}</dt>
                    <dd className="artist">{currentSong.artist}</dd>
                </dl>
                <p></p>
                </>
            ) : null}
            {upNextSongs.length > 0 && (
                <>
                <h3>Up Next</h3>
                {upNextSongs.length > 0 && (
                    upNextSongs.map((map, index) => {
                        return map === undefined ? null : (
                            <dl key={index} className="upnext">
                                <dt>{map.title}</dt>
                                <dd className="artist">{map.artist}</dd>
                            </dl>
                        )
                    })
                )}
                </>
            )}
        </div>
    );
};