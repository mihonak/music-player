import { ShuffleEngine } from "./ShuffleEngine";
import { Song } from "./Song";

const sampleSongs = [
    new Song("Sunday Morning","Maroon 5"),
    new Song("Kiss Me More(feat. SZA)","Doja Cat"),
    new Song("Uptown Funk(feat. Bruno Mars)","Mark Ronson"),
];

describe("ShuffleEngine クラス", () => {

    test("ShuffleEngineが存在すること", () => {
        expect(ShuffleEngine).toBeDefined();
    });
});

describe("ShuffleEngine setSongs", () => {

    test("setSongsが存在すること", () => {
        const playList = new ShuffleEngine();
        expect(playList.setSongs).toBeDefined();
    });

    test("シャッフル対象の曲の配列をセットし、セットされた順にIDを付与すること", () => {
        const playList = new ShuffleEngine();
        playList.setSongs(sampleSongs);
        expect(playList.songs).toStrictEqual([
            new Song("Sunday Morning", "Maroon 5", 1),
            new Song("Kiss Me More(feat. SZA)", "Doja Cat", 2),
            new Song("Uptown Funk(feat. Bruno Mars)", "Mark Ronson", 3),
        ]);
    });

    test("setSongsが再び実行されたら古いデータは削除し、新たに渡された曲のみを再生リストに利用すること", () => {
        const sampleSongsA = [
            new Song("24K Magic","Bruno Mars"),
            new Song("Runaway Baby","Bruno Mars"),
            new Song("Just the Way You Are","Bruno Mars"),
        ];
        const sampleSongsB = [
            new Song("Bang Bang","Jessie J"),
            new Song("Price Tag","Jessie J"),
            new Song("One More Try(from & Juliet)","Jessie J"),
        ];
        const playList = new ShuffleEngine();

        playList.setSongs(sampleSongsA);
        playList.getNextSong();
        const playListA = playList.generatedPlaylist;

        playList.setSongs(sampleSongsB);

        playList.songs.map((newsong) => {
            expect(playList.generatedPlaylist).toContain(newsong);
        });

        playListA.map((oldsong) => {
            expect(playList.generatedPlaylist).not.toContain(oldsong);
        });

    });
});

describe("ShuffleEngine setSongs 異常系", () => {

    const playList = new ShuffleEngine();

    test("SetSongsに配列以外が渡されたらエラーを投げること（数値）", () => {
        expect(() => {
            playList.setSongs(1);
        }).toThrow();
    });

    test("SetSongsに配列以外が渡されたらエラーを投げること（オブジェクト）", () => {
        expect(() => {
            playList.setSongs({
                "id": 1,
                "title": "Sunday Morning",
                "artist": "Maroon 5",
            });
        }).toThrow();
    });

    test("SetSongsに配列以外が渡されたらエラーを投げること（文字列）", () => {
        expect(() => {
            playList.setSongs("Sunday Morning");
        }).toThrow();
    });

    test("SetSongsに渡された配列が空だったらエラーを投げること", () => {
        expect(() => {
            playList.setSongs([]);
        }).toThrow();
    });

});

describe("ShuffleEngine getNextSong", () => {

    const playList = new ShuffleEngine();
    playList.setSongs(sampleSongs);

    test("getNextSongが存在すること", () => {
        expect(playList.getNextSong).toBeDefined();
    });

    test("次に再生する曲を返し、次に返す曲が更新されること", () => {
        const firstSong = playList.getNextSong();
        const playedSongs = [firstSong];
        for (let i = 0; i < 10; i++) {
            const currentSong = playList.getNextSong();
            expect(currentSong).not.toEqual(playedSongs[i]);
            playedSongs.push(currentSong);
        }
    });

});

describe("ShuffleEngine PEEK_MAX", () => {
    const playList = new ShuffleEngine();
    playList.setSongs(sampleSongs);

    test("PEEK_MAXは5であること", () => {
        expect(ShuffleEngine.PEEK_MAX).toBe(5);
    });

    test("PEEK_MAXは変更不可であること", () => {
        expect(() => {
            ShuffleEngine.PEEK_MAX += 1;
        }).not.toBe(6);
    });
    test("PEEK_MAXは変更不可であること", () => {
        expect(ShuffleEngine.PEEK_MAX).toBe(5);
    });

});

describe("ShuffleEngine peekQueue", () => {

    const playList = new ShuffleEngine();
    playList.setSongs(sampleSongs);

    test("peekQueueが存在すること", () => {
        expect(playList.peekQueue).toBeDefined();
    });

    test("次に再生する予定の曲を先読みして、PEEK_MAXの長さの配列として返すこと", () => {
        for (let i = 0; i < 10; i++) {
            playList.getNextSong();
            const peekQueue = playList.peekQueue();
            expect(peekQueue).toHaveLength(ShuffleEngine.PEEK_MAX);
            expect(peekQueue).toBeInstanceOf(Array);
        }
    });

});

describe("ShuffleEngine シャッフル", () => {
    const playList = new ShuffleEngine();
    playList.setSongs(sampleSongs);
    const tracks = [];

    for (let r = 0; r < 10; r++) {
        tracks.push([]);
        for (let i = 0; i < playList.songs.length; i++) {
            tracks[r].push(playList.getNextSong());
        }
    }

    test("n+1巡目はn巡目と違う順番であること", () => {
        for ( let i = 0; i < tracks.length-1; i++) {
            expect(tracks[i]).not.toEqual(tracks[i+1]);
        }
    });

    test("n巡目の最後の曲とn+1巡目の最初の曲が違う曲であること", () => {
        for ( let i = 0; i < tracks.length-1; i++) {
            expect(tracks[i][tracks[i].length-1]).not.toEqual(tracks[i+1][0]);
        }
    });

    test("1巡目の時はisFirstRoundがtrueとなり、2巡目以降はfalseとなること", () => {

        const playList = new ShuffleEngine();
        playList.setSongs(sampleSongs);

        for ( let i = 0; i < 10; i++) {
            playList.getNextSong();
            if ( i < sampleSongs.length ) {
                expect(playList.isFirstRound).toBeTruthy();
            } else {
                expect(playList.isFirstRound).toBeFalsy();
            }
        }
    });

    test("1巡目の1曲目が、セットした曲の1番目の曲になっていないこと", () => {
        for ( let i = 0; i < 10; i++) {
            const playList = new ShuffleEngine();
            playList.setSongs(sampleSongs);
            const firstSong = playList.getNextSong();
            expect(firstSong.id).not.toBe(1);
        }
    });
});

describe("ShuffleEngine 少ない曲数", () => {

    const play_number = 30;

    test("2曲しかセットされなかった場合は、交互に再生すること", () => {

        const playList = new ShuffleEngine();
        playList.setSongs(sampleSongs.slice(0,2));
        const history = [];

        for (let i = 0; i < play_number; i++) {
            const n = playList.getNextSong();
            history.push(n);
        }
        for ( let i = 0; i < play_number-1; i++) {
            expect(history[i].id).not.toBe(history[i+1].id);
        }
    });
    test("1曲しかセットされなかった場合は、リピート再生すること", () => {

        const playList = new ShuffleEngine();
        playList.setSongs(sampleSongs.slice(0,1));
        const history = [];

        for (let i = 0; i < play_number; i++) {
            history.push(playList.getNextSong());
        }
        for ( let i = 0; i < play_number-1; i++) {
            expect(history[i].id).toBe(history[i+1].id);
        }
    });
});