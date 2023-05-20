import React, { useState } from "react";
import { Song } from "./Song";
import { ShuffleEngine } from "./ShuffleEngine";

const sampleSongs = [
    new Song("Sunday Morning","Maroon 5"),
    new Song("Kiss Me More(feat. SZA)","Doja Cat"),
    new Song("Uptown Funk(feat. Bruno Mars)","Mark Ronson"),
    new Song(22,"Taylor Swift"),
    new Song("Problem(feat. Iggy Azalea)"),
];
const playList = new ShuffleEngine();

export const Player = () => {
    const [currentSong, setCurrentSong] = useState(null);
    const [upcomingSongs, setUpcomingSongs] = useState([]);
    const [hasSongs, setHasSongs] = useState(false);

    const onClickSet = () => {
        playList.setSongs(sampleSongs);
        setHasSongs(true);
        console.log(playList);
    };

    const onClickPlay = () => {
        setCurrentSong(playList.getNextSong());
        setUpcomingSongs(() => playList.peekQueue());
        console.log(playList);
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
                <h2>Now playing</h2>
                <dl>
                    <dt>{currentSong.title}</dt>
                    <dd><span className="artistname">{currentSong.artist}</span></dd>
                </dl>
                <p></p>
                </>
            ) : null}
            {upcomingSongs.length > 0 && (
                <>
                <h3>Upcoming songs</h3>
                <ul>{upcomingSongs.length > 0 && (
                    upcomingSongs.map((map, index) => {
                        return map === undefined ? null : (
                            <li key={index}>{map.title}<span className="artistname">(by {map.artist})</span></li>
                        )
                    })
                )}</ul>
                </>
            )}
        </div>
    );
};